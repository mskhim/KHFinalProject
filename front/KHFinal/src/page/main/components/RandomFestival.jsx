import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './css/RandomFestival.css';

export default function RandomFestival() {
  const imageUrls = [
    'https://picsum.photos/300/200?random=1',
    'https://picsum.photos/300/200?random=2',
    'https://picsum.photos/300/200?random=3',
    'https://picsum.photos/300/200?random=4',
    'https://picsum.photos/300/200?random=5',
  ];

  const items = imageUrls.map((url, index) => (
    <div className="carousel-item RandomFestival-item" key={index}>
      <img
        src={url}
        alt={`Item ${index + 1}`}
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
      <h3>&ensp;Random</h3>
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
