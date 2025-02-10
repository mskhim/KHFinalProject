import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './css/ManagerStats.css'; // 스타일 파일 추가
const festivalsMockData = {
  1: {
    name: '서울 불꽃축제',
    regionData: {
      labels: [
        '서울',
        '경기',
        '강원',
        '충북',
        '충남',
        '전북',
        '전남',
        '경북',
        '경남',
        '제주',
      ],
      values: [320, 450, 380, 290, 310, 400, 220, 390, 410, 200],
    },
    bookingData: {
      labels: Array.from(
        { length: 10 },
        (_, i) => `${i * 10}% ~ ${(i + 1) * 10}%`
      ),
      values: Array.from(
        { length: 10 },
        () => Math.floor(Math.random() * 1000) + 100
      ),
    },
    ratingData: {
      labels: Array.from(
        { length: 7 },
        (_, i) => `${1 + 10 * i}세 ~ ${10 + 10 * i}세`
      ),
      values: Array.from(
        { length: 7 },
        () => Math.floor(Math.random() * 5) + 1
      ),
    },
  },
  2: {
    name: '부산 바다축제',
    regionData: {
      labels: [
        '서울',
        '경기',
        '강원',
        '충북',
        '충남',
        '전북',
        '전남',
        '경북',
        '경남',
        '제주',
      ],
      values: [200, 320, 280, 310, 360, 390, 290, 410, 450, 380],
    },
    bookingData: {
      labels: Array.from(
        { length: 10 },
        (_, i) => `${i * 10}% ~ ${(i + 1) * 10}%`
      ),
      values: Array.from(
        { length: 10 },
        () => Math.floor(Math.random() * 1000) + 100
      ),
    },
    ratingData: {
      labels: Array.from(
        { length: 7 },
        (_, i) => `${1 + 10 * i}세 ~ ${10 + 10 * i}세`
      ),
      values: Array.from(
        { length: 7 },
        () => Math.floor(Math.random() * 5) + 1
      ),
    },
  },
  3: {
    name: '대구 치맥축제',
    regionData: {
      labels: [
        '서울',
        '경기',
        '강원',
        '충북',
        '충남',
        '전북',
        '전남',
        '경북',
        '경남',
        '제주',
      ],
      values: [250, 300, 270, 320, 400, 430, 350, 390, 410, 240],
    },
    bookingData: {
      labels: Array.from(
        { length: 10 },
        (_, i) => `${i * 10}% ~ ${(i + 1) * 10}%`
      ),
      values: Array.from(
        { length: 10 },
        () => Math.floor(Math.random() * 1000) + 100
      ),
    },
    ratingData: {
      labels: Array.from(
        { length: 7 },
        (_, i) => `${1 + 10 * i}세 ~ ${10 + 10 * i}세`
      ),
      values: Array.from(
        { length: 7 },
        () => Math.floor(Math.random() * 5) + 1
      ),
    },
  },
  4: {
    name: '제주 감귤축제',
    regionData: {
      labels: [
        '서울',
        '경기',
        '강원',
        '충북',
        '충남',
        '전북',
        '전남',
        '경북',
        '경남',
        '제주',
      ],
      values: [180, 220, 190, 250, 300, 280, 230, 290, 330, 500], // 제주 비중 증가
    },
    bookingData: {
      labels: Array.from(
        { length: 10 },
        (_, i) => `${i * 10}% ~ ${(i + 1) * 10}%`
      ),
      values: Array.from(
        { length: 10 },
        () => Math.floor(Math.random() * 1000) + 100
      ),
    },
  },
  ratingData: {
    labels: Array.from(
      { length: 7 },
      (_, i) => `${1 + 10 * i}세 ~ ${10 + 10 * i}세`
    ),
    values: Array.from({ length: 7 }, () => Math.floor(Math.random() * 5) + 1),
  },
};

const festivals = Object.keys(festivalsMockData).map((id) => ({
  id: Number(id),
  name: festivalsMockData[id].name,
}));

const ManagerStats = () => {
  const [selectedFestival, setSelectedFestival] = useState(festivals[0].id);
  const [regionData, setRegionData] = useState({ labels: [], values: [] });
  const [bookingData, setBookingData] = useState({ labels: [], values: [] });
  const [ratingData, setRatingData] = useState({ labels: [], values: [] });

  useEffect(() => {
    fetchStatistics(selectedFestival);
  }, [selectedFestival]);

  const fetchStatistics = (festivalId) => {
    // 🎯 내부 목업 데이터 활용
    const selectedData = festivalsMockData[festivalId];
    if (selectedData) {
      setRegionData(selectedData.regionData);
      setBookingData(selectedData.bookingData);
      setRatingData(selectedData.ratingData);
    }
  };

  return (
    <>
      <Header />
      <Container className="manager-stats-container mt-4">
        <h2 className="text-center mb-4">축제 통계 관리</h2>
        {/* 축제 선택 */}
        <Row className="justify-content-center mb-3">
          <Col md={6}>
            <Form.Select
              value={selectedFestival}
              onChange={(e) => setSelectedFestival(Number(e.target.value))}
            >
              {festivals.map((festival) => (
                <option key={festival.id} value={festival.id}>
                  {festival.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        {/* 통계 차트 */}
        <Row>
          {/* 지역별 이용 수 (Bar Chart) */}
          <Col md={4}>
            <div className="chart-container">
              <h5 className="text-center">지역별 이용 수</h5>
              <Bar
                data={{
                  labels: regionData.labels,
                  datasets: [
                    {
                      label: '이용자 수',
                      data: regionData.values,
                      backgroundColor: 'rgba(75, 192, 192, 0.6)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </Col>
          {/* 연령대별 평균 평점 (Bar Chart) */}
          <Col md={4}>
            <div className="chart-container">
              <h5 className="text-center">연령대별 평균 평점</h5>
              <Bar
                data={{
                  labels: ratingData.labels,
                  datasets: [
                    {
                      label: '평점',
                      data: ratingData.values,
                      backgroundColor: 'rgba(218, 218, 84, 0.6)',
                      borderColor: 'rgb(192, 192, 75)',
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </Col>
          {/* 일정별 예매 수량 (Line Chart) */}
          <Col md={4}>
            <div className="chart-container">
              <h5 className="text-center">예매 수량 (일정별)</h5>
              <Line
                data={{
                  labels: bookingData.labels,
                  datasets: [
                    {
                      label: '예매 수량',
                      data: bookingData.values,
                      borderColor: 'rgba(255, 99, 132, 1)',
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      borderWidth: 2,
                      fill: true,
                    },
                  ],
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </Col>
        </Row>{' '}
        {/* 전체 통계 */}
        <Row className="mt-4">
          <Col md={4}>
            <div className="stat-card">
              <h4>총 이용객 수</h4>
              <p>{regionData.values?.reduce((acc, val) => acc + val, 0)} 명</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="stat-card">
              <h4>평균 평점</h4>
              <p>
                {(
                  ratingData.values?.reduce((acc, val) => acc + val, 0) / 7
                ).toFixed(2)}
                점
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="stat-card">
              <h4>예매율 최고일</h4>
              <p>
                {
                  bookingData.labels[
                    bookingData.values?.indexOf(Math.max(...bookingData.values))
                  ]
                }
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ManagerStats;
