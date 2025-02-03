import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Badge,
  Modal,
} from 'react-bootstrap';
import { Header, Footer } from '../../components';
import './EventCalendar.css';

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜 상태
  const [selectedFestival, setSelectedFestival] = useState(null); // 선택된 축제 정보
  const [selectDate, setSelectDate] = useState(null); // 선택된 날짜

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
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    const startDay = firstDay.getDay();
    const calendar = [];
    let day = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startDay) {
          week.push(<td key={j}></td>);
        } else if (day > totalDays) {
          week.push(<td key={j}></td>);
        } else {
          const date = new Date(year, month, day);
          const festival = getFestival(date);
          week.push(
            <td
              key={j}
              className={`calendar-day text-center ${
                festival ? 'has-festival' : ''
              }`}
              onClick={() => festival && setSelectedFestival(festival)}
            >
              <div className="day-number">{day}</div>
              {festival && (
                <Badge bg="danger" className="festival-badge">
                  {festival.name}
                </Badge>
              )}
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
    { startDate: '2024-02-10', endDate: '2024-02-13', name: '설날' },
    { date: '2024-03-01', name: '삼일절' },
    { date: '2024-05-05', name: '어린이날' },
  ];

  // 특정 날짜의 축제 정보 반환
  const getFestival = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return festivals.find((festival) => festival.date === dateString);
  };

  return (
    <>
      <Header page="cal" />
      <Container className="calendar-container text-center mt-4 p-4">
        {/* 월 이동 버튼 */}
        <Row className="justify-content-center mb-3">
          <Col xs="auto">
            <Button variant="outline-primary" onClick={() => changeMonth(-1)}>
              &lt;
            </Button>
          </Col>
          <Col xs="auto">
            <h2 className="month-title">
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
          <Col md={10}>
            <Table bordered hover striped className="calendar-table">
              <thead>
                <tr>
                  <th className="text-danger">일</th>
                  <th>월</th>
                  <th>화</th>
                  <th>수</th>
                  <th>목</th>
                  <th>금</th>
                  <th className="text-primary">토</th>
                </tr>
              </thead>
              <tbody>{renderCalendar()}</tbody>
            </Table>
          </Col>
        </Row>

        {/* 축제 정보 모달 */}
        {selectedFestival && (
          <Modal show onHide={() => setSelectedFestival(null)} centered>
            <Modal.Header closeButton>
              <Modal.Title>축제 정보</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>{selectedFestival.name}</h5>
              <p>{selectedFestival.date}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setSelectedFestival(null)}
              >
                닫기
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default EventCalendar;
