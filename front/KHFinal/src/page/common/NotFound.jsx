import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const preUrl = sessionStorage.getItem('preLoginUrl');
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>페이지를 찾을 수 없습니다 😢</h2>
      <p>잘못된 URL을 입력하셨거나, 해당 페이지가 존재하지 않습니다.</p>
      <Link to={preUrl}>이전 페이지로 이동</Link>
    </div>
  );
};

export default NotFound;
