import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import { Button, Container, Form, Pagination, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./css/qnaList.css";
import { getReply } from "./qnaApi";

const QNAList = () => {
  const { darkMode, setDarkMode, getDarkMode } = useContext(Context);
  const [qnaList, setQnaList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyTarget, setReplyTarget] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false); // 검색 모드 여부
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [selectedReply, setSelectedReply] = useState(""); // 선택한 답변
  const [isLoading, setIsLoading] = useState(false); // 로딩 중 여부
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 인증 여부
  // 📌 검색 입력 핸들러
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    setDarkMode(sessionStorage.getItem("darkMode") === "true");
    fetch("http://localhost:8080/qna/list")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return setQnaList(data);
      });
  }, [setDarkMode]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (!isSearchMode) {
      // loadNotices(page);
    }
  };

  const toggleAccordion = (index, no, eventNo) => {
    setOpenIndex(openIndex === index ? null : index);
    const getReplyData = async () => {
      setIsLoading(true);
      const response = await getReply(no);
      if (response.content === null) {
        setSelectedReply("등록된 답변이 없습니다.");
      }
      setSelectedReply(response.content);
      setIsLoading(false);
    };
    getReplyData();
  };

  const handleReplySubmit = () => {
    if (!replyText.trim() || replyTarget === null) {
      alert("답변을 입력하세요.");
      return;
    }

    const requestData = {
      qnaNo: replyTarget,
      content: replyText,
    };

    console.log("전송할 데이터:", requestData);

    fetch("http://localhost:8080/qna/reply", {
      method: "POST",
      credentials: "include", // 쿠키 포함 필수
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("서버 응답:", data);
        if (data.authenticated) {
          setReplyText("");
          setReplyTarget(null);
          alert("답변이 등록되었습니다.");
          window.location.reload();
        } else {
          alert("답변 등록 실패: " + data.message);
        }
      })
      .catch((error) => {
        console.error("오류 발생:", error);
        alert("서버 오류 발생");
      });
  };

  return (
    <>
      <Header className="QNA-header" />
      <section className="QNA-notice">
        <div className="QNA-title-container">
          <h3 className={`QNA-title ${getDarkMode()}`}>Q&A</h3>
        </div>
        <Container>
          {/* 검색창 */}
          <div className="Notice-header">
            <div className="Notice-board-search">
              <div className="Notice-search-window">
                <form action="">
                  <div className="Notice-search-wrap">
                    <label htmlFor="search" className="Notice-blind"></label>
                    <input
                      id="search"
                      type="search"
                      placeholder="검색어를 입력해주세요."
                      className="Notice-search-input"
                      value={searchTerm}
                      onChange={handleSearchChange} // 검색어 변경 시 업데이트
                    />
                    {isSearchMode ? (
                      <Button
                        variant={darkMode ? "outline-light" : "outline-dark"}
                        className="Notice-btn Notice-btn-dark"
                      >
                        검색 취소
                      </Button>
                    ) : (
                      <Button
                        variant={darkMode ? "outline-light" : "outline-dark"}
                        className="Notice-btn Notice-btn-dark"
                      >
                        검색
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="QNA-board-list">
            <table className="QNA-board-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>축제</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>등록일</th>
                </tr>
              </thead>
              <tbody>
                {qnaList.map((data, index) => (
                  <React.Fragment key={data.no}>
                    <tr
                      onClick={() =>
                        toggleAccordion(index, data.no, data.eventNo)
                      }
                    >
                      <td>{data.no}</td>
                      <td>{data.eventName}</td>
                      <td>{data.title}</td>
                      <td>{data.userName}</td>
                      <td>{data.subDate}</td>
                    </tr>
                    {openIndex === index && (
                      <tr>
                        <td colSpan="5">
                          <div>
                            <strong>게시글 내용:</strong>
                            <p>{data.content}</p>

                            <strong>답변:</strong>
                            {isLoading ? (
                              <div className="d-flex justify-content-center my-4">
                                <Spinner animation="border" role="status">
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </Spinner>
                              </div>
                            ) : (
                              <p>
                                {selectedReply || "등록된 답변이 없습니다."}
                              </p>
                            )}
                          </div>
                          {isAuthenticated && (
                            <div className="QNA-reply-input">
                              <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="답변을 입력하세요..."
                                value={replyText}
                                onChange={(e) => {
                                  setReplyText(e.target.value);
                                  setReplyTarget(data.no);
                                }}
                                className="QNA-reply-textarea"
                              />
                              <Button
                                onClick={handleReplySubmit}
                                variant={
                                  darkMode ? "outline-light" : "outline-dark"
                                }
                                className="QNA-reply-submit"
                              >
                                답변 등록
                              </Button>
                            </div>
                          )}
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
      {/* 페이지네이션 (검색 모드가 아닐 때만 표시) */}
      {!isSearchMode && totalPages > 1 && (
        <Pagination className={`justify-content-center mt-4 ${getDarkMode()}`}>
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </Pagination>
      )}
      <Footer className="QNA-footer" />
    </>
  );
};

export default QNAList;
