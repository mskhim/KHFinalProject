import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom'; // ✅ NavLink 추가
import './Header.css';
import { handleLogout, checkAuthStatus } from '../page/user/userApi';

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // ✅ 로그인 상태 관리

  // 로그인 상태 확인
  useEffect(() => {
    checkAuthStatus().then((data) => {
      if (data.authenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  // 로그아웃 함수
  const Logout = () => {
    handleLogout().then(() => {
      setIsAuthenticated(false); // ✅ 로그인 상태 업데이트
    });
  };

  // 로그인 페이지 이동
  const handleLogin = () => {
    navigate('/userLoginPage');
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          🎉 축제 페이지
        </NavLink>

        {/* ✅ 네비게이션 메뉴 */}
        <nav className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/eventList">
            축제
          </NavLink>
          <NavLink className="nav-item nav-link" to="/eventMap">
            축제 지도
          </NavLink>
          <NavLink className="nav-item nav-link" to="/eventCalendar">
            축제 달력
          </NavLink>
          <NavLink className="nav-item nav-link" to="/qnaList">
            Q&A
          </NavLink>
          <NavLink className="nav-item nav-link" to="/noticeList">
            공지사항
          </NavLink>
        </nav>

        {/* ✅ 로그인 / 로그아웃 버튼 */}
        <div className="ml-auto">
          {isAuthenticated ? (
            <button className="btn btn-outline-light" onClick={Logout}>
              로그아웃
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleLogin}>
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
