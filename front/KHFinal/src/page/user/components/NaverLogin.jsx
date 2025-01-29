import React, { useEffect } from "react";
import { getAuthUrl, handleCallback } from "../userApi";
import BtnNaverLogin from "./btnNaverLogin.png";
import { Navigate } from "react-router-dom";
function NaverLogin() {
  useEffect(() => {
    const nav = Navigate;
    // URL에 code와 state가 있는 경우 콜백 처리
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code"); // 인증 코드
    const state = urlParams.get("state"); // state 값

    if (code && state) {
      handleCallback(code, state)
        .then((data) => {
          console.log("사용자 정보:", data); // 사용자 정보 출력
          // window.location.href = "/"; // 메인 페이지로 이동
        })
        .catch((error) => {
          console.error("콜백 처리 실패:", error);
        });
    }
  }, []);

  const handleLogin = async () => {
    try {
      const authUrl = await getAuthUrl();
      window.location.href = authUrl; // 네이버 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error("네이버 로그인 URL 가져오기 실패:", error);
    }
  };

  return (
    <div>
      <h1>네이버 로그인</h1>
      <img src={BtnNaverLogin} alt="My Image" onClick={handleLogin} />
    </div>
  );
}

export default NaverLogin;
