import React from 'react';
import { getNaverAuthUrl, getKakaoAuthUrl } from '../userApi'; // 네이버와 카카오 API URL 가져오기
import btn_kakao from './btn_kakao.svg'; // 카카오 로그인 버튼 이미지 추가
import btn_naver from './btn_naver.svg'; // 네이버 로그인 버튼 이미지 추가
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
      <div className="social-login-button-container">
        <button 
        className="social-login-button naver-button"
        onClick={handleNaverLogin}>
          <img src={btn_naver} alt="Naver Logo" className="social-login-icon"
          style={{ width: '35px', height: 'auto' }}
          />
          <span>네이버 로그인</span>
        </button>
      </div>

      <div className="social-login-button-container">
        <button
        className="social-login-button kakao-button"
        onClick={handleKakaoLogin}>
          <img src={btn_kakao} alt="Kakao Logo" className="social-login-icon"
          style={{ width: '35px', height: 'auto' }}
          />
          <span>카카오 로그인</span>
        </button>
      </div>
    </div>
  );
}

export default ApiLogin;
