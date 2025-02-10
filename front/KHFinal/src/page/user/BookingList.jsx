import React, { useContext, useState } from 'react';
import './css/BookingList.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Context } from '../../Context';
import { Button } from 'react-bootstrap';

function BookingList() {
  // 상태 초기화
  const [selectedSection, setSelectedSection] = useState('reservation-history');
  const [selectedReservations, setSelectedReservations] = useState([]); // 취소할 예약 선택
  const [reservations, setReservations] = useState([
    // 샘플 예약 데이터: 예약 번호, 예매일, 축제명, 사용 기한, 인원 수
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
      date: '2025-02-22', 
      status: '완료', 
      festival: '봄꽃 축제', 
      expiration: '2025-03-02', 
      people: 5 
    },
    { 
      id: 12348, 
      date: '2025-02-22', 
      status: '완료', 
      festival: '봄맞이 축제', 
      expiration: '2025-03-10', 
      people: 3 
    },
  ]);
  const [canceledReservations, setCanceledReservations] = useState([]); // 취소된 예약들
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

    // 예매 취소 확인
    const isConfirmed = window.confirm('해당 예매내역을 취소하시겠습니까?');
    if (isConfirmed) {
      // 선택한 예약을 취소된 예약 목록으로 이동
      const canceled = reservations.filter((reservation) =>
        selectedReservations.includes(reservation.id)
      );

      // 취소된 예약을 원래 예약 목록에서 제거
      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => !selectedReservations.includes(reservation.id)
        )
      );

      // 취소된 예약을 취소 목록에 추가
      setCanceledReservations((prev) => [
        ...prev,
        ...canceled.map((reservation) => ({
          ...reservation,
          status: '예매 취소', // 취소된 예약은 상태를 '예매 취소'로 설정
        })),
      ]);

      // 선택한 예약 초기화
      setSelectedReservations([]);

      // 취소 완료 알림
      alert('취소가 완료되었습니다.');
    }
  };

  return (
    <>
      <Header />
      <div className={`BookingList-container ${getDarkMode()}`}> {/* 다크모드를 적용 */}
        <header className="BookingList-header">
          <h1>예매내역</h1>
        </header>

        <div className="BookingList-wrapper">
          {/* 왼쪽 메뉴 */}
          <div className={`BookingList-menu ${getDarkMode()}`}>
            <ul>
              <li>
                <span
                  className={selectedSection === 'reservation-history' ? 'active' : ''}
                  onClick={() => showSection('reservation-history')}
                >
                  내 예매 내역
                </span>
              </li>
              <li>
                <span
                  className={selectedSection === 'reservation-cancel' ? 'active' : ''}
                  onClick={() => showSection('reservation-cancel')}
                >
                  취소 내역
                </span>
              </li>
            </ul>
          </div>

          {/* 오른쪽 콘텐츠 */}
          <div className={`BookingList-content ${getDarkMode()}`}> {/* 다크모드를 적용 */}
            <div
              className={`BookingList-section ${selectedSection === 'reservation-history' ? 'active' : ''}`}
              id="reservation-history"
            >
              {reservations.length === 0 ? (
                <p>예매 내역이 없습니다.</p>
              ) : (
                <table className='BookingList-table'>
                  <thead>
                    <tr className='BookingList-tr'>
                      <th className='BookingList-th'>예약번호</th>
                      <th className='BookingList-th'>예매일</th>
                      <th className='BookingList-th'>축제명</th>
                      <th className='BookingList-th'>인원</th>
                      <th className='BookingList-th'>사용 기한</th>
                      <th className='BookingList-th'>선택</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td className='BookingList-td'>{reservation.id}</td>
                        <td className='BookingList-td'>{reservation.date}</td>
                        <td className='BookingList-td'>{reservation.festival}</td>
                        <td className='BookingList-td'>{reservation.people}</td>
                        <td className='BookingList-td'>{reservation.expiration}</td>
                        <td className='BookingList-td'>
  <input
    type="checkbox"
    onChange={() => handleReservationSelect(reservation.id)}
    checked={selectedReservations.includes(reservation.id)}
    disabled={reservation.id === 12345 || reservation.id === 12346} // 예약 번호가 12345 또는 12346인 항목만 체크박스를 비활성화
  />
</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <p className="BookingList-warning">
                ※ 예매 취소는 예매일로 부터 24시간 이내에만 가능합니다.
              </p>
              <Button
                variant="none"
                className={`${getDarkModeHover()} mt-3 w-100`}
                onClick={handleCancelReservations}
              >
                예매 취소
              </Button>
            </div>

            <div
              className={`BookingList-section ${selectedSection === 'reservation-cancel' ? 'active' : ''}`}
              id="reservation-cancel"
            >
              {canceledReservations.length > 0 ? (
                <table className='BookingList-table'>
                  <thead>
                    <tr className='BookingList-tr'>
                      <th className='BookingList-th'>예약번호</th>
                      <th className='BookingList-th'>예매일</th>
                      <th className='BookingList-th'>축제명</th>
                      <th className='BookingList-th'>인원</th>
                      <th className='BookingList-th'>사용 기한</th>
                      <th className='BookingList-th'>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {canceledReservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td className='BookingList-td'>{reservation.id}</td>
                        <td className='BookingList-td'>{reservation.date}</td>
                        <td className='BookingList-td'>{reservation.festival}</td>
                        <td className='BookingList-td'>{reservation.people}</td>
                        <td className='BookingList-td'>{reservation.expiration}</td>
                        <td className='BookingList-td'>
                          <span style={{ color: 'red' }}>{reservation.status}</span> {/* 상태 텍스트를 빨간색으로 설정 */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p id='BookingList-cancle'>취소 내역이 존재하지 않습니다.</p>
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
