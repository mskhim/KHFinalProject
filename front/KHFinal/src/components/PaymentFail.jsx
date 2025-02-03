import { useLocation } from 'react-router-dom';

const PaymentFail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get('message');

  return (
    <div>
      <h2>결제 실패 ❌</h2>
      <p>사유: {message}</p>
    </div>
  );
};

export default PaymentFail;
