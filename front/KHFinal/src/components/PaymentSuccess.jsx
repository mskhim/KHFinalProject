import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');
  const paymentKey = queryParams.get('paymentKey');
  const amount = queryParams.get('amount');

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const response = await fetch('http://localhost:8080/payment/success', {
          method: 'POST',
          credentials: 'include', // ✅ 쿠키 포함
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId, paymentKey, amount }),
        });

        const result = await response.json();

        if (result.authenticated === false) {
          alert('인증이 필요합니다.');
          navigate('/login');
        } else if (result.message === '결제 성공 및 예약 확정 완료') {
          // ✅ URL에서 쿼리 파라미터 제거 (뒤로가기 시 결제 재요청 방지)
          window.history.replaceState(null, '', '/user/orderHistory');

          // ✅ 예매 내역 페이지로 이동
          navigate('/user/orderHistory');
        } else {
          alert('결제 처리 중 오류가 발생했습니다.');
          navigate('/user/userCart');
        }
      } catch (error) {
        console.error('결제 확인 오류:', error);
        alert('서버와 통신 중 오류가 발생했습니다.');
        navigate('/user/userCart');
      }
    };

    if (orderId && paymentKey && amount) {
      confirmPayment();
    } else {
      // ✅ URL 파라미터가 없을 경우 예매 내역 페이지로 이동
      navigate('/user/orderHistory');
    }
  }, [orderId, paymentKey, amount, navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>결제 진행 중...</h1>
      <div className="d-flex justify-content-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
};

export default PaymentSuccess;
