import React from "react";
import "./css/Aside.css";
import { Link, NavLink } from "react-router";
import { Navbar, Nav } from "react-bootstrap";
import ViVaFesta from "../../../assets/vivafesta.png";

const Aside = () => {
  return (
    <Navbar className="admin-aside" fixed="top">
      <div className="admin-aside-brand">
        <h2>
          <NavLink to="/admin/adminmain" className="brand-link">
            <img
              src={ViVaFesta}
              alt="ViVaFesta"
              className="Header-logo align-content-center pb-1"
              height={20}
            />
          </NavLink>
          <hr />
        </h2>
      </div>
      <Nav className="admin-aside-nav flex-column ">
        <Nav.Link as={NavLink} to="/admin/managermanage">
          매니저 관리
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/usermanage">
          유저 관리
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/festivalmanage">
          축제 관리
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/reviewmanage">
          리뷰 관리
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/qnamanage">
          Q&A 관리
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/noticemanage">
          공지사항 관리
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/bannermanage">
          배너 관리
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/paymenthistorymanage">
          예매내역 관리
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/cancellationhistorymanage">
          취소내역 관리
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Aside;
