import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './css/StartFestival.css';
import Card from 'react-bootstrap/Card';
import { comeStartDate } from '../mainApi';
function StartFestival() {
  const navigate = useNavigate();
  const [comeStartEvents, setcomeStartEvents] = useState([]);

  useEffect(() => {
    const fetchcomeStart = async () => {
      const data = await comeStartDate();
      if (data) {
        setcomeStartEvents(data);
      }
    };
    fetchcomeStart();
  }, []);

  const handleImageClick = (no) => {
    navigate(`/eventRead/${no}`);
  };

  const items = comeStartEvents.map((event, index) => (
    <div
      className="carousel-item StartFestival-item"
      key={index}
      onClick={() => handleImageClick(event.no)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={event.thumbUrl}
        alt={`Item ${index + 1}`}
        className="carousel-image StartFestival-image"
      />
      <br />
      <h4>{event.name}</h4>
    </div>
  ));

  const responsive = {
    0: { items: 1 },
    800: { items: 2 },
    1024: { items: 5 },
  };

  return (
    <>
      <h3>&ensp;StartingSoon</h3>
      <div className="carousel-container StartFestival-container">
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

export default StartFestival;
