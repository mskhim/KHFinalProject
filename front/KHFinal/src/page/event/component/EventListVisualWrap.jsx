import { useState } from 'react';
import { Container } from 'react-bootstrap';
import './EventListVisualWrap.css';

const EventListVisualWrap = () => {
  const [activeIndex, setActiveIndex] = useState(0); // 기본 활성화된 이미지

  // ✅ 이미지 및 해당 이미지에 표시될 텍스트 리스트
  const images = [
    { src: 'https://picsum.photos/1200/600?random=1', text: '이벤트 1 설명' },
    { src: 'https://picsum.photos/1200/600?random=2', text: '이벤트 2 설명' },
    { src: 'https://picsum.photos/1200/600?random=3', text: '이벤트 3 설명' },
  ];

  return (
    <Container
      fluid
      className="EventListVisualWrap-container py-3 px-5 px-md-5"
    >
      <div className="EventListVisualWrap-wrapper">
        {images.map((item, index) => (
          <div
            key={index}
            className={`EventListVisualWrap-item ${
              index === activeIndex
                ? 'EventListVisualWrap-active'
                : 'EventListVisualWrap-inactive'
            }`}
            onMouseEnter={() => setActiveIndex(index)}
          >
            {/* ✅ 이미지 */}
            <img
              src={item.src}
              alt={`Event ${index + 1}`}
              className="EventListVisualWrap-image"
            />
            {/* ✅ 활성화된 이미지에만 텍스트 표시 */}
            {index === activeIndex && (
              <div className="EventListVisualWrap-text">
                <h3>{item.text}</h3>
              </div>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default EventListVisualWrap;
