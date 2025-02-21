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
import plus from '../../../assets/plus.png';

export default function Announcement() {
  const { getDarkMode } = useContext(Context);
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
    speed: 400, // 애니메이션 속도
    slidesToShow: 1, // 한 번에 한 개씩 보여줌
    slidesToScroll: 1, // 한 번에 한 개씩 스크롤
    vertical: true, // 세로 방향 설정
    verticalSwiping: true, // 세로 스와이프 활성화
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <>
      <hr />
      <div className="Announcement">
        <Card
          bg="transparent"
          className="Announcement-content"
          style={{
            width: '98%',
            height: '50px',
            border: 'none',
          }}
        >
          <Card.Body className="Announcement-content-body">
            <Slider
              {...settings}
              style={{
                cursor: 'pointer',
                width: '50%',
                fontSize: '15px',
              }}
              className={`Announcement-slider ${getDarkMode()}`}
            >
              {notices.length > 0 ? (
                notices.map((notice) => (
                  <h6
                    key={notice.no}
                    onClick={() => navigate(`/noticeRead/${notice.no}`)}
                    className={getDarkMode()}
                  >
                    {notice.title}
                  </h6>
                ))
              ) : (
                <p>공지사항이 없습니다.</p>
              )}
            </Slider>
            <img
              className="Announcement-plus"
              src={plus}
              alt=""
              onClick={() => navigate('/noticeList')}
              style={{ cursor: 'pointer', width: '20px', height: '20px' }}
            />
          </Card.Body>
        </Card>
      </div>
      <hr />
    </>
  );
}
