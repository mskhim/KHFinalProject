import React, { useEffect, useState, useContext } from 'react';
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
import { Context } from '../Context';

const Header = ({ page }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false); //로그인여부
  const [userName, setUserName] = useState('사용자'); //사용자 이름
  const [notifications, setNotifications] = useState(3); //알림
  const [showFestivalNav, setShowFestivalNav] = useState(false); //축제 네비게이션 표시여부
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const { darkMode, setDarkMode } = useContext(Context); //useContext 로 다크모드 전역관리
  useEffect(() => {
    page && setShowFestivalNav(true); // 네비게이션 보이게 설정
    setActiveTab(page);
    setDarkMode(sessionStorage.getItem('darkMode') === 'true');
    document.body.classList.toggle('dark-mode', darkMode);
    checkAuthStatus().then((data) => {
      setIsAuthenticated(data.authenticated);
      if (data.authenticated && data.userName) {
        setUserName(data.userName);
      }
    });
  }, [page, darkMode, setDarkMode]);

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
    setDarkMode((prev) => {
      const newDarkMode = !prev;
      sessionStorage.setItem('darkMode', newDarkMode); // ✅ 새로운 상태를 올바르게 저장
      document.body.classList.toggle('dark-mode', newDarkMode);
      return newDarkMode;
    });
  };

  // ✅ '축제' 클릭 시 네비게이션 표시 토글 (애니메이션 적용)
  const toggleFestivalNav = () => {
    setIsAnimating(true);
    setShowFestivalNav((prev) => !prev);
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
                onClick={!page ? toggleFestivalNav : undefined} // ✅ page가 없을 때만 클릭 이벤트 적용
              >
                축제
              </Nav.Link>

              {/* ✅ 고객지원 드롭다운 */}
              <NavDropdown
                title={
                  <span className={darkMode ? 'text-light' : 'text-dark'}>
                    고객지원
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
                className={`user-dropdown ${
                  darkMode ? 'bg-dark text-light' : 'bg-light text-dark'
                }`} // ✅ 다크 모드 스타일 적용
              >
                <NavDropdown.Item
                  as={NavLink}
                  to="/qnaList"
                  className={darkMode ? 'text-light' : 'text-dark'} // ✅ 텍스트 색상 변경
                >
                  <span className={darkMode ? 'text-light' : 'text-dark'}>
                    QNA
                  </span>
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/noticeList"
                  className={darkMode ? 'text-light' : 'text-dark'} // ✅ 텍스트 색상 변경
                >
                  <span className={darkMode ? 'text-light' : 'text-dark'}>
                    공지사항
                  </span>
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
                        size={24}
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
                    <span className={darkMode ? 'text-light' : 'text-dark'}>
                      마이페이지
                    </span>
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/reservations">
                    <span className={darkMode ? 'text-light' : 'text-dark'}>
                      예매 내역 확인
                    </span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={Logout}>
                    <span className={darkMode ? 'text-light' : 'text-dark'}>
                      로그아웃
                    </span>
                  </NavDropdown.Item>
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
        <Container fluid className={`festival-nav-container ms-5`}>
          <div
            className={`festival-nav-item ${
              activeTab === 'list' ? 'active' : ''
            } `}
            onClick={() => navigate('/eventList')}
          >
            <FaTicketAlt size={24} />
            <span>축제 목록</span>
          </div>
          <div
            className={`festival-nav-item ${
              activeTab === 'cal' ? 'active' : ''
            }`}
            onClick={() => navigate('/eventCalendar')}
          >
            <FaCalendarAlt size={24} />
            <span>축제 달력</span>
          </div>
          <div
            className={`festival-nav-item ${
              activeTab === 'map' ? 'active' : ''
            } `}
            onClick={() => navigate('/eventMap')}
          >
            <FaMapMarkedAlt size={24} />
            <span>지역별 축제</span>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
