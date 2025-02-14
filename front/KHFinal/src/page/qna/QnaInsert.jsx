import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Context } from "../../Context";
import "./css/qnaInsert.css";

const QnaInsert = () => {
  const { getDarkMode, getDarkModeHover } = useContext(Context);
  const navigate = useNavigate();
  const [qna, setQna] = useState({
    title: "",
    content: "",
    eventNo: "",
  });
  const [festivalList, setFestivalList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/qna/festivalList")
      .then((res) => res.json())
      .then((data) => setFestivalList(data.eventList));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQna((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!qna.festival) {
      alert("축제를 선택해주세요");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/qna/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ 쿠키 자동 포함
        body: JSON.stringify(qna),
      });
      if (response.ok) navigate("/QnaList");
    } catch (error) {
      console.error("Error submitting Q&A", error);
    }
  };

  return (
    <>
      <Header className="QNA-header" />
      <Container className="QNA-insert-container">
        <h2 className={`QNA-title ${getDarkMode()}`}>Q&A 작성</h2>
        <div className="QNA-festival-container">
          <span className="QNA-festival-text">
            {qna.festival || "축제 선택 없음"}
          </span>
          <Button
            type="button"
            variant="none"
            className={`QNA-festival-btn ${getDarkModeHover()}`}
            onClick={() => setShowPopup(true)}
          >
            선택
          </Button>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="QNA-title-group">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={qna.title}
              onChange={handleChange}
              className="QNA-input"
              required
            />
          </Form.Group>
          <Form.Group className="QNA-content-group">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="content"
              value={qna.content}
              onChange={handleChange}
              className="QNA-textarea"
              required
            />
          </Form.Group>
          <div className="QNAInsert-button-container">
            <Button type="submit" className={`QNA-btn ${getDarkModeHover()}`}>
              등록
            </Button>
            <Button
              variant="none"
              className={`QNA-btn ${getDarkModeHover()}`}
              onClick={() => navigate("/QnaList")}
            >
              취소
            </Button>
          </div>
        </Form>
      </Container>
      <Footer className="QNA-footer" />
      {showPopup && (
        <div
          className="QNAInsert-popup-overlay"
          onClick={() => setShowPopup(false)}
        >
          <div className="QNAInsert-popup" onClick={(e) => e.stopPropagation()}>
            <h4>축제 선택</h4>
            <ul className="QNAInsert-festival-list">
              {festivalList.map((fest, index) => (
                <li
                  key={index}
                  className="QNAInsert-festival-item"
                  onClick={() => {
                    setQna({ ...qna, eventNo: fest.no, festival: fest.name });
                    setShowPopup(false);
                  }}
                >
                  {fest.name}
                </li>
              ))}
            </ul>
            <Button
              variant="none"
              className="QNAInsert-popup-close"
              onClick={() => setShowPopup(false)}
            >
              닫기
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default QnaInsert;
