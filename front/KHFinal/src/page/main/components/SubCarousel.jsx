import React, { useState } from 'react';
import wallPaper001 from './include/wall_paper_001.jpg';
import wallPaper002 from './include/wall_paper_002.jpg';
import wallPaper003 from './include/wall_paper_003.jpg';
import wallPaper004 from './include/wall_paper_004.jpg';
import wallPaper005 from './include/wall_paper_005.jpg';
import { Carousel } from 'react-bootstrap';
import './css/SubCarousel.css';

export default function SubCarousel() {
  const images = [
    wallPaper001,
    wallPaper002,
    wallPaper003,
    wallPaper004,
    wallPaper005,
  ];

  return (
    <>
      <Carousel
        fade
        controls={false}
        indicators={false}
        className="SubCarousel-container"
      >
        {images.map((img, index) => (
          <Carousel.Item key={index} className="SubCarousel-item">
            <img
              className="d-block w-100"
              src={img}
              alt={`Slide ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <br />
    </>
  );
}
