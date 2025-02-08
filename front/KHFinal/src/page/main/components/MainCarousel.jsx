import React from 'react';
import { Carousel } from 'react-bootstrap';

// 로컬 이미지 파일 import
import wallPaper001 from './include/wall_paper_001.jpg';
import wallPaper002 from './include/wall_paper_002.jpg';
import wallPaper003 from './include/wall_paper_003.jpg';


function MainCarousel() {
  return (
    <Carousel style={{marginTop: "20px"}}>
      {/* 첫 번째 슬라이드 */}
      <Carousel.Item>
        <img className="d-block w-100" src={wallPaper001} alt="First slide" />
        <Carousel.Caption>
          <h3>첫 번째 이미지</h3>
          <p>이미지 1 설명</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* 두 번째 슬라이드 */}
      <Carousel.Item>
        <img className="d-block w-100" src={wallPaper002} alt="Second slide" />
        <Carousel.Caption>
          <h3>두 번째 이미지</h3>
          <p>이미지 2 설명</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* 세 번째 슬라이드 */}
      <Carousel.Item>
        <img className="d-block w-100" src={wallPaper003} alt="Third slide" />
        <Carousel.Caption>
          <h3>세 번째 이미지</h3>
          <p>이미지 3 설명</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MainCarousel;
