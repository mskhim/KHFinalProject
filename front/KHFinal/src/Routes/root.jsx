import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Loading from '../page/Loading';

const Main = lazy(() => import('../page/main/Main'));
const EventList = lazy(() => import('../page/event/EventList'));
const EventRead = lazy(() => import('../page/event/EventRead'));
const EventCalendar = lazy(() => import('../page/eventCalendar/EventCalendar'));
const EventMap = lazy(() => import('../page/eventMap/EventMap'));
const NoticeList = lazy(() => import('../page/notice/NoticeList'));
const NoticeRead = lazy(() => import('../page/notice/NoticeRead'));
const QnaList = lazy(() => import('../page/qna/QnaList'));
const QnaInsert = lazy(() => import('../page/qna/QnaInsert'));
const QnaModify = lazy(() => import('../page/qna/QnaModify'));
const QnaRead = lazy(() => import('../page/qna/QnaRead'));
const QnaReInsert = lazy(() => import('../page/qna/QnaReInsert'));

const UserLoginPage = lazy(() => import('../page/user/UserLoginPage'));
const UserLoginSuccess = lazy(() => import('../page/user/UserLoginSuccess'));
const UserInsert = lazy(() => import('../page/user/UserInsert'));
const UserCart = lazy(() => import('../page/user/UserCart'));
const UserMypage = lazy(() => import('../page/user/UserMypage'));
const UserReservedList = lazy(() => import('../page/user/UserReservedList'));
const BookingList = lazy(() => import('../page/user/BookingList'));

const Unauthorized = lazy(() => import('../components/Unauthorized'));
const NotFound = lazy(() => import('../page/common/NotFound'));

const AdminRoutes = lazy(() => import('./RouterComponentAdmin'));
const ManagerRoutes = lazy(() => import('./RouterComponentManager'));
const UserRoutes = lazy(() => import('./RouterComponentUser'));

const root = createBrowserRouter([
  // ✅ 메인 페이지
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Main />
      </Suspense>
    ),
  },

  // ✅ 이벤트 관련 페이지
  {
    path: '/eventList',
    element: (
      <Suspense fallback={<Loading />}>
        <EventList />
      </Suspense>
    ),
  },
  {
    path: '/eventRead/:no',
    element: (
      <Suspense fallback={<Loading />}>
        <EventRead />
      </Suspense>
    ),
  },
  {
    path: '/eventCalendar',
    element: (
      <Suspense fallback={<Loading />}>
        <EventCalendar />
      </Suspense>
    ),
  },
  {
    path: '/eventMap',
    element: (
      <Suspense fallback={<Loading />}>
        <EventMap />
      </Suspense>
    ),
  },

  // ✅ 공지사항 관련 페이지
  {
    path: '/noticeList',
    element: (
      <Suspense fallback={<Loading />}>
        <NoticeList />
      </Suspense>
    ),
  },
  {
    path: '/noticeRead/:no',
    element: (
      <Suspense fallback={<Loading />}>
        <NoticeRead />
      </Suspense>
    ),
  },

  // ✅ QnA 관련 페이지
  {
    path: '/qnaList',
    element: (
      <Suspense fallback={<Loading />}>
        <QnaList />
      </Suspense>
    ),
  },
  {
    path: '/qnaInsert',
    element: (
      <Suspense fallback={<Loading />}>
        <QnaInsert />
      </Suspense>
    ),
  },
  {
    path: '/qnaModify/:no',
    element: (
      <Suspense fallback={<Loading />}>
        <QnaModify />
      </Suspense>
    ),
  },
  {
    path: '/qnaRead/:no',
    element: (
      <Suspense fallback={<Loading />}>
        <QnaRead />
      </Suspense>
    ),
  },
  {
    path: '/qnaReInsert/:no',
    element: (
      <Suspense fallback={<Loading />}>
        <QnaReInsert />
      </Suspense>
    ),
  },

  // ✅ 유저 관련 페이지
  {
    path: '/userLoginPage',
    element: (
      <Suspense fallback={<Loading />}>
        <UserLoginPage />
      </Suspense>
    ),
  },
  {
    path: '/userLoginSuccess',
    element: (
      <Suspense fallback={<Loading />}>
        <UserLoginSuccess />
      </Suspense>
    ),
  },
  {
    path: '/userInsert',
    element: (
      <Suspense fallback={<Loading />}>
        <UserInsert />
      </Suspense>
    ),
  },

  // ✅ 유저 내부 페이지
  {
    path: '/user/*',
    element: (
      <Suspense fallback={<Loading />}>
        <UserRoutes />
      </Suspense>
    ),
  },

  // ✅ 매니저 관련 페이지
  {
    path: '/manager/*',
    element: (
      <Suspense fallback={<Loading />}>
        <ManagerRoutes />
      </Suspense>
    ),
  },

  // ✅ 관리자 관련 페이지
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
