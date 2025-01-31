import React, { useState } from 'react';
import './EventCalendar.css'; // 스타일 파일 (아래에 CSS 코드 포함)
import { Header, Footer, ProtectedRoute } from '../../components';

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

    // 현재 월의 첫 날의 요일 (0: 일요일, 6: 토요일)
    const startDay = firstDay.getDay();
    // 달력 배열 생성
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
          const festival = getFestival(date); // 해당 날짜의 축제 정보 가져오기
          week.push(
            <td
              key={j}
              onClick={() => setSelectedFestival(festival)}
              className={festival ? 'has-festival' : ''}
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

  // 임의의 축제 데이터 (실제로는 API에서 가져올 수 있음)
  const festivals = [
    { date: '2023-10-01', name: '국군의 날' },
    { date: '2023-10-03', name: '개천절' },
    { date: '2023-10-09', name: '한글날' },
  ];

  // 해당 날짜의 축제 정보 반환
  const getFestival = (date) => {
    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
    return festivals.find((festival) => festival.date === dateString);
  };

  return (
    <>
      <Header />
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={() => changeMonth(-1)}>&lt;</button>
          <h2>
            {currentDate.toLocaleString('default', {
              year: 'numeric',
              month: 'long',
            })}
          </h2>
          <button onClick={() => changeMonth(1)}>&gt;</button>
        </div>
        <table className="calendar-table">
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
        </table>
        {selectedFestival && (
          <div className="festival-info">
            <h3>{selectedFestival.date}</h3>
            <p>{selectedFestival.name}</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EventCalendar;
