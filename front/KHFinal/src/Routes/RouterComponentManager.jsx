import { Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../components';
import { ManagerLayout } from '../page/layout';
import { ManagerMain, ManagerEventInsert, ManagerStats } from '../page/manager';
import NotFound from '../page/common/NotFound';
import ErrorBoundary from '../components/ErrorBoundary';
import { useEffect } from 'react';

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
