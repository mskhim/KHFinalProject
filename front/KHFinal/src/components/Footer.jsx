import React from 'react';
import { Container } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <div className="container-fluid p-5 my-5 bg-dark text-white">
      <div className="sns">
        <a href="https://www.instagram.com/">
          <img src="src/image/insta.png" alt="instagram" />
          instagram
        </a>
        <a href="https://www.facebook.com/">
          <img src="src/image/facebook.png" alt="facebook" />
          Facebook
        </a>
        <a href="https://story.kakao.com/">
          <img src="src/image/kakaostory.png" alt="kakaostory" />
          kakaostory
        </a>
        <a href="https://x.com/">
          <img src="src/image/x.png" alt="x" />X
        </a>
        <a href="https://www.line.me/ko/">
          <img src="src/image/line.png" alt="line" />
          line
        </a>
        <a href="https://www.youtube.com/">
          <img src="src/image/youtube.png" alt="youtube" />
          youtube
        </a>
      </div>
      <div class="row" className="row">
        <div class="col">
          <a href="#">개인정보처리방침</a>
        </div>
        <div class="col">
          <a href="#">이용약관</a>
        </div>
        <div class="col">
          <a href="#">위치기반서비스 이용약관</a>
        </div>
        <div class="col">
          <a href="#">저작권정책</a>
        </div>
        <div class="col">
          <a href="#">전자우편무단수집거부</a>
        </div>
      </div>
      <span>
        {' '}
        우)12345 경상북도 고령군 쌍쌍로 22 TEL : 010-123-4567 사업자등록번호 :
        101-01-20202
      </span>
      <div className="copyRight">
        <p>&copy;한국관광공사</p>
        <div>
          <a href="#">
            <img src="src/image/tourAPI.png" alt="#" />
          </a>
          <a href="#">
            <img
              src="src/image/webCertification.png"
              alt="#"
              className="webCertification"
            />
          </a>
          <a href="#">
            <img src="src/image/KoreaTourOrg.png" alt="#" />
          </a>
          <a href="#">
            <img src="src/image/CultureSportTour.png" alt="#" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
