import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './noticeRead.css';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Context } from '../../Context';
import { fetchNoticeById } from './noticeApi';

const NoticeRead = () => {
  const { darkMode, setDarkMode } = useContext(Context);
  const [noticeRead, setNoticeRead] = useState({});
  const { no } = useParams(); // URL에서 공지사항 ID 가져오기

  useEffect(() => {
    setDarkMode(sessionStorage.getItem('darkMode') === 'true');

    const loadNotice = async () => {
      const data = await fetchNoticeById(no); //공지사항 데이터 가져오기
      setNoticeRead(data);
    };

    loadNotice();
  }, [darkMode, setDarkMode, no]);

  if (!noticeRead) {
    return (
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        공지사항을 불러오는 중...
      </p>
    );
  }

  return (
    <>
      <Header />
      <section className="NoticeRead-notice">
        <div className="NoticeRead-page-title">
          <div className="NoticeRead-container">
            <h3>공지사항</h3>
          </div>
        </div>

        <div className="NoticeRead-board-view">
          <div className="NoticeRead-container">
            {/* 목록으로 버튼 */}
            <div className="NoticeRead-btn-wrap">
              <Link to="/NoticeList">
                <Button
                  variant={darkMode ? 'outline-light' : 'outline-dark'}
                  className="NoticeRead-btn NoticeRead-btn-dark"
                >
                  목록으로
                </Button>
              </Link>
            </div>

            {/* 게시글 테이블 */}
            <table className="NoticeRead-board-table">
              <tbody>
                <tr>
                  <td colSpan="2" className="NoticeRead-view-title">
                    {noticeRead.title}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="NoticeRead-view-content">
                    <p>{noticeRead.content}</p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 등록일 */}
            <div className="NoticeRead-meta">
              <span className="NoticeRead-date">
                등록일: {noticeRead.subDate}
              </span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NoticeRead;
