import React, { useContext } from 'react';
import { Context } from '../../Context'; // 다크 모드 Context 가져오기
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './ButtonDarkMode.css';

const ButtonDarkMode = ({ text, onClick, variant = 'primary' }) => {
  const { darkMode } = useContext(Context); // 다크 모드 상태 가져오기

  return (
    <Button
      onClick={onClick}
      className={`ButtonDarkMode ${darkMode ? 'dark-mode' : 'light-mode'} ${
        variant === 'outline' ? 'outline' : ''
      }`}
    >
      {text}
    </Button>
  );
};

// ✅ 프롭 타입 정의
ButtonDarkMode.propTypes = {
  text: PropTypes.string.isRequired, // 버튼에 표시될 텍스트
  onClick: PropTypes.func.isRequired, // 버튼 클릭 시 실행할 함수
  variant: PropTypes.oneOf(['primary', 'outline']), // 버튼 스타일 (기본값: primary)
};

export default ButtonDarkMode;
