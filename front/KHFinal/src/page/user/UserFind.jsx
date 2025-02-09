import { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Context } from '../../Context';

// 난수 비밀번호 생성 함수
const generateRandomPassword = () => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const UserFind = ({ type }) => {
  const { getDarkMode } = useContext(Context);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  // 아이디 찾기 (목업)
  const handleFindId = () => {
    if (email === 'test@example.com') {
      setMessage('회원님의 아이디는 "testuser123" 입니다.');
    } else {
      setMessage('해당 이메일로 가입된 아이디가 없습니다.');
    }
  };

  // 비밀번호 찾기 (목업)
  const handleFindPassword = () => {
    if (userId === 'testuser123' && email === 'test@example.com') {
      const newPassword = generateRandomPassword();
      setMessage(`새로운 임시 비밀번호: ${newPassword}`);
    } else {
      setMessage('입력한 정보가 올바르지 않습니다.');
    }
  };

  return (
    <div className={`p-3`}>
      {type === 'id' ? (
        // ✅ 아이디 찾기 UI
        <>
          <Form.Group className="mb-3">
            <Form.Label>가입 시 사용한 이메일을 입력하세요</Form.Label>
            <Form.Control
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleFindId}>
            아이디 찾기
          </Button>
        </>
      ) : (
        // ✅ 비밀번호 찾기 UI
        <>
          <Form.Group className="mb-3">
            <Form.Label>아이디 입력</Form.Label>
            <Form.Control
              type="text"
              placeholder="아이디 입력"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>가입 시 사용한 이메일을 입력하세요</Form.Label>
            <Form.Control
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button variant="danger" onClick={handleFindPassword}>
            비밀번호 찾기
          </Button>
        </>
      )}
      {/* 결과 메시지 출력 */}
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
};

export default UserFind;
