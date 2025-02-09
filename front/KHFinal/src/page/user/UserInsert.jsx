import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleRegister } from './userApi';
import { Button, Container } from 'react-bootstrap';
import './css/UserInsert.css';
import { Context } from '../../Context';

const UserInsert = () => {
  const { getDarkMode, getDarkModeHover } = useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null); // ✅ 초기 상태를 `null`로 설정
  const [nicknameValid, setNicknameValid] = useState(false); // 중복 확인 상태

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user'); // ✅ 세션 스토리지에서 사용자 정보 가져오기
    if (!storedUser) {
      alert('잘못된 접근입니다.');
      navigate('/');
      return;
    }

    const userData = JSON.parse(storedUser); // ✅ JSON 파싱
    console.log('🔍 세션 스토리지에서 사용자 정보 가져오기:', userData);

    // ✅ 백엔드에서 변환한 `User` 객체를 그대로 사용
    setFormData({
      id: userData.id,
      phone: userData.phone,
      gender: userData.gender,
      birth: userData.birth,
      region: '', // 사용자가 입력하도록 빈 값 유지
      provider: userData.provider,
      name: userData.name,
      email: userData.email,
      nickname: '', // 추가된 닉네임 필드
      role: '2',
    });

    // ✅ 컴포넌트 언마운트 시 `sessionStorage`에서 'user' 삭제
    return () => {
      console.log('🚨 컴포넌트 언마운트! sessionStorage에서 user 삭제');
      sessionStorage.removeItem('user');
    };
  }, [navigate]);

  // 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(formData); // ✅ 회원가입 API 호출

      // ✅ 회원가입 성공 후, 로그인된 상태로 유지 → 자동으로 JWT 발급됨
      const preLoginUrl = sessionStorage.getItem('preLoginUrl') || '/';
      navigate(preLoginUrl);
      sessionStorage.removeItem('preLoginUrl');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 닉네임 중복 확인 핸들러
  const handleNicknameCheck = () => {
    // 중복 확인 로직 (예시: 서버에서 확인 후 상태 업데이트)
    const nickname = formData.nickname.trim();
    if (nickname === '') {
      alert('닉네임을 입력해주세요.');
      return;
    }

    // 예시: 닉네임이 "test"일 때 중복 처리
    if (nickname === 'test') {
      setNicknameValid(false);
      alert('이미 사용중인 닉네임입니다.');
    } else {
      setNicknameValid(true);
      alert('사용 가능한 닉네임입니다.');
    }
  };

  if (!formData) return <p>Loading...</p>; // ✅ `formData`가 `null`이면 로딩 표시

  return (
    <>
      <Header />
      <div className="UserInsert-container">
        <header className="UserInsert-header">
          <h1>회원가입</h1>
        </header>

        <form className="UserInsert-form-group" onSubmit={handleSubmit}>
          {/* UserInsert-wrapper를 flex로 설정하여 내부 요소들을 수직 및 수평 중앙 정렬 */}
          <div className="UserInsert-wrapper d-flex flex-column align-items-center justify-content-center">
            <Container
              className={`UserInsert-content d-flex flex-column align-items-center justify-content-center ${getDarkMode()} form-container`}
            >
              <div className="UserInsert-form-group-div">
                <input type="hidden" name="id" value={formData.id} />
                <input
                  type="hidden"
                  name="provider"
                  value={formData.provider}
                />
                <input type="hidden" name="role" value="2" />

                {/* 이름 입력 필드 */}
                <div className="UserInsert-input-group">
                  <label htmlFor="name">이름</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="UserInsert-input-field"
                  />
                </div>

                {/* 닉네임 입력 필드 및 중복 확인 버튼을 가로로 배치 */}
                <div className="UserInsert-input-group d-flex flex-row align-items-center">
                  <div className="w-75">
                    <label htmlFor="nickname">닉네임</label>
                    <input
                      type="text"
                      name="nickname"
                      value={formData.nickname}
                      onChange={handleChange}
                      className="UserInsert-input-field w-100" // 너비 조정
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleNicknameCheck}
                    variant="none"
                    className={`${getDarkModeHover()} ml-2 w-10`} // 버튼 간 간격 및 너비 설정
                    style={{ marginTop: '25px', marginLeft: '20px' }} // 버튼을 입력 필드와 같은 높이에 배치
                  >
                    중복 확인
                  </Button>
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

            {/* 버튼 컨테이너: 수직 중앙 정렬을 위한 설정 */}
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
