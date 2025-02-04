import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./noticeRead.css";
import { Link } from "react-router-dom";

const NoticeRead = () => {
  return (
    <>
      <Header />
      <section className="NoticeRead-notice">
        <div className="NoticeRead-page-title">
          <div className="NoticeRead-container">
            <h3>
              <Link to="/NoticeList">공지사항</Link>
            </h3>
          </div>
        </div>

        <div className="NoticeRead-board-view">
          <div className="NoticeRead-container">
            {/* 목록으로 버튼 */}
            <div className="NoticeRead-btn-wrap">
              <button className="NoticeRead-btn Notice-btn-dark">
                목록으로
              </button>
            </div>

            {/* 게시글 테이블 */}
            <table className="NoticeRead-board-table">
              <tbody>
                <tr>
                  <td colSpan="2" className="NoticeRead-view-title">
                    [공지사항] 개인정보 처리방침 변경안내
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="NoticeRead-view-content">
                    <p>
                      안녕하세요. 개인정보 처리방침이 변경되었습니다. 새로운
                      정책을 확인하시고 이용해주시기 바랍니다.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 등록일 및 수정/삭제 버튼 */}
            <div className="NoticeRead-meta">
              <span className="NoticeRead-date">등록일: 2025-02-05</span>
              <div className="NoticeRead-btn-group">
                <button className="NoticeRead-btn NoticeRead-btn-light">
                  수정
                </button>
                <button className="NoticeRead-btn NoticeRead-btn-dark">
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NoticeRead;
