import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiLogin from './components/ApiLogin';
import { checkAuthStatus } from './userApi.js'; // ✅ 로그인 상태 확인 API 호출
import { Context } from '../../Context';
import { Button } from 'react-bootstrap';




const UserLoginPage = () => {
  const { getDarkMode, getDarkModeHover } = useContext(Context);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  <div className="UserLoginPage-container">
    <h1 className="UserLoginPage-header">로그인</h1>

    <div className="UserLoginPage-form-container">
      {/* 아이디 입력 영역 */}
      <div className="UserLoginPage-input-group">
        <label htmlFor="id">아이디</label>
        <input
          type="text"
          id="id"
          className="UserLoginPage-input-field"
          placeholder="아이디"
        />
      </div>

      {/* 비밀번호 입력 영역 */}
      <div className="UserLoginPage-input-group">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          className="UserLoginPage-input-field"
          placeholder="비밀번호"
        />
      </div>
      </div>

      {/* 로그인 버튼 */}
      <div className="UserLoginPage-button-container">
        <Button 
        variant="none"
        className={`${getDarkModeHover()} w-100`}>로그인
        </Button>
      </div>

      {/* 외부 API 로그인 */}
      <div className="UserLoginPage-api-container">
        <ApiLogin /> {/* 외부 API 로그인 컴포넌트 */}
      </div>  
  </div>
  <Footer />
</>

  );
};

export default UserLoginPage;
