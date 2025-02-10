import React, { useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import "./include/css/Common.css";
import vivafesta from "../../assets/vivafesta.png";
import { BsSortDown, BsSortUp } from "react-icons/bs";

const BannerManage = () => {
  // 객체 배열 변수
  const [items, setItems] = useState([
    {
      no: 1,
      event_name: "2025 해돋이 행사",
      url: { vivafesta },
      sub_date: "2025-01-01",
    },
    {
      no: 2,
      event_name: "천을산 해맞이",
      url: { vivafesta },
      sub_date: "2025-01-01",
    },
    {
      no: 3,
      event_name: "해맞이축제",
      url: { vivafesta },
      sub_date: "2025-01-01",
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
    <Container className="admin-page text-center">
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
              onClick={() => handleSort("title")}
              style={{ width: "200px" }}
            >
              축제명
              {thName === "title" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              style={{ width: "200px" }}
            >
              파일 경로
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("sub_date")}
              style={{ width: "200px" }}
            >
              등록일
              {thName === "sub_date" &&
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
                placeholder="축제명"
                style={{ border: "none" }}
              />
            </td>
            <td style={{ width: "200px" }}>
              <Form.Control
                className="admin-table-td text-center"
                type="file"
                placeholder="파일경로"
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
            <td style={{ width: "99.5px" }}>
              <Button className="btn btn-primary me-2">추가</Button>
            </td>
          </tr>

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
              <td className="text-center" style={{ width: "90px" }}>
                {data.no}
              </td>
              <td style={{ width: "200px" }}>
                <Form.Control
                  className="admin-table-td text-center"
                  type="text"
                  defaultValue={data.event_name}
                  style={{ border: "none" }}
                />
              </td>
              <td style={{ width: "200px" }}>
                <Form.Control
                  className="admin-table-td text-center"
                  type="file"
                  ref={data.url}
                  style={{ border: "none" }}
                />
              </td>
              <td style={{ width: "200px" }}>
                <Form.Control
                  className="admin-table-td text-center"
                  type="date"
                  defaultValue={data.sub_date}
                  style={{ border: "none" }}
                />
              </td>
              <td style={{ width: "99.5px" }}>
                <Button className="btn btn-primary me-2">수정</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BannerManage;
