import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

const ManagerLayout = () => {
  return (
    <div>
      {/* 중첩된 라우트를 렌더링 */}
      <Outlet />
    </div>
  );
};

export default ManagerLayout;
