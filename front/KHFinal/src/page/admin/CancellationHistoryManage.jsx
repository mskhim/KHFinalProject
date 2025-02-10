import React, { useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import "./include/css/Common.css";
import { BsSortDown, BsSortUp } from "react-icons/bs";

const CancellationHistoryManage = () => {
  // 객체 배열 변수
  const [items, setItems] = useState([
    {
      no: 1,
      id: "예매번호1",
      event_name: "2025 해돋이 행사",
      member_id: "hgd",
      qt: 1,
      purchased_date: "2025-01-01",
      total_cost: 1000,
    },
    {
      no: 2,
      id: "예매번호2",
      event_name: "천을산 해맞이",
      member_id: "kdj",
      qt: 2,
      purchased_date: "2025-01-01",
      total_cost: 2000,
    },
    {
      no: 3,
      id: "예매번호2",
      event_name: "해맞이축제",
      member_id: "itw",
      qt: 3,
      purchased_date: "2025-01-01",
      total_cost: 3000,
    },
  ]);

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
  };

  // 검색어에 따라 필터링된 아이템
  const filteredItems = items.filter((item) =>
    item.event_name.toLowerCase().includes(searchTerm.toLowerCase())
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
              className="text-bg-primary text-center"
              onClick={() => handleSort("no")}
              style={{ width: "90px" }}
            >
              NO
              {thName === "no" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("id")}
              style={{ width: "230px" }}
            >
              예매번호
              {thName === "id" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("event_name")}
              style={{ width: "230px" }}
            >
              축제명
              {thName === "event_name" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("member_id")}
              style={{ width: "230px" }}
            >
              회원아이디
              {thName === "member_id" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              style={{ width: "120px" }}
            >
              수량
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("purchased_date")}
              style={{ width: "200px" }}
            >
              구매일
              {thName === "purchased_date" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("total_cost")}
              style={{ width: "190px" }}
            >
              총액
              {thName === "total_cost" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 데이터 행 */}
          {filteredItems.map((data) => (
            <tr key={data.no}>
              <td style={{ width: "90px" }}>{data.no}</td>
              <td style={{ width: "230px" }}>{data.id}</td>
              <td style={{ width: "230px" }}>{data.event_name}</td>
              <td style={{ width: "230px" }}>{data.member_id}</td>
              <td style={{ width: "120px" }}>{data.qt}</td>
              <td style={{ width: "200px" }}>{data.purchased_date}</td>
              <td style={{ width: "175px" }}>{data.total_cost}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CancellationHistoryManage;
