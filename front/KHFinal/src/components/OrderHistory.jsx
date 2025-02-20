import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const OrderHistory = () => {
  const navigate = useNavigate();

  useEffect(() => {
    alert('예매가 완료되었습니다! 🎉'); // ✅ 예매 완료 메시지 띄우기
    setTimeout(() => {
      navigate('/user/bookingList', { replace: true }); // ✅ 2초 후 자동 이동
    }, 2000);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.content}>
        <h1 style={styles.title}>예매 완료</h1>
        <p style={styles.message}>잠시 후 예매 내역 페이지로 이동합니다...</p>
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#007bff',
  },
  message: {
    fontSize: '1.2rem',
    color: '#6c757d',
  },
};
