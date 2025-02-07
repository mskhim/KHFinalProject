import React, { useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import "./include/css/Common.css";
import { BsSortDown, BsSortUp } from "react-icons/bs";

const ManagerManage = () => {
  // 객체 배열 변수
  const [items, setItems] = useState([
    {
      no: 1,
      name: "서울",
      id: "seoul",
      pwd: 1234,
      phone: "010-1111-1111",
      reg_date: "2025-02-05",
    },
    {
      no: 2,
      name: "경기도",
      id: "gyeonggi",
      pwd: 1234,
      phone: "010-2222-2222",
      reg_date: "2025-02-05",
    },
    {
      no: 3,
      name: "인천",
      id: "incheon",
      pwd: 1234,
      phone: "010-3333-3333",
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
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="admin-page text-center">
      <div className="justify-content-end d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="담당자 검색"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: "200px" }}
          className="me-3"
        />
        <Button className="btn btn-danger">삭제</Button>
      </div>

      <Table bordered hover responsive className="admin-table table">
        <thead>
          <tr>
            <th
              className="text-bg-primary text-center"
              style={{ width: "90px" }}
            >
              <Form.Check checked={selectAll} onChange={handleSelectAll} />
            </th>
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
              onClick={() => handleSort("name")}
              style={{ width: "200px" }}
            >
              담당자
              {thName === "name" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("id")}
              style={{ width: "200px" }}
            >
              아이디
              {thName === "id" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              style={{ width: "200px" }}
            >
              비밀번호
            </th>
            <th
              className="text-bg-primary text-center"
              style={{ width: "200px" }}
            >
              전화번호
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("reg_date")}
              style={{ width: "200px" }}
            >
              계정 생성일
              {thName === "reg_date" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              style={{ width: "110px" }}
            >
              추가/수정
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 입력 가능한 빈 행 */}
          <tr>
            <td className="text-center" style={{ width: "90px" }}>
              신규 추가
            </td>
            <td className="text-center" style={{ width: "90px" }}>
              -
            </td>
            <td style={{ width: "200px" }}>
              <Form.Control
                className="admin-table-td text-center"
                type="text"
                placeholder="담당자"
                style={{ border: "none" }}
              />
            </td>
            <td style={{ width: "200px" }}>
              <Form.Control
                className="admin-table-td text-center"
                type="text"
                placeholder="아이디"
                style={{ border: "none" }}
              />
            </td>
            <td style={{ width: "200px" }}>
              <Form.Control
                className="admin-table-td text-center"
                type="text"
                placeholder="비밀번호"
                style={{ border: "none" }}
              />
            </td>
            <td style={{ width: "200px" }}>
              <Form.Control
                className="admin-table-td text-center"
                type="text"
                placeholder="전화번호"
                style={{ border: "none" }}
              />
            </td>
            <td style={{ width: "200px" }}>
              <Form.Control
                className="admin-table-td text-center"
                type="date"
                style={{ border: "none" }}
              />
            </td>
            <td style={{ width: "93px" }}>
              <Button className="btn btn-primary me-2">추가</Button>
            </td>
          </tr>

          {/* 데이터 행 */}
          {filteredItems.map((data) => (
            <tr key={data.id}>
              <td className="text-center" style={{ width: "90px" }}>
                <Form.Check
                  checked={data.checked}
                  onChange={() =>
                    handleCheckboxChange(data.id) && handleSelectAll()
                  }
                />
              </td>
              <td className="text-center" style={{ width: "90px" }}>
                {data.no}
              </td>
              <td style={{ width: "200px" }}>
                <Form.Control
                  className="admin-table-td text-center"
                  type="text"
                  value={data.name}
                  style={{ border: "none" }}
                />
              </td>
              <td style={{ width: "200px" }}>
                <Form.Control
                  className="admin-table-td text-center"
                  type="text"
                  value={data.id}
                  style={{ border: "none" }}
                />
              </td>
              <td style={{ width: "200px" }}>
                <Form.Control
                  className="admin-table-td text-center"
                  type="text"
                  value={data.pwd}
                  style={{ border: "none" }}
                />
              </td>
              <td style={{ width: "200px" }}>
                <Form.Control
                  className="admin-table-td text-center"
                  type="text"
                  value={data.phone}
                  style={{ border: "none" }}
                />
              </td>
              <td style={{ width: "200px" }}>
                <Form.Control
                  className="admin-table-td text-center"
                  type="date"
                  value={data.reg_date}
                  style={{ border: "none" }}
                />
              </td>
              <td style={{ width: "93px" }}>
                <Button className="btn btn-primary me-2">수정</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManagerManage;
