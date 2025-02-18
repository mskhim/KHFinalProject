import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import './css/Announcement.css';
import { Context } from '../../../Context';
import { useNavigate } from 'react-router-dom';
import { ButtonDarkMode } from '../../../components/ui';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
export default function Announcement() {
  const { darkMode } = useContext(Context);
  const navigate = useNavigate();

  const CustomPrevArrow = ({ onClick }) => (
    <div className="custom-arrow custom-prev" onClick={onClick}>
      <FaChevronUp />
    </div>
  );

  const CustomNextArrow = ({ onClick }) => (
    <div className="custom-arrow custom-next" onClick={onClick}>
      <FaChevronDown />
    </div>
  );

  const settings = {
    dots: false, // 네비게이션 점 표시
    infinite: true, // 무한 루프
    speed: 500, // 애니메이션 속도
    slidesToShow: 1, // 한 번에 한 개씩 보여줌
    slidesToScroll: 1, // 한 번에 한 개씩 스크롤
    vertical: true, // 세로 방향 설정
    verticalSwiping: true, // 세로 스와이프 활성화
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <>
      <div className="Announcement">
        <Card
          className="Announcement-title"
          style={{
            width: '14%',
            maxWidth: '300px',
            fontSize: '22px',
            height: '70px',
          }}
        >
          <Card.Body className="Announcement-text-center">
            <p>공지사항</p>
          </Card.Body>
        </Card>
        <Card
          className="Announcement-content"
          style={{ width: '85%', height: '70px' }}
        >
          <Card.Body className="Announcement-content">
            <Slider {...settings}>
              <p>
                This is some text within a card body.This is some text within a
                card body.
              </p>
              <p>
                This is some text within a card body.This is some text within a
                card body.
              </p>
              <p>
                This is some text within a card body.This is some text within a
                card body.
              </p>
            </Slider>
            <div
              className={
                darkMode
                  ? 'Announcement-dark-mode-button'
                  : 'Announcement-light-mode-button'
              }
            >
              <ButtonDarkMode
                onClick={() => navigate('/noticeList')}
                text="목록"
              />
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
