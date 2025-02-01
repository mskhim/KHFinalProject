import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Badge,
} from 'react-bootstrap';
import { BsPersonCircle, BsChevronDown } from 'react-icons/bs';
import {
  FaGithub,
  FaBell,
  FaMoon,
  FaSun,
  FaTicketAlt,
  FaCalendarAlt,
  FaMapMarkedAlt,
} from 'react-icons/fa';
import './Header.css';
import { handleLogout, checkAuthStatus } from '../page/user/userApi';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('사용자');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [showFestivalNav, setShowFestivalNav] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    checkAuthStatus().then((data) => {
      setIsAuthenticated(data.authenticated);
      if (data.authenticated && data.userName) {
        setUserName(data.userName);
      }
    });
  }, []);

  const Logout = () => {
    handleLogout().then(() => {
      setIsAuthenticated(false);
    });
  };

  const handleLogin = () => {
    navigate('/userLoginPage');
  };

  // ✅ 다크 모드 토글 함수 (기본: 흰색 / 토글 시 검은색)
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle('dark-mode');
  };

  // ✅ '축제' 클릭 시 네비게이션 표시 토글 (애니메이션 적용)
  const toggleFestivalNav = () => {
    setIsAnimating(true);
    setShowFestivalNav((prev) => !prev);

    // ✅ 애니메이션 실행 후, 0.3초 뒤에 'with-animation' 제거 (CSS 애니메이션 지속 시간과 맞춤)
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <>
      {/* ✅ 상단 네비게이션 (기본: 흰색 / 토글 시 검은색) */}
      <Navbar
        expand="lg"
        className={`py-3 ${
          darkMode ? 'bg-dark text-light' : 'bg-light text-dark'
        }`}
      >
        <Container fluid className="header-container px-4" id="headerContainer">
          <Navbar.Brand
            as={NavLink}
            to="/"
            className={darkMode ? 'text-light' : 'text-dark'}
          >
            VIVAFESTA
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarColor01" />
          <Navbar.Collapse id="navbarColor01">
            <Nav className="me-auto nav-links">
              {/* ✅ '축제' 클릭 시 네비게이션 토글 */}
              <Nav.Link
                className={darkMode ? 'text-light' : 'text-dark'}
                onClick={toggleFestivalNav}
              >
                축제
              </Nav.Link>

              {/* ✅ 고객지원 드롭다운 */}
              <NavDropdown
                title={
                  <span className={darkMode ? 'text-light' : 'text-dark'}>
                    고객지원
                  </span>
                }
                id="nav-dropdown"
              >
                <NavDropdown.Item as={NavLink} to="/qnaList">
                  QNA
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/noticeList">
                  공지사항
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* ✅ 오른쪽 UI 요소 */}
            <div className="d-flex align-items-center">
              {isAuthenticated ? (
                <NavDropdown
                  title={
                    <span className="d-flex align-items-center user-info">
                      <BsPersonCircle
                        size={30}
                        className={`me-2 ${
                          darkMode ? 'text-light' : 'text-dark'
                        }`}
                      />
                      <span
                        className={`user-name ${
                          darkMode ? 'text-light' : 'text-dark'
                        }`}
                      >
                        {userName}
                      </span>
                      <BsChevronDown
                        size={16}
                        className={`ms-1 dropdown-icon ${
                          darkMode ? 'text-light' : 'text-dark'
                        }`}
                      />
                    </span>
                  }
                  id="user-dropdown"
                  align="end"
                  className="user-dropdown"
                >
                  <NavDropdown.Item as={NavLink} to="/mypage">
                    마이페이지
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/reservations">
                    예매 내역 확인
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={Logout}>로그아웃</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Button
                  variant={darkMode ? 'outline-light' : 'outline-dark'}
                  onClick={handleLogin}
                  className="me-3"
                >
                  로그인
                </Button>
              )}
              {isAuthenticated && (
                <div className="position-relative me-3">
                  <FaBell
                    size={24}
                    className={darkMode ? 'text-light' : 'text-dark'}
                  />
                  {notifications > 0 && (
                    <Badge pill bg="danger" className="notification-badge">
                      {notifications}
                    </Badge>
                  )}
                </div>
              )}
              <a
                href="https://github.com/your-github-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="github-link ms-3"
              >
                <FaGithub
                  size={30}
                  className={darkMode ? 'text-light' : 'text-dark'}
                />
              </a>
              <Button
                variant="link"
                className="theme-toggle-btn me-3"
                onClick={toggleDarkMode}
              >
                {darkMode ? (
                  <FaSun size={24} className="text-light" />
                ) : (
                  <FaMoon size={24} className="text-dark" />
                )}
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ✅ 헤더 아래 네비게이션 바 (애니메이션 적용) */}
      <div
        className={`festival-nav ${
          showFestivalNav
            ? isAnimating
              ? 'with-animation'
              : 'visible'
            : 'hidden'
        }`}
      >
        <Container fluid className="festival-nav-container">
          <div
            className={`festival-nav-item ${
              activeTab === '예매' ? 'active' : ''
            }`}
            onClick={() => {
              setActiveTab('예매');
              navigate('/eventList');
            }}
          >
            <FaTicketAlt size={24} />
            <span>축제 예매</span>
          </div>
          <div
            className={`festival-nav-item ${
              activeTab === '달력' ? 'active' : ''
            }`}
            onClick={() => {
              setActiveTab('달력');
              navigate('/eventCalendar');
            }}
          >
            <FaCalendarAlt size={24} />
            <span>축제 달력</span>
          </div>
          <div
            className={`festival-nav-item ${
              activeTab === '지도' ? 'active' : ''
            }`}
            onClick={() => {
              setActiveTab('지도');
              navigate('/eventMap');
            }}
          >
            <FaMapMarkedAlt size={24} />
            <span>축제 지도</span>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
