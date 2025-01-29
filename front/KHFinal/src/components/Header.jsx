import React, { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  // userJwt 상태 관리
  const [userJwt, setUserJwt] = useState(localStorage.getItem("userJwt"));
  useEffect(() => {
    const jwt = localStorage.getItem("userJwt");
    setUserJwt(jwt); // 로컬 스토리지 값으로 상태 초기화
  }, []);
  // 로그아웃 함수
  const handleLogout = () => {
    alert(userJwt + "님, 로그아웃 되었습니다.");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userJwt");
    localStorage.removeItem("userInfo");
    setUserJwt(null);

    // 네이버 로그아웃 후 메인 페이지로 리다이렉트
    const redirectUrl = encodeURIComponent("http://localhost:3000/");
    const naverLogoutUrl = `https://nid.naver.com/nidlogin.logout?returl=${redirectUrl}`;
    window.open(naverLogoutUrl, "_self"); // 새 창이 아니라 현재 창에서 열기
  };

  // 로그인 함수 (로그인 페이지 이동 로직 추가 가능)
  const handleLogin = () => {
    alert("로그인 페이지로 이동합니다.");
    // 로그인 페이지로 이동 로직
    window.location.href = "/userLoginPage";
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
        {userJwt === null ? (
          <button onClick={handleLogin}>로그인</button>
        ) : (
          <button onClick={handleLogout}>로그아웃</button>
        )}
      </div>
    </header>
  );
};

export default Header;
