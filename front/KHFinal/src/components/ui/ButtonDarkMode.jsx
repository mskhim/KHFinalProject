import React, { useContext } from 'react';
import { Context } from '../../Context'; // 다크 모드 Context 가져오기
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ButtonDarkMode = ({ text, onClick, width, className }) => {
  const { getDarkModeHover } = useContext(Context); // 다크 모드 상태 가져오기

  return (
    <Button
      onClick={onClick}
      className={` ${getDarkModeHover()} ${width} ${className} text-nowrap`}
      variant="none"
    >
      {text}
    </Button>
  );
};

// ✅ 프롭 타입 정의
ButtonDarkMode.propTypes = {
  text: PropTypes.string.isRequired, // 버튼에 표시될 텍스트
  onClick: PropTypes.func.isRequired, // 버튼 클릭 시 실행할 함수
  className: PropTypes.string,
};

export default ButtonDarkMode;
