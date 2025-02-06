import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./qnaList.css";
import { Link } from "react-router-dom";
import { Context } from "../../Context";
import { useContext, useState } from "react";
import { Pagination } from "react-bootstrap";

const QNAList = () => {
  const qna = [
    {
      no: 1,
      title: "[Q&A] 테스트입니다1",
      name: "홍길동",
      date: "2017.07.13",
    },
    {
      no: 2,
      title: "Q&A 테스트입니다2",
      name: "저길동",
      date: "2017.06.15",
    },
    {
      no: 3,
      title: "Q&A 테스트입니다3",
      name: "이길동",
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
      <section className="QNA-notice">
        {/* Q&A 제목 */}
        <div className="QNA-title-container">
          <h3 className={`QNA-title ${getDarkMode()}`}>Q&A</h3>
        </div>

        {/* 검색창 */}
        <div className="QNA-header">
          <div className="QNA-board-search">
            <div className="QNA-search-window">
              <form action="">
                <div className="QNA-search-wrap">
                  <label htmlFor="search" className="QNA-blind"></label>
                  <input
                    id="search"
                    type="search"
                    placeholder="검색어를 입력해주세요."
                    className="QNA-search-input"
                  />
                  <button type="submit" className="QNA-btn QNA-btn-dark">
                    검색
                  </button>
                  <select className="QNA-sort-select">
                    <option value="date">오름차순</option>
                    <option value="date">내림차순</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Q&A 목록 */}
        <div className="QNA-board-list">
          <div className="QNA-container">
            <table className="QNA-board-table">
              <thead>
                <tr>
                  <th className="QNA-th-num">번호</th>
                  <th className="QNA-th-title">제목</th>
                  <th className="QNA-th-name">작성자</th>
                  <th className="QNA-th-date">등록일</th>
                </tr>
              </thead>
              <tbody>
                {qna.map((data) => (
                  <tr key={data.no}>
                    <td>{data.no}</td>
                    <td className="QNA-td-title">
                      <Link
                        to={`/qnaRead/${data.no}`}
                        className={getDarkMode()}
                      >
                        {data.title}
                      </Link>
                    </td>
                    <td>{data.name}</td>
                    <td>{data.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 글쓰기 버튼 추가 */}
            <div className="QNA-write-button-container">
              <Link to="/QnaInsert">
                <button className="QNA-write-btn QNA-write-btn-dark">
                  글쓰기
                </button>
              </Link>
            </div>
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

export default QNAList;
