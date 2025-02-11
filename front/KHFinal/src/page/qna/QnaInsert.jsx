import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./qnaInsert.css";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { Context } from "../../Context";

const QnaInsert = () => {
  const { darkMode, setDarkMode } = useContext(Context);

  useEffect(() => {
    setDarkMode(sessionStorage.getItem("darkMode") === "true");
  }, [darkMode, setDarkMode]);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    festival: "축제를 선택해주세요",
  });

  const [showPopup, setShowPopup] = useState(false); // 팝업 상태

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    navigate("/QNAList");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("작성된 글:", form);
    navigate("/QNAList");
  };

  const handleSelectFestival = (festival) => {
    setForm({ ...form, festival });
    setShowPopup(false);
  };

  return (
    <>
      <Header />
      <section className="QNAInsert-container">
        <div className="QNAInsert-page-title">
          <h3>Q&A 글 작성</h3>
        </div>

        <form className="QNAInsert-form" onSubmit={handleSubmit}>
          {/* 축제 선택 */}
          <div className="QNAInsert-festival-container">
            <span className="QNAInsert-festival-text">{form.festival}</span>
            <Button
              variant={darkMode ? "outline-light" : "outline-dark"}
              className="QNAInsert-search-btn"
              onClick={() => setShowPopup(true)}
            >
              검색
            </Button>
          </div>

          {/* 제목 입력 */}
          <input
            type="text"
            name="title"
            placeholder="제목을 입력하세요."
            className="QNAInsert-title"
            value={form.title}
            onChange={handleChange}
            required
          />

          {/* 본문 입력 */}
          <textarea
            name="content"
            placeholder="내용을 입력하세요."
            className="QNAInsert-content"
            value={form.content}
            onChange={handleChange}
            required
          />

          {/* 버튼 */}
          <div className="QNAInsert-btn-wrap">
            <Button
              variant={darkMode ? "outline-light" : "outline-dark"}
              className="QNAInsert-btn QNAInsert-cancel"
              onClick={handleCancel}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant={darkMode ? "outline-light" : "outline-dark"}
              className="QNAInsert-btn QNAInsert-submit"
            >
              작성
            </Button>
          </div>
        </form>
      </section>
      <Footer />

      {/* 축제 검색 팝업 */}
      <Modal
        show={showPopup}
        onHide={() => setShowPopup(false)}
        centered
        dialogClassName="QNAInsert-popup"
      >
        <Modal.Header closeButton>
          <Modal.Title>축제 검색</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="QNAInsert-festival-list">
            {["축제1", "축제2", "축제3"].map((festival) => (
              <li
                key={festival}
                className="QNAInsert-festival-item"
                onClick={() => handleSelectFestival(festival)}
              >
                {festival}
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default QnaInsert;
