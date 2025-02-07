import React, { useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import "./include/css/Common.css";
import { BsSortDown, BsSortUp } from "react-icons/bs";

const FestivalManage = () => {
  // 객체 배열 변수
  const [items, setItems] = useState([
    {
      no: 1,
      name: "2025 해돋이 행사",
      place: "경포해변+정동진",
      content: "해돋이 행사",
      start_date: "2025-01-01",
      end_date: "2025-01-01",
      phone: "033-640-5130",
      homepage: "",
      manager_name: "강원특별자치도 강릉시청",
    },
    {
      no: 2,
      name: "천을산 해맞이",
      place: "천을산 정상",
      content: "신년메세지, 해오름 퍼포먼스 등",
      start_date: "2025-01-01",
      end_date: "2025-01-01",
      phone: "053-666-2163",
      homepage: "https://www.suseong.kr",
      manager_name: "대구광역시 수성구청",
    },
    {
      no: 3,
      name: "해맞이축제",
      place: "와룡산 상리봉+계성고 옆 등산로 초입",
      content: "전통문화공연,  성악공연,  해맞이 퍼포먼스,  떡국나눔",
      start_date: "2025-01-01",
      end_date: "2025-01-01",
      phone: "053-663-2181",
      homepage: "http://www.dgs.go.kr/tour/",
      manager_name: "대구광역시 서구청",
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
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
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

      <Table bordered hover responsive className="admin-table ">
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
              style={{ width: "150px" }}
            >
              축제명
              {thName === "name" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              style={{ width: "150px" }}
            >
              개최 장소
            </th>
            <th
              className="text-bg-primary text-center"
              style={{ width: "150px" }}
            >
              세부 내용
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("start_date")}
              style={{ width: "130px" }}
            >
              개최일
              {thName === "start_date" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("end_date")}
              style={{ width: "130px" }}
            >
              폐막일
              {thName === "end_date" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              style={{ width: "130px" }}
            >
              담당자 번호
            </th>
            <th
              className="text-bg-primary text-center"
              style={{ width: "130px" }}
            >
              홈페이지
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort("manager_name")}
              style={{ width: "140px" }}
            >
              축제 담당자
              {thName === "manager_name" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
          </tr>
        </thead>
        <tbody>
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
              <td style={{ width: "90px" }}>{data.no}</td>
              <td style={{ width: "150px" }}>{data.name}</td>
              <td style={{ width: "150px" }}>{data.place}</td>
              <td style={{ width: "150px" }}>{data.content}</td>
              <td style={{ width: "130px" }}>{data.start_date}</td>
              <td style={{ width: "130px" }}>{data.end_date}</td>
              <td style={{ width: "130px" }}>{data.phone}</td>
              <td style={{ width: "130px" }}>{data.homepage}</td>
              <td style={{ width: "123px" }}>{data.manager_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FestivalManage;
