import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./qnaInsert.css";
import { useNavigate } from "react-router-dom";

const QnaInsert = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

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

  return (
    <>
      <Header />
      <section className="QNAInsert-container">
        <div className="QNAInsert-page-title">
          <h3>Q&A 글 작성</h3>
        </div>

        <form className="QNAInsert-form" onSubmit={handleSubmit}>
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
            <button
              type="button"
              className="QNAInsert-btn QNAInsert-cancel"
              onClick={handleCancel}
            >
              취소
            </button>
            <button type="submit" className="QNAInsert-btn QNAInsert-submit">
              작성
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default QnaInsert;
