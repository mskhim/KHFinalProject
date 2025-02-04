import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context'; // 다크 모드 Context 가져오기
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ButtonNickName = ({ text, nickName, isManager, onClick }) => {
  //text = 버튼 , role = nickName(manager,user) 메니저와 user의 닉네임을 jwt에서 추출후 프로퍼티값과 비교, isManager = true일때는 manager버튼 false 일때는 user버튼 ,onClick = 버튼 클릭 시 실행할 함수
  //<ButtonNickName text="삭제" nickName="manager" isManager={true} onClick={() => console.log('버튼 클릭')} />

  const [tokenNickName, setTokenNickName] = useState('nickName'); //추후 토큰에서 nickName값 추출
  const [tokenRole, setTokenRole] = useState('Role_1'); //추후 토큰에서 role값 추출
  const [visible, setVisible] = useState(false);
  const { getDarkModeHover } = useContext(Context); // 다크 모드 상태 가져오기
  useEffect(() => {
    if (
      nickName == tokenNickName &&
      isManager == true &&
      tokenRole === 'Role_1'
    ) {
      setVisible(true);
    }
    if (
      nickName == tokenNickName &&
      isManager == false &&
      tokenRole === 'Role_0'
    ) {
      setVisible(true);
    }
  }, [nickName, isManager, tokenNickName, tokenRole]);

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
ButtonNickName.propTypes = {
  text: PropTypes.string.isRequired, // 버튼에 표시될 텍스트
  onClick: PropTypes.func.isRequired, // 버튼 클릭 시 실행할 함수
};

export default ButtonNickName;
