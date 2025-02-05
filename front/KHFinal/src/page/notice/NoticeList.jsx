import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Notice.css';
import { Link } from 'react-router-dom';
import { Context } from '../../Context';
import { useContext, useState } from 'react';
import { Pagination } from 'react-bootstrap';

const NoticeList = () => {
  const { getDarkMode } = useContext(Context);
  // ✅ 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 전체 페이지 개수
  // ✅ 페이지 변경 함수
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      console.log(`Fetching data for page: ${page}`);
    }
  };

  return (
    <>
      <Header />
      <section className="Notice-notice">
        <div className="Notice-page-title">
          <div className={`Notice-container`}>
            <h3 className={`${getDarkMode()} span`}>공지사항</h3>
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

      <Pagination
        className={`EventListViewWrap-custom-pagination justify-content-center mt-4 ${getDarkMode()}`}
        variant="dark"
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
      <Footer />
    </>
  );
};

export default NoticeList;
