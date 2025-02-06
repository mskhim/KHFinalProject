import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './css/EndFestival.css';
export default function EndFestival() {
  const imageUrls = [
    'https://picsum.photos/300/200?random=6',
    'https://picsum.photos/300/200?random=7',
    'https://picsum.photos/300/200?random=8',
    'https://picsum.photos/300/200?random=9',
    'https://picsum.photos/300/200?random=10',
  ];

  const items = imageUrls.map((url, index) => (
    <div className="carousel-item EndFestival-item" key={index}>
      <img
        src={url}
        alt={`Item ${index + 1}`}
        className="carousel-image EndFestival-image"
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
      <h3>&ensp;EndingSoon</h3>
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
