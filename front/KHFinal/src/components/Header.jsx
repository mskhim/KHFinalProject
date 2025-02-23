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
import { FaGithub, FaMoon, FaSun, FaCartPlus } from 'react-icons/fa';
import './Header.css';
import { getCartData } from '../page/user/userApi';
import { Context } from '../Context';
import ScrollToTopButton from './ui/ScrollToTopButton';
import TokenRemain from './ui/TokenRemain';
import ViVaFestaW from '../assets/VIVAFESTAW.png';
import ViVaFestaB from '../assets/VIVAFESTAB.png';
import { ButtonDarkMode, ButtonRole } from './ui';

const Header = ({ page }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState('사용자');
  const [showFestivalNav, setShowFestivalNav] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [cart, setCart] = useState([]);
  const {
    darkMode,
    setDarkMode,
    isAuthenticated,
    userNickname,
    logout,
    getDarkMode,
    userRole,
  } = useContext(Context);

  useEffect(() => {
    page && setShowFestivalNav(true);
    setActiveTab(page);
    setDarkMode(sessionStorage.getItem('darkMode') === 'true');
    document.body.classList.toggle('Header-dark-mode', darkMode);
    setUserName(userNickname);
  }, [page, darkMode, userNickname]);

  const Logout = () => {
    logout();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/userLoginPage');
  };
  useEffect(() => {
    if (isAuthenticated) {
      const getCart = async () => {
        const data = await getCartData();
        setCart(data);
      };
      getCart();
    }
  }, []);

  const toggleDarkMode = () => {
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

    const enableTransitions = () => {
      const style = document.getElementById('disable-transitions');
      if (style) {
        setTimeout(() => {
          style.remove();
        }, 300);
      }
    };

    setDarkMode((prev) => {
      const newDarkMode = !prev;
      disableTransitions();
      sessionStorage.setItem('darkMode', newDarkMode);
      document.body.classList.toggle('Header-dark-mode', newDarkMode);
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
      <ScrollToTopButton />
      <div className="Header-top-line position-sticky top-0 w-100">
        <Navbar
          expand="lg"
          className={`py-3 ${
            darkMode ? 'bg-dark text-light dark-mode' : 'bg-white text-dark'
          } Header-navbar-all${showFestivalNav ? '-active' : ''}`}
        >
          <Container
            fluid
            className="Header-header-container px-4"
            id="Header-headerContainer"
          >
            <Navbar.Brand
              as={NavLink}
              to="/"
              className={`${darkMode ? 'text-light' : 'text-dark'} d-flex
              align-items-center`}
            >
              <img
                src={`${darkMode ? ViVaFestaB : ViVaFestaW} `}
                alt="ViVaFesta"
                className="Header-logo align-content-center "
                height={30}
              />
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
                    <span
                      className={`${darkMode ? 'text-light' : 'text-dark'}`}
                    >
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
                  menuVariant={darkMode ? 'dark' : 'light'}
                >
                  <NavDropdown.Item
                    as={NavLink}
                    to="/qnaList"
                    className={darkMode ? 'text-light' : 'text-dark'}
                  >
                    QNA
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    to="/noticeList"
                    className={darkMode ? 'text-light' : 'text-dark'}
                  >
                    공지사항
                  </NavDropdown.Item>
                </NavDropdown>
                {userRole == '1' ? (
                  <Nav.Link
                    as={NavLink}
                    to="/manager/managerStats"
                    className={`${darkMode ? 'text-light' : 'text-dark'}`}
                  >
                    통계
                  </Nav.Link>
                ) : (
                  ''
                )}
              </Nav>

              <div className="d-flex align-items-center">
                {isAuthenticated ? (
                  <>
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
                      <NavDropdown.Item as={NavLink} to="/user/userMypage">
                        마이페이지
                      </NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/user/bookingList">
                        예매 내역 확인
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={Logout}>
                        로그아웃
                      </NavDropdown.Item>
                    </NavDropdown>
                    <div className="d-flex justify-content-end"></div>
                    <TokenRemain />
                    <ButtonRole
                      text="축제 추가하기"
                      role="manager"
                      onClick={() => {
                        navigate('/manager/managerEventInsert');
                      }}
                    />
                    <div className="position-relative me-3">
                      <FaCartPlus
                        size={24}
                        className={`${getDarkMode} ms-3 Header-cart-icon`}
                        onClick={() => navigate('/user/userCart')}
                      />

                      <Badge
                        pill
                        bg="success"
                        className="Header-notification-badge Header-cart-icon"
                        onClick={() => navigate('/user/userCart')}
                      >
                        {cart ? cart.length : 0}
                      </Badge>
                    </div>
                  </>
                ) : (
                  <div className="me-2">
                    <ButtonDarkMode text="로그인" onClick={handleLogin} />
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
          className={`Header-festival-nav ${
            darkMode ? 'bg-dark text-light' : 'bg-white text-dark'
          } ${
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
      </div>
    </>
  );
};

export default Header;
