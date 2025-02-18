export const verifyPayment = async ({ selectedItems, totalAmount }) => {
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

    alert(`✅ 결제 검증 성공! 결제번호: ${data.paymentId}`);
    return data.paymentId;
  } catch (error) {
    alert('❌ 서버 오류: 결제 검증이 실패했습니다.');
    return null;
  }
};
