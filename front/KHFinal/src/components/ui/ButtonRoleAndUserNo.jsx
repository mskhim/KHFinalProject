import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context'; // 다크 모드 Context 가져오기
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { authCheckRoleAndUserNo } from './uiApi';

const ButtonRoleAndUserNo = ({ text, userNo, role, onClick }) => {
  const [visible, setVisible] = useState(false);

  const { getDarkModeHover } = useContext(Context); // 다크 모드 상태 가져오기

  useEffect(() => {
    if (!role || !userNo) {
      return;
    }

    const getJwtRole = async () => {
      try {
        const response = await authCheckRoleAndUserNo(role, userNo);
        setVisible(response === true); // ✅ response가 true일 때만 표시
      } catch (error) {
        console.error('❌ 권한 체크 중 오류 발생:', error);
        setVisible(false);
      }
    };
    getJwtRole();
  }, [role, userNo]);

  return (
    <Button
      onClick={onClick}
      className={`ButtonDarkMode ${getDarkModeHover()} text-nowrap`}
      variant="none"
      style={{ display: visible ? 'block' : 'none' }}
    >
      {text}
    </Button>
  );
};

ButtonRoleAndUserNo.propTypes = {
  text: PropTypes.string.isRequired, // 버튼 텍스트
  userNo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // userNo는 문자열 또는 숫자 가능
  role: PropTypes.string, // role은 문자열
  onClick: PropTypes.func.isRequired, // 클릭 이벤트 핸들러
};

export default ButtonRoleAndUserNo;
