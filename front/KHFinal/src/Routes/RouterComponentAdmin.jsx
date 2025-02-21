import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../page/admin/include/Header';
import Aside from '../page/admin/include/Aside';
import '../page/admin/include/css/RouterComponentAdmin.css';
import {
  AdminMain,
  ManagerManage,
  UserManage,
  FestivalManage,
  ReviewManage,
  QnAManage,
  NoticeManage,
  BannerManage,
  ReservedManage,
  CanceledManage,
} from '../page/admin';
import { ProtectedRoute, Unauthorized } from '../components';

import { AdminLayout, ManagerLayout, UserLayout } from '../page/layout';

import NotFound from '../page/common/NotFound';
import { Container } from 'react-bootstrap';
import { checkAuthStatus, refreshAccessToken } from '../page/user/userApi';
import { useContext } from 'react';
import { Context } from '../Context';

const RouterComponentAdmin = () => {
  const location = useLocation();
  const [sectionName, setSectionName] = useState('');

  useEffect(() => {
    switch (location.pathname.split('/')[2]) {
      case 'adminmain':
        setSectionName('관리자 메인');
        break;
      case 'managermanage':
        setSectionName('매니저 관리');
        break;
      case 'usermanage':
        setSectionName('유저 관리');
        break;
      case 'festivalmanage':
        setSectionName('축제 관리');
        break;
      case 'reviewmanage':
        setSectionName('리뷰 관리');
        break;
      case 'qnamanage':
        setSectionName('Q&A 관리');
        break;
      case 'noticemanage':
        setSectionName('공지사항 관리');
        break;
      case 'bannermanage':
        setSectionName('배너 관리');
        break;
      case 'reservedmanage':
        setSectionName('예매내역 관리');
        break;
      case 'canceledmanage':
        setSectionName('취소내역 관리');
        break;
    }
  }, [location.pathname]);
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
    <Container fluid className="admin-app-container m-0 p-0">
      <Aside />
      <Container fluid className="admin-main-content m-0 p-0">
        <Header sectionName={sectionName} />
        <Container fluid className="admin-content ">
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
              <Route path="adminmain" element={<AdminMain />} />
              <Route path="managermanage" element={<ManagerManage />} />
              <Route path="usermanage" element={<UserManage />} />
              <Route path="festivalmanage" element={<FestivalManage />} />
              <Route path="reviewmanage" element={<ReviewManage />} />
              <Route path="qnamanage" element={<QnAManage />} />
              <Route path="noticemanage" element={<NoticeManage />} />
              <Route path="bannermanage" element={<BannerManage />} />
              <Route path="reservedmanage" element={<ReservedManage />} />
              <Route path="canceledmanage" element={<CanceledManage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Container>
      </Container>
    </Container>
  );
};

export default RouterComponentAdmin;
