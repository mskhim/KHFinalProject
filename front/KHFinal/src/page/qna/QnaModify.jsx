import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "react-bootstrap";
import "./css/qnaModify.css";

const QnaModify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const qnaData = location.state?.qnaRead || {};
  const [form, setForm] = useState({
    id: qnaData.id,
    title: qnaData.title,
    content: qnaData.content,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8080/qna/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    navigate("/QNAList");
  };

  return (
    <>
      <Header />
      <section className="QNARead-notice">
        <div className="QNARead-page-title">
          <h3>게시글 수정</h3>
        </div>
        <form className="QNARead-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
          />
          <div className="QNARead-btn-wrap">
            <Button type="submit">수정 완료</Button>
            <Button onClick={() => navigate("/QNAList")}>취소</Button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default QnaModify;
