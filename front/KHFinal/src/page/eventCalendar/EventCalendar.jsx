import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap';
import { Header, Footer } from '../../components';
import './EventCalendar.css';

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜 상태
  const [selectedFestival, setSelectedFestival] = useState(null); // 선택된 축제 정보

  // 월 이동 함수
  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  // 달력 렌더링 함수
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 현재 월의 첫 날과 마지막 날
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 현재 월의 총 일수
    const totalDays = lastDay.getDate();
    const startDay = firstDay.getDay(); // 요일 (0: 일요일, 6: 토요일)

    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startDay) {
          week.push(<td key={j}></td>); // 빈 칸
        } else if (day > totalDays) {
          week.push(<td key={j}></td>); // 빈 칸
        } else {
          const date = new Date(year, month, day);
          const festival = getFestival(date);
          week.push(
            <td
              key={j}
              className={`calendar-day ${festival ? 'has-festival' : ''}`}
              onClick={() => setSelectedFestival(festival)}
            >
              {day}
            </td>
          );
          day++;
        }
      }
      calendar.push(<tr key={i}>{week}</tr>);
      if (day > totalDays) break;
    }

    return calendar;
  };

  // 임의의 축제 데이터
  const festivals = [
    { date: '2024-02-10', name: '설날' },
    { date: '2024-03-01', name: '삼일절' },
    { date: '2024-05-05', name: '어린이날' },
  ];

  // 특정 날짜의 축제 정보 반환
  const getFestival = (date) => {
    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
    return festivals.find((festival) => festival.date === dateString);
  };

  return (
    <>
      <Header />
      <Container className="calendar-container text-center mt-4">
        {/* 월 이동 버튼 */}
        <Row className="justify-content-center mb-3">
          <Col xs="auto">
            <Button variant="outline-primary" onClick={() => changeMonth(-1)}>
              &lt;
            </Button>
          </Col>
          <Col xs="auto">
            <h2>
              {currentDate.toLocaleString('default', {
                year: 'numeric',
                month: 'long',
              })}
            </h2>
          </Col>
          <Col xs="auto">
            <Button variant="outline-primary" onClick={() => changeMonth(1)}>
              &gt;
            </Button>
          </Col>
        </Row>

        {/* 달력 테이블 */}
        <Row className="justify-content-center">
          <Col md={8}>
            <Table bordered className="calendar-table">
              <thead>
                <tr>
                  <th>일</th>
                  <th>월</th>
                  <th>화</th>
                  <th>수</th>
                  <th>목</th>
                  <th>금</th>
                  <th>토</th>
                </tr>
              </thead>
              <tbody>{renderCalendar()}</tbody>
            </Table>
          </Col>
        </Row>

        {/* 선택된 축제 정보 */}
        {selectedFestival && (
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="festival-card">
                <Card.Body>
                  <Card.Title>{selectedFestival.name}</Card.Title>
                  <Card.Text>{selectedFestival.date}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default EventCalendar;
