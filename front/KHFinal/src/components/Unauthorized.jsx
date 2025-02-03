import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ 부트스트랩 CSS 추가

const Unauthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 5초 후 메인 페이지로 자동 이동
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="alert alert-danger text-center p-4"
        style={{ maxWidth: '400px' }}
      >
        <h1 className="mb-3">🚫 접근 불가</h1>
        <p>⚠️ 해당 페이지에 접근할 권한이 없습니다.</p>
        <p className="text-muted">5초 후 메인 페이지로 이동합니다.</p>
        <button onClick={() => navigate('/')} className="btn btn-danger mt-3">
          메인 페이지로 이동
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
