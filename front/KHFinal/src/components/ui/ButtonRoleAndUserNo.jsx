import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context'; // 다크 모드 Context 가져오기
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { authCheckRoleAndUserNo } from './uiApi';

const ButtonRoleAndUserNo = ({ text, userNo, role, onClick }) => {
  //text = 버튼 , role = nickName(manager,user) 메니저와 user의 닉네임을 jwt에서 추출후 프로퍼티값과 비교, isManager = true일때는 manager버튼 false 일때는 user버튼 ,onClick = 버튼 클릭 시 실행할 함수
  //<ButtonNickName text="삭제" nickName="manager" isManager={true} onClick={() => console.log('버튼 클릭')} />

  const [visible, setVisible] = useState(false);
  const { getDarkModeHover } = useContext(Context); // 다크 모드 상태 가져오기
  useEffect(() => {
    const getJwtRole = async () => {
      const response = await authCheckRoleAndUserNo(role, userNo);
      setVisible(response);
    };
    getJwtRole();
  }, [role, userNo]);

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

export default ButtonRoleAndUserNo;
