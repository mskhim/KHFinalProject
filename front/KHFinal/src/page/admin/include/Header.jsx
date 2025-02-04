import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "./Header.css";

const Header = ({ sectionName }) => {
  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <h3>{sectionName}</h3>
      </div>
      <div className="admin-header-right">
        <div className="admin-header-notifications">
          <FaBell size={20} />
          <span className="admin-header-badge">3</span>
        </div>
        <div className="admin-header-user-profile">
          <FaUserCircle size={24} />
          <span>로그아웃</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
