import { useEffect, useState, useContext } from 'react';
import { Pagination, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './notice.css';
import { fetchNotices } from './noticeApi';
import { Context } from '../../Context';

const NoticeList = () => {
  const { darkMode, setDarkMode, getDarkMode, getDarkModeHover } = useContext(Context);
  const [notices, setNotices] = useState([]); // 전체 공지사항 데이터
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [allNotices, setAllNotices] = useState([]); // 전체 공지사항 데이터를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const noticesPerPage = 1; // 페이지당 최대 공지사항 개수

  // 전체 공지사항 데이터를 가져오는 함수
  const loadAllNotices = async () => {
    try {
      const data = await fetchNotices(1, 100); // 처음 한 번에 전체 공지사항을 가져옵니다.
      setAllNotices(data); // 전체 공지사항 데이터를 상태에 저장
    } catch (error) {
      console.error('전체 공지사항을 불러오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    loadAllNotices(); // 컴포넌트가 마운트될 때 전체 공지사항을 불러옵니다.
  }, []);

  // 검색어 입력 시 상태 업데이트
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // 검색어 업데이트
    setCurrentPage(1); // 검색 시 첫 페이지로 리셋
  };

  // 검색어에 맞는 공지사항 필터링
  const filteredNotices = allNotices.filter((data) =>
    data.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    data.content.toLowerCase().includes(searchTerm.toLowerCase()) // 내용까지 검색
  );

  // 페이지네이션을 위한 로직
  const paginatedNotices = filteredNotices.slice((currentPage - 1) * noticesPerPage, currentPage * noticesPerPage);
  
  // 총 페이지 수 계산
  useEffect(() => {
    setTotalPages(Math.ceil(filteredNotices.length / noticesPerPage));
  }, [filteredNotices]);

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
                    value={searchTerm}
                    onChange={handleSearchChange} // 검색어 변경 시 업데이트
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
                      <td>
                        <Link to={`/noticeRead/${data.no}`} className={getDarkMode()}>
                          {data.title}
                        </Link>
                      </td>
                      <td>{data.subDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center' }}>검색 결과가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <Pagination className={`justify-content-center mt-4 ${getDarkMode()}`}>
            <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item 
                key={index + 1} 
                active={index + 1 === currentPage} 
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
          </Pagination>
        )}
      </section>

      <Footer className="Notice-footer" />
    </>
  );
};

export default NoticeList;
