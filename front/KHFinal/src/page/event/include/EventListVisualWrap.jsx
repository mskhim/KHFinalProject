import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import './css/EventListVisualWrap.css';
import { useNavigate } from 'react-router-dom';

const EventListVisualWrap = ({ eventList }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!eventList || eventList.length === 0) {
      return;
    }
    const formattedImages = eventList.slice(0, 3).map((event) => ({
      src: event?.thumbUrl || '',
      text: event?.name || 'No Name',
      address: formatAddress(event?.address) || '지역 정보 없음',
      date: event.startDate + ' ~ ' + event.endDate || 'No Date',
      no: event?.no || null,
    }));

    setImages(formattedImages);
    console.log(eventList);
  }, [eventList]);

  const formatAddress = (address) => {
    if (!address) return '';
    const parts = address.split(' ');
    return parts.slice(0, 2).join(' ');
  };

  const handleClick = (no) => {
    navigate('/eventRead/' + no);
  };

  return (
    <Container className="EventListVisualWrap-container py-4 px-4">
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
              onClick={() => handleClick(item.no)}
            />

            {/* ✅ 반투명한 배경과 함께 텍스트 표시 */}
            <div className="EventListVisualWrap-text-container">
              <div className="EventListVisualWrap-text">
                <h3>{item.text}</h3>
                <p>{item.address || '-'}</p>
                <p className="EventListVisualWrap-date">{item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default EventListVisualWrap;
