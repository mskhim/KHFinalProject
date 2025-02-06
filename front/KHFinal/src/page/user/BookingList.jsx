import React, { useContext, useState } from 'react';
import './css/BookingList.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Context } from '../../Context';

function BookingList() {
  // Initialize states
  const [selectedSection, setSelectedSection] = useState('reservation-history');
  const [selectedReservations, setSelectedReservations] = useState([]); // Track selected reservations for cancellation
  const [reservations, setReservations] = useState([
    // Sample reservation data with festival name, expiration date, and people count
    { 
      id: 12345, 
      date: '2025-01-20', 
      status: '완료', 
      festival: '춘향제', 
      expiration: '2025-01-21', 
      people: 4 
    },
    { 
      id: 12346, 
      date: '2025-01-25', 
      status: '완료', 
      festival: '화왕산 축제', 
      expiration: '2025-01-26', 
      people: 2 
    },
    { 
      id: 12347, 
      date: '2025-02-01', 
      status: '완료', 
      festival: '봄꽃 축제', 
      expiration: '2025-02-02', 
      people: 5 
    },
    { 
      id: 12348, 
      date: '2025-02-05', 
      status: '완료', 
      festival: '봄맞이 축제', 
      expiration: '2025-02-10', 
      people: 3 
    },
  ]);
  const [canceledReservations, setCanceledReservations] = useState([]); // Track canceled reservations
  const { getDarkMode, getDarkModeHover } = useContext(Context);

  // 메뉴 항목 클릭 시 호출되는 함수
  const showSection = (sectionId) => {
    setSelectedSection(sectionId);
  };

  // 예약 항목 선택 시 호출되는 함수
  const handleReservationSelect = (reservationId) => {
    setSelectedReservations((prev) =>
      prev.includes(reservationId)
        ? prev.filter((id) => id !== reservationId)
        : [...prev, reservationId]
    );
  };

  // 예매 취소 버튼 클릭 시 호출되는 함수
  const handleCancelReservations = () => {
    if (selectedReservations.length === 0) {
      alert('취소할 예약을 선택하세요.');
      return;
    }

    // Confirm cancellation
    const isConfirmed = window.confirm('해당 예매내역을 취소하시겠습니까?');
    if (isConfirmed) {
      // Move selected reservations to canceledReservations
      const canceled = reservations.filter((reservation) =>
        selectedReservations.includes(reservation.id)
      );

      // Remove canceled reservations from reservations
      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => !selectedReservations.includes(reservation.id)
        )
      );

      // Add canceled reservations to canceledReservations
      setCanceledReservations((prev) => [
        ...prev,
        ...canceled.map((reservation) => ({
          ...reservation,
          status: '예매 취소', // Set the status to '예매 취소' for canceled reservations
        })),
      ]);

      // Clear selected reservations after canceling
      setSelectedReservations([]);

      // Show success alert
      alert('취소가 완료되었습니다.');
    }
  };

  return (
    <>
      <Header />
      <div className="BookingList-BookingList-container">
        <header className="BookingList-header">
          <h1>예매내역</h1>
        </header>

        <div className="BookingList-BookingList-wrapper">
          {/* 왼쪽 메뉴 */}
          <div className={`BookingList-menu ${getDarkMode()}`}>
            <ul>
              <li>
                <span
                  className={selectedSection === 'reservation-history' ? 'active' : ''}
                  onClick={() => showSection('reservation-history')}
                >
                  내 예매내역
                </span>
              </li>
              <li>
                <span
                  className={selectedSection === 'reservation-cancel' ? 'active' : ''}
                  onClick={() => showSection('reservation-cancel')}
                >
                  취소내역
                </span>
              </li>
            </ul>
          </div>

          {/* 오른쪽 콘텐츠 */}
          <div className="BookingList-content">
            <div
              className={`BookingList-section ${selectedSection === 'reservation-history' ? 'active' : ''}`}
              id="reservation-history"
            >
              <h2>내 예매내역</h2>
              {reservations.length === 0 ? (
                <p>예매 내역이 없습니다.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>예약번호</th>
                      <th>예매일</th>
                      <th>축제명</th>
                      <th>인원</th>
                      <th>사용 기한</th>
                      <th>선택</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => {
                      const isExpired = new Date(reservation.expiration) < new Date();
                      return (
                        <tr key={reservation.id}>
                          <td>{reservation.id}</td>
                          <td>{reservation.date}</td>
                          <td>{reservation.festival}</td>
                          <td>{reservation.people}</td>
                          <td>{reservation.expiration}</td>
                          <td>
                            <input
                              type="checkbox"
                              onChange={() => handleReservationSelect(reservation.id)}
                              checked={selectedReservations.includes(reservation.id)}
                              disabled={isExpired}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
              <button
                className="BookingList-button"
                onClick={handleCancelReservations}
              >
                예매 취소
              </button>
              <p className="BookingList-warning">
                ※ 예매 취소는 예매일로 부터 24시간 이내에만 가능합니다.
              </p>
            </div>

            <div
              className={`BookingList-section ${selectedSection === 'reservation-cancel' ? 'active' : ''}`}
              id="reservation-cancel"
            >
              <h2>예매 취소</h2>
              {canceledReservations.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>예약번호</th>
                      <th>예매일</th>
                      <th>축제명</th>
                      <th>인원</th>
                      <th>사용 기한</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {canceledReservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td>{reservation.id}</td>
                        <td>{reservation.date}</td>
                        <td>{reservation.festival}</td>
                        <td>{reservation.people}</td>
                        <td>{reservation.expiration}</td>
                        <td>{reservation.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>취소된 예매가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookingList;
