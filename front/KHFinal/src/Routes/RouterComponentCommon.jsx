import { Routes, Route, useLocation } from 'react-router-dom';
import CommonLayout from '../page/layout/CommonLayout';
import Main from '../page/main/Main';
import EventList from '../page/event/EventList';
import EventRead from '../page/event/EventRead';
import EventCalendar from '../page/eventCalendar/EventCalendar';
import EventMap from '../page/eventMap/EventMap';
import NoticeList from '../page/notice/NoticeList';
import NoticeRead from '../page/notice/NoticeRead';
import QnaList from '../page/qna/QnaList';
import QnaInsert from '../page/qna/QnaInsert';
import QnaModify from '../page/qna/QnaModify';
import QnaRead from '../page/qna/QnaRead';
import QnaReInsert from '../page/qna/QnaReInsert';
import UserLoginPage from '../page/user/UserLoginPage';
import UserLoginSuccess from '../page/user/UserLoginSuccess';
import UserInsert from '../page/user/UserInsert';
import UserInsertCommon from '../page/user/UserInsertCommon';
import UserFind from '../page/user/UserFind';
import Unauthorized from '../components/Unauthorized';
import NotFound from '../page/common/NotFound';
import { useEffect } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

const RouterComponentCommon = () => {
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
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          {/* 메인 페이지 */}
          <Route index element={<Main />} />
          {/* 이벤트 관련 페이지 */}
          <Route path="eventList" element={<EventList />} />
          <Route path="eventRead/:no" element={<EventRead />} />
          <Route path="eventCalendar" element={<EventCalendar />} />
          <Route path="eventMap" element={<EventMap />} />
          {/* 공지사항 관련 페이지 */}
          <Route path="noticeList" element={<NoticeList />} />
          <Route path="noticeRead/:no" element={<NoticeRead />} />
          {/* QnA 관련 페이지 */}
          <Route path="qnaList" element={<QnaList />} />
          <Route path="qnaInsert" element={<QnaInsert />} />
          <Route path="qnaModify/:no" element={<QnaModify />} />
          <Route path="qnaRead/:no" element={<QnaRead />} />
          <Route path="qnaReInsert/:no" element={<QnaReInsert />} />
          {/* 유저 관련 인증/가입 페이지 */}
          <Route path="userLoginPage" element={<UserLoginPage />} />
          <Route path="userLoginSuccess" element={<UserLoginSuccess />} />
          <Route path="userInsert" element={<UserInsert />} />
          <Route path="userFind" element={<UserFind />} />
          <Route path="UserInsertCommon" element={<UserInsertCommon />} />
          {/* 권한 없음 페이지 */}
          <Route path="unauthorized" element={<Unauthorized />} />
          {/* 존재하지 않는 페이지 (404) */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default RouterComponentCommon;
