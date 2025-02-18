import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { verifyPayment } from './paymentApi';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems, totalAmount } = location.state || {};
  const [paymentId, setPaymentId] = useState(null); // ✅ 결제번호 상태 추가

  useEffect(() => {
    if (!selectedItems || totalAmount === undefined) {
      alert('잘못된 접근입니다.');
      navigate('/user/userCart'); // ✅ 데이터가 없으면 장바구니로 이동
    }
  }, [selectedItems, totalAmount, navigate]);

  // ✅ 결제 검증 API 호출
  const verifyPayments = async () => {
    console.log(selectedItems, totalAmount);
    try {
      const verifiedPaymentId = await verifyPayment(selectedItems, totalAmount);
      if (!verifiedPaymentId) {
        alert('결제 검증에 실패했습니다.');
        navigate('/user/userCart');
      } else {
        setPaymentId(verifiedPaymentId);
      }
    } catch (error) {
      console.error('결제 검증 오류:', error);
      alert('결제 검증 중 문제가 발생했습니다.');
      navigate('/user/userCart');
    }
  };

  const initPayment = async (verifiedPaymentId) => {
    try {
      const tossPayments = await loadTossPayments(
        import.meta.env.VITE_APP_PAYMENT_MEASUREMENT_ID
      );

      tossPayments.requestPayment('카드', {
        amount: totalAmount,
        orderId: verifiedPaymentId, // ✅ 검증된 결제번호 사용
        orderName: Array.isArray(selectedItems)
          ? selectedItems
              .map((item) => `${item.name} - ${item.qt}개`)
              .join(', ')
          : '상품 정보 없음',
        customerName: '홍길동',
        successUrl: `${window.location.origin}/payment-success`,
        failUrl: `${window.location.origin}/payment-fail`,
      });

      // ✅ 뒤로 가기 시 결제 취소
      const handlePopState = () => {
        alert('결제가 취소되었습니다.');
        navigate('/user/userCart');
      };

      window.addEventListener('popstate', handlePopState);

      // ✅ 페이지 이탈 시 경고 메시지
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = '결제를 종료하시겠습니까?';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('popstate', handlePopState);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    } catch (error) {
      console.error('결제 오류:', error);
    }
  };

  useEffect(() => {
    console.log(selectedItems, totalAmount);
    const processPayment = async () => {
      if (selectedItems && totalAmount > 0) {
        try {
          const verifiedPaymentId = await verifyPayment(
            selectedItems,
            totalAmount
          );
          if (verifiedPaymentId) {
            initPayment(verifiedPaymentId);
          } else {
            alert('결제 검증에 실패했습니다.');
            navigate('/user/userCart');
          }
        } catch (error) {
          console.error('결제 검증 오류:', error);
          alert('결제 검증 중 문제가 발생했습니다.');
          navigate('/user/userCart');
        }
      }
    };

    processPayment();
  }, [selectedItems, totalAmount, navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>결제 진행 중...</h1>
      <p>잠시만 기다려 주세요.</p>
    </div>
  );
};

export default Payment;
