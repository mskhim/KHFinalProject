import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../Context';
import {
  Button,
  Col,
  Container,
  Form,
  Pagination,
  Spinner,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './css/qnaList.css';
import {
  deleteQna,
  getisAuthenticated,
  getQnaList,
  getReply,
  submitReply,
} from './qnaApi';
import {
  ButtonDarkMode,
  ButtonRole,
  ButtonRoleAndUserNo,
} from '../../components/ui';

const QNAList = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode, getDarkMode, userRole } = useContext(Context);
  const [qnaList, setQnaList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyTarget, setReplyTarget] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false); // 검색 모드 여부
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [selectedReply, setSelectedReply] = useState(''); // 선택한 답변
  const [isLoading, setIsLoading] = useState(false); // 로딩 중 여부
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 인증 여부
  const searchRef = useRef(null);
  const searchOptionRef = useRef(null);
  const [sortDTO, setSortDTO] = useState({
    page: 1,
    search: '',
    searchOption: 'title',
  });
  useEffect(() => {
    setDarkMode(sessionStorage.getItem('darkMode') === 'true');
    const getQnaListData = async () => {
      const data = await getQnaList(sortDTO);
      console.log(data);
      setQnaList(data.ListData);
      setTotalPages(Math.ceil(data.totalPages / 10));
    };
    getQnaListData();
  }, [setDarkMode, currentPage, searchTerm, sortDTO]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSortDTO({
      ...sortDTO,
      page: page,
    });
  };

  const toggleAccordion = (index, no, eventNo) => {
    setOpenIndex(openIndex === index ? null : index);
    const getReplyData = async () => {
      setIsLoading(true);
      const response = await getReply(no);
      if (response.content === '등록된 답변이 없습니다.') {
        setSelectedReply('등록된 답변이 없습니다.');
        const getisAuthenticatedData = await getisAuthenticated(eventNo);
        setIsAuthenticated(getisAuthenticatedData.flag);
        setIsLoading(false);
      } else {
        setSelectedReply(response.content);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };
    getReplyData();
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim() || replyTarget === null) {
      alert('답변을 입력하세요.');
      return;
    }

    const requestData = {
      qnaNo: replyTarget,
      content: replyText,
    };

    console.log('전송할 데이터:', requestData);

    const data = await submitReply(requestData);
    if (data.authenticated) {
      setReplyText('');
      setReplyTarget(null);
      alert('답변이 등록되었습니다.');
      setIsAuthenticated(false);
      const response = await getReply(replyTarget);
      setSelectedReply(response.content);
    } else {
      alert('답변 등록 실패: ' + data.message);
    }
  };
  const handleSearch = () => {
    if (!isSearchMode) {
      const searchOption = searchOptionRef.current.value;
      const searchValue = searchRef.current.value.trim();
      if (!searchValue) {
        alert('검색어를 입력해주세요.');
        return;
      }
      setSortDTO({
        page: 1,
        search: searchValue,
        searchOption: searchOption,
      });
      setIsSearchMode(true);
    } else {
      setIsSearchMode(false);
      setSortDTO({
        page: 1,
        search: '',
        searchOption: 'title',
      });
      searchOptionRef.current.value = 'title';
      searchRef.current.value = '';
    }
  };
  const handleDelete = async (no) => {
    const response = await deleteQna(no);
    if (response) {
      alert('게시글이 삭제되었습니다.');
      navigate('/QnaList');
    }
  };

  return (
    <>
      <Header className="QNA-header" />
      <section className="QNA-notice">
        <div className="QNA-title-container">
          <h3 className={`QNA-title ${getDarkMode()}`}>Q&A</h3>
        </div>
        <Container>
          {/* 검색창 */}
          <div className="Notice-header">
            <div className="Notice-board-search">
              <div className="Notice-search-window">
                <form action="" onSubmit={handleSearch}>
                  <Container className="">
                    <div className="input-group gap-2">
                      {/* 검색 옵션 선택 */}
                      <Col md={3}>
                        <select className="form-select" ref={searchOptionRef}>
                          <option value="title">제목</option>
                          <option value="name">축제명</option>
                          <option value="writer">작성자</option>
                        </select>
                      </Col>
                      {/* 검색어 입력 */}
                      <Col md={6}>
                        <input
                          id="search"
                          type="search"
                          placeholder="검색어를 입력해주세요."
                          className={`form-control `}
                          ref={searchRef}
                          readOnly={isSearchMode}
                        />
                      </Col>
                      {/* 검색 버튼 */}
                      <Col md={2}>
                        <ButtonDarkMode
                          text={!isSearchMode ? '검색' : '검색취소'}
                          onClick={handleSearch}
                        />
                      </Col>
                    </div>
                  </Container>
                </form>
              </div>
            </div>
          </div>

          <div className="QNA-board-list">
            <table className="QNA-board-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>축제</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>등록일</th>
                </tr>
              </thead>
              <tbody className="QNA-board-tbody">
                {qnaList.map((data, index) => (
                  <React.Fragment key={data.no}>
                    <tr
                      className="QNA-accordion"
                      onClick={() =>
                        toggleAccordion(index, data.no, data.eventNo)
                      }
                    >
                      <td>{data.rowNo}</td>
                      <td>{data.eventName}</td>
                      <td>{data.title}</td>
                      <td>{data.userName}</td>
                      <td>{data.subDate}</td>
                    </tr>
                    {openIndex === index && (
                      <tr>
                        <td colSpan="5">
                          <div>
                            <strong>게시글 내용:</strong>
                            <p>{data.content}</p>

                            <strong>답변:</strong>
                            {isLoading ? (
                              <div className="d-flex justify-content-center my-4">
                                <Spinner animation="border" role="status">
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </Spinner>
                              </div>
                            ) : (
                              <div>
                                <p>
                                  {selectedReply || '등록된 답변이 없습니다.'}
                                </p>
                                <div className="d-flex justify-content-center">
                                  <ButtonRoleAndUserNo
                                    text="게시글 삭제"
                                    role="user"
                                    userNo={data.userAccountNo}
                                    onClick={() => handleDelete(data.no)}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          {isAuthenticated && (
                            <div className="QNA-reply-input">
                              <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="답변을 입력하세요..."
                                value={replyText}
                                onChange={(e) => {
                                  setReplyText(e.target.value);
                                  setReplyTarget(data.no);
                                }}
                                className="QNA-reply-textarea"
                              />
                              <Button
                                onClick={handleReplySubmit}
                                variant={
                                  darkMode ? 'outline-light' : 'outline-dark'
                                }
                                className="QNA-reply-submit"
                              >
                                답변 등록
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
      <div className="QNA-write-button-container">
        {userRole == '2' && (
          <Link to="/QnaInsert">
            <Button
              variant={darkMode ? 'outline-light' : 'outline-dark'}
              className="QNA-btn QNA-btn-dark"
            >
              글쓰기
            </Button>
          </Link>
        )}
      </div>
      {/* 페이지네이션 (검색 모드가 아닐 때만 표시) */}

      <Pagination
        className={`justify-content-center mt-4 ${getDarkMode()} custom-pagination`}
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

      <Footer className="QNA-footer" />
    </>
  );
};

export default QNAList;
