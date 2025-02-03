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

const RouterComponent = () => {
  const location = useLocation(); // ✅ 현재 경로 가져오기
  useEffect(() => {
    if (
      location.pathname !== '/userLoginPage' &&
      location.pathname !== '/userLoginSuccess'
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
    <Routes>
      {/* ✅ 메인 페이지 */}
      <Route path="/" element={<Main />} />

      {/* ✅ 로그인 관련 */}
      <Route path="/userLoginPage" element={<UserLoginPage />} />
      <Route path="/userLoginSuccess" element={<UserLoginSuccess />} />
      <Route path="/userInsert" element={<UserInsert />} />

      {/* ✅ 이벤트 관련 */}
      <Route path="/eventCalendar" element={<EventCalendar />} />
      <Route path="/eventMap" element={<EventMap />} />
      <Route path="/eventList" element={<EventList />} />
      <Route path="/eventRead/:id" element={<EventRead />} />

      {/* ✅ 공지사항 관련 */}
      <Route path="/noticeList" element={<NoticeList />} />
      <Route path="/noticeRead/:id" element={<NoticeRead />} />

      {/* ✅ QnA 관련 */}
      <Route path="/qnaList" element={<QnaList />} />
      <Route path="/qnaInsert" element={<QnaInsert />} />
      <Route path="/qnaModify/:id" element={<QnaModify />} />
      <Route path="/qnaRead/:id" element={<QnaRead />} />
      <Route path="/qnaReInsert/:id" element={<QnaReInsert />} />

      {/* ✅ 권한 없을 때 */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* ✅ 관리자 페이지 */}
      <Route
        path="/admin/*"
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
        <Route path="adminNoticeModify/:id" element={<AdminNoticeModify />} />
        <Route path="adminNoticeRead/:id" element={<AdminNoticeRead />} />
        <Route path="adminUserManage" element={<AdminUserManage />} />
        <Route path="adminMain" element={<AdminMain />} />
      </Route>

      {/* ✅ 매니저 페이지 */}
      <Route
        path="/manager/*"
        element={
          <ProtectedRoute requiredRole={1} endpoint="jwtManager">
            <ManagerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="managerMain" element={<ManagerMain />} />
        <Route path="managerEventInsert" element={<ManagerEventInsert />} />
        <Route path="managerStats" element={<ManagerStats />} />
      </Route>

      {/* ✅ 유저 페이지 */}
      <Route
        path="/user/*"
        element={
          <ProtectedRoute requiredRole={2} endpoint="jwtUser">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="userCart" element={<UserCart />} />
        <Route path="userMypage" element={<UserMypage />} />
        <Route path="userReservedList" element={<UserReservedList />} />
        <Route path="userUpdate" element={<UserUpdate />} />
        <Route path="UserDelete" element={<UserDelete />} />
      </Route>
    </Routes>
  );
};

export default RouterComponent;
