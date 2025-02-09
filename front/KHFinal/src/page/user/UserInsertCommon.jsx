import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleRegister } from './userApi';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './css/UserInsert.css';
import { Context } from '../../Context';

const UserInsert = () => {
  const navigate = useNavigate();
  const { getDarkMode } = useContext(Context);
  // ✅ **초기 상태값을 명확히 설정**
  const [formData, setFormData] = useState({
    id: '', // 아이디 (소셜 로그인 등으로 자동 생성될 가능성 있음)
    pwd: '', // 비밀번호 (선택적으로 입력될 수도 있음)
    phone: '', // 전화번호
    provider: '', // 제공자 (네이버, 카카오 등)
    name: '', // 이름
    email: '', // 이메일
    role: '2', // 기본값 2 (일반 사용자)
    gender: '', // 성별 ('M' or 'F')
    birth: '', // 생년월일 (YYYY-MM-DD)
    region: '', // 지역
    apiid: '', // API 인증 ID (소셜 로그인 시 필요할 수도 있음)
  });

  // 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
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

  // 입력값 변경 핸들러
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
                <input
                  type="hidden"
                  name="provider"
                  value={formData.provider}
                />
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

                {/* 비밀번호 입력 필드 (선택 사항) */}
                <div className="UserInsert-input-group">
                  <label htmlFor="pwd">비밀번호</label>
                  <input
                    type="password"
                    name="pwd"
                    value={formData.pwd}
                    onChange={handleChange}
                    className="UserInsert-input-field"
                    placeholder="비밀번호를 입력하세요"
                    required
                  />
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

                {/* 지역 코드 입력 필드 */}
                <div className="UserInsert-input-group">
                  <label htmlFor="region">지역</label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="UserInsert-input-field"
                    placeholder="지역을 입력하세요"
                    required
                  />
                </div>
              </div>
            </Container>
            {/* 버튼 컨테이너 */}
            <div className="UserInsert-button-container d-flex justify-content-center mt-4">
              <button type="submit" className="UserInsert-button">
                회원 가입하기
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UserInsert;
