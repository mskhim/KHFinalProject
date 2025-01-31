import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiLogin from './components/ApiLogin';
import { checkAuthStatus } from './userApi.js'; // ✅ 로그인 상태 확인 API 호출

const UserLoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ✅ 이전 페이지 URL 저장 (document.referrer에서 경로 추출)
    if (sessionStorage.getItem('preLoginUrl') === null) {
      const referrerUrl = document.referrer ? new URL(document.referrer) : null;
      const path = referrerUrl
        ? referrerUrl.pathname + referrerUrl.search
        : '/';
      sessionStorage.setItem('preLoginUrl', path);
    }
    // ✅ 로그인 상태 확인
    checkAuthStatus()
      .then((data) => {
        if (data.authenticated) {
          const preLoginUrl = sessionStorage.getItem('preLoginUrl') || '/';
          navigate(preLoginUrl); // ✅ 로그인 상태면 이전 페이지로 이동
        }
      })
      .finally(() => setIsLoading(false)); // ✅ 로딩 완료
  }, [navigate]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <Header />
      <h1>UserLoginPage</h1>
      <ApiLogin />
      <Footer />
    </>
  );
};

export default UserLoginPage;
