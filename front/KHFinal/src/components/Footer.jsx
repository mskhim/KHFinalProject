import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import './Footer.css';
import { Context } from '../Context';
import CultureSportTour from '../assets/CultureSportTour.png';
import KoreaTourOrg from '../assets/KoreaTourOrg.png';
import tourAPI from '../assets/tourAPI.png';
import webCertification from '../assets/webCertification.png';
const Footer = () => {
  const { darkMode } = useContext(Context);
  return (
    <div
      className={`Footer-container-fluid p-5 my-5 ${
        darkMode ? 'bg-dark text-white' : 'Footer-light-mode'
      }`}
    >
      <div className="row Footer-row">
        <div className="col Footer-col">
          <a href="#">개인정보처리방침</a>
        </div>
        <div className="col Footer-col">
          <a href="#">이용약관</a>
        </div>
        <div className="col Footer-col">
          <a href="#">위치기반서비스 이용약관</a>
        </div>
        <div className="col Footer-col">
          <a href="#">저작권정책</a>
        </div>
        <div className="col Footer-col">
          <a href="#">전자우편무단수집거부</a>
        </div>
      </div>
      <br />
      <span>
        우)12345 경상북도 고령군 쌍쌍로 22 TEL : 010-123-4567 사업자등록번호 :
        101-01-20202
      </span>
      <div className="Footer-copyRight">
        <p>&copy;한국관광공사</p>
        <div>
          <a href="#">
            <img src={tourAPI }alt="#" />
          </a>
          <a href="#">
            <img
              src={webCertification}
              alt="#"
              className="Footer-webCertification"
            />
          </a>
          <a href="#">
            <img src={KoreaTourOrg} alt="#" />
          </a>
          <a href="#">
            <img src={CultureSportTour} alt="#" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
