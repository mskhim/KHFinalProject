import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiLogin from './components/ApiLogin';
import { checkAuthStatus, handleLogin } from './userApi.js'; // ✅ 로그인 상태 확인 API 호출
import { Context } from '../../Context';
import { Button, Form, Modal, Nav } from 'react-bootstrap';
import './css/UserLoginPage.css';
import UserFind from './UserFind';
const UserLoginPage = () => {
  const { getDarkMode, getDarkModeHover, darkMode, login } =
    useContext(Context);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showFindModal, setShowFindModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    checkAuthStatus()
      .then((data) => {
        if (data.authenticated) {
          const preLoginUrl = sessionStorage.getItem('preLoginUrl') || '/';
          navigate(preLoginUrl); // ✅ 로그인 상태면 이전 페이지로 이동
        }
      })
      .finally(() => setIsLoading(false)); // ✅ 로딩 완료
  }, [navigate]);

  // 모달 열기
  const handleShow = (type) => {
    setModalContent(type);
    setShowFindModal(true);
  };

  // 모달 닫기
  const handleClose = () => setShowFindModal(false);

  const handleLoginSubmit = async () => {
    const response = await handleLogin(id, 'common', password);
    const flag = response.success;
    if (flag) {
      login(response.nickname); // ✅ 로그인 상태로 변경
      // ✅ 로그인 성공 후, 이전 페이지로 이동
      const preLoginUrl = sessionStorage.getItem('preLoginUrl') || '/';
      navigate(preLoginUrl);
      sessionStorage.removeItem('preLoginUrl');
    } else {
      navigate('/userLoginPage');
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <Header />

      {/* 로그인 폼 */}
      <div
        className={`UserLoginPage-form-container p-5 ${getDarkMode()} form-container`}
      >
        <Form onSubmit={handleLoginSubmit}>
          {/* 아이디 입력 */}
          <Form.Floating className="mb-3">
            <Form.Control
              id="id"
              type="id"
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <Form.Label htmlFor="id">아이디</Form.Label>
          </Form.Floating>

          {/* 비밀번호 입력 */}
          <Form.Floating className="mb-3">
            <Form.Control
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Form.Label htmlFor="password">비밀번호</Form.Label>
          </Form.Floating>

          {/* 로그인 상태 유지 체크박스 */}
          <Form.Check
            type="checkbox"
            id="rememberMe"
            label="로그인 상태 유지"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mb-3"
          />

          {/* 로그인 버튼 */}
          <div className="UserLoginPage-button-container">
            <Button
              variant="none"
              className={`${getDarkModeHover()} w-100`}
              type="submit"
            >
              로그인
            </Button>
          </div>

          {/* 아이디 찾기, 비밀번호 찾기, 회원가입 링크 추가 */}
          {/* 네비게이션 바 */}
          <div className="text-center mt-3">
            <Nav className="justify-content-center align-items-center">
              <Nav.Item>
                <Nav.Link
                  onClick={() => handleShow('아이디 찾기')}
                  className={`mx-2 UserLoginPage-nav-link-hover ${
                    darkMode ? 'text-light dark-mode' : 'text-dark'
                  }`}
                >
                  아이디 찾기
                </Nav.Link>
              </Nav.Item>
              <span>|</span>
              <Nav.Item>
                <Nav.Link
                  onClick={() => handleShow('비밀번호 찾기')}
                  className={`mx-2 UserLoginPage-nav-link-hover ${
                    darkMode ? 'text-light dark-mode' : 'text-dark'
                  }`}
                >
                  비밀번호 찾기
                </Nav.Link>
              </Nav.Item>
              <span>|</span>
              <Nav.Item>
                <Nav.Link
                  onClick={() => navigate('/userInsertCommon')}
                  className={`mx-2 UserLoginPage-nav-link-hover ${
                    darkMode ? 'text-light dark-mode' : 'text-dark'
                  }`}
                >
                  회원가입
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Form>

        {/* 외부 API 로그인 */}
        <div className="UserLoginPage-api-container">
          <ApiLogin /> {/* 외부 API 로그인 컴포넌트 */}
        </div>
      </div>
      {/* 모달 (팝업창) */}
      <Modal
        show={showFindModal}
        onHide={handleClose}
        centered
        className={`${getDarkMode()}`}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalContent}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent === '아이디 찾기' ? (
            <UserFind type="id" />
          ) : (
            <UserFind type="pwd" />
          )}
        </Modal.Body>
      </Modal>
      <Footer />
    </>
  );
};

export default UserLoginPage;
