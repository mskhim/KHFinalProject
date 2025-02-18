import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './css/RandomFestival.css';
import { byRegionRate } from '../mainApi.js';
function ByRegionFestival() {
  const navigate = useNavigate();
  const [byRegionEvents, setbyRegionEvents] = useState([]);

  useEffect(() => {
    const fetchbyRagionRate = async () => {
      const data = await byRegionRate();
      if (data) {
        setbyRegionEvents(data);
      }
    };
    fetchbyRagionRate();
  }, []);

  const handleImageClick = (no) => {
    navigate(`/eventRead/${no}`);
  };

  const items = byRegionEvents.map((event, index) => (
    <div
      className="carousel-item RandomFestival-item"
      key={index}
      onClick={() => handleImageClick(event.no)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={event.thumbUrl}
        alt={event.name}
        className="carousel-image RandomFestival-image"
      />
    </div>
  ));

  const responsive = {
    0: { items: 1 },
    600: { items: 2 },
    1024: { items: 5 },
  };
  return (
    <>
      <h3>&ensp;byRegionFestival</h3>
      <div className="carousel-container RandomFestival-container">
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

export default ByRegionFestival;
