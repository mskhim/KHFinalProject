import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './css/ManagerStats.css';
import { selectEventStatsData } from './managerApi';

const ManagerStats = () => {
  const [selectedFestival, setSelectedFestival] = useState(null); // ✅ 초기값 수정
  const [festivalStatsData, setFestivalStatsData] = useState([]); // ✅ 배열로 초기화
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    const fetchFestivalStats = async () => {
      try {
        const response = await selectEventStatsData();
        console.log('📊 받아온 데이터:', response);

        if (Array.isArray(response)) {
          // ✅ 배열인지 확인
          setFestivalStatsData(response);
          setFestivals(
            response.map((festival) => ({
              id: festival.no,
              name: festival.name,
            }))
          );

          if (response.length > 0) {
            setSelectedFestival(response[0].no); // ✅ 첫 번째 축제를 기본 선택
          }
        } else {
          console.error('🚨 오류: festivalStatsData가 배열이 아님', response);
        }
      } catch (error) {
        console.error('🚨 API 호출 오류:', error);
      }
    };

    fetchFestivalStats();
  }, []);

  const [regionData, setRegionData] = useState({
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
    values: [],
  });

  const [ratingData, setRatingData] = useState({
    labels: ['19세 미만', '20대', '30대', '40대', '50대 이상'],
    values: [],
  });

  const [genderData, setGenderData] = useState({
    labels: ['남성', '여성'],
    values: [],
  });

  useEffect(() => {
    if (!selectedFestival) return;

    const selectedData = festivalStatsData.find(
      (festival) => festival.no === selectedFestival
    );
    if (selectedData) {
      setRegionData((prev) => ({ ...prev, values: selectedData.regionData }));
      setRatingData((prev) => ({ ...prev, values: selectedData.avgRating }));
      setGenderData((prev) => ({ ...prev, values: selectedData.genderData }));
    }
  }, [selectedFestival, festivalStatsData]);

  const handleFestivalChange = (event) => {
    const festivalId = Number(event.target.value);
    setSelectedFestival(festivalId);
  };

  return (
    <>
      <Header />
      <Container className="manager-stats-container mt-4">
        <h2 className="text-center mb-4">축제 통계 관리</h2>

        {/* 🎯 축제 선택 */}
        <Row className="justify-content-center mb-3">
          <Col md={6}>
            <Form.Select
              value={selectedFestival || ''} // ✅ `null`일 경우 빈 문자열로 처리
              onChange={handleFestivalChange}
            >
              {festivals.map((festival) => (
                <option key={festival.id} value={festival.id}>
                  {festival.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        {/* 🎯 차트 렌더링 */}
        <Row>
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

          <Col md={4}>
            <div className="chart-container">
              <h5 className="text-center">성별 유저수</h5>
              <Pie
                data={{
                  labels: genderData.labels,
                  datasets: [
                    {
                      label: '유저수',
                      data: genderData.values,
                      backgroundColor: [
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                      ],
                    },
                  ],
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </Col>
        </Row>

        {/* 🎯 추가 통계 */}
        <Row className="mt-4">
          <Col md={6}>
            <div className="stat-card">
              <h4>총 이용객 수</h4>
              <p>{regionData.values.reduce((acc, val) => acc + val, 0)} 명</p>
            </div>
          </Col>
          <Col md={6}>
            <div className="stat-card">
              <h4>평균 평점</h4>
              <p>
                {ratingData.values.length > 0 &&
                ratingData.values.some((val) => val > 0) // ✅ 0보다 큰 값이 있는지 확인
                  ? (
                      ratingData.values
                        .filter((val) => val > 0) // ✅ 0이 아닌 값만 필터링
                        .reduce((acc, val) => acc + val, 0) /
                      ratingData.values.filter((val) => val > 0).length
                    ).toFixed(2)
                  : '0.00'}
                점
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
