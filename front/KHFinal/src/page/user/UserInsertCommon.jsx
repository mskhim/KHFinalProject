import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkEmail, checkId, checkNickName, handleRegister } from './userApi';
import { Button, Container, Form } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './css/UserInsert.css';
import { Context } from '../../Context';
import { use } from 'react';

const UserInsert = () => {
  const navigate = useNavigate();
  const { getDarkMode, getDarkModeHover } = useContext(Context);
  const [formData, setFormData] = useState({
    id: '',
    pwd: '',
    confirmPwd: '',
    phone: '',
    provider: 'common',
    name: '',
    email: '',
    role: '2',
    gender: '',
    birth: '',
    region: '',
    apiid: '',
    nickname: '',
  });
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const [idCheck, setIdCheck] = useState(false);
  const [pwdCheck, setPwdCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [passwordError, setPasswordError] = useState(''); // 비밀번호 불일치 오류 메시지 상태
  const [passwordLengthError, setPasswordLengthError] = useState(''); // 비밀번호 길이 오류 메시지 상태로 변경
  const [passwordSuccess, setPasswordSuccess] = useState(''); // 비밀번호 일치 메시지 상태

  // 닉네임 중복 확인 핸들러
  const handleNicknameCheck = async () => {
    const nickname = formData.nickname.trim();
    if (nickname === '') {
      alert('닉네임을 입력해주세요.');
      return;
    }
    if (nickname.length < 3) {
      alert('닉네임은 최소 3글자 이상이어야 합니다.');
      return;
    }
    const flag = await checkNickName(nickname); // ✅ 닉네임 중복 확인 API 호출
    if (!flag) {
      setNicknameCheck(false); // ✅ 중복 확인 실패 시 제출 불가능 상태로 변경
      alert('이미 사용중인 닉네임입니다.');
    } else {
      alert('사용 가능한 닉네임입니다.');
      setNicknameCheck(true); // ✅ 중복 확인 성공 시 제출 가능 상태로 변경
    }
  };

  // 아이디 중복 확인 핸들러
  const handleIdCheck = async () => {
    const id = formData.id.trim();
    if (id === '') {
      alert('아이디를 입력해주세요.');
      return;
    }
    if (id.length < 6) {
      alert('아이디는 최소 6글자 이상이어야 합니다.');
      return;
    }
    const flag = await checkId(id); // ✅ 닉네임 중복 확인 API 호출
    if (!flag) {
      setIdCheck(false); // ✅ 중복 확인 실패 시 제출 불가능 상태로 변경
      alert('이미 사용중인 아이디입니다.');
    } else {
      alert('사용 가능한 아이디입니다.');
      setIdCheck(true); // ✅ 중복 확인 성공 시 제출 가능 상태로 변경
    }
  };

  // 이메일 중복 확인 핸들러
  const handleEmailCheck = async () => {
    const email = formData.email.trim();
    if (email === '') {
      alert('이메일을 입력해주세요.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    const flag = await checkEmail(email); // ✅ 이메일 중복 확인 API 호출
    if (!flag) {
      setEmailCheck(false); // ✅ 중복 확인 실패 시 제출 불가능 상태로 변경
      alert('이미 사용중인 이메일입니다.');
    } else {
      setEmailCheck(true); // ✅ 중복 확인 성공 시 제출 가능 상태로 변경
      alert('사용 가능한 이메일입니다.');
    }
  };

  // 비밀번호 변경 시 일치 여부 확인
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // 비밀번호 길이 검사 (8자리 이상)
    if (name === 'pwd' && value.length < 8) {
      setPasswordLengthError('비밀번호는 8자리 이상이어야 합니다.');
      setPwdCheck(false);
      return; // 추가 검사를 막기 위해 return
    } else {
      setPasswordLengthError('');
    }
    if (name === 'confirmPwd') {
      if (value !== formData.pwd) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
        setPasswordSuccess('');
        setPwdCheck(false);
      } else {
        setPasswordError('');
        setPasswordSuccess('비밀번호가 일치합니다.');
        setPwdCheck(true);
      }
    }
  };

  // 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (idCheck === false || nicknameCheck === false || emailCheck === false) {
      alert('중복 확인이 필요합니다.');
      return;
    }
    if (pwdCheck === false) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await handleRegister(formData); // ✅ 회원가입 API 호출
      const preLoginUrl = sessionStorage.getItem('preLoginUrl') || '/';
      navigate(preLoginUrl);
      sessionStorage.removeItem('preLoginUrl');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    setIdCheck(false);
  }, [formData.id]);
  useEffect(() => {
    setNicknameCheck(false);
  }, [formData.nickname]);
  useEffect(() => {
    setEmailCheck(false);
  }, [formData.email]);

  return (
    <>
      <Header />
      <div className={`UserInsert-container`}>
        <header className="UserInsert-header">
          <h1>회원가입</h1>
        </header>
        <form className={`UserInsert-form-group`} onSubmit={handleSubmit}>
          <div className="UserInsert-wrapper d-flex flex-column align-items-center justify-content-center">
            <Container
              className={`UserInsert-content d-flex flex-column align-items-center justify-content-center ${getDarkMode()} form-container`}
            >
              <div className="UserInsert-form-group-div">
                {/* 아이디 입력 필드 및 중복 확인 버튼 */}
                <div className="UserInsert-input-group d-flex flex-row align-items-center">
                  <div className="w-75">
                    <label htmlFor="nickname">아이디</label>
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      className="UserInsert-input-field w-100"
                      required
                    />
                  </div>
                  {!idCheck ? (
                    <Button
                      type="button"
                      onClick={handleIdCheck}
                      variant="none"
                      className={`${getDarkModeHover()} ml-2 w-20`}
                      style={{ marginTop: '25px', marginLeft: '20px' }}
                    >
                      중복확인
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="none"
                      className="ml-2 w-10"
                      style={{
                        marginTop: '25px',
                        marginLeft: '20px',
                        backgroundColor: 'gray', // 비활성화 스타일 추가
                        color: 'white',
                        cursor: 'default', // 마우스 커서를 기본으로 설정
                      }}
                      disabled
                    >
                      확인완료
                    </Button>
                  )}
                
                </div>
                {/* 비밀번호 입력 필드 (선택 사항) */}
                <div className="UserInsert-input-group">
                  <label htmlFor="pwd">비밀번호</label>
                  <input
                    type="password"
                    name="pwd"
                    value={formData.pwd}
                    onChange={handlePasswordChange}
                    className="UserInsert-input-field"
                    placeholder="비밀번호를 입력해주세요"
                    required
                  />
                  {/* 비밀번호 길이 확인 메시지 출력 */}
                  {passwordLengthError && (
                    <Form.Text className="text-danger">
                      {passwordLengthError} {/* 빨간색 텍스트 */}
                    </Form.Text>
                  )}
                </div>
                {/* 비밀번호 확인 입력 필드 */}
                <div className="UserInsert-input-group">
                  <label htmlFor="confirmPwd">비밀번호 확인</label>
                  <input
                    type="password"
                    name="confirmPwd"
                    value={formData.confirmPwd}
                    onChange={handlePasswordChange}
                    className="UserInsert-input-field"
                    placeholder="비밀번호를 다시 입력해주세요"
                    required
                  />
                  {/* 비밀번호 일치 시 초록색 메시지 출력 */}
                    {/* 비밀번호 확인 오류 메시지 */}
                    {passwordError && (
                      <Form.Text className="text-danger">
                        {passwordError} {/* 빨간색 텍스트 */}
                      </Form.Text>
                    )}
                    {/* 비밀번호 확인 성공 메시지 */}
                    {passwordSuccess && (
                      <Form.Text className="text-success">
                        {passwordSuccess} {/* 초록색 텍스트 */}
                      </Form.Text>
                    )}
                </div>
                {/* 이름 입력 필드 */}
                <div className="UserInsert-input-group">
                  <label htmlFor="name">이름</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="UserInsert-input-field"
                    required
                  />
                </div>
                {/* 닉네임 입력 필드 및 중복 확인 버튼 */}
                <div className="UserInsert-input-group d-flex flex-row align-items-center">
                  <div className="w-75">
                    <label htmlFor="nickname">닉네임</label>
                    <input
                      type="text"
                      name="nickname"
                      value={formData.nickname}
                      onChange={handleChange}
                      className="UserInsert-input-field w-100"
                      required
                    />
                  </div>

                  {!nicknameCheck ? (
                    <Button
                      type="button"
                      onClick={handleNicknameCheck}
                      variant="none"
                      className={`${getDarkModeHover()} ml-2 w-10`}
                      style={{ marginTop: '25px', marginLeft: '20px' }}
                    >
                      중복확인
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="none"
                      className="ml-2 w-10"
                      style={{
                        marginTop: '25px',
                        marginLeft: '20px',
                        backgroundColor: 'gray', // 비활성화 스타일 추가
                        color: 'white',
                        cursor: 'default', // 마우스 커서를 기본으로 설정
                      }}
                      disabled
                    >
                      확인완료
                    </Button>
                  )}
                </div>
                {/* 이메일 입력 필드 */}
                <div className="UserInsert-input-group d-flex flex-row align-items-center">
                  <div className="UserInsert-input-group w-75">
                    <label htmlFor="email">이메일</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="UserInsert-input-field"
                      required
                    />
                  </div>
                  {!emailCheck ? (
                    <Button
                      type="button"
                      onClick={handleEmailCheck}
                      variant="none"
                      className={`${getDarkModeHover()} ml-2 w-10`}
                      style={{ marginTop: '25px', marginLeft: '20px' }}
                    >
                      중복확인
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="none"
                      className="ml-2 w-10"
                      style={{
                        marginTop: '25px',
                        marginLeft: '20px',
                        backgroundColor: 'gray', // 비활성화 스타일 추가
                        color: 'white',
                        cursor: 'default', // 마우스 커서를 기본으로 설정
                      }}
                      disabled
                    >
                      확인완료
                    </Button>
                  )}
                </div>
                {/* 전화번호 입력 필드 */}
                <div className="UserInsert-input-group">
                  <label htmlFor="phone">전화번호</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="UserInsert-input-field"
                    required
                  />
                </div>

                {/* 성별 입력 필드 */}
                <div className="UserInsert-input-group">
                  <label htmlFor="gender">성별</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="UserInsert-input-field"
                    required
                  >
                    <option value="">선택 없음</option>
                    <option value="M">남성</option>
                    <option value="F">여성</option>
                  </select>
                </div>

                {/* 생년월일 입력 필드 */}
                <div className="UserInsert-input-group">
                  <label htmlFor="birth">생년월일</label>
                  <input
                    type="date"
                    name="birth"
                    value={formData.birth}
                    onChange={handleChange}
                    className="UserInsert-input-field"
                    required
                  />
                </div>

                {/* 지역 코드 입력 필드를 select로 변경 */}
                <div className="UserInsert-input-group">
                  <label htmlFor="region">지역</label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="UserInsert-input-field"
                  >
                    <option value="">선택 없음</option>
                    <option value="서울">서울</option>
                    <option value="경기">경기</option>
                    <option value="강원">강원</option>
                    <option value="충북">충북</option>
                    <option value="충남">충남</option>
                    <option value="전북">전북</option>
                    <option value="전남">전남</option>
                    <option value="경북">경북</option>
                    <option value="경남">경남</option>
                    <option value="제주">제주</option>
                  </select>
                </div>
              </div>
            </Container>
            <div className="UserInsert-button-container d-flex justify-content-center mt-4 w-100">
              <Button
                type="submit"
                variant="none"
                className={`${getDarkModeHover()} w-50`}
              >
                회원 가입하기
              </Button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UserInsert;
