import { memo, useContext, useEffect, useState, useCallback } from 'react';
import { Context } from '../../Context';
import ButtonDarkMode from './ButtonDarkMode';
import { refreshAccessToken } from '../../page/user/userApi';
import { useNavigate } from 'react-router-dom';

const TokenRemain = () => {
  const { loginTime, setLoginTime, logout, userRole } = useContext(Context);
  const nav = useNavigate();
  // ✅ 15분 (900초) 기준으로 남은 시간 계산
  const getRemainingTime = useCallback(() => {
    if (!loginTime) return 0;
    const currentTime = Math.floor(Date.now() / 1000);
    return Math.max(900 - (currentTime - loginTime), 0);
  }, [loginTime]);

  // ✅ 남은 시간 상태 관리
  const [tokenExpiration, setTokenExpiration] = useState(getRemainingTime);

  // ✅ 1초마다 토큰 만료 시간 업데이트
  useEffect(() => {
    if (!loginTime) return;

    const timer = setInterval(() => {
      const remainingTime = getRemainingTime();
      setTokenExpiration(remainingTime);

      if (remainingTime === 0) {
        if (userRole == 0) {
          logout(); // ✅ 시간이 0이 되면 자동 로그아웃
          nav('/');
        } else {
          logout(); // ✅ 시간이 0이 되면 자동 로그아웃
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [loginTime, getRemainingTime, logout, userRole, nav]); // ✅ loginTime 변경 시만 실행

  // ⏳ 남은 시간을 분:초 형식으로 변환
  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0'
    )}`;
  }, []);

  // ✅ 토큰 연장 함수
  const extendToken = useCallback(() => {
    const newLoginTime = Math.floor(Date.now() / 1000);
    setLoginTime(newLoginTime);
    sessionStorage.setItem('loginTime', newLoginTime.toString());
    setTokenExpiration(900);
    refreshAccessToken();
    alert('토큰이 연장되었습니다.');
  }, [setLoginTime]);

  return (
    <div className="token-remain d-flex align-items-center">
      <span className="token-remain__text">남은 시간 :&nbsp;</span>
      <span
        className="token-remain__time me-2 width-50"
        style={{ minWidth: '60px', textAlign: 'center' }}
      >
        {formatTime(tokenExpiration)}
      </span>

      <div className="me-3">
        <ButtonDarkMode onClick={extendToken} text="연장하기"></ButtonDarkMode>
      </div>
    </div>
  );
};

export default memo(TokenRemain);
