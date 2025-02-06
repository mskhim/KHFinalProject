import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowUp } from 'react-icons/fa'; // 📌 FontAwesome 아이콘 사용
import { Context } from '../../Context';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { getDarkMode } = useContext(Context);
  // 스크롤 이벤트 감지
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <Button
      id="Header-up-button"
      className={` select ${getDarkMode}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      variant="primary"
      style={{
        position: 'fixed',
        bottom: '50px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%', // 동그랗게 만들기
        fontSize: '20px',
        display: isVisible ? 'flex' : 'none', // 스크롤에 따라 버튼 표시 여부 결정
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // 그림자 효과
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      <FaArrowUp /> {/* 📌 위쪽 화살표 아이콘 */}
    </Button>
  );
};

export default ScrollToTopButton;
