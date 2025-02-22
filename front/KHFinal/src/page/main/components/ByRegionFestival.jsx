import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './css/ByRegionFestival.css';
import { byRegionRate } from '../mainApi.js';
import useEmblaCarousel from 'embla-carousel-react';

function ByRegionFestival() {
  const navigate = useNavigate();
  const [byRegionEvents, setbyRegionEvents] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

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
      className="carousel-item ByRegionFestival-item"
      key={index}
      onClick={() => handleImageClick(event.no)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={event.thumbUrl}
        alt={event.name}
        className="carousel-image ByRegionFestival-image"
      />
      <br />
      <h5>
        {event.name.length > 20
          ? `${event.name.substring(0, 18)}...`
          : event.name}
      </h5>
    </div>
  ));

  const responsive = {
    0: { items: 1 },
    600: { items: 2 },
    1024: { items: 5 },
  };
  return (
    <>
      <br />
      <h3 className="ByRegionFestival-name">&ensp;지역Best</h3>
      <div className="carousel-container ByRegionFestival-container">
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
