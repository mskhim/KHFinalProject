import React, { useState, useEffect } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import "./include/css/Common.css";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import {
  insertBanner,
  deleteBanner,
  bannerSellectAll,
  eventSellectAll,
} from "./adminApi";
import {
  uploadImageToFirebase,
  deleteImageFromFirebase,
} from "../../utils/firebaseUtils";

const BannerManage = () => {
  // 객체 배열 변수
  const [items, setItems] = useState([]);
  const [festivalList, setFestivalList] = useState([]);
  const [selectedFestival, setSelectedFestival] = useState("");
  const [file, setFile] = useState(null);

  const getList = async () => {
    const data = await bannerSellectAll();
    if (data !== null) {
      setItems(data);
    }
  };

  useEffect(() => {
    getList();
    const fetchFestivalList = async () => {
      const data = await eventSellectAll();
      if (data !== null) {
        setFestivalList(data);
      }
    };
    fetchFestivalList();
  }, []);

  // 정렬할 컬럼 이름
  const [thName, setthName] = useState("");
  // 정렬 순서
  const [sortOrder, setSortOrder] = useState("asc");
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

  // ✅ 배너 추가 핸들러
  const handleAddBanner = async (e) => {
    e.preventDefault();
    if (!selectedFestival || !file) {
      alert("모든 필드를 입력해야 합니다.");
      return;
    }
    try {
      const url = await uploadImageToFirebase(file, "banners");
      const formData = { eventName: selectedFestival, url };
      const success = await insertBanner(formData);
      if (success) {
        alert("배너가 추가되었습니다.");
        getList(); // 배너 목록 갱신
      }
    } catch (error) {
      console.error("배너 추가 중 오류 발생:", error);
    }
  };

  // ✅ 배너 삭제 핸들러
  const handleDeleteBanner = async (bannerId, imageUrl) => {
    try {
      const success = await deleteBanner(bannerId);

      if (success) {
        await deleteImageFromFirebase(imageUrl);
        alert("배너가 삭제되었습니다.");
        getList(); // 배너 목록 갱신
      }
    } catch (error) {
      console.error("배너 삭제 중 오류 발생:", error);
    }
  };

  return (
    <Container className="admin-page text-center">
      <div className="text-end">
        <span style={{ color: "red" }}>
          ※ 권장 이미지 비율 : 가로 = 1850, 세로 = 950
        </span>
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
              onClick={() => handleSort("event_name")}
              style={{ width: "200px" }}
            >
              축제명
              {thName === "event_name" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              style={{ width: "200px" }}
            >
              파일 경로
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              onClick={() => handleSort("sub_date")}
              style={{ width: "200px" }}
            >
              등록일
              {thName === "sub_date" &&
                (sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center align-content-center"
              style={{ width: "110px", paddingRight: "34px" }}
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
              -
            </td>
            <td className="align-content-center" style={{ width: "200px" }}>
              <Form.Control
                as="select"
                name="eventName"
                value={selectedFestival}
                onChange={(e) => setSelectedFestival(e.target.value)}
                className="me-2"
              >
                <option value="">축제 선택</option>
                {festivalList.map((festival) => (
                  <option key={festival.no} value={festival.name}>
                    {festival.name}
                  </option>
                ))}
              </Form.Control>
            </td>
            <td className="align-content-center" style={{ width: "200px" }}>
              <Form.Control
                name="file"
                className="admin-table-td text-center"
                type="file"
                placeholder="파일경로"
                style={{ border: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </td>
            <td className="align-content-center" style={{ width: "200px" }}>
              {date}
            </td>
            <td className="align-content-center" style={{ width: "99.5px" }}>
              <Button className="btn btn-primary" onClick={handleAddBanner}>
                추가
              </Button>
            </td>
          </tr>

          {/* 데이터 행 */}
          {items.map((data, index) => (
            <tr key={data.no}>
              <td
                className="text-center align-content-center"
                style={{ width: "90px" }}
              >
                {index + 1}
              </td>
              <td className="align-content-center" style={{ width: "200px" }}>
                {data.eventName}
              </td>
              <td className="align-content-center" style={{ width: "200px" }}>
                <img
                  src={data.url}
                  alt={data.eventName}
                  style={{ width: "100%" }}
                />
              </td>
              <td className="align-content-center" style={{ width: "200px" }}>
                {data.subDate}
              </td>
              <td className="align-content-center" style={{ width: "99.5px" }}>
                <Button
                  className="btn btn-danger"
                  onClick={() => handleDeleteBanner(data.no, data.url)}
                >
                  삭제
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BannerManage;
