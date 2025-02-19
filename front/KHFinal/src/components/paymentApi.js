export const verifyPayment = async (selectedItems, totalAmount) => {
  console.log(selectedItems, totalAmount);
  try {
    const response = await fetch('http://localhost:8080/payment/verify', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ selectedItems, totalAmount }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!data.success) {
      alert(`❌ 결제 검증 실패: ${data.message}`);
      return null;
    }

    return data.paymentId;
  } catch (error) {
    alert('❌ 서버 오류: 결제 검증이 실패했습니다.');
    return null;
  }
};

export const saveReservation = async (
  paymentId,
  selectedItems,
  totalAmount
) => {
  try {
    const response = await fetch('/api/reserve', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentId, // 결제 ID
        selectedItems, // 상품 목록
        totalAmount, // 총 결제 금액
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('예약 저장 API 호출 실패:', error);
    return { success: false };
  }
};
