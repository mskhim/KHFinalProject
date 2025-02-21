import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import "./include/css/Common.css";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import {
  noticeSelectAllBySearch,
  noticeInsert,
  noticeUpdate,
  noticeDelete,
} from "./adminApi"; // API 함수 임포트

const NoticeManage = () => {
  // 객체 배열 변수
  const [items, setItems] = useState([]);

  // 공지사항 목록을 가져오는 함수
  const getList = async (title) => {
    const data = await noticeSelectAllBySearch(title);
    if (data !== null) {
      setItems(data);
    }
  };

  // 컴포넌트가 마운트될 때 공지사항 목록을 가져옴
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

  // 입력 필드 참조 변수
  const titleRef = useRef();
  const contentRef = useRef();
  const date = new Date().toISOString().split("T")[0];

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
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 공지사항 추가 함수
  const handleInsert = async () => {
    const newNotice = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      subDate: date,
    };
    if (!newNotice.title || !newNotice.content) {
      return alert("모든 필드를 입력해야 합니다.");
    }
    await noticeInsert(newNotice);
    getList("");
    titleRef.current.value = "";
    contentRef.current.value = "";
  };

  // 공지사항 수정 함수
  const handleUpdate = async (no) => {
    const updatedNotice = {
      no: no,
      title: document.getElementById(`title-${no}`).value,
      content: document.getElementById(`content-${no}`).value,
      subDate: date,
    };
    await noticeUpdate(updatedNotice);
    getList("");
  };

  // 공지사항 삭제 함수
  const handleDelete = async () => {
    const selectedNotices = items.filter((item) => item.checked);
    if (selectedNotices.length === 0) {
      return alert("삭제할 공지사항을 선택해주세요.");
    }
    const idsToDelete = selectedNotices.map((item) => item.no);
    await noticeDelete(idsToDelete);
    getList("");
  };

  return (
    <Container className="admin-page text-center">
      <div className="justify-content-end d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="공지사항 검색"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: "200px" }}
          className="me-3"
        />
        <Button className="btn btn-danger" onClick={handleDelete}>
          삭제
        </Button>
      </div>

      <Table bordered hover responsive className="admin-table table">
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
              onClick={() => handleSort("title")}
              style={{ width: "200px" }}
            >
              공지사항 제목
              {thName === "title" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              style={{ width: "200px" }}
            >
              공지사항 내용
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("subDate")}
              style={{ width: "200px" }}
            >
              등록일
              {thName === "subDate" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              style={{ width: "110px" }}
            >
              추가/수정
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 입력 가능한 빈 행 */}
          <tr>
            <td
              className="text-center align-content-center"
              style={{ width: "90px" }}
            >
              신규 추가
            </td>
            <td
              className="text-center align-content-center"
              style={{ width: "90px" }}
            >
              -
            </td>
            <td className="align-content-center" style={{ width: "200px" }}>
              <Form.Control
                className="admin-table-td text-center"
                type="text"
                ref={titleRef}
                placeholder="공지사항 제목"
                style={{ border: "none" }}
              />
            </td>
            <td className="align-content-center" style={{ width: "200px" }}>
              <Form.Control
                className="admin-table-td text-center"
                type="text"
                ref={contentRef}
                placeholder="공지사항 내용"
                style={{ border: "none" }}
              />
            </td>
            <td className="align-content-center" style={{ width: "200px" }}>
              {date}
            </td>
            <td className="align-content-center" style={{ width: "97.1px" }}>
              <Button className="btn btn-primary" onClick={handleInsert}>
                추가
              </Button>
            </td>
          </tr>

          {/* 데이터 행 */}
          {filteredItems.map((data, index) => (
            <tr key={data.no}>
              <td
                className="text-center align-content-center"
                style={{ width: "90px" }}
              >
                <Form.Check
                  checked={data.checked}
                  onChange={() => handleCheckboxChange(data.no)}
                />
              </td>
              <td
                className="text-center align-content-center"
                style={{ width: "90px" }}
              >
                {index + 1}
              </td>
              <td className="align-content-center" style={{ width: "200px" }}>
                <Form.Control
                  id={`title-${data.no}`}
                  className="admin-table-td text-center"
                  type="text"
                  defaultValue={data.title}
                  style={{ border: "none" }}
                />
              </td>
              <td className="align-content-center" style={{ width: "200px" }}>
                <Form.Control
                  id={`content-${data.no}`}
                  className="admin-table-td text-center"
                  type="text"
                  defaultValue={data.content}
                  style={{ border: "none" }}
                />
              </td>
              <td className="align-content-center" style={{ width: "200px" }}>
                {data.subDate}
              </td>
              <td className="align-content-center" style={{ width: "97.1px" }}>
                <Button
                  className="btn btn-primary"
                  onClick={() => handleUpdate(data.no)}
                >
                  수정
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default NoticeManage;
