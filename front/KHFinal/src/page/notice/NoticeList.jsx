import { useEffect, useState, useContext } from 'react';
import { Pagination, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './notice.css';
import {
  fetchNotices,
  fetchTotalNoticesCount,
  fetchAllNotices,
} from './noticeApi';
import { Context } from '../../Context';

const NoticeList = () => {
  const { darkMode, setDarkMode, getDarkMode, getDarkModeHover } =
    useContext(Context);
  const [notices, setNotices] = useState([]); // 공지사항 데이터
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const noticesPerPage = 10; // 페이지당 최대 공지사항 개수
  const [isSearchMode, setIsSearchMode] = useState(false); // 검색 모드 여부

  // 전체 공지사항 데이터를 가져오는 함수
  const loadNotices = async (page) => {
    try {
      const data = await fetchNotices(page, noticesPerPage); // 처음 한 번에 전체 공지사항을 가져옵니다.
      setNotices(data); // 전체 공지사항 데이터를 상태에 저장
      setIsSearchMode(false); // 일반 모드
    } catch (error) {
      console.error('전체 공지사항을 불러오는 중 오류 발생:', error);
    }
  };

  // 📌 전체 공지사항 검색 (검색어가 있을 때 실행)
  const loadAllNotices = async (keyword) => {
    try {
      const data = await fetchAllNotices(keyword);
      setNotices(data);
      setIsSearchMode(true); // 검색 모드 활성화
      setCurrentPage(1); // 검색 시 첫 페이지로 리셋
    } catch (error) {
      console.error('전체 공지사항을 불러오는 중 오류 발생:', error);
    }
  };

  // 총 공지사항 개수 불러오기
  const loadTotalPages = async () => {
    if (isSearchMode) return; // 검색 모드일 경우 페이지네이션 계산하지 않음
    try {
      const totalCount = await fetchTotalNoticesCount();
      setTotalPages(Math.ceil(totalCount / noticesPerPage));
    } catch (error) {
      console.error('총 공지사항 개수를 불러오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    if (!isSearchMode) {
      loadNotices(currentPage);
    }
    loadTotalPages();
  }, [currentPage, isSearchMode]); // 페이지 변경 시 로드 (검색 모드 아닐 때)

  // 📌 검색 입력 핸들러
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 📌 검색 버튼 클릭 시 실행
  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      loadAllNotices(searchTerm); // 검색어가 있으면 전체 데이터에서 검색
    } else {
      loadNotices(1); // 검색어가 없으면 기본 데이터 불러오기
      setCurrentPage(1);
    }
  };

  // 검색 취소 버튼 클릭 핸들러
  const handleCancelSearch = () => {
    setSearchTerm(''); // 검색어 초기화
    setIsSearchMode(false); // 검색 모드 해제
    setCurrentPage(1); // 첫 페이지로 이동
    loadNotices(1); // 원래 페이지별 데이터 불러오기
  };

  // 📌 페이지네이션 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (!isSearchMode) {
      loadNotices(page);
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
                    value={searchTerm}
                    onChange={handleSearchChange} // 검색어 변경 시 업데이트
                  />
                  {isSearchMode ? (
                    <Button
                      variant={darkMode ? 'outline-light' : 'outline-dark'}
                      className="Notice-btn Notice-btn-dark"
                      onClick={handleCancelSearch}
                    >
                      검색 취소
                    </Button>
                  ) : (
                    <Button
                      variant={darkMode ? 'outline-light' : 'outline-dark'}
                      className="Notice-btn Notice-btn-dark"
                      onClick={handleSearchSubmit}
                    >
                      검색
                    </Button>
                  )}
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
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 페이지네이션 (검색 모드가 아닐 때만 표시) */}
        {!isSearchMode && totalPages > 1 && (
          <Pagination
            className={`justify-content-center mt-4 ${getDarkMode()}`}
          >
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </Pagination>
        )}
      </section>

      <Footer className="Notice-footer" />
    </>
  );
};

export default NoticeList;
