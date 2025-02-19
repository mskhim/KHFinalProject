import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context'; // 다크 모드 Context 가져오기
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ButtonRole = ({ text, role, onClick }) => {
  const [tokenRole, setTokenRole] = useState(null); // ✅ 토큰에서 role 값 가져오도록 변경
  const [visible, setVisible] = useState(false);
  const { getDarkModeHover } = useContext(Context); // 다크 모드 상태 가져오기

  // ✅ 토큰에서 role 값 가져오는 함수 (예제)
  const fetchTokenRole = () => {
    const storedTokenRole = sessionStorage.getItem('userRole'); // ✅ 실제 토큰에서 가져오도록 수정 가능
    return storedTokenRole || 'gues'; // 기본값 설정
  };

  useEffect(() => {
    // ✅ role 값이 없으면 요청하지 않음
    if (!role) {
      console.warn('⚠️ role 값이 없습니다. 요청을 생략합니다.');
      return;
    }
    // ✅ 토큰에서 role 값을 가져옴
    setTokenRole(fetchTokenRole());
    if (role === 'admin' && tokenRole == 0) {
      setVisible(true);
    }
    if (role === 'manager' && tokenRole == 1) {
      setVisible(true);
    }
    if (role === 'common' && tokenRole == 2) {
      setVisible(true);
    }
  }, [role, tokenRole]);

  return (
    <Button
      onClick={onClick}
      className={`ButtonDarkMode ${getDarkModeHover()} text-nowrap`}
      variant="none"
      style={{ display: visible ? 'block' : 'none' }} // ✅ false면 숨김
    >
      {text}
    </Button>
  );
};

// ✅ PropTypes 추가 (안전한 타입 검증)
ButtonRole.propTypes = {
  text: PropTypes.string.isRequired, // 버튼 텍스트
  role: PropTypes.string.isRequired, // role은 필수
  onClick: PropTypes.func.isRequired, // 클릭 이벤트 핸들러
};

export default ButtonRole;
