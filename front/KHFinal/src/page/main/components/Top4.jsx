import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './css/Top4.css';
import { useNavigate } from 'react-router-dom';
import { topSeries } from '../mainApi.js';
import { Badge } from 'react-bootstrap';

export default function Top4() {
  const navigate = useNavigate();
  const [top4Events, setTop4Events] = useState([]); // API 데이터를 저장할 state

  // topSeries 데이터를 불러오는 함수
  useEffect(() => {
    const fetchTopSeries = async () => {
      const data = await topSeries();
      if (data) {
        setTop4Events(data);
      }
    };
    fetchTopSeries();
  }, []);

  const handleImageClick = (no) => {
    navigate(`/eventRead/${no}`);
  };

  return (
    <>
      <div className="Top4-head">
        {top4Events.length === 4 ? (
          <>
            <div className="Top4-row-1">
              {top4Events.slice(0, 2).map((event, index) => (
                <Card
                  key={event.no}
                  className="bg-dark text-black Top4-card"
                  style={{
                    width: '50%',
                    height: '500px',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                  onClick={() => handleImageClick(event.no)}
                >
                  <Card.Img
                    src={event.thumbUrl}
                    alt={`Card image ${index + 1}`}
                    className="top4-image"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectPosition: 'center',
                      cursor: 'pointer',
                    }}
                  />
                  <Card.ImgOverlay>
                    <div className="Top4-card-overlay">
                      <Card.Title className="Top4-card-name">
                        {event.name}
                      </Card.Title>
                    </div>
                  </Card.ImgOverlay>
                </Card>
              ))}
            </div>

            {/* 두 번째 그룹 (index 2, 3) */}
            <div className="Top4-row-2">
              {top4Events.slice(2, 4).map((event, index) => (
                <Card
                  key={event.no}
                  className="bg-dark text-black Top4-card"
                  style={{
                    width: '50%',
                    height: '500px',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                  onClick={() => handleImageClick(event.no)}
                >
                  <Card.Img
                    src={event.thumbUrl}
                    alt={`Card image ${index + 3}`} // 2번째 그룹이므로 index 보정
                    className="top4-image"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectPosition: 'center',
                      cursor: 'pointer',
                    }}
                  />
                  <Card.ImgOverlay>
                    <div className="Top4-card-overlay">
                      <Card.Title className="Top4-card-name">
                        {event.name}
                      </Card.Title>
                    </div>
                  </Card.ImgOverlay>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
