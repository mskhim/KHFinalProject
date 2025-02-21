import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Table,
  Form,
  Button,
  Modal,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import "./include/css/Common.css";
import {
  BsSortDown,
  BsSortUp,
  BsChevronCompactDown,
  BsChevronCompactUp,
} from "react-icons/bs";
import PermissionModal from "./PermissionModal"; // 권한 추가 모달 컴포넌트 임포트
import {
  managerSelectAllBySearch,
  managerInsert,
  managerUpdate,
  managerDelete,
} from "./adminApi"; // adminAPI에서 함수 임포트
import ManagerFestivalAuth from "./ManagerFestivalAuth"; // 새로운 FestivalAuth 컴포넌트 임포트

const ManagerManage = () => {
  // 객체 배열 변수
  const [items, setItems] = useState([]);

  const getList = async (name) => {
    const data = await managerSelectAllBySearch(name);
    if (data !== null) {
      setItems(data);
    }
  };

  useEffect(() => {
    getList("");
  }, []);

  const [currentRow, setCurrentRow] = useState(null);
  const [newPermission, setNewPermission] = useState("");

  const name = useRef();
  const id = useRef();
  const pwd = useRef();
  const phone = useRef();
  const date = new Date().toISOString().split("T")[0];

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
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 매니저 추가 함수
  const handleInsert = async () => {
    const newManager = {
      name: name.current.value,
      id: id.current.value,
      pwd: pwd.current.value,
      phone: phone.current.value,
      regDate: date,
    };
    if (
      !name.current.value ||
      !id.current.value ||
      !pwd.current.value ||
      !phone.current.value
    ) {
      alert("모든 필드를 입력해야 합니다.");
      return;
    }
    await managerInsert(newManager);
    getList("");
    name.current.value = "";
    id.current.value = "";
    pwd.current.value = "";
    phone.current.value = "";
  };

  // 매니저 수정 함수
  const handleUpdate = async (no) => {
    const updatedManager = {
      no: no,
      id: document.getElementById(`id-${no}`).value,
      name: document.getElementById(`name-${no}`).value,
      pwd: document.getElementById(`pwd-${no}`).value,
      phone: document.getElementById(`phone-${no}`).value,
    };

    await managerUpdate(updatedManager);
    getList("");
  };

  // 매니저 삭제 함수
  const handleDelete = async () => {
    const selectedManagers = items.filter((item) => item.checked);
    if (selectedManagers.length === 0) {
      return alert("삭제할 매니저를 선택해주세요.");
    }
    const idsToDelete = selectedManagers.map((item) => item.no);
    await managerDelete(idsToDelete);
    getList("");
  };

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  // 권한 추가 모달 열기
  const handleShowAuthModal = (manager) => {
    setSelectedManager(manager);
    setShowAuthModal(true);
  };

  // 권한 추가 모달 닫기
  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
    setSelectedManager(null);
  };

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
        <Button className="btn btn-danger" onClick={handleDelete}>
          삭제
        </Button>
      </div>

      <Table bordered hover responsive className="admin-table table">
        <thead>
          <tr>
            <th
              className="text-bg-primary text-center"
              style={{ width: "80px" }}
            >
              <Form.Check checked={selectAll} onChange={handleSelectAll} />
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("no")}
              style={{ width: "80px" }}
            >
              NO
              {thName === "no" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("name")}
              style={{ width: "170px" }}
            >
              담당자
              {thName === "name" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("id")}
              style={{ width: "160px" }}
            >
              아이디
              {thName === "id" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              style={{ width: "160px" }}
            >
              비밀번호
            </th>
            <th
              className="text-bg-primary text-center"
              style={{ width: "160px" }}
            >
              전화번호
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("regDate")}
              style={{ width: "160px" }}
            >
              계정 생성일
              {thName === "regDate" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              style={{ width: "110px" }}
            >
              축제 권한
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
            <td className="align-content-center " style={{ width: "80px" }}>
              신규 추가
            </td>
            <td className="align-content-center" style={{ width: "80px" }}>
              -
            </td>
            <td className="align-content-center" style={{ width: "170px" }}>
              <Form.Control
                className="admin-table-td text-center"
                type="text"
                ref={name}
                placeholder="담당자"
                style={{ border: "none" }}
              />
            </td>
            <td className="align-content-center" style={{ width: "160px" }}>
              <Form.Control
                className="admin-table-td text-center"
                type="text"
                ref={id}
                placeholder="아이디"
                style={{ border: "none" }}
              />
            </td>
            <td className="align-content-center" style={{ width: "160px" }}>
              <Form.Control
                className="admin-table-td text-center"
                type="text"
                ref={pwd}
                placeholder="비밀번호"
                style={{ border: "none" }}
              />
            </td>
            <td className="align-content-center" style={{ width: "160px" }}>
              <Form.Control
                className="admin-table-td text-center"
                type="text"
                ref={phone}
                placeholder="전화번호"
                style={{ border: "none" }}
              />
            </td>
            <td className="align-content-center" style={{ width: "160px" }}>
              {date}
            </td>
            <td className="align-content-center" style={{ width: "110px" }}>
              -
            </td>
            <td className="align-content-center" style={{ width: "94.4px" }}>
              <Button className="btn btn-primary" onClick={handleInsert}>
                추가
              </Button>
            </td>
          </tr>

          {/* 데이터 행 */}
          {filteredItems.map((data, index) => (
            <tr key={data.no}>
              <td className="align-content-center" style={{ width: "80px" }}>
                <Form.Check
                  checked={data.checked || false}
                  onChange={() => handleCheckboxChange(data.no)}
                />
              </td>
              <td className="align-content-center" style={{ width: "80px" }}>
                {index + 1}
              </td>
              <td className="align-content-center" style={{ width: "170px" }}>
                <Form.Control
                  id={`name-${data.no}`}
                  className="admin-table-td text-center"
                  type="text"
                  defaultValue={data.name || ""}
                  style={{ border: "none" }}
                />
              </td>
              <td className="align-content-center" style={{ width: "160px" }}>
                <Form.Control
                  id={`id-${data.no}`}
                  className="admin-table-td text-center"
                  type="text"
                  defaultValue={data.id || ""}
                  style={{ border: "none" }}
                />
              </td>
              <td className="align-content-center" style={{ width: "160px" }}>
                <Form.Control
                  id={`pwd-${data.no}`}
                  className="admin-table-td text-center"
                  type="text"
                  defaultValue={data.pwd || ""}
                  style={{ border: "none" }}
                />
              </td>
              <td className="align-content-center" style={{ width: "160px" }}>
                <Form.Control
                  id={`phone-${data.no}`}
                  className="admin-table-td text-center"
                  type="text"
                  defaultValue={data.phone || ""}
                  style={{ border: "none" }}
                />
              </td>
              <td className="align-content-center" style={{ width: "160px" }}>
                {data.regDate || ""}
              </td>
              <td className="align-content-center " style={{ width: "110px" }}>
                <Button
                  className="btn btn-primary "
                  onClick={() => handleShowAuthModal(data)}
                >
                  권한관리
                </Button>
              </td>
              <td className="align-content-center" style={{ width: "94.4px" }}>
                <Button
                  className="btn btn-primary "
                  onClick={() => handleUpdate(data.no)}
                >
                  수정
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* FestivalAuth 모달 */}
      <Modal show={showAuthModal} onHide={handleCloseAuthModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>축제 권한 관리</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedManager && <ManagerFestivalAuth manager={selectedManager} />}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ManagerManage;
