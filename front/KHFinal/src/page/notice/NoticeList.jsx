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
    useContext(Context); //다크모드
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [notices, setNotices] = useState([]); //전체 공지사항 데이터
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const noticesPerPage = 10; // 페이지당 최대 공지사항 개수

  useEffect(() => {
    setDarkMode(sessionStorage.getItem('darkMode') === 'true');
    const loadNotices = async () => {
      const data = await fetchNotices(); // 공지사항 데이터 가져오기
      setNotices(data);
    };

    loadNotices();
  }, [darkMode, setDarkMode]);

  // 검색어 입력 시 상태 업데이트
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); //검색어 변경 시 첫 페이지로 이동
  };

  // 검색어에 맞는 공지사항 필터링
  const filteredNotices = notices.filter((data) =>
    data.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 총 페이지 수 계산 (공지사항 개수를 10개씩 나눠서)
  const totalPages = Math.max(
    1,
    Math.ceil(filteredNotices.length / noticesPerPage)
  );

  // 현재 페이지에서 보여줄 공지사항 데이터
  const startIndex = (currentPage - 1) * noticesPerPage;
  const paginatedNotices = filteredNotices.slice(
    startIndex,
    startIndex + noticesPerPage
  );

  // 페이지네이션 그룹 계산
  let paginationNumbers = [];
  if (totalPages <= 5) {
    // 50개 이하일 때 (1~5 페이지 표시)
    paginationNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    // 50개 초과 시 해당 범위에 맞게 페이지 그룹 표시
    const groupStart = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const groupEnd = Math.min(groupStart + 4, totalPages);
    paginationNumbers = Array.from(
      { length: groupEnd - groupStart + 1 },
      (_, i) => groupStart + i
    );
  }

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
                    value={searchTerm}
                    onChange={handleSearchChange}
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
                {paginatedNotices.length > 0 ? (
                  paginatedNotices.map((data) => (
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

      {/* 페이지네이션 (공지사항이 10개 이상일 때만 표시) */}
      {totalPages > 1 && (
        <Pagination
          className={`EventListViewWrap-custom-pagination justify-content-center mt-4 ${getDarkMode()}`}
          variant="none"
        >
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          />
          {paginationNumbers.map((page) => (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        </Pagination>
      )}
      <Footer className="Notice-footer" />
    </>
  );
};

export default NoticeList;
