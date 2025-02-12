import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./qnaRead.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Context } from "../../Context";

const QNARead = () => {
  const { darkMode, setDarkMode } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    setDarkMode(sessionStorage.getItem("darkMode") === "true");
  }, [darkMode, setDarkMode]);

  const qnaDB = [
    {
      no: 1,
      title: "[Q&A] 질문 내용 1",
      festival: "강릉 단오제",
      author: "홍길동",
      content:
        "안녕하세요. 첫 번째 질문의 내용입니다. 답변을 기다리고 있습니다.",
      date: "2024.02.06",
    },
    {
      no: 2,
      title: "Q&A 질문 내용 2",
      festival: "진주 남강 유등축제",
      content: "두 번째 질문의 내용입니다. 답변을 기다리고 있습니다.",
      date: "2024.02.05",
    },
    {
      no: 3,
      title: "Q&A 질문 내용 3",
      festival: "부산 국제 영화제",
      content: "세 번째 질문의 내용입니다. 답변을 기다리고 있습니다.",
      date: "2024.02.04",
    },
  ];

  const [qnaRead, setQnaRead] = useState({});
  const param = useParams();

  useEffect(() => {
    const selectedPost = qnaDB.find((item) => item.no === parseInt(param.no));
    setQnaRead(selectedPost || {});
  }, [param]);

  return (
    <>
      <Header />
      <section className="QNARead-notice">
        <div className="QNARead-page-title">
          <h3>Q&A</h3>
        </div>

        <div className="QNARead-container">
          <p className="festival-name">축제이름: {qnaRead.festival}</p>
        </div>

        <div className="QNARead-board-view">
          <div className="QNARead-container">
            <table className="QNARead-board-table">
              <tbody>
                <tr>
                  <td className="QNARead-view-title">{qnaRead.title}</td>
                </tr>
                <tr>
                  <td className="QNARead-view-content">{qnaRead.content}</td>
                </tr>
              </tbody>
            </table>

            <div className="QNARead-meta">
              <span>
                작성자: {qnaRead.author} | 등록일: {qnaRead.date}
              </span>
            </div>

            <div className="QNARead-btn-wrap">
              <Button
                variant={darkMode ? "outline-light" : "outline-dark"}
                className="QNARead-btn"
                onClick={() => navigate(`/QnaModify/`, { state: { qnaRead } })}
              >
                수정
              </Button>
              <Button
                variant={darkMode ? "outline-light" : "outline-dark"}
                className="QNARead-btn"
              >
                삭제
              </Button>
              <Link to="/QNAList">
                <Button
                  variant={darkMode ? "outline-light" : "outline-dark"}
                  className="QNARead-btn"
                >
                  목록으로
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default QNARead;
