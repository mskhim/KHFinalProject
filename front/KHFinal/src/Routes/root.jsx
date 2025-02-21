import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Loading from '../page/Loading';
import RouterComponentCommon from './RouterComponentCommon'; // ✅ lazy() 제거하고 일반 import 사용

const Unauthorized = lazy(() => import('../components/Unauthorized'));
const NotFound = lazy(() => import('../page/common/NotFound'));

const AdminRoutes = lazy(() => import('./RouterComponentAdmin'));
const ManagerRoutes = lazy(() => import('./RouterComponentManager'));
const UserRoutes = lazy(() => import('./RouterComponentUser'));

const root = createBrowserRouter([
  // ✅ 일반 페이지 (메인 페이지 포함)
  {
    path: '/*',
    element: <RouterComponentCommon />, // ✅ Suspense 제거 (즉시 로드됨)
  },

  // ✅ 유저 내부 페이지 레이아웃
  {
    path: '/user/*',
    element: (
      <Suspense fallback={<Loading />}>
        <UserRoutes />
      </Suspense>
    ),
  },

  // ✅ 매니저 관련 페이지 레이아웃
  {
    path: '/manager/*',
    element: (
      <Suspense fallback={<Loading />}>
        <ManagerRoutes />
      </Suspense>
    ),
  },

  // ✅ 관리자 관련 페이지 레이아웃
  {
    path: '/admin/*',
    element: (
      <Suspense fallback={<Loading />}>
        <AdminRoutes />
      </Suspense>
    ),
  },

  // ✅ 권한 없음 페이지
  {
    path: '/unauthorized',
    element: (
      <Suspense fallback={<Loading />}>
        <Unauthorized />
      </Suspense>
    ),
  },

  // ✅ 존재하지 않는 페이지 (404)
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default root;
