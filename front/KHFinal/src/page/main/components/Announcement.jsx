import React, { useContext, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './css/Announcement.css';
import { Context } from '../../../Context';
import { useNavigate } from 'react-router-dom';
import { ButtonDarkMode } from '../../../components/ui';
import { lateNotices } from '../mainApi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

export default function Announcement() {
  const { darkMode } = useContext(Context);
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);

  // API 호출하여 최신 공지 3개 가져오기
  useEffect(() => {
    const fetchNotices = async () => {
      const data = await lateNotices();
      if (data) {
        setNotices(data);
      }
    };
    fetchNotices();
  }, []);

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
            fontSize: '30px',
            height: '90px',
          }}
        >
          <Card.Body className="Announcement-text-center">
            <p>Notice</p>
          </Card.Body>
        </Card>
        <Card
          className="Announcement-content"
          style={{ width: '85%', height: '90px' }}
        >
          <Card.Body className="Announcement-content">
            <Slider
              {...settings}
              style={{ cursor: 'pointer' }}
              className="Announcement-slider"
            >
              {notices.length > 0 ? (
                notices.map((notice) => (
                  <h2
                    key={notice.no}
                    onClick={() => navigate(`/noticeRead/${notice.no}`)}
                  >
                    {notice.title}
                  </h2>
                ))
              ) : (
                <p>공지사항이 없습니다.</p>
              )}
            </Slider>
            <ButtonDarkMode
              onClick={() => navigate('/noticeList')}
              text="목록"
              className={
                darkMode
                  ? 'Announcement-dark-mode-button'
                  : 'Announcement-light-mode-button'
              }
            />
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
