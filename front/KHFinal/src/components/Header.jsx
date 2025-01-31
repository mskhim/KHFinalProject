import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      navigate('/');
    });
  };

  // 로그인 페이지 이동
  const handleLogin = () => {
    navigate('/userLoginPage');
  };

  return (
    <header>
      <div className="nav-menu">
        <a href="#">축제</a>
        <a href="#">축제지도</a>
        <a href="#">축제 달력</a>
        <a href="#">Q&A</a>
        <a href="#">공지사항</a>
      </div>
      <div className="login">
        {isAuthenticated ? (
          <button onClick={Logout}>로그아웃</button>
        ) : (
          <button onClick={handleLogin}>로그인</button>
        )}
      </div>
    </header>
  );
};

export default Header;
