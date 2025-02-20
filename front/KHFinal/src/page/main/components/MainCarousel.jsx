import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import wallPaper001 from './include/wall_paper_001.jpg';
import wallPaper002 from './include/wall_paper_002.jpg';
import wallPaper003 from './include/wall_paper_003.jpg';
import { bannerImage } from '../mainApi';

function MainCarousel() {
  const [images, setImages] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await bannerImage();
      if (data && data.length > 0) {
        setImages(data); // API에서 이미지 리스트를 받아옴
      } else {
        setImages([]); // 데이터가 없으면 빈 배열 설정
      }
    };
    fetchImages();
  }, []);

  // 기본 이미지 리스트
  const defaultImages = [wallPaper001, wallPaper002, wallPaper003];

  return (
    <Carousel style={{ marginTop: '20px' }}>
      {images === null ? ( // 데이터 로딩 중일 때
        <p>Loading...</p>
      ) : images.length > 0 ? ( // API에서 데이터가 있을 때
        images.map((img, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={img.url}
              alt={`Slide ${index + 1}`}
            />
          </Carousel.Item>
        ))
      ) : (
        // API 데이터가 없거나 오류 발생 시 기본 이미지 사용
        defaultImages.map((img, index) => (
          <Carousel.Item key={`default-${index}`}>
            <img
              className="d-block w-100"
              src={img}
              alt={`Default slide ${index + 1}`}
            />
          </Carousel.Item>
        ))
      )}
    </Carousel>
  );
}

export default MainCarousel;
