import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./qnaRead.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const QNARead = () => {
  const qnaDB = [
    {
      no: 1,
      title: "[Q&A] 질문 내용 1",
      content:
        "안녕하세요. 첫 번째 질문의 내용입니다. 답변을 기다리고 있습니다.",
      date: "2024.02.06",
    },
    {
      no: 2,
      title: "Q&A 질문 내용 2",
      content: "이곳은 두 번째 질문의 내용입니다. 다양한 의견을 기다립니다.",
      date: "2024.02.05",
    },
    {
      no: 3,
      title: "Q&A 질문 내용 3",
      content: "세 번째 질문입니다. 자세한 답변을 부탁드립니다.",
      date: "2024.02.04",
    },
  ];

  const [qnaRead, setQnaRead] = useState({});
  const param = useParams();
  const [replyVisible, setReplyVisible] = useState({});

  useEffect(() => {
    setQnaRead(qnaDB.find((item) => item.no === parseInt(param.no)));
  }, [param]);

  const toggleReply = (commentId) => {
    setReplyVisible((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <>
      <Header />
      <section className="QNARead-notice">
        <div className="QNARead-page-title">
          <div className="QNARead-container">
            <h3>Q&A</h3>
          </div>
        </div>

        <div className="QNARead-board-view">
          <div className="QNARead-container">
            {/* 목록으로 버튼 */}
            <div className="QNARead-btn-wrap">
              <Link to="/QNAList">
                <button className="QNARead-btn QNARead-btn-dark">
                  목록으로
                </button>
              </Link>
            </div>

            {/* 게시글 테이블 */}
            <table className="QNARead-board-table">
              <tbody>
                <tr>
                  <td colSpan="2" className="QNARead-view-title">
                    {qnaRead.title}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="QNARead-view-content">
                    <p>{qnaRead.content}</p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 등록일 */}
            <div className="QNARead-meta">
              <span className="QNARead-date">등록일: {qnaRead.date}</span>
            </div>

            {/* 수정,삭제 버튼 */}
            <div className="QNARead-btn-wrap">
              <Link to="/QnaReInsert">
                <button className="QNARead-btn QNARead-btn-dark">수정</button>
              </Link>
              <button className="QNARead-btn QNARead-btn-dark">삭제</button>
            </div>

            {/* 댓글 섹션 */}
            <div className="QNARead-comments-section">
              <h4>댓글</h4>

              {/* 댓글 입력 */}
              <div className="QNARead-comment-input">
                <textarea placeholder="댓글을 입력하세요." rows="2"></textarea>
                <button className="QNARead-comment-btn">등록</button>
              </div>

              {/* 댓글 목록 */}
              <div className="QNARead-comment-list">
                <div className="QNARead-comment">
                  <p>
                    <strong>사용자1:</strong> 좋은 질문이네요!
                  </p>
                  <button
                    className="QNARead-reply-toggle"
                    onClick={() => toggleReply(1)}
                  >
                    답글 달기
                  </button>
                </div>

                {/* 답글 입력창 (토글 기능 적용) */}
                <div
                  className={`QNARead-reply-input ${
                    replyVisible[1] ? "show" : ""
                  }`}
                >
                  <textarea
                    placeholder="답글을 입력하세요."
                    rows="1"
                  ></textarea>
                  <button className="QNARead-reply-btn">답글</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default QNARead;
