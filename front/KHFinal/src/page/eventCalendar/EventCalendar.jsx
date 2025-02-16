import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Badge } from 'react-bootstrap';
import { Header, Footer } from '../../components';
import './css/EventCalendar.css';
import ButtonDarkMode from '../../components/ui/ButtonDarkMode';
import EventListViewWrap from '../event/include/EventListViewWrap';
import { Context } from '../../Context';
import { selectEventListMonth } from './eventCalendarApi';
import { FaChevronDown } from 'react-icons/fa';

const EventCalendar = () => {
  const { getDarkMode, getDarkModeHover, darkMode } = useContext(Context);
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 달
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜
  const [sortOption, setSortOption] = useState({
    page: 1,
    sort: 'startDate',
    search: null,
    date: new Date().toISOString().split('T')[0],
    region: null,
    toggle: false,
  });

  // ✅ 월 이동 함수
  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
    setSortOption((prev) => ({
      ...prev,
      date: newDate.toISOString().split('T')[0],
    }));
  };
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    const fetchMonthEventList = async () => {
      const response = await selectEventListMonth(sortOption);
      console.log(response);
      setFestivals(response);
    };
    fetchMonthEventList();
  }, [currentDate]);

  // ✅ 특정 날짜에 해당하는 축제 개수 반환
  const countFestivalsOnDate = (date) => {
    const dateString = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    console.log(dateString);
    return festivals.filter(
      (festival) =>
        festival.startDate <= dateString && festival.endDate >= dateString
    ).length;
  };

  // ✅ 날짜 선택 시 이벤트 리스트 업데이트
  const handleDateSelection = (date) => {
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0];

    setSelectedDate(date);
    setSortOption((prev) => ({
      ...prev,
      date: localDate,
      toggle: !prev.toggle,
    }));
  };

  // ✅ 달력 렌더링
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    const startDay = firstDay.getDay();
    const today = new Date();
    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startDay) {
          week.push(
            <td key={`empty-${i}-${j}`} className="calendar-empty"></td>
          );
        } else if (day > totalDays) {
          week.push(
            <td key={`empty-${i}-${j}`} className="calendar-empty"></td>
          );
        } else {
          const date = new Date(year, month, day);
          const isToday = date.toDateString() === today.toDateString();
          const isSelected =
            date.toDateString() === selectedDate.toDateString();
          const festivalCount = countFestivalsOnDate(date);

          week.push(
            <td
              key={`day-${i}-${j}`}
              className={`calendar-day text-center rounded ${getDarkMode()} ${
                isToday ? 'calendar-today' : ''
              } ${isSelected ? 'calendar-selected' : ''}`}
              onClick={() => handleDateSelection(date)}
            >
              <div className="day-content">
                <div className="day-number">{day}</div>
                <div className="badge-container">
                  {festivalCount > 0 ? (
                    <Badge bg="primary" className="festival-badge">
                      {festivalCount}개
                    </Badge>
                  ) : (
                    <div className="festival-placeholder"></div> // 높이 유지용
                  )}
                </div>
              </div>
            </td>
          );
          day++;
        }
      }
      calendar.push(<tr key={`week-${i}`}>{week}</tr>);
      if (day > totalDays) break;
    }
    return calendar;
  };

  return (
    <>
      <Header page="cal" />
      <div className="d-flex justify-content-center">
        <Container
          className={`calendar-container mt-4 px-4 mx-auto ${getDarkMode()}`}
          variant="none"
        >
          <Row className="mb-4 col-12 d-flex align-items-center">
            <Col>
              <h3 className="fw-bold ">📅 월별 축제</h3>
            </Col>
          </Row>

          {/* 월 이동 버튼 */}
          <Row className="justify-content-between mb-4 col-12 d-flex align-items-center">
            <Col className="col-auto">
              <span className="month-title fs-4 fw-semibold px-3 py-2 rounded  border shadow-sm">
                {currentDate.toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                })}
              </span>
            </Col>
            <Col className="col-auto text-end">
              <ButtonDarkMode
                text="⬅"
                className="btn-month-nav"
                onClick={() => changeMonth(-1)}
              />
              <span className="mx-2"></span>
              <ButtonDarkMode
                text="➡"
                className="btn-month-nav"
                onClick={() => changeMonth(1)}
              />
            </Col>
          </Row>

          {/* 달력 테이블 */}
          <Row className="justify-content-center col-12">
            <Col>
              <Table
                bordered
                hover
                className={`calendar-table ${getDarkMode()}`}
                variant={`${darkMode ? 'dark' : 'light'}`}
              >
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

          {/* 축제 리스트 출력 */}
          <EventListViewWrap
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default EventCalendar;
