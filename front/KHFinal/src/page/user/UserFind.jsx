import { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Context } from '../../Context';
import { ButtonDarkMode } from '../../components/ui';
import {
  getCommonUserIdByEmail,
  sendIdByEmail,
  getCommonUserPwdByEmail,
  sendPwdByEmail,
  updateRandomPwdById,
} from './userApi';
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
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  // 아이디 찾기 (목업)
  const handleFindId = async () => {
    const data = await getCommonUserIdByEmail(email);
    if (data !== null) {
      await sendIdByEmail(email, data.id);
      alert('📨 이메일로 아이디를 발송했습니다.');
    }
  };

  // 임시 비밀번호 발급
  const handleFindPassword = async () => {
    const data = await getCommonUserPwdByEmail(email, userId);
    if (data !== null) {
      const randomPwd = generateRandomPassword();
      (await updateRandomPwdById(userId, randomPwd)) &&
        (await sendPwdByEmail(email, randomPwd));
      alert('📨 이메일로 임시 비밀번호를 발송했습니다.');
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

          <div className="text-end mt-5">
            <ButtonDarkMode
              text="아이디 찾기"
              onClick={handleFindId}
              width={'w-100'}
            />
          </div>
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
          <div className="text-end mt-5">
            <ButtonDarkMode
              text="비밀번호 찾기"
              onClick={handleFindPassword}
              width={'w-100'}
            />
          </div>
        </>
      )}
      {/* 결과 메시지 출력 */}
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
};

export default UserFind;
