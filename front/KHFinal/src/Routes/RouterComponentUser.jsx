import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../components';
import { UserLayout } from '../page/layout';
import {
  UserCart,
  UserMypage,
  UserReservedList,
  BookingList,
} from '../page/user';
import NotFound from '../page/common/NotFound';
import { useEffect } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

const UserRoutes = () => {
  const location = useLocation(); // ✅ 현재 경로 가져오기
  useEffect(() => {
    if (
      location.pathname !== '/userLoginPage' &&
      location.pathname !== '/userLoginSuccess' &&
      location.pathname !== '/userInsert'
    ) {
      sessionStorage.setItem(
        'preLoginUrl',
        location.pathname + location.search
      );
      console.log(
        '🔍 저장된 이전 페이지:',
        sessionStorage.getItem('preLoginUrl')
      );
    }
  }, [location]); // ✅ 경로 변경 시마다 실행
  return (
    <ProtectedRoute requiredRole={2} endpoint="jwtUser">
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route path="userCart" element={<UserCart />} />
            <Route path="userMypage" element={<UserMypage />} />
            <Route path="userReservedList" element={<UserReservedList />} />
            <Route path="bookingList" element={<BookingList />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </ProtectedRoute>
  );
};

export default UserRoutes;
