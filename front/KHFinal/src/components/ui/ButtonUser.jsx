import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context'; // 다크 모드 Context 가져오기
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ButtonUser = ({ text, nickName, onClick }) => {
  const tokenNickName = 'nickName'; //추후 토큰에서 닉네임값 추출
  const [visible, setVisible] = useState(false);
  const { getDarkModeHover } = useContext(Context); // 다크 모드 상태 가져오기
  useEffect(() => {
    if (nickName == tokenNickName) {
      setVisible(true);
    }
  }, [nickName]);
  return (
    <Button
      onClick={onClick}
      className={`ButtonDarkMode   ${getDarkModeHover()}`}
      variant="none"
      style={{ display: visible ? 'block' : 'none' }}
    >
      {text}
    </Button>
  );
};

// ✅ 프롭 타입 정의
ButtonUser.propTypes = {
  text: PropTypes.string.isRequired, // 버튼에 표시될 텍스트
  onClick: PropTypes.func.isRequired, // 버튼 클릭 시 실행할 함수
};

export default ButtonUser;
