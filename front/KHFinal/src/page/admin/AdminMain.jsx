import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import './include/css/StatHistory.css'; // 스타일 파일 추가
import { getStats } from './adminApi'; // API 함수 파일 추가

const mockData = {
  ageGroupData: {
    labels: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
    values: [],
  },
  genderData: {
    labels: ['남성', '여성'],
    values: [],
  },
  monthlyData: {
    labels: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    bookingValues: [],
    festivalValues: [],
  },
};

const AdminMain = () => {
  const [test, setTest] = useState('');
  const [inputValue, setInputValue] = useState(''); // input 필드 값
  const [data, setData] = useState(mockData);

  useEffect(() => {
    const getStatsData = async () => {
      const response = await getStats();
      setData({
        ageGroupData: {
          ...data.ageGroupData,
          values: response.avgData,
        },
        genderData: {
          ...data.genderData,
          values: response.genderData,
        },
        monthlyData: {
          ...data.monthlyData,
          bookingValues: response.reservedData,
          festivalValues: response.eventData,
        },
      });
    };
    getStatsData();
  }, []);

  // 버튼 클릭 이벤트 핸들러
  const handleInsertClick = (e) => {
    e.preventDefault(); // 폼의 기본 동작(페이지 새로고침)을 막음

    if (!inputValue.trim()) {
      alert('Input field cannot be empty!');
      return;
    }

    fetch('http://localhost:8080/admin/insert', {
      method: 'POST', // POST 요청으로 데이터 전송
      headers: {
        'Content-Type': 'application/json', // JSON 형식으로 데이터 전송
      },
      body: JSON.stringify({ name: inputValue }), // 입력 값 전송
    });
  };

  return (
    <Container className="admin-stats-container mt-4">
      <Row className="mb-4">
        <Col md={6}>
          <div className="admin-chart-container">
            <h5 className="text-center">연령별 유저수</h5>
            <Bar
              data={{
                labels: data.ageGroupData.labels,
                datasets: [
                  {
                    label: '유저수',
                    data: data.ageGroupData.values,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  },
                ],
              }}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="admin-chart-container">
            <h5 className="text-center">성별 유저수</h5>
            <Pie
              data={{
                labels: data.genderData.labels,
                datasets: [
                  {
                    label: '유저수',
                    data: data.genderData.values,
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
      <Row className="mb-4">
        <Col md={12}>
          <div className="admin-chart-container">
            <h5 className="text-center">월별 예매수 및 축제수</h5>
            <Bar
              data={{
                labels: data.monthlyData.labels,
                datasets: [
                  {
                    type: 'line',
                    label: '예매수',
                    data: data.monthlyData.bookingValues,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    fill: false,
                    yAxisID: 'y-axis-1',
                  },
                  {
                    type: 'bar',
                    label: '축제수',
                    data: data.monthlyData.festivalValues,
                    backgroundColor: 'rgba(255, 206, 86, 0.6)',
                    yAxisID: 'y-axis-2',
                  },
                ],
              }}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4}>
          <div className="admin-stat-card">
            <h4>총 유저수</h4>
            <p>{data.ageGroupData.values.reduce((a, b) => a + b, 0)} 명</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="admin-stat-card">
            <h4>총 예매수</h4>
            <p>
              {data.monthlyData.bookingValues.reduce((a, b) => a + b, 0)} 건
            </p>
          </div>
        </Col>
        <Col md={4}>
          <div className="admin-stat-card">
            <h4>총 축제수</h4>
            <p>
              {data.monthlyData.festivalValues.reduce((a, b) => a + b, 0)} 건
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminMain;
