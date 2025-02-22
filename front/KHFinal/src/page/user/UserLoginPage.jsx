import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState, useContext, useMemo, useCallback } from 'react';
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
  const [id, setId] = useState(''); // 아이디 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const [rememberMyId, setRememberMyId] = useState(false); // 아이디 저장 체크 상태
  const [showFindModal, setShowFindModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // 페이지 로드 시 실행되는 useEffect
  useEffect(() => {
    checkAuthStatus()
      .then((data) => {
        if (data.authenticated) {
          const preLoginUrl = sessionStorage.getItem('preLoginUrl') || '/';
          navigate(preLoginUrl); // ✅ 로그인 상태면 이전 페이지로 이동
        }
      })
      .finally(() => setIsLoading(false)); // ✅ 로딩 완료

    // 페이지가 로드될 때 아이디가 localStorage에 저장되어 있으면 불러오기
    const savedRememberMyId = localStorage.getItem('rememberMyId');
    if (savedRememberMyId === 'true') {
      const savedId = localStorage.getItem('savedId');
      if (savedId) {
        setId(savedId); // localStorage에 저장된 아이디를 상태에 설정
        setRememberMyId(true); // 아이디 저장 체크박스를 체크 상태로 설정
      }
    } else {
      setRememberMyId(false); // 아이디 저장 체크박스 해제 상태
      setId(''); // 아이디 비워두기
    }
  }, [navigate]);

  // 모달 열기
  const handleShow = useCallback((type) => {
    setModalContent(type);
    setShowFindModal(true);
  }, []);

  // 모달 닫기
  const handleClose = useCallback(() => setShowFindModal(false), []);

  const handleLoginSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // 로그인 처리
      const response = await handleLogin(id, 'common', password);
      const flag = response.success;
      if (flag) {
        login(response.nickname, response.role); // ✅ 로그인 상태로 변경

        // '아이디 저장' 체크박스가 체크된 경우, 아이디를 localStorage에 저장
        if (rememberMyId) {
          localStorage.setItem('rememberMyId', 'true');
          localStorage.setItem('savedId', id); // 아이디 저장
        } else {
          localStorage.removeItem('rememberMyId'); // 체크 해제 시 localStorage에서 아이디 삭제
          localStorage.removeItem('savedId'); // 저장된 아이디도 삭제
        }

        // 로그인 성공 후, 이전 페이지로 이동
        if (response.role === 1) {
          navigate('/manager/managerStats');
          return;
        }
        if (response.role === 0) {
          navigate('/admin/adminMain');
          return;
        }

        const preLoginUrl = sessionStorage.getItem('preLoginUrl') || '/';
        navigate(preLoginUrl);
        sessionStorage.removeItem('preLoginUrl');
      } else {
        navigate('/userLoginPage'); // 로그인 실패 시, 로그인 페이지로 리다이렉트
      }
    },
    [id, password, rememberMyId, login, navigate]
  );

  // 로그아웃 시, localStorage 상태 초기화
  const handleLogout = useCallback(() => {
    localStorage.removeItem('rememberMyId');
    localStorage.removeItem('savedId');
    setId('');
    setRememberMyId(false);
    navigate('/userLoginPage');
  }, [navigate]);

  const handleRememberMyIdChange = useCallback((e) => {
    const isChecked = e.target.checked;
    setRememberMyId(isChecked);

    if (!isChecked) {
      // 아이디 저장 체크박스가 해제되면 localStorage에서 해당 항목 삭제
      localStorage.removeItem('rememberMyId');
      localStorage.removeItem('savedId');
      setId(''); // 아이디 인풋 창 초기화
    }
  }, []);

  const header = useMemo(() => <Header />, []);
  const footer = useMemo(() => <Footer />, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      {header}

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
            id="rememberMyId"
            label="아이디 저장"
            checked={rememberMyId}
            onChange={handleRememberMyIdChange}
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

      {footer}
    </>
  );
};

export default UserLoginPage;
