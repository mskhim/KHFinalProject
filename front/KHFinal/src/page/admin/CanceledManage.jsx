import React, { useEffect, useState } from "react";
import { Container, Table, Form } from "react-bootstrap";
import "./include/css/Common.css";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import { canceledSelectAllBySearch } from "./adminApi"; // Import the function

const CanceledManage = () => {
  // 객체 배열 변수
  const [items, setItems] = useState([]);

  const getList = async (eventName) => {
    const data = await canceledSelectAllBySearch(eventName);
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

  // 검색어에 따라 필터링된 아이템
  const filteredItems = items.filter((item) =>
    item.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="admin-page text-center">
      <div className="justify-content-end d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="축제명 검색"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: "200px" }}
        />
      </div>

      <Table bordered hover responsive className="admin-table table">
        <thead>
          <tr>
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
              onClick={() => handleSort("id")}
              style={{ width: "230px" }}
            >
              예매번호
              {thName === "id" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("eventName")}
              style={{ width: "230px" }}
            >
              축제명
              {thName === "eventName" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("userId")}
              style={{ width: "230px" }}
            >
              회원아이디
              {thName === "userId" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              style={{ width: "120px" }}
            >
              수량
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("reservedDate")}
              style={{ width: "200px" }}
            >
              구매일
              {thName === "reservedDate" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("totalCost")}
              style={{ width: "190px" }}
            >
              총액
              {thName === "totalCost" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 데이터 행 */}
          {filteredItems.map((data, index) => (
            <tr key={data.no}>
              <td className="align-content-center" style={{ width: "90px" }}>
                {index + 1}
              </td>
              <td className="align-content-center" style={{ width: "230px" }}>
                {data.id}
              </td>
              <td className="align-content-center" style={{ width: "230px" }}>
                {data.eventName}
              </td>
              <td className="align-content-center" style={{ width: "230px" }}>
                {data.userId}
              </td>
              <td className="align-content-center" style={{ width: "120px" }}>
                {data.qt}
              </td>
              <td className="align-content-center" style={{ width: "200px" }}>
                {data.reservedDate}
              </td>
              <td className="align-content-center" style={{ width: "173px" }}>
                {data.totalCost}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CanceledManage;
