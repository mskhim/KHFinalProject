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
import { FaGithub, FaBell, FaMoon, FaSun, FaCartPlus } from 'react-icons/fa';
import './Header.css';
import { handleLogout, checkAuthStatus } from '../page/user/userApi';
import { Context } from '../Context';

const Header = ({ page }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('사용자');
  const [notifications, setNotifications] = useState(3);
  const [cartElement, setCartElement] = useState(2);
  const [showFestivalNav, setShowFestivalNav] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const { darkMode, setDarkMode, getDarkMode } = useContext(Context);

  useEffect(() => {
    page && setShowFestivalNav(true);
    setActiveTab(page);
    setDarkMode(sessionStorage.getItem('darkMode') === 'true');
    document.body.classList.toggle('Header-dark-mode', darkMode);
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

  const toggleDarkMode = () => {
    // ✅ 모든 요소의 transition을 비활성화 (즉시 적용)
    const disableTransitions = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        * {
          transition: none !important;
        }
      `;
      style.id = 'disable-transitions';
      document.head.appendChild(style);
    };

    // ✅ transition 복구 (300ms 뒤에 다시 활성화)
    const enableTransitions = () => {
      const style = document.getElementById('disable-transitions');
      if (style) {
        setTimeout(() => {
          style.remove();
        }, 300); // 300ms 후 원래 상태로 복구
      }
    };

    setDarkMode((prev) => {
      const newDarkMode = !prev;

      // ✅ 애니메이션 비활성화
      disableTransitions();

      // ✅ 다크 모드 전환 적용
      sessionStorage.setItem('darkMode', newDarkMode);
      document.body.classList.toggle('Header-dark-mode', newDarkMode);

      // ✅ 애니메이션 복구
      enableTransitions();

      return newDarkMode;
    });
  };

  const toggleFestivalNav = () => {
    setIsAnimating(true);
    setShowFestivalNav((prev) => !prev);
  };

  return (
    <>
      <Navbar
        expand="lg"
        className={`py-3 ${
          darkMode ? 'bg-dark text-light' : 'bg-white text-dark'
        } `}
      >
        <Container
          fluid
          className="Header-header-container px-4"
          id="Header-headerContainer"
        >
          <Navbar.Brand
            as={NavLink}
            to="/"
            className={darkMode ? 'text-light' : 'text-dark'}
          >
            VIVAFESTA
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarColor01" />
          <Navbar.Collapse id="navbarColor01">
            <Nav className="me-auto Header-nav-links">
              <Nav.Link
                className={darkMode ? 'text-light' : 'text-dark'}
                onClick={!page ? toggleFestivalNav : undefined}
              >
                축제
              </Nav.Link>
              <NavDropdown
                title={
                  <span className={darkMode ? 'text-light' : 'text-dark'}>
                    고객지원{' '}
                    <BsChevronDown
                      size={16}
                      className={`ms-1 Header-dropdown-icon ${
                        darkMode ? 'text-light' : 'text-dark'
                      }`}
                    />
                  </span>
                }
                id="Header-user-dropdown"
                align="end"
                className="Header-user-dropdown"
                menuVariant={darkMode ? 'dark' : 'light'} // ✅ 다크 모드에 따라 메뉴 스타일 변경
              >
                <NavDropdown.Item
                  as={NavLink}
                  to="/qnaList"
                  className={darkMode ? 'text-light' : 'text-dark'} // ✅ 다크 모드 적용
                >
                  QNA
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/noticeList"
                  className={darkMode ? 'text-light' : 'text-dark'} // ✅ 다크 모드 적용
                >
                  공지사항
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <div className="d-flex align-items-center">
              {isAuthenticated ? (
                <NavDropdown
                  title={
                    <span className="d-flex align-items-center Header-user-info">
                      <BsPersonCircle
                        size={24}
                        className={`me-2 ${
                          darkMode ? 'text-light' : 'text-dark'
                        }`}
                      />
                      <span
                        className={`Header-user-name ${
                          darkMode ? 'text-light' : 'text-dark'
                        }`}
                      >
                        {userName}
                      </span>
                      <BsChevronDown
                        size={16}
                        className={`ms-1 Header-dropdown-icon ${
                          darkMode ? 'text-light' : 'text-dark'
                        }`}
                      />
                    </span>
                  }
                  id="Header-user-dropdown"
                  align="end"
                  className="Header-user-dropdown"
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
                    className={`${
                      darkMode ? 'text-light' : 'text-dark'
                    } Header-cart-icon`}
                  />
                  {notifications > 0 && (
                    <Badge
                      pill
                      bg="danger"
                      className="Header-notification-badge Header-cart-icon"
                    >
                      {notifications}
                    </Badge>
                  )}
                </div>
              )}
              {isAuthenticated && (
                <div className="position-relative me-3">
                  <FaCartPlus
                    size={24}
                    className={`${getDarkMode} ms-3 Header-cart-icon`}
                    onClick={() => navigate('/userCart')}
                  />
                  {notifications > 0 && (
                    <Badge
                      pill
                      bg="success"
                      className="Header-notification-badge Header-cart-icon"
                      onClick={() => navigate('/userCart')}
                    >
                      {cartElement}
                    </Badge>
                  )}
                </div>
              )}
              <a
                href="https://github.com/your-github-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="Header-github-link ms-3"
              >
                <FaGithub
                  size={30}
                  className={darkMode ? 'text-light' : 'text-dark'}
                />
              </a>
              <Button
                variant="link"
                className="Header-theme-toggle-btn me-3"
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

      <div
        className={`Header-festival-nav ${darkMode ? 'Header-dark-mode' : ''} ${
          showFestivalNav
            ? isAnimating
              ? 'Header-with-animation'
              : 'visible'
            : 'Header-hidden'
        }`}
      >
        <Container fluid className="Header-festival-nav-container ms-5">
          <div
            className={`Header-festival-nav-item ${
              activeTab === 'list' ? 'Header-active' : ''
            } `}
            onClick={() => navigate('/eventList')}
          >
            <span>축제 목록</span>
          </div>
          <div
            className={`Header-festival-nav-item ${
              activeTab === 'cal' ? 'Header-active' : ''
            }`}
            onClick={() => navigate('/eventCalendar')}
          >
            <span>축제 달력</span>
          </div>
          <div
            className={`Header-festival-nav-item ${
              activeTab === 'map' ? 'Header-active' : ''
            } `}
            onClick={() => navigate('/eventMap')}
          >
            <span>지역별 축제</span>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
