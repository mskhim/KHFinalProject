import React, { useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import "./include/css/Common.css";
import { BsSortDown, BsSortUp } from "react-icons/bs";

const UserManage = () => {
  // 객체 배열 변수
  const [items, setItems] = useState([
    {
      no: 1,
      event_name: "2025 해돋이 행사",
      member_id: "hgd",
      title: "리뷰 타이틀1",
      comment: "내용1",
      rate: 5,
      sub_date: "2025-02-05",
    },
    {
      no: 2,
      event_name: "천을산 해맞이",
      member_id: "kdj",
      title: "리뷰 타이틀2",
      comment: "내용2",
      rate: 3,
      sub_date: "2025-02-05",
    },
    {
      no: 3,
      event_name: "해맞이축제",
      member_id: "itw",
      title: "리뷰 타이틀3",
      comment: "내용3",
      rate: 1,
      sub_date: "2025-02-05",
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
              onClick={() => handleSort("event_name")}
              style={{ width: "230px" }}
            >
              축제명
              {thName === "event_name" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("member_name")}
              style={{ width: "150px" }}
            >
              리뷰 작성자
              {thName === "member_name" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("title")}
              style={{ width: "230px" }}
            >
              리뷰 제목
              {thName === "title" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              style={{ width: "250px" }}
            >
              리뷰 내용
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("rate")}
              style={{ width: "90px" }}
            >
              평점
              {thName === "rate" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("sub_date")}
              style={{ width: "165px" }}
            >
              리뷰 작성일
              {thName === "sub_date" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 데이터 행 */}
          {filteredItems.map((data) => (
            <tr key={data.no}>
              <td className="text-center" style={{ width: "90px" }}>
                <Form.Check
                  checked={data.checked}
                  onChange={() =>
                    handleCheckboxChange(data.no) && handleSelectAll()
                  }
                />
              </td>
              <td style={{ width: "90px" }}>{data.no}</td>
              <td style={{ width: "230px" }}>{data.event_name}</td>
              <td style={{ width: "150px" }}>{data.member_id}</td>
              <td style={{ width: "230px" }}>{data.title}</td>
              <td style={{ width: "250px" }}>{data.comment}</td>
              <td style={{ width: "90px" }}>{data.rate}</td>
              <td style={{ width: "148px" }}>{data.sub_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserManage;
