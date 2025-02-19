import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { verifyPayment } from './paymentApi';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems, totalAmount } = location.state || {};
  const [paymentId, setPaymentId] = useState('');

  // 🔹 페이지 이탈 경고 이벤트 핸들러
  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = '결제가 완료되지 않았습니다. 페이지를 떠나시겠습니까?';
  };

  useEffect(() => {
    if (!selectedItems || totalAmount === undefined) {
      alert('잘못된 접근입니다.');
      navigate('/user/userCart');
    }
  }, [selectedItems, totalAmount, navigate]);

  useEffect(() => {
    // 🔹 이벤트 추가 (사용자가 페이지 벗어날 때 경고)
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // 🔹 이벤트 제거 (컴포넌트 언마운트 시)
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const initPayment = async (orderId) => {
    try {
      const tossPayments = await loadTossPayments(
        import.meta.env.VITE_APP_PAYMENT_MEASUREMENT_ID
      );

      tossPayments.requestPayment('카드', {
        amount: totalAmount,
        orderId: orderId, // ✅ orderId 직접 사용
        orderName: selectedItems
          ? selectedItems
              .map((item) => `${item.name} - ${item.qt}개`)
              .join(', ')
          : '상품 정보 없음',
        customerName: '홍길동',
        successUrl: `http://localhost:5173/user/paymentSuccess?orderId=${orderId}`,
        failUrl: `${window.location.origin}/user/paymentFail`,
      });

      // ✅ 결제 성공 후 beforeunload 이벤트 제거 (경고창 방지)
      window.removeEventListener('beforeunload', handleBeforeUnload);
    } catch (error) {
      console.error('결제 오류:', error);
    }
  };

  useEffect(() => {
    if (selectedItems && totalAmount > 0) {
      const processPayment = async () => {
        try {
          const verifiedPaymentId = await verifyPayment(
            selectedItems,
            totalAmount
          );

          if (verifiedPaymentId) {
            // ✅ orderId 구성: "data_결제ID_이벤트번호-수량_이벤트번호-수량"
            const newOrderId = `data_${verifiedPaymentId}_${selectedItems
              .map((item) => `${item.eventNo}-${item.qt}-${item.id}`)
              .join('_')}`;

            setPaymentId(newOrderId); // ✅ 최종 orderId 저장
            await initPayment(newOrderId); // ✅ orderId를 initPayment에 전달
          } else {
            alert('결제 검증에 실패했습니다.');
            navigate('/user/userCart');
          }
        } catch (error) {
          console.error('결제 검증 오류:', error);
          alert('결제 검증 중 문제가 발생했습니다.');
          navigate('/user/userCart');
        }
      };

      processPayment();
    }
  }, [selectedItems, totalAmount, navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>결제 진행 중...</h1>
      <p>잠시만 기다려 주세요.</p>
    </div>
  );
};

export default Payment;
