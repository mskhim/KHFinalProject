import React, { useEffect, useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import "./include/css/Common.css";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import { qnaSelectAllBySearch, qnaDelete } from "./adminApi"; // Import the functions

const QnAManage = () => {
  // 객체 배열 변수
  const [items, setItems] = useState([]);

  const getList = async (eventName) => {
    const data = await qnaSelectAllBySearch(eventName);
    if (data !== null) {
      setItems(data);
    }
  };

  useEffect(() => {
    getList("");
  }, []);

  // 정렬할 컬럼 이름
  const [thName, setthName] = useState("");
  // 정렬 순서
  const [sortOrder, setSortOrder] = useState("asc");
  // 검색어
  const [searchTerm, setSearchTerm] = useState("");
  // 전체 선택 여부
  const [selectAll, setSelectAll] = useState(false);

  // 정렬 함수
  const handleSort = (field) => {
    const sortedItems = [...items].sort((a, b) => {
      if (sortOrder === "asc") {
        if (typeof a[field] === "number") {
          return a[field] - b[field];
        }
        return a[field].localeCompare(b[field]);
      } else {
        if (typeof a[field] === "number") {
          return b[field] - a[field];
        }
        return b[field].localeCompare(a[field]);
      }
    });
    setItems(sortedItems);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setthName(field);
  };

  // 검색 함수
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    getList(e.target.value);
  };

  // 체크박스 전체 선택/해제 함수
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setItems(items.map((item) => ({ ...item, checked: newSelectAll })));
  };

  // 개별 체크박스 선택/해제 함수
  const handleCheckboxChange = (questionNo) => {
    const updatedItems = items.map((item) =>
      item.questionNo === questionNo
        ? { ...item, checked: !item.checked }
        : item
    );
    setItems(updatedItems);
    setSelectAll(updatedItems.every((item) => item.checked));
  };

  // 유저 삭제 함수
  const handleDelete = async () => {
    const selectedItems = items.filter((item) => item.checked);
    if (selectedItems.length === 0) {
      return alert("삭제할 항목을 선택해주세요.");
    }
    const idsToDelete = selectedItems.map((item) => item.questionNo);
    await qnaDelete(idsToDelete);
    getList("");
  };

  // 검색어에 따라 필터링된 아이템
  const filteredItems = items.filter((item) =>
    item.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="text-center">
      <div className="justify-content-end d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="축제명 검색"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: "200px" }}
          className="me-3"
        />
        <Button className="btn btn-danger" onClick={handleDelete}>
          삭제
        </Button>
      </div>

      <Table bordered hover responsive className="admin-table">
        <thead>
          <tr>
            <th
              className="text-bg-primary text-center align-content-center"
              style={{ width: "50px" }}
            >
              <Form.Check checked={selectAll} onChange={handleSelectAll} />
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("questionNo")}
              style={{ width: "60px" }}
            >
              NO
              {thName === "questionNo" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("eventName")}
              style={{ width: "200px" }}
            >
              축제명
              {thName === "eventName" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("questionTitle")}
              style={{ width: "200px" }}
            >
              질문 제목
              {thName === "questionTitle" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              style={{ width: "200px" }}
            >
              질문 내용
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("questionWriter")}
              style={{ width: "150px" }}
            >
              질문 작성자
              {thName === "questionWriter" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("questionDate")}
              style={{ width: "150px" }}
            >
              질문 작성일
              {thName === "questionDate" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              style={{ width: "200px" }}
            >
              답변 내용
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("answerWriter")}
              style={{ width: "150px" }}
            >
              답변자
              {thName === "answerWriter" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("answerDate")}
              style={{ width: "150px" }}
            >
              답변 작성일
              {thName === "answerDate" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 데이터 행 */}
          {filteredItems.map((data, index) => (
            <tr key={data.questionNo}>
              <td
                className="text-center align-content-center"
                style={{ width: "50px" }}
              >
                <Form.Check
                  checked={data.checked || false}
                  onChange={() => handleCheckboxChange(data.questionNo)}
                />
              </td>
              <td className="align-content-center" style={{ width: "60px" }}>
                {index + 1}
              </td>
              <td className="align-content-center" style={{ width: "200px" }}>
                {data.eventName}
              </td>
              <td className="align-content-center" style={{ width: "200px" }}>
                {data.questionTitle}
              </td>
              <td className="align-content-center" style={{ width: "200px" }}>
                {data.questionContent}
              </td>
              <td className="align-content-center" style={{ width: "150px" }}>
                {data.questionWriter}
              </td>
              <td className="align-content-center" style={{ width: "150px" }}>
                {data.questionDate}
              </td>
              <td className="align-content-center" style={{ width: "200px" }}>
                {data.answerContent}
              </td>
              <td className="align-content-center" style={{ width: "150px" }}>
                {data.answerWriter}
              </td>
              <td className="align-content-center" style={{ width: "131.5px" }}>
                {data.answerDate}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default QnAManage;
