import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./noticeRead.css";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Context } from "../../Context";

const NoticeRead = () => {
  const { darkMode, setDarkMode } = useContext(Context);

  useEffect(() => {
    setDarkMode(sessionStorage.getItem("darkMode") === "true");
  }, [darkMode, setDarkMode]);
  const noticeDB = [
    {
      no: 1,
      title: "[공지사항] 개인정보 처리방침 변경안내",
      content:
        "안녕하세요. 개인정보 처리방침이 변경되었습니다. 새로운 정책을 확인하시고 이용해주시기 바랍니다.",
      date: "2017.07.13",
    },
    {
      no: 2,
      title: "공지사항 안내입니다. 이용해주셔서 감사합니다",
      content:
        "안녕하세요. 공지사항 안내입니다. 이용해주셔서 감사합니다. 공지사항 안내입니다. 이용해주셔서 감사합니다.",
      date: "2017.06.15",
    },
    {
      no: 3,
      title: "공지사항 안내입니다. 이용해주셔서 감사합니다 테스트입니다.",
      content: "안녕하세요. 테스트입니다.",
      date: "2017.06.15",
    },
  ];

  const [noticeRead, setNoticeRead] = useState({});
  const param = useParams();

  useEffect(() => {
    setNoticeRead(noticeDB.find((item) => item.no === parseInt(param.no)));
  }, [param]);

  return (
    <>
      <Header />
      <section className="NoticeRead-notice">
        <div className="NoticeRead-page-title">
          <div className="NoticeRead-container">
            <h3>공지사항</h3>
          </div>
        </div>

        <div className="NoticeRead-board-view">
          <div className="NoticeRead-container">
            {/* 목록으로 버튼 */}
            <div className="NoticeRead-btn-wrap">
              <Link to="/NoticeList">
                <Button
                  variant={darkMode ? "outline-light" : "outline-dark"}
                  className="NoticeRead-btn NoticeRead-btn-dark"
                >
                  목록으로
                </Button>
              </Link>
            </div>

            {/* 게시글 테이블 */}
            <table className="NoticeRead-board-table">
              <tbody>
                <tr>
                  <td colSpan="2" className="NoticeRead-view-title">
                    {noticeRead.title}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="NoticeRead-view-content">
                    <p>{noticeRead.content}</p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 등록일 */}
            <div className="NoticeRead-meta">
              <span className="NoticeRead-date">등록일: {noticeRead.date}</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NoticeRead;
