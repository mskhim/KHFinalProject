import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, endpoint }) => {
  const [isAuthorized, setIsAuthorized] = useState(null); // ✅ 권한 여부 상태
  const [isLoading, setIsLoading] = useState(true); // ✅ 로딩 상태

  useEffect(() => {
    // ✅ 서버에 로그인 상태 및 접근 권한 확인 요청 (JWT는 쿠키에서 자동 전송됨)
    fetch(`http://localhost:8080/auth/${endpoint}`, {
      method: 'GET',
      credentials: 'include', // ✅ 쿠키를 자동 포함하여 요청
    })
      .then((response) => {
        setIsAuthorized(response.ok); // ✅ HTTP 응답 상태가 200 OK이면 true, 아니면 false
      })
      .catch(() => {
        setIsAuthorized(false); // ❌ 요청 실패 시 권한 없음 처리
      })
      .finally(() => {
        setIsLoading(false); // ✅ 로딩 종료
      });
  }, [endpoint]);

  if (isLoading) return <div>로딩 중...</div>; // ✅ 로딩 상태 표시
  if (!isAuthorized) return <Navigate to="/unauthorized" />; // ❌ 권한 없으면 리디렉트

  return <>{children}</>; // ✅ 권한이 있으면 자식 컴포넌트 렌더링
};

export default ProtectedRoute;
