import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Notice.css";
import { Link } from "react-router-dom";
import { Context } from "../../Context";
import { useContext } from "react";

const NoticeList = () => {
  const { getDarkMode } = useContext(Context);
  return (
    <>
      <Header />
      <section className="Notice-notice">
        <div className="Notice-page-title">
          <div className="Notice-container">
            <h3>공지사항</h3>
          </div>
        </div>

        <div className="Notice-board-search">
          <div className="Notice-container">
            <div className="Notice-search-window">
              <form action="">
                <div className="Notice-search-wrap">
                  <label htmlFor="search" className="Notice-blind">
                    공지사항 내용 검색
                  </label>
                  <input
                    id="search"
                    type="search"
                    placeholder="검색어를 입력해주세요."
                  />
                  <button
                    onClick
                    type="submit"
                    className="Notice-btn Notice-btn-dark"
                  >
                    검색
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="Notice-board-list">
          <div className="Notice-container">
            <table className="Notice-board-table">
              <thead>
                <tr>
                  <th scope="col" className="Notice-th-num">
                    번호
                  </th>
                  <th scope="col" className="Notice-th-title">
                    제목
                  </th>
                  <th scope="col" className="Notice-th-date">
                    등록일
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <th>
                    <Link to="/noticeRead/1" className={getDarkMode()}>
                      [공지사항] 개인정보 처리방침 변경안내
                    </Link>
                    <p>테스트</p>
                  </th>
                  <td>2017.07.13</td>
                </tr>
                <tr>
                  <td>2</td>
                  <th>
                    <Link to="" className={getDarkMode()}>
                      공지사항 안내입니다. 이용해주셔서 감사합니다
                    </Link>
                  </th>
                  <td>2017.06.15</td>
                </tr>
                <tr>
                  <td>3</td>
                  <th>
                    <Link to="" className={getDarkMode()}>
                      공지사항 안내입니다. 이용해주셔서 감사합니다
                    </Link>
                  </th>
                  <td>2017.06.15</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="Notice-main-btn">
            <button className="Notice-main-btn Notice-main-btn-dark">
              글쓰기
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NoticeList;
