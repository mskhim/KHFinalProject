import React, { useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import "./include/css/Common.css";
import { BsSortDown, BsSortUp } from "react-icons/bs";

const UserManage = () => {
  // 객체 배열 변수
  const [items, setItems] = useState([
    {
      no: 1,
      id: "hgd",
      provider: "kakao",
      phone: "010-1111-1111",
      birth: "2000-01-01",
      region: "서울",
      reg_date: "2025-02-05",
    },
    {
      no: 2,
      id: "itw",
      provider: "naver",
      phone: "010-2222-2222",
      birth: "2000-01-01",
      region: "부산",
      reg_date: "2025-02-05",
    },
    {
      no: 3,
      id: "kdj",
      provider: "local",
      phone: "010-3333-3333",
      birth: "2000-01-01",
      region: "대전",
      reg_date: "2025-02-05",
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
  const handleCheckboxChange = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    setSelectAll(updatedItems.every((item) => item.checked));
  };

  // 검색어에 따라 필터링된 아이템
  const filteredItems = items.filter((item) =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="text-center">
      <div className="justify-content-end d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="아이디 검색"
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
            <th className="text-bg-primary text-center">
              <Form.Check checked={selectAll} onChange={handleSelectAll} />
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("no")}
            >
              NO
              {thName === "no" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("id")}
            >
              아이디
              {thName === "id" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("provider")}
            >
              로그인유형
              {thName === "provider" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th className="text-bg-primary text-center">전화번호</th>
            <th className="text-bg-primary text-center">생년월일</th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("region")}
            >
              지역
              {thName === "region" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("reg_date")}
            >
              계정 생성일
              {thName === "reg_date" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 데이터 행 */}
          {filteredItems.map((data) => (
            <tr key={data.id}>
              <td className="text-center">
                <Form.Check
                  checked={data.checked}
                  onChange={() =>
                    handleCheckboxChange(data.id) && handleSelectAll()
                  }
                />
              </td>
              <td className="text-center">{data.no}</td>
              <td>{data.id}</td>
              <td>{data.provider}</td>
              <td>{data.phone}</td>
              <td>{data.birth}</td>
              <td>{data.region}</td>
              <td>{data.reg_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserManage;
