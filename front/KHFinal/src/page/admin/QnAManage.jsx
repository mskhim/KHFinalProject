import React, { useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import "./include/css/Common.css";
import { BsSortDown, BsSortUp } from "react-icons/bs";

const QnAManage = () => {
  // 객체 배열 변수
  const [items, setItems] = useState([
    {
      no: 1,
      event_name: "2025 해돋이 행사",
      title: "질문1",
      content: "질문 내용 1",
      member_id: "질문자",
      sub_date: "2025-02-05",
      reply_content: "답변 내용1",
      member_name: "답변자",
      reply_date: "2025-02-05",
    },
    {
      no: 2,
      event_name: "천을산 해맞이",
      title: "질문2",
      content: "질문 내용 2",
      member_id: "질문자",
      sub_date: "2025-02-05",
      reply_content: "답변 내용2",
      member_name: "답변자",
      reply_date: "2025-02-05",
    },
    {
      no: 3,
      event_name: "해맞이축제",
      title: "질문3",
      content: "질문 내용 3",
      member_id: "질문자",
      sub_date: "2025-02-05",
      reply_content: "답변 내용3",
      member_name: "답변자",
      reply_date: "2025-02-05",
    },
  ]);

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
  };

  // 체크박스 전체 선택/해제 함수
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setItems(items.map((item) => ({ ...item, checked: newSelectAll })));
  };

  // 개별 체크박스 선택/해제 함수
  const handleCheckboxChange = (no) => {
    const updatedItems = items.map((item) =>
      item.no === no ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    setSelectAll(updatedItems.every((item) => item.checked));
  };

  // 검색어에 따라 필터링된 아이템
  const filteredItems = items.filter((item) =>
    item.event_name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Button className="btn btn-danger">삭제</Button>
      </div>

      <Table bordered hover responsive className="admin-table">
        <thead>
          <tr>
            <th
              className="text-bg-primary text-center "
              style={{ width: "50px" }}
            >
              <Form.Check checked={selectAll} onChange={handleSelectAll} />
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("no")}
              style={{ width: "60px" }}
            >
              NO
              {thName === "no" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("event_name")}
              style={{ width: "200px" }}
            >
              축제명
              {thName === "event_name" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("title")}
              style={{ width: "200px" }}
            >
              질문 제목
              {thName === "title" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              style={{ width: "200px" }}
            >
              질문 내용
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("member_id")}
              style={{ width: "150px" }}
            >
              질문 작성자
              {thName === "member_id" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("sub_date")}
              style={{ width: "150px" }}
            >
              질문 작성일
              {thName === "sub_date" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              style={{ width: "200px" }}
            >
              답변 내용
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("member_name")}
              style={{ width: "150px" }}
            >
              답변자
              {thName === "member_name" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("reply_date")}
              style={{ width: "150px" }}
            >
              답변 작성일
              {thName === "reply_date" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 데이터 행 */}
          {filteredItems.map((data) => (
            <tr key={data.no}>
              <td className="text-center" style={{ width: "50px" }}>
                <Form.Check
                  checked={data.checked}
                  onChange={() =>
                    handleCheckboxChange(data.no) && handleSelectAll()
                  }
                />
              </td>
              <td style={{ width: "60px" }}>{data.no}</td>
              <td style={{ width: "200px" }}>{data.event_name}</td>
              <td style={{ width: "200px" }}>{data.title}</td>
              <td style={{ width: "200px" }}>{data.content}</td>
              <td style={{ width: "150px" }}>{data.member_id}</td>
              <td style={{ width: "150px" }}>{data.sub_date}</td>
              <td style={{ width: "200px" }}>{data.reply_content}</td>
              <td style={{ width: "150px" }}>{data.member_name}</td>
              <td style={{ width: "134px" }}>{data.reply_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default QnAManage;
