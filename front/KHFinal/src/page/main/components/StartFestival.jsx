import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './css/StartFestival.css';
import Card from 'react-bootstrap/Card';

function StartFestival() {
  const imageUrls = [
    'https://picsum.photos/300/200?random=1',
    'https://picsum.photos/300/200?random=2',
    'https://picsum.photos/300/200?random=3',
    'https://picsum.photos/300/200?random=4',
    'https://picsum.photos/300/200?random=5',
  ];

  const items = imageUrls.map((url, index) => (
    <Card className="carousel-item StartFestival-item" key={index}>
      <Card.Img
        src={url}
        alt={`Item ${index + 1}`}
        className="carousel-image StartFestival-image"
      />
      <Card.Body>
        <Card.Text>abcdefg</Card.Text>
      </Card.Body>
    </Card>
  ));

  const responsive = {
    0: { items: 1 },
    600: { items: 2 },
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
