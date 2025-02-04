import React from "react";
import "./Aside.css";
import { Link } from "react-router";

const Aside = () => {
  return (
    <div className="admin-aside-sidebar">
      <div className="admin-aside-sidebar-brand">
        <h2>
          <Link to="/admin/adminmain">VIVA FESTA</Link>
        </h2>
      </div>
      <nav className="admin-aside-nav-menu">
        <ul>
          <li>
            <Link to="/admin/managermanage">매니저 관리</Link>
          </li>
          <li>
            <Link to="/admin/usermanage">유저 관리</Link>
          </li>
          <li>
            <Link to="/admin/festivalmanage">축제 관리</Link>
          </li>
          <li>
            <Link to="/admin/reviewmanage">리뷰 관리</Link>
          </li>
          <li>
            <Link to="/admin/qnamanage">Q&A 관리</Link>
          </li>
          <li>
            <Link to="/admin/noticemanage">공지사항 관리</Link>
          </li>
          <li>
            <Link to="/admin/bannermanage">배너 관리</Link>
          </li>
          <li>
            <Link to="/admin/paymenthistorymanage">예매내역 관리</Link>
          </li>
          <li>
            <Link to="/admin/stathistory">통계 내역</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Aside;
