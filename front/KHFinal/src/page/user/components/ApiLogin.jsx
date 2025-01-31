import React from 'react';
import { getNaverAuthUrl, getKakaoAuthUrl } from '../userApi'; // 네이버와 카카오 API URL 가져오기
import BtnNaverLogin from './btnNaverLogin.png';
import BtnKakaoLogin from './btnKakaoLogin.png'; // 카카오 로그인 버튼 이미지 추가
import './ApiLogin.css'; // 스타일 파일 추가

function ApiLogin() {
  // 네이버 로그인
  const handleNaverLogin = async () => {
    try {
      const authUrl = await getNaverAuthUrl();
      window.location.href = authUrl; // 네이버 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error('네이버 로그인 URL 가져오기 실패:', error);
    }
  };

  // 카카오 로그인
  const handleKakaoLogin = async () => {
    try {
      const authUrl = await getKakaoAuthUrl(); // 카카오 인증 URL 가져오기
      window.location.href = authUrl; // 카카오 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error('카카오 로그인 URL 가져오기 실패:', error);
    }
  };

  return (
    <div className="api-login-container">
      <img
        src={BtnNaverLogin}
        alt="네이버 로그인 버튼"
        className="login-button"
        onClick={handleNaverLogin}
      />
      <img
        src={BtnKakaoLogin}
        alt="카카오 로그인 버튼"
        className="login-button"
        onClick={handleKakaoLogin}
      />
    </div>
  );
}

export default ApiLogin;
