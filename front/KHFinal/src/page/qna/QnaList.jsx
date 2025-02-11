import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./qnaList.css";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import { Button, Pagination } from "react-bootstrap";
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
      reply: "답변내용",
    },
    {
      no: 2,
      festival: "진주 남강 유등축제",
      title: "Q&A 질문 내용 2",
      author: "저길동",
      date: "2024.02.05",
      reply: "답변내용",
    },
    {
      no: 3,
      festival: "부산 국제 영화제",
      title: "Q&A 질문 내용 3",
      author: "이길동",
      date: "2024.02.04",
      reply: "답변내용",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Header />
      <section className={`QNA-notice ${darkMode ? "dark-mode" : ""}`}>
        <div className="QNA-title-container">
          <h3 className="QNA-title">Q&A</h3>
        </div>
        <div className="QNA-table-container">
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
              {qna.map((data) => (
                <React.Fragment key={data.no}>
                  <tr>
                    <td>{data.no}</td>
                    <td>{data.festival}</td>
                    <td>
                      <Link
                        to={`/QnaRead/${data.no}`}
                        className="QNA-title-link"
                      >
                        {data.title}
                      </Link>
                    </td>
                    <td>{data.author}</td>
                    <td>{data.date}</td>
                  </tr>
                  {data.reply && (
                    <tr>
                      <td colSpan="5" className="QNA-reply">
                        ㄴ {data.reply}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className="QNA-write-button-container">
        <Link to="/QnaInsert">
          <Button
            variant={darkMode ? "outline-light" : "outline-dark"}
            className="Notice-btn Notice-btn-dark"
          >
            글쓰기
          </Button>
        </Link>
      </div>
      <Pagination
        className={`EventListViewWrap-custom-pagination justify-content-center mt-4 ${getDarkMode()}`}
        variant="dark"
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
      <Footer />
    </>
  );
};

export default QNAList;
