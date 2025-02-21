import { Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../components';
import { ManagerLayout } from '../page/layout';
import { ManagerMain, ManagerEventInsert, ManagerStats } from '../page/manager';
import NotFound from '../page/common/NotFound';
import ErrorBoundary from '../components/ErrorBoundary';
import { useContext, useEffect } from 'react';
import { Context } from '../Context';
import { checkAuthStatus, refreshAccessToken } from '../page/user/userApi';

const RouterComponentManager = () => {
  const location = useLocation(); // ✅ 현재 경로 가져오기
  useEffect(() => {
    if (
      location.pathname !== '/userLoginPage' &&
      location.pathname !== '/userLoginSuccess' &&
      location.pathname !== '/userInsert' &&
      location.pathname !== '/userInsertCommon'
    ) {
      sessionStorage.setItem(
        'preLoginUrl',
        location.pathname + location.search
      );
    }
  }, [location]); // ✅ 경로 변경 시마다 실행
  const { login, isAuthenticated } = useContext(Context);
  useEffect(() => {
    window.scrollTo(0, 0); // ✅ 페이지 로드 후 최상단 고정
    if (isAuthenticated) {
      return;
    }
    const checkAuth = async () => {
      const response = await checkAuthStatus();
      if (response.authenticated) {
        await refreshAccessToken();
        login(response.user.nickname, response.user.role);
      }
    };
    checkAuth();
  }, [login]);
  return (
    <ProtectedRoute requiredRole={1} endpoint="jwtManager">
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<ManagerLayout />}>
            <Route path="managerEventInsert" element={<ManagerEventInsert />} />
            <Route path="managerStats" element={<ManagerStats />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </ProtectedRoute>
  );
};

export default RouterComponentManager;
