import React, { useEffect, useRef, useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import "./include/css/Common.css";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import {
  userSelectAllBySearch,
  userDelete, // 추가
} from "./adminApi"; // adminAPI에서 함수 임포트

const UserManage = () => {
  // 객체 배열 변수
  const [items, setItems] = useState([]);

  const getList = async (id) => {
    const data = await userSelectAllBySearch(id);
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
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 유저 삭제 함수
  const handleDelete = async () => {
    const selectedUsers = items.filter((item) => item.checked);
    if (selectedUsers.length === 0) {
      return alert("삭제할 유저를 선택해주세요.");
    }
    const idsToDelete = selectedUsers.map((item) => item.no);
    await userDelete(idsToDelete);
    getList("");
  };

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
        <Button className="btn btn-danger" onClick={handleDelete}>
          삭제
        </Button>
      </div>

      <Table bordered hover responsive className="admin-table">
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
              onClick={() => handleSort("id")}
              style={{ width: "200px" }}
            >
              아이디
              {thName === "id" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("provider")}
              style={{ width: "200px" }}
            >
              로그인유형
              {thName === "provider" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              style={{ width: "200px" }}
            >
              전화번호
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              style={{ width: "200px" }}
            >
              생년월일
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("region")}
              style={{ width: "135px" }}
            >
              지역
              {thName === "region" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("regDate")}
              style={{ width: "180px" }}
            >
              계정 생성일
              {thName === "regDate" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 데이터 행 */}
          {filteredItems.map((data, index) => (
            <tr key={data.no}>
              <td
                className="align-content-center text-center"
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
              <td className="align-content-center" style={{ width: "200px" }}>
                {data.id}
              </td>
              <td className="align-content-center" style={{ width: "200px" }}>
                {data.provider}
              </td>
              <td className="align-content-center" style={{ width: "200px" }}>
                {data.phone}
              </td>
              <td className="align-content-center" style={{ width: "200px" }}>
                {data.birth}
              </td>
              <td className="align-content-center" style={{ width: "135px" }}>
                {data.region}
              </td>
              <td className="align-content-center" style={{ width: "163px" }}>
                {data.regDate}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserManage;
