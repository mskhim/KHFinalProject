import React, { useState, useEffect } from "react";
import { Form, Button, Table, Container } from "react-bootstrap";
import "./include/css/Common.css";
import {
  managerFestivalAuthSellectAll,
  addFestivalAuth,
  deleteFestivalAuth,
  publicDataEventSellectAll,
} from "./adminApi"; // API 함수 임포트

const ManagerFestivalAuth = ({ manager }) => {
  const [authList, setAuthList] = useState([]);
  const [festivalList, setFestivalList] = useState([]);
  const [selectedFestival, setSelectedFestival] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // 매니저의 축제 권한 리스트 가져오기
    const fetchAuthList = async () => {
      const data = await managerFestivalAuthSellectAll(manager.no);
      setAuthList(data);
    };

    fetchAuthList();
  }, [manager.no]);

  useEffect(() => {
    // 축제 리스트 가져오기
    const fetchFestivalList = async () => {
      const data = await publicDataEventSellectAll();
      if (data !== null) {
        // authList에 없는 축제만 필터링
        const filteredFestivals = data.filter(
          (festival) =>
            !authList.some((auth) => auth.publicDataEventNo === festival.no)
        );
        setFestivalList(filteredFestivals);
      }
    };

    fetchFestivalList();
  }, [authList]);

  const filteredFestivalList = festivalList.filter((festival) =>
    festival.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 축제 권한 추가 핸들러
  const handleAddAuth = async () => {
    await addFestivalAuth(manager.no, selectedFestival);
    const updatedAuthList = await managerFestivalAuthSellectAll(manager.no);
    setAuthList(updatedAuthList);
    setSelectedFestival(""); // 축제 선택 초기화
  };

  // 축제 권한 삭제 핸들러
  const handleDeleteAuth = async (authNo) => {
    await deleteFestivalAuth(authNo);
    const updatedAuthList = await managerFestivalAuthSellectAll(manager.no);
    setAuthList(updatedAuthList);
  };

  return (
    <Container>
      <Form.Group className="mb-3">
        <Form.Label>매니저: {manager.name}</Form.Label>
      </Form.Group>

      <Form.Group className="mb-3">
        <Container className="d-flex p-0 m-0">
          <Form.Control
            type="text"
            placeholder="축제 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="me-2"
          />
          <Form.Control
            as="select"
            value={selectedFestival}
            onChange={(e) => setSelectedFestival(e.target.value)}
            className="me-2"
          >
            <option value="">축제 선택</option>
            {filteredFestivalList.map((festival) => (
              <option key={festival.no} value={festival.no}>
                {festival.name}
              </option>
            ))}
          </Form.Control>
          <Button
            variant="primary"
            onClick={handleAddAuth}
            style={{ width: "200px" }}
          >
            권한 추가
          </Button>
        </Container>
      </Form.Group>
      <Table bordered hover className="admin-table mt-3">
        <thead>
          <tr>
            <th
              className="text-center align-content-center"
              style={{ width: "70px" }}
            >
              NO
            </th>
            <th
              className="text-center align-content-center"
              style={{ width: "275px" }}
            >
              축제 이름
            </th>
            <th className="text-center align-content-center">권한 삭제</th>
          </tr>
        </thead>
        <tbody>
          {authList.map((auth, index) => (
            <tr key={auth.no}>
              <td
                className="text-center align-content-center"
                style={{ width: "70px" }}
              >
                {index + 1}
              </td>
              <td
                className="text-center align-content-center"
                style={{ width: "275px" }}
              >
                {auth.eventName}
              </td>
              <td className="text-center align-content-center">
                <Button
                  variant="danger"
                  onClick={() => handleDeleteAuth(auth.no)}
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

export default ManagerFestivalAuth;
