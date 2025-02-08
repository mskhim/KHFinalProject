import { Routes, Route, Outlet } from 'react-router-dom';
import { ProtectedRoute } from '../components';
import { UserLayout } from '../page/layout';
import {
  UserCart,
  UserMypage,
  UserReservedList,
  BookingList,
} from '../page/user';
import NotFound from '../page/common/NotFound';

const UserRoutes = () => {
  return (
    <ProtectedRoute requiredRole={2} endpoint="jwtUser">
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path="userCart" element={<UserCart />} />
          <Route path="userMypage" element={<UserMypage />} />
          <Route path="userReservedList" element={<UserReservedList />} />
          <Route path="bookingList" element={<BookingList />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ProtectedRoute>
  );
};

export default UserRoutes;
