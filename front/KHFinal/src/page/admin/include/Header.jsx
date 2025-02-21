import React, { useContext } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import './css/Header.css';
import { TokenRemain } from '../../../components/ui';
import { Context } from '../../../Context';
import { Button, NavDropdown, NavLink } from 'react-bootstrap';
import { BsChevronDown, BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { updatePublicData } from '../adminApi';

const Header = ({ sectionName }) => {
  const nav = useNavigate();
  const { tokenExpiration, userName, logout, darkMode } = useContext(Context);
  const Logout = () => {
    logout();
    nav('/');
  };

  const handleEventUpdate = () => {
    const update = async () => {
      await updatePublicData();
      alert('업데이트에 성공했습니다.');
    };
    update();
  };
  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <h3 className="ps-4">{sectionName}</h3>
      </div>
      <div className="admin-header-right">
        <div className="d-flex m-0 p-0">
          <TokenRemain initialExpiration={tokenExpiration} />
          <Button onClick={handleEventUpdate}>최신 공공데이터 갱신</Button>
        </div>
        <div className="ms-0">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
