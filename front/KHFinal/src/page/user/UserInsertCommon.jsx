import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleRegister } from './userApi';
import { Button, Container } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './css/UserInsert.css';
import { Context } from '../../Context';

const UserInsert = () => {
  const navigate = useNavigate();
  const { getDarkMode, getDarkModeHover } = useContext(Context);
  const [formData, setFormData] = useState({
    id: '',
    pwd: '',
    confirmPwd: '',
    phone: '',
    provider: '',
    name: '',
    email: '',
    role: '2',
    gender: '',
    birth: '',
    region: '',
    apiid: '',
    nickname: '',
  });

  const [nicknameValid, setNicknameValid] = useState(false);
  const [passwordError, setPasswordError] = useState(''); // 비밀번호 불일치 오류 메시지 상태
  const [passwordSuccess, setPasswordSuccess] = useState(''); // 비밀번호 일치 메시지 상태

  const handleNicknameCheck = () => {
    const nickname = formData.nickname.trim();
    if (nickname === '') {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (nickname === 'test') {
      setNicknameValid(false);
      alert('이미 사용중인 닉네임입니다.');
    } else {
      setNicknameValid(true);
      alert('사용 가능한 닉네임입니다.');
    }
  };

  // 비밀번호 변경 시 일치 여부 확인
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'confirmPwd') {
      if (value !== formData.pwd) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
        setPasswordSuccess('');
      } else {
        setPasswordError('');
        setPasswordSuccess('비밀번호가 일치합니다.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await handleRegister(formData);
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
                {/* 숨겨진 필드 (id, provider, role, apiid) */}
                <input type="hidden" name="id" value={formData.id} />
                <input type="hidden" name="provider" value={formData.provider} />
                <input type="hidden" name="role" value={formData.role} />
                <input type="hidden" name="apiid" value={formData.apiid} />

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
                  <Button
                    type="button"
                    onClick={handleNicknameCheck}
                    variant="none"
                    className={`${getDarkModeHover()} ml-2 w-10`}
                    style={{ marginTop: '25px', marginLeft: '20px' }}
                  >
                    중복 확인
                  </Button>
                </div>

                {/* 비밀번호 입력 필드 (선택 사항) */}
                <div className="UserInsert-input-group">
                  <label htmlFor="pwd">비밀번호</label>
                  <input
                    type="password"
                    name="pwd"
                    value={formData.pwd}
                    onChange={handleChange}
                    className="UserInsert-input-field"
                    placeholder="비밀번호를 입력해주세요"
                    required
                  />
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
                  {passwordError && <p className="UserInsertCommon-text-danger">{passwordError}</p>}
                  {passwordSuccess && (
                    <p className="UserInsertCommon-text-success">{passwordSuccess}</p>
                  )}
                </div>

                {/* 이메일 입력 필드 */}
                <div className="UserInsert-input-group">
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
