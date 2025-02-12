import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./qnaList.css";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import { Button, Container, Form, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const QNAList = () => {
  const { darkMode, setDarkMode, getDarkMode } = useContext(Context);

  useEffect(() => {
    setDarkMode(sessionStorage.getItem("darkMode") === "true");
  }, [darkMode, setDarkMode]);

  const qna = [
    {
      no: 1,
      festival: "강릉 단오제",
      title: "[Q&A] 질문 내용 1",
      author: "홍길동",
      date: "2024.02.06",
      content:
        "이 게시글은 강릉 단오제에 대한 질문입니다. 상세 내용을 확인해 주세요.",
      reply: "답변 내용이 여기에 표시됩니다.",
    },
    {
      no: 2,
      festival: "진주 남강 유등축제",
      title: "Q&A 질문 내용 2",
      author: "저길동",
      date: "2024.02.05",
      content:
        "진주 남강 유등축제 관련 문의 게시글입니다. 관련 정보가 필요합니다.",
      reply: "답변 내용이 여기에 표시됩니다.",
    },
    {
      no: 3,
      festival: "부산 국제 영화제",
      title: "Q&A 질문 내용 3",
      author: "이길동",
      date: "2024.02.04",
      content: "부산 국제 영화제에 대해 궁금한 사항을 남깁니다.",
      reply: "답변 내용이 여기에 표시됩니다.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const [replyText, setReplyText] = useState("");

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Header className="QNA-header" />
      <section className="QNA-notice">
        {/* Q&A 제목 */}
        <div className="QNA-title-container">
          <h3 className={`QNA-title ${getDarkMode()}`}>Q&A</h3>
        </div>

        <Container>
          {/* 검색창 */}
          <div className="QNA-header">
            <div className="QNA-board-search">
              <div className="QNA-search-window">
                <form action="">
                  <div className="QNA-search-wrap">
                    <label htmlFor="search" className="QNA-blind"></label>
                    <input
                      id="search"
                      type="search"
                      placeholder="검색어를 입력해주세요."
                      className="QNA-search-input"
                    />
                    <Button
                      variant={darkMode ? "outline-light" : "outline-dark"}
                      className="QNA-btn QNA-btn-dark"
                    >
                      검색
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="QNA-board-list">
            <div className="QNA-container">
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
                  {qna.map((data, index) => (
                    <React.Fragment key={data.no}>
                      <tr
                        onClick={() => toggleAccordion(index)}
                        className="QNA-accordion-toggle"
                      >
                        <td className="QNA-td-num">{data.no}</td>
                        <td className="QNA-td-festival">{data.festival}</td>
                        <td className="QNA-td-title">
                          <Link
                            to={`/QnaRead/${data.no}`}
                            className={getDarkMode()}
                          >
                            {data.title}
                          </Link>
                        </td>
                        <td className="QNA-td-author">{data.author}</td>
                        <td className="QNA-td-date">{data.date}</td>
                      </tr>
                      {openIndex === index && (
                        <tr>
                          <td colSpan="5" className="QNA-reply">
                            <div className="QNA-reply-content">
                              <strong>게시글 내용:</strong>
                              <p>{data.content}</p>
                              <strong>답변:</strong>
                              <p>{data.reply}</p>
                            </div>

                            {/* ✅ 답변 입력 영역 */}
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
          </div>
        </Container>
      </section>

      {/* 글쓰기 버튼 */}
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

      {/* 페이지네이션 */}
      <Pagination
        className={`EventListViewWrap-custom-pagination justify-content-center mt-4 ${getDarkMode()}`}
      >
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </Pagination>
      <Footer className="QNA-footer" />
    </>
  );
};

export default QNAList;
