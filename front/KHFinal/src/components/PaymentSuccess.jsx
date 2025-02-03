import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');

  return (
    <div>
      <h2>결제 성공 🎉</h2>
      <p>주문 ID: {orderId}</p>
      <p>결제가 성공적으로 완료되었습니다.</p>
    </div>
  );
};

export default PaymentSuccess;
