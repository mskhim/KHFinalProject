import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './notice.css';
import { Link } from 'react-router-dom';
import { Context } from '../../Context';
import { useContext, useEffect, useState } from 'react';
import { Pagination, Button } from 'react-bootstrap';

const NoticeList = () => {
  const { darkMode, setDarkMode, getDarkMode, getDarkModeHover } =
    useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const [notices, setNotices] = useState([]); //공지사항 데이터 상태

  // ✅ 공지사항 데이터를 가져오는 비동기 함수
  const fetchNotices = async () => {
    try {
      const response = await fetch('http://localhost:8080/notice'); // 백엔드 API 호출
      if (!response.ok) {
        throw new Error('서버 응답이 올바르지 않습니다.');
      }
      const data = await response.json();
      setNotices(data); // 가져온 데이터 상태 업데이트
    } catch (error) {
      console.error('공지사항을 불러오는 중 오류 발생', error);
    }
  };

  useEffect(() => {
    setDarkMode(sessionStorage.getItem('darkMode') === 'true');
    fetchNotices();
  }, [darkMode, setDarkMode]);

  // const notice = [
  //   {
  //     no: 1,
  //     title: '[공지사항] 개인정보 처리방침 변경안내',
  //     date: '2017.07.13',
  //   },
  //   {
  //     no: 2,
  //     title: '공지사항 안내입니다. 이용해주셔서 감사합니다',
  //     date: '2017.06.15',
  //   },
  //   {
  //     no: 3,
  //     title: '공지사항 안내입니다. 이용해주셔서 감사합니다',
  //     date: '2017.06.15',
  //   },
  // ];

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
