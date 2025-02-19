import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './css/EndFestival.css';
import { comeEndDate } from '../mainApi';

export default function EndFestival() {
  const navigate = useNavigate();
  const [comeEndEvents, setcomeEndEvents] = useState([]);

  useEffect(() => {
    const fetchcomeEnd = async () => {
      const data = await comeEndDate();
      if (data) {
        setcomeEndEvents(data);
      }
    };
    fetchcomeEnd();
  }, []);

  const handleImageClick = (no) => {
    navigate(`/eventRead/${no}`);
  };

  const items = comeEndEvents.map((event, index) => (
    <div
      className="carousel-item EndFestival-item"
      key={index}
      onClick={() => handleImageClick(event.no)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={event.thumbUrl}
        alt={`Item ${index + 1}`}
        className="carousel-image EndFestival-image"
      />
      <br />
      <h4>{event.name}</h4>
    </div>
  ));

  const responsive = {
    0: { items: 1 },
    600: { items: 2 },
    1024: { items: 5 },
  };
  return (
    <>
      <h3>&ensp;곧종료</h3>
      <div className="carousel-container .EndFestival-container">
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          autoPlay
          autoPlayInterval={5000}
          infinite
          disableDotsControls={true}
          disableButtonsControls={false}
        />
      </div>
    </>
  );
}
