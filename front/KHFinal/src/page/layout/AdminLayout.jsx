import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      {/* 중첩된 라우트를 렌더링 */}
      <Outlet />
    </div>
  );
};

export default AdminLayout;
