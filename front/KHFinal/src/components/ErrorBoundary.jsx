import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate(); // ✅ useNavigate 직접 사용

  useEffect(() => {
    if (hasError) {
      setTimeout(() => {
        navigate('/'); // ✅ 3초 후 홈으로 이동
      }, 3000);
    }
  }, [hasError, navigate]);

  return hasError ? (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>🚨 오류 발생</h1>
      <p>잠시 후 홈으로 이동합니다...</p>
    </div>
  ) : (
    children
  );
};

export default ErrorBoundary;
