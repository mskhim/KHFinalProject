import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import { Button, Container, Form, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./css/qnaList.css";

const QNAList = () => {
  const { darkMode, setDarkMode, getDarkMode } = useContext(Context);
  const [qnaList, setQnaList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    setDarkMode(sessionStorage.getItem("darkMode") === "true");
    fetch("http://localhost:8080/qna/list")
      .then((res) => res.json())
      .then((data) => setQnaList(data));
  }, [setDarkMode]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header className="QNA-header" />
      <section className="QNA-notice">
        <div className="QNA-title-container">
          <h3 className={`QNA-title ${getDarkMode()}`}>Q&A</h3>
        </div>
        <Container>
          <div className="QNA-board-list">
            <table className="QNA-board-table">
              <thead>
                <tr>
                  <th className="QNA-th-num">번호</th>
                  <th className="QNA-th-festival">축제</th>
                  <th className="QNA-th-title">제목</th>
                  <th className="QNA-th-author">작성자</th>
                  <th className="QNA-th-date">등록일</th>
                </tr>
              </thead>
              <tbody>
                {qnaList.map((data, index) => (
                  <React.Fragment key={data.no}>
                    <tr
                      onClick={() => toggleAccordion(index)}
                      className="QNA-accordion-toggle"
                    >
                      <td className="QNA-td-num">{data.no}</td>
                      <td className="QNA-td-festival">{data.eventName}</td>
                      <td className="QNA-td-title">{data.title}</td>
                      <td className="QNA-td-author">{data.userName}</td>
                      <td className="QNA-td-date">{data.subDate}</td>
                    </tr>
                    {openIndex === index && (
                      <tr>
                        <td colSpan="5" className="QNA-reply">
                          <div className="QNA-reply-content">
                            <strong>게시글 내용:</strong>
                            <p>{data.content}</p>
                            <strong>답변:</strong>
                            <p>{data.reply || "등록된 답변이 없습니다."}</p>
                          </div>
                          <div className="QNA-reply-input">
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="답변을 입력하세요..."
                              className="QNA-reply-textarea"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                            <Button
                              variant={
                                darkMode ? "outline-light" : "outline-dark"
                              }
                              className="QNA-reply-submit"
                            >
                              답변 등록
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
      <div className="QNA-write-button-container">
        <Link to="/QnaInsert">
          <Button
            variant={darkMode ? "outline-light" : "outline-dark"}
            className="QNA-btn QNA-btn-dark"
          >
            글쓰기
          </Button>
        </Link>
      </div>
      <Footer className="QNA-footer" />
    </>
  );
};

export default QNAList;
