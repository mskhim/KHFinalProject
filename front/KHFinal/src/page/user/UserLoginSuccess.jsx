import { useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  handleNaverCallback,
  handleKakaoCallback,
  handleLogin,
} from './userApi';
import { Context } from '../../Context';
const UserLoginSuccess = () => {
  const navigate = useNavigate();
  const { login } = useContext(Context);
  const handleSocialLogin = useCallback(
    async (provider, code, state) => {
      try {
        let data;
        if (provider === 'naver') {
          data = await handleNaverCallback(code, state);
        } else if (provider === 'kakao') {
          data = await handleKakaoCallback(code);
        } else if (provider === 'common') {
          data.isRegistered = true;
        }
        if (!data.isRegistered) {
          alert('회원가입이 필요합니다. 회원가입 페이지로 이동합니다.');
          sessionStorage.setItem('user', JSON.stringify(data.user)); // ✅ 세션 스토리지에 사용자 정보 저장
          navigate('/userInsert');
        } else {
          const userId = data.user.id;
          const response = await handleLogin(userId, provider); // ✅ JWT는 쿠키에 자동 저장됨
          const flag = response.success;
          if (flag) {
            login(response.nickname, response.role); // ✅ 로그인 상태로 변경
            // ✅ 로그인 성공 후, 이전 페이지로 이동
            if (response.role == 1) {
              navigate('/manager/managerStats');
              return;
            }
            if (response.role == 0) {
              navigate('/admin/adminMain');
              return;
            }
            const preLoginUrl = sessionStorage.getItem('preLoginUrl') || '/';
            navigate(preLoginUrl);
            sessionStorage.removeItem('preLoginUrl');
          } else {
            navigate('/userLoginPage');
          }
        }
      } catch (error) {
        console.error(`${provider} 콜백 처리 실패:`, error);
        alert('로그인 처리 중 오류가 발생했습니다.');
        navigate('/userLoginPage');
      }
    },
    [login, navigate]
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const provider = urlParams.get('provider');
    if (provider && code) {
      handleSocialLogin(provider, code, state);
    }
  });

  return <></>;
};

export default UserLoginSuccess;
