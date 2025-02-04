import React, { useState } from 'react';
import './BookingList.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function BookingList() {
  // Initialize states
  const [selectedSection, setSelectedSection] = useState('reservation-history');
  const [selectedReservations, setSelectedReservations] = useState([]); // Track selected reservations for cancellation
  const [reservations, setReservations] = useState([
    // Sample reservation data
    { id: 12345, date: '2025-01-20', status: '완료' },
    { id: 12346, date: '2025-01-25', status: '완료' },
  ]);
  const [canceledReservations, setCanceledReservations] = useState([]); // Track canceled reservations

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
      setCanceledReservations((prev) => [...prev, ...canceled]);

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
        <header>
          <h1>예매내역</h1>
        </header>

        <div className="BookingList-BookingList-wrapper">
          {/* 왼쪽 메뉴 */}
          <div className="BookingList-menu">
            <ul>
              <li>
                <a
                  href="#"
                  className={
                    selectedSection === 'reservation-history' ? 'active' : ''
                  }
                  onClick={() => showSection('reservation-history')}
                >
                  내 예매내역
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={
                    selectedSection === 'reservation-cancel' ? 'active' : ''
                  }
                  onClick={() => showSection('reservation-cancel')}
                >
                  취소내역
                </a>
              </li>
            </ul>
          </div>

          {/* 오른쪽 콘텐츠 */}
          <div className="BookingList-content">
            <div
              className={`BookingList-section ${
                selectedSection === 'reservation-history' ? 'active' : ''
              }`}
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
                      <th>예매 날짜</th>
                      <th>상태</th>
                      <th>선택</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td>{reservation.id}</td>
                        <td>{reservation.date}</td>
                        <td>{reservation.status}</td>
                        <td>
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleReservationSelect(reservation.id)
                            }
                            checked={selectedReservations.includes(
                              reservation.id
                            )}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <button
                className="BookingList-button"
                onClick={handleCancelReservations}
              >
                예매 취소
              </button>
            </div>

            <div
              className={`BookingList-section ${
                selectedSection === 'reservation-cancel' ? 'active' : ''
              }`}
              id="reservation-cancel"
            >
              <h2>예매 취소</h2>
              {canceledReservations.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>예약번호</th>
                      <th>예매 날짜</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {canceledReservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td>{reservation.id}</td>
                        <td>{reservation.date}</td>
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
