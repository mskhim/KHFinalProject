import React, { useEffect } from "react";
import "./Header.css";

const Header = () => {
  useEffect(() => {
    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        alert("로그인 페이지로 이동합니다.");
        // 로그인 페이지로 이동 로직 추가
      });
    }
  }, []);

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
        <button id="login-btn">로그인</button>
      </div>
    </header>
  );
};

export default Header;
