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
import Payment from '../components/Payment';
import PaymentSuccess from '../components/PaymentSuccess';
import PaymentFail from '../components/PaymentFail';

const UserRoutes = () => {
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
    <ProtectedRoute requiredRole={2} endpoint="jwtUser">
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route path="userCart" element={<UserCart />} />
            <Route path="userMypage" element={<UserMypage />} />
            <Route path="userReservedList" element={<UserReservedList />} />
            <Route path="bookingList" element={<BookingList />} />
            <Route path="payment" element={<Payment />} />
            <Route path="paymentSuccess" element={<PaymentSuccess />} />
            <Route path="paymentFail" element={<PaymentFail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </ProtectedRoute>
  );
};

export default UserRoutes;
