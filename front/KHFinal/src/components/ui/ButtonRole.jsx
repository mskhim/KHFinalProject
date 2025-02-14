import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context'; // 다크 모드 Context 가져오기
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { authCheckRole } from './uiApi';

const ButtonRole = ({ text, role, onClick }) => {
  //text = 버튼 text, role = 버튼 보여줄 role(manager,admin), onClick = 버튼 클릭 시 실행할 함수
  //<ButtonRole text="삭제" role="manager" onClick={() => console.log('버튼 클릭')} />
  const [tokenRole, setTokenRole] = useState('Role_1'); // 추후 토큰에서 role값 추출
  const [jwtRole, setJwtRole] = useState(null);
  const [visible, setVisible] = useState(false);
  const { getDarkModeHover } = useContext(Context); // 다크 모드 상태 가져오기
  useEffect(() => {
    const getJwtRole = async () => {
      const response = await authCheckRole(role);
      setVisible(response);
    };
    getJwtRole();
  }, [jwtRole, role, tokenRole]);
  return (
    <Button
      onClick={onClick}
      className={`ButtonDarkMode   ${getDarkModeHover()} text-nowrap`}
      variant="none"
      style={{ display: visible ? 'block' : 'none' }}
    >
      {text}
    </Button>
  );
};

export default ButtonRole;
