import { Routes, Route, useLocation } from 'react-router-dom';
import CommonLayout from '../page/layout/CommonLayout';
import { lazy, useEffect, useContext, Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import { Context } from '../Context';
import { checkAuthStatus, refreshAccessToken } from '../page/user/userApi';
import Loading from '../page/Loading';

// ✅ 나머지 페이지는 레이지 로딩 유지
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
const UserInsertCommon = lazy(() => import('../page/user/UserInsertCommon'));
const UserFind = lazy(() => import('../page/user/UserFind'));
const Unauthorized = lazy(() => import('../components/Unauthorized'));
const NotFound = lazy(() => import('../page/common/NotFound'));
const Main = lazy(() => import('../page/main/Main'));

const RouterComponentCommon = () => {
  const { login, isAuthenticated } = useContext(Context);
  const location = useLocation();

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
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0); // ✅ 페이지 로드 후 최상단 고정
    if (isAuthenticated) return;

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
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <Main />
              </Suspense>
            }
          />

          {/* ✅ 레이지 로딩이 적용된 페이지들 */}
          <Route
            path="eventList"
            element={
              <Suspense fallback={<Loading />}>
                <EventList />
              </Suspense>
            }
          />
          <Route
            path="eventRead/:no"
            element={
              <Suspense fallback={<Loading />}>
                <EventRead />
              </Suspense>
            }
          />
          <Route
            path="eventCalendar"
            element={
              <Suspense fallback={<Loading />}>
                <EventCalendar />
              </Suspense>
            }
          />
          <Route
            path="eventMap"
            element={
              <Suspense fallback={<Loading />}>
                <EventMap />
              </Suspense>
            }
          />
          <Route
            path="noticeList"
            element={
              <Suspense fallback={<Loading />}>
                <NoticeList />
              </Suspense>
            }
          />
          <Route
            path="noticeRead/:no"
            element={
              <Suspense fallback={<Loading />}>
                <NoticeRead />
              </Suspense>
            }
          />
          <Route
            path="qnaList"
            element={
              <Suspense fallback={<Loading />}>
                <QnaList />
              </Suspense>
            }
          />
          <Route
            path="qnaInsert"
            element={
              <Suspense fallback={<Loading />}>
                <QnaInsert />
              </Suspense>
            }
          />
          <Route
            path="qnaModify/:no"
            element={
              <Suspense fallback={<Loading />}>
                <QnaModify />
              </Suspense>
            }
          />
          <Route
            path="qnaRead/:no"
            element={
              <Suspense fallback={<Loading />}>
                <QnaRead />
              </Suspense>
            }
          />
          <Route
            path="qnaReInsert/:no"
            element={
              <Suspense fallback={<Loading />}>
                <QnaReInsert />
              </Suspense>
            }
          />
          <Route
            path="userLoginPage"
            element={
              <Suspense fallback={<Loading />}>
                <UserLoginPage />
              </Suspense>
            }
          />
          <Route
            path="userLoginSuccess"
            element={
              <Suspense fallback={<Loading />}>
                <UserLoginSuccess />
              </Suspense>
            }
          />
          <Route
            path="userInsert"
            element={
              <Suspense fallback={<Loading />}>
                <UserInsert />
              </Suspense>
            }
          />
          <Route
            path="userFind"
            element={
              <Suspense fallback={<Loading />}>
                <UserFind />
              </Suspense>
            }
          />
          <Route
            path="UserInsertCommon"
            element={
              <Suspense fallback={<Loading />}>
                <UserInsertCommon />
              </Suspense>
            }
          />
          <Route
            path="unauthorized"
            element={
              <Suspense fallback={<Loading />}>
                <Unauthorized />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default RouterComponentCommon;
