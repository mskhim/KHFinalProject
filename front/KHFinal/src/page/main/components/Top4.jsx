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
        {top4Events && top4Events.length > 0 ? (
          top4Events.map((event, index) => (
            <Card
              key={index}
              className="bg-dark text-black Top4-card"
              style={{ width: '25%', height: '700px', cursor: 'pointer' }}
              onClick={() => handleImageClick(event.no)} // 클릭 시 이벤트 no 값으로 이동
            >
              <Card.Img
                src={event.thumbUrl} // Firebase에서 제공한 이미지 URL 사용
                alt={`Card image ${index + 1}`}
                className="top4-image"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // 비율을 유지하며 이미지를 꽉 채우되 잘릴 수 있음
                  objectPosition: 'center', // 이미지가 카드 중앙에 맞춰짐
                  cursor: 'pointer',
                }}
              />
              <Card.ImgOverlay>
                <Card.Title className="Top4-titlename">{`Top ${
                  index + 1
                }`}</Card.Title>
                <Card.Text></Card.Text>
              </Card.ImgOverlay>
              <Card.Body
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명한 검은색 배경
                  color: 'white', // 글씨색을 흰색으로
                  padding: '5px 10px', // 텍스트 주위 여백
                  display: 'inline-block',
                  height: '120px',
                }}
              >
                <Card.Title style={{ fontSize: '30px', height: '150px' }}>
                  {event.name}
                </Card.Title>
                {/* event.name을 타이틀로 */}
                <Card.Text>
                  {/* 필요한 경우 여기 추가 설명을 넣을 수 있습니다 */}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>Loading...</p> // 데이터가 로딩 중일 때 표시할 메시지
        )}
      </div>
    </>
  );
}
