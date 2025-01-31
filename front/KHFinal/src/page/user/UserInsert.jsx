import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleRegister } from './userApi';

const UserInsert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null); // ✅ 초기 상태를 `null`로 설정

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

  if (!formData) return <p>Loading...</p>; // ✅ `formData`가 `null`이면 로딩 표시

  return (
    <div>
      <h1>회원가입 페이지</h1>
      <form onSubmit={handleSubmit}>
        {/* Hidden 필드 */}
        <input type="hidden" name="id" value={formData.id} />
        <input type="hidden" name="provider" value={formData.provider} />
        <input type="hidden" name="role" value="2" />

        <label>
          이름:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          이메일:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          전화번호:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          성별:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">선택 없음</option>
            <option value="M">남성</option>
            <option value="F">여성</option>
          </select>
        </label>
        <br />
        <label>
          생년월일:
          <input
            type="date"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          지역 코드:
          <input
            type="number"
            name="region"
            value={formData.region}
            onChange={handleChange}
            placeholder="지역 코드를 입력하세요"
          />
        </label>
        <br />
        <button type="submit">회원가입 완료</button>
      </form>
    </div>
  );
};

export default UserInsert;
