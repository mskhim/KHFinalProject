import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './css/Top4.css';
import { useNavigate } from 'react-router-dom';
import { topSeries } from '../mainApi.js';

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
            {/* 첫 번째 카드 */}
            <div className="Top4-left">
              <Card
                key={top4Events[0].no}
                className="bg-dark text-black Top4-card"
                style={{
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  border: 'none',
                }}
                onClick={() => handleImageClick(top4Events[0].no)}
              >
                <Card.Img
                  src={top4Events[0].thumbUrl}
                  alt="Card image 1"
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
                      {top4Events[0].name}
                    </Card.Title>
                    <h3 className="Top4-card-address">
                      {top4Events[0].address}
                    </h3>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </div>

            <div className="Top4-right">
              <div className="Top4-rightTop">
                <Card
                  key={top4Events[1].no}
                  className="bg-dark text-black Top4-card"
                  style={{
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                  onClick={() => handleImageClick(top4Events[1].no)}
                >
                  <Card.Img
                    src={top4Events[1].thumbUrl}
                    alt="Card image 2"
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
                        {top4Events[1].name}
                      </Card.Title>
                      <h4 className="Top4-card-address">
                        {top4Events[1].address}
                      </h4>
                    </div>
                  </Card.ImgOverlay>
                </Card>
              </div>
              <div className="Top4-rightBottom">
                <div className="Top4-bottom-left">
                  <Card
                    key={top4Events[2].no}
                    className="bg-dark text-black Top4-card"
                    style={{
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                    onClick={() => handleImageClick(top4Events[2].no)}
                  >
                    <Card.Img
                      src={top4Events[2].thumbUrl}
                      alt="Card image 3"
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
                          {top4Events[2].name}
                        </Card.Title>
                        <h4 className="Top4-card-address">
                          {top4Events[2].address}
                        </h4>
                      </div>
                    </Card.ImgOverlay>
                  </Card>
                </div>
                <div className="Top4-bottom-right">
                  <Card
                    key={top4Events[3].no}
                    className="bg-dark text-black Top4-card"
                    style={{
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                    onClick={() => handleImageClick(top4Events[3].no)}
                  >
                    <Card.Img
                      src={top4Events[3].thumbUrl}
                      alt="Card image 4"
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
                          {top4Events[3].name}
                        </Card.Title>
                        <h4 className="Top4-card-address">
                          {top4Events[3].address}
                        </h4>
                      </div>
                    </Card.ImgOverlay>
                  </Card>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
