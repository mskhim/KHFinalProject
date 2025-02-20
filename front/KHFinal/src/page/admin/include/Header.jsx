import React, { useContext } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import './css/Header.css';
import { TokenRemain } from '../../../components/ui';
import { Context } from '../../../Context';
import { NavDropdown, NavLink } from 'react-bootstrap';
import { BsChevronDown, BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Header = ({ sectionName }) => {
  const nav = useNavigate();
  const { tokenExpiration, userName, logout, darkMode } = useContext(Context);
  const Logout = () => {
    logout();
    nav('/');
  };
  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <h3>{sectionName}</h3>
      </div>
      <div className="admin-header-right">
        <NavDropdown
          title={
            <span className="d-flex align-items-center Header-user-info">
              <BsPersonCircle
                size={24}
                className={`me-2 ${darkMode ? 'text-light' : 'text-dark'}`}
              />
              <BsChevronDown
                size={16}
                className={`ms-1 Header-dropdown-icon ${
                  darkMode ? 'text-light' : 'text-dark'
                }`}
              />
            </span>
          }
          id="Header-user-dropdown"
          align="end"
          className="Header-user-dropdown"
        >
          <NavDropdown.Item onClick={Logout}>로그아웃</NavDropdown.Item>
        </NavDropdown>
        <TokenRemain initialExpiration={tokenExpiration} />
      </div>
    </header>
  );
};

export default Header;
