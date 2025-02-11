import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./qnaModify.css";
import { Button } from "react-bootstrap";

const QnaModify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const qnaData = location.state?.qnaRead || {
    title: "Q&A 질문 제목",
    festival: "강릉 단오제",
    author: "홍길동",
    date: "2024.02.06",
    content: "기존 게시글 내용입니다.",
  };

  const [content, setContent] = useState(qnaData.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("수정된 내용:", content);
    navigate("/QNAList");
  };

  return (
    <>
      <Header />
      <section className="QNARead-notice">
        <div className="QNARead-page-title">
          <h3>게시글 수정</h3>
        </div>

        <div className="QNARead-container">
          <p className="festival-name">축제이름: {qnaData.festival}</p>
        </div>

        <form className="QNARead-form" onSubmit={handleSubmit}>
          <table className="QNARead-board-table">
            <tbody>
              <tr>
                <td className="QNARead-view-title">
                  <input
                    type="text"
                    value={qnaData.title}
                    disabled
                    className="QNARead-input-disabled"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <textarea
                    className="QNARead-content-input"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="QNARead-meta">
            <span>
              작성자: {qnaData.author} | 등록일: {qnaData.date}
            </span>
          </div>

          <div className="QNARead-btn-wrap">
            <Button type="submit" className="QNARead-btn">
              수정 완료
            </Button>
            <Button
              onClick={() => navigate("/QNAList")}
              className="QNARead-btn"
            >
              취소
            </Button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default QnaModify;
