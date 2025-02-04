import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  AdminCarousel,
  AdminEventPermit,
  AdminMain,
  AdminManagerInsert,
  AdminManagerList,
  AdminNoticeInsert,
  AdminNoticeList,
  AdminNoticeModify,
  AdminNoticeRead,
  AdminStats,
  AdminUserManage,
} from './page/admin';
import { ProtectedRoute, Unauthorized } from './components';
import { EventList, EventRead } from './page/event';
import { EventCalendar } from './page/eventCalendar';
import { EventMap } from './page/eventMap';
import { AdminLayout, ManagerLayout, UserLayout } from './page/layout';
import { Main } from './page/main';
import { ManagerMain, ManagerEventInsert, ManagerStats } from './page/manager';
import { NoticeList, NoticeRead } from './page/notice';
import {
  QnaInsert,
  QnaList,
  QnaModify,
  QnaReInsert,
  QnaRead,
} from './page/qna';
import {
  UserCart,
  UserDelete,
  UserInsert,
  UserLoginPage,
  UserLoginSuccess,
  UserMypage,
  UserReservedList,
  UserUpdate,
} from './page/user';

const RouterComponentAdmin = () => {
  return (
    <Routes>
      {/* ✅ 관리자 페이지 */}
      <Route
        path="/*"
        element={
          <ProtectedRoute requiredRole={0} endpoint="jwtAdmin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="adminStats" element={<AdminStats />} />
        <Route path="adminCarousel" element={<AdminCarousel />} />
        <Route path="adminEventPermit" element={<AdminEventPermit />} />
        <Route path="adminManagerInsert" element={<AdminManagerInsert />} />
        <Route path="adminManagerList" element={<AdminManagerList />} />
        <Route path="adminNoticeInsert" element={<AdminNoticeInsert />} />
        <Route path="adminNoticeList" element={<AdminNoticeList />} />
        <Route path="adminNoticeModify/:no" element={<AdminNoticeModify />} />
        <Route path="adminNoticeRead/:no" element={<AdminNoticeRead />} />
        <Route path="adminUserManage" element={<AdminUserManage />} />
        <Route path="adminMain" element={<AdminMain />} />
      </Route>
    </Routes>
  );
};

export default RouterComponentAdmin;
