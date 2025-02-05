import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./notice.css";
import { Link } from "react-router-dom";
import { Context } from "../../Context";
import { useContext, useState } from "react";
import { Pagination } from "react-bootstrap";

const NoticeList = () => {
  const notice = [
    {
      no: 1,
      title: "[공지사항] 개인정보 처리방침 변경안내",
      date: "2017.07.13",
    },
    {
      no: 2,
      title: "공지사항 안내입니다. 이용해주셔서 감사합니다",
      date: "2017.06.15",
    },
    {
      no: 3,
      title: "공지사항 안내입니다. 이용해주셔서 감사합니다",
      date: "2017.06.15",
    },
  ];
  const { getDarkMode } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

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
        {/* 공지사항 제목을 번호 위로 이동 */}
        <div className="Notice-title-container">
          <h3 className={`Notice-title ${getDarkMode()}`}>공지사항</h3>
        </div>

        {/* 검색창을 유지하면서 정렬 */}
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
                  <button type="submit" className="Notice-btn Notice-btn-dark">
                    검색
                  </button>
                  <select className="Notice-sort-select">
                    <option value="date">오름차순</option>
                    <option value="date">내림차순</option>
                  </select>
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
                {notice.map((data) => (
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
                    <td>{data.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
