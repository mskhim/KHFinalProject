import React, { useEffect, useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import "./include/css/Common.css";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import { festivalSelectAllBySearch, festivalDelete } from "./adminApi"; // festivalDelete 함수 임포트

const FestivalManage = () => {
  // 객체 배열 변수
  const [items, setItems] = useState([]);

  const getList = async (eventName) => {
    const data = await festivalSelectAllBySearch(eventName);
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
    setSelectAll(false);
    getList(e.target.value);
  };

  // 체크박스 전체 선택/해제 함수
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setItems(filteredItems.map((item) => ({ ...item, checked: newSelectAll })));
  };

  // 개별 체크박스 선택/해제 함수
  const handleCheckboxChange = (no) => {
    const updatedItems = filteredItems.map((item) =>
      item.no === no ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    setSelectAll(updatedItems.every((item) => item.checked));
  };

  // 검색어에 따라 필터링된 아이템
  const filteredItems = items.filter((item) =>
    item.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 축제 삭제 함수
  const handleDelete = async () => {
    const selectedFestivals = items.filter((item) => item.checked);
    if (selectedFestivals.length === 0) {
      return alert("삭제할 축제를 선택해주세요.");
    }
    const idsToDelete = selectedFestivals.map((item) => item.no);
    await festivalDelete(idsToDelete);
    getList("");
  };

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

      <Table bordered hover responsive className="admin-table ">
        <thead>
          <tr>
            <th
              className="text-bg-primary text-center align-content-center"
              style={{ width: "90px" }}
            >
              <Form.Check checked={selectAll} onChange={handleSelectAll} />
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("no")}
              style={{ width: "90px" }}
            >
              NO
              {thName === "no" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("eventName")}
              style={{ width: "150px" }}
            >
              축제명
              {thName === "eventName" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              style={{ width: "150px" }}
            >
              개최 장소
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              style={{ width: "150px" }}
            >
              세부 내용
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("startDate")}
              style={{ width: "130px" }}
            >
              개최일
              {thName === "startDate" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("endDate")}
              style={{ width: "130px" }}
            >
              폐막일
              {thName === "endDate" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              style={{ width: "130px" }}
            >
              담당자 번호
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              style={{ width: "130px" }}
            >
              홈페이지
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("userName")}
              style={{ width: "140px" }}
            >
              축제 담당자
              {thName === "userName" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 데이터 행 */}
          {filteredItems.map((data, index) => (
            <tr key={data.no}>
              <td
                className="text-center align-content-center"
                style={{ width: "90px" }}
              >
                <Form.Check
                  checked={data.checked || false}
                  onChange={() => handleCheckboxChange(data.no)}
                />
              </td>
              <td className="align-content-center" style={{ width: "90px" }}>
                {index + 1}
              </td>
              <td className="align-content-center" style={{ width: "150px" }}>
                {data.eventName}
              </td>
              <td className="align-content-center" style={{ width: "150px" }}>
                {data.place}
              </td>
              <td className="align-content-center" style={{ width: "150px" }}>
                {data.content}
              </td>
              <td className="align-content-center" style={{ width: "130px" }}>
                {data.startDate}
              </td>
              <td className="align-content-center" style={{ width: "130px" }}>
                {data.endDate}
              </td>
              <td className="align-content-center" style={{ width: "130px" }}>
                {data.tel}
              </td>
              <td className="align-content-center" style={{ width: "130px" }}>
                {data.homepage}
              </td>
              <td className="align-content-center" style={{ width: "123px" }}>
                {data.userName}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FestivalManage;
