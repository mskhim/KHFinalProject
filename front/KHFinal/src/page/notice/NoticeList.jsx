import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './notice.css';
import { Link } from 'react-router-dom';
import { Context } from '../../Context';
import { useContext, useEffect, useState } from 'react';
import { Pagination, Button } from 'react-bootstrap';
import { fetchNotices } from './noticeApi';

const NoticeList = () => {
  const { darkMode, setDarkMode, getDarkMode, getDarkModeHover } =
    useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const [notices, setNotices] = useState([]); //공지사항 데이터 상태

  useEffect(() => {
    setDarkMode(sessionStorage.getItem('darkMode') === 'true');
    const loadNotices = async () => {
      const data = await fetchNotices(); // 공지사항 데이터 가져오기
      setNotices(data);
    };

    loadNotices();
  }, [darkMode, setDarkMode]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      console.log(`Fetching data for page: ${page}`);
    }
  };

  return (
    <>
      <Header className="Notice-header" />
      <section className="Notice-notice">
        {/* 공지사항 제목 */}
        <div className="Notice-title-container">
          <h3 className={`Notice-title ${getDarkMode()}`}>공지사항</h3>
        </div>

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
                  />
                  <Button
                    variant={darkMode ? 'outline-light' : 'outline-dark'}
                    className="Notice-btn Notice-btn-dark"
                  >
                    검색
                  </Button>
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
                  <th className="Notice-th-num">번호</th>
                  <th className="Notice-th-title">제목</th>
                  <th className="Notice-th-date">등록일</th>
                </tr>
              </thead>
              <tbody>
                {notices.length > 0 ? (
                  notices.map((data) => (
                    <tr key={data.no}>
                      <td>{data.no}</td>
                      <td className="Notice-td-title">
                        <Link
                          to={`/noticeRead/${data.no}`}
                          className={getDarkMode()}
                        >
                          {data.title}
                        </Link>
                      </td>
                      <td>{data.subDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center' }}>
                      불러올 공지사항이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Pagination
        className={`EventListViewWrap-custom-pagination justify-content-center mt-4 ${getDarkMode()}`}
        variant="none"
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
      <Footer className="Notice-footer" />
    </>
  );
};

export default NoticeList;
