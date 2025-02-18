import Header from '../../components/Header';
import Footer from '../../components/Footer';
import React, { useState, useEffect, useContext } from 'react';
import './css/BookingList.css';
import { Context } from '../../Context';
import { Button } from 'react-bootstrap';

// API 함수 import
import { getReservedData, deleteReservedData, saveReservedCancelData, getReservedCancelData } from './userApi'; // 'saveReservedCancelData', 'getReservedCancelData' 추가 import

function BookingList() {
  // 상태 초기화
  const [selectedSection, setSelectedSection] = useState('reservation-history');
  const [selectedReservations, setSelectedReservations] = useState([]); // 취소할 예약 선택
  const [reservations, setReservations] = useState([]); // 서버에서 불러온 예매 내역
  const [canceledReservations, setCanceledReservations] = useState([]); // 취소된 예약들
  const { getDarkMode, getDarkModeHover } = useContext(Context);

  // 예매 내역을 불러오는 useEffect
  useEffect(() => {
    const fetchReservedData = async () => {
      const data = await getReservedData();

      console.log('받아온 데이터:', data); // 데이터를 로그로 확인

      if (data.authenticated) {
        // 서버에서 받은 예매 내역을 상태에 저장
        setReservations(data.reservedData || []); // 응답이 없으면 빈 배열로 처리
      } else {
        alert(data.message || '예매 내역을 불러오는 데 실패했습니다.');
      }
    };

    fetchReservedData();
  }, []); // 컴포넌트 마운트 시에만 실행

  // 예매 취소 내역을 불러오는 useEffect
  useEffect(() => {
    const fetchCanceledData = async () => {
      const data = await getReservedCancelData();

      if (data.authenticated) {
        setCanceledReservations(data.data || []); // 취소된 예매 내역을 상태에 저장
      } else {
        alert(data.message || '취소 내역을 불러오는 데 실패했습니다.');
      }
    };

    fetchCanceledData();
  }, []); // 컴포넌트 마운트 시에만 실행

  // 메뉴 항목 클릭 시 호출되는 함수
  const showSection = (sectionId) => {
    setSelectedSection(sectionId);
  };

  // 예약 항목 선택 시 호출되는 함수
  const handleReservationSelect = (reservationId) => {
    setSelectedReservations((prev) =>
      prev.includes(reservationId)
        ? prev.filter((id) => id !== reservationId) // 이미 선택된 항목을 취소
        : [...prev, reservationId] // 선택되지 않은 항목을 추가
    );
  };

// 예매 취소 버튼 클릭 시 호출되는 함수
const handleCancelReservations = async () => {
  if (selectedReservations.length === 0) {
    alert('취소할 예약을 선택하세요.');
    return;
  }

  const isConfirmed = window.confirm('선택하신 예매 내역을 취소하시겠습니까?');
  if (isConfirmed) {
    // 선택된 예매 내역을 취소하기 위해 삭제 요청
    const cancelResults = await Promise.all(
      selectedReservations.map(async (reservationId) => {
        const result = await deleteReservedData(reservationId);
        return { reservationId, result };
      })
    );

    // 삭제된 예약 목록 필터링
    const canceled = reservations.filter((reservation) =>
      selectedReservations.includes(reservation.no) // 'no'로 수정
    );

    // 삭제된 예매 내역 상태 업데이트
    setReservations((prevReservations) =>
      prevReservations.filter(
        (reservation) => !selectedReservations.includes(reservation.no) // 'no'로 수정
      )
    );

    // 취소된 예약 내역 서버에 저장
    await Promise.all(
      canceled.map(async (reservation) => {
        const result = await saveReservedCancelData({
          no: reservation.no,
          name: reservation.name,
          sysdate: reservation.sysdate,
          endDate: reservation.endDate,
          qt: reservation.qt,
          totalCost: reservation.totalCost,
          status: '예매 취소', // 예매 취소 상태로 저장
        });
        return result;
      })
    );

    // 취소된 예약을 상태에 추가
    setCanceledReservations((prev) => [
      ...prev,
      ...canceled.map((reservation) => ({
        ...reservation,
        status: '예매 취소', // 취소된 예약은 상태를 '예매 취소'로 설정
      })),
    ]);

    // 선택한 예약 취소 후 상태 초기화
    setSelectedReservations([]);

    // 취소된 예약에 대한 확인 메시지
    const successfulCancel = cancelResults.every((result) => result.result);
    if (successfulCancel) {
      alert('취소가 완료되었습니다. 취소 내역은 왼쪽의 "취소 내역"에서 확인 가능합니다.');
    } else {
      alert('일부 예매 내역 취소에 실패했습니다.');
    }
  }
};

  return (
    <>
      <Header />
      <div className={`BookingList-container ${getDarkMode()}`}>
        <header className="BookingList-header">
          <h1>예매내역</h1>
        </header>

        <div className="BookingList-wrapper">
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

          <div className={`BookingList-content ${getDarkMode()}`}>
            <div
              className={`BookingList-section ${selectedSection === 'reservation-history' ? 'active' : ''}`}
              style={{ textAlign: 'center' }}
              id="reservation-history"
            >
              {Array.isArray(reservations) && reservations.length === 0 ? (
                <p>예매 내역이 없습니다.</p>
              ) : (
                <table className="BookingList-table">
                  <thead>
                    <tr className="BookingList-tr">
                      <th className="BookingList-th">예약번호</th>
                      <th className="BookingList-th">예매일</th>
                      <th className="BookingList-th">축제명</th>
                      <th className="BookingList-th">인원</th>
                      <th className="BookingList-th">사용 기한</th>
                      <th className="BookingList-th">결제 금액</th> {/* 결제 금액 항목 추가 */}
                      <th className="BookingList-th">선택</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                      <tr key={reservation.no}>
                        <td className="BookingList-td">{reservation.no}</td>
                        <td className="BookingList-td">
                          {(() => {
                            const date = new Date(reservation.sysdate);
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
                            const day = String(date.getDate()).padStart(2, '0');
                            return `${year}-${month}-${day}`;
                          })()}
                        </td>
                        <td className="BookingList-td">{reservation.name}</td>
                        <td className="BookingList-td">{reservation.qt}</td>
                        <td className="BookingList-td">{reservation.endDate}</td>
                        <td className="BookingList-td">{new Intl.NumberFormat().format(reservation.totalCost)} 원</td> {/* 결제 금액 표시 */}
                        <td className="BookingList-td">
                          <input
                            type="checkbox"
                            onChange={() => handleReservationSelect(reservation.no)} // 'NO' -> 'no'로 수정
                            checked={selectedReservations.includes(reservation.no)} // 'NO' -> 'no'로 수정
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <p className="BookingList-warning">
                ※ 예매 취소는 예매일로부터 24시간 이내에만 가능합니다.
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
                <table className="BookingList-table">
                  <thead>
                    <tr className="BookingList-tr">
                      <th className="BookingList-th">예약번호</th>
                      <th className="BookingList-th">예매일</th>
                      <th className="BookingList-th">축제명</th>
                      <th className="BookingList-th">인원</th>
                      <th className="BookingList-th">사용 기한</th>
                      <th className="BookingList-th">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {canceledReservations.map((reservation) => (
                      <tr key={reservation.no}>
                        <td className="BookingList-td">{reservation.no}</td>
                        <td className="BookingList-td">
                          {new Date(reservation.sysdate).toLocaleDateString('ko-KR')}
                        </td>
                        <td className="BookingList-td">{reservation.name}</td>
                        <td className="BookingList-td">{reservation.qt}</td>
                        <td className="BookingList-td">{reservation.endDate}</td>
                        <td className="BookingList-td">
                          <span style={{ color: 'red' }}>{reservation.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p id="BookingList-cancel" style={{ textAlign: 'center' }}>취소 내역이 존재하지 않습니다.</p>
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
