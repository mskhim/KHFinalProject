import { useEffect } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';

const Payment = () => {
  const initPayment = async () => {
    try {
      const tossPayments = await loadTossPayments(
        'test_ck_0RnYX2w532o9a5AYNkNNVNeyqApQ'
      ); // ✅ 테스트 클라이언트 키
      tossPayments.requestPayment('카드', {
        amount: 10000, // 결제 금액
        orderId: 'ORDER_123456789', // 고유 주문 ID (백엔드에서 생성)
        orderName: '주문', // 주문명
        customerName: '홍길동', // 고객명
        successUrl: `${window.location.origin}/payment-success`, // 성공 시 이동할 페이지
        failUrl: `${window.location.origin}/payment-fail`, // 실패 시 이동할 페이지
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initPayment(); // ✅ 컴포넌트가 마운트될 때 실행
  }, []);

  return <button onClick={initPayment}>결제하기</button>; // ✅ 버튼에서도 호출 가능
};

export default Payment;
