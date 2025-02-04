const NAVER_API_BASE_URL = 'http://localhost:8080/user/naver'; // 스프링부트 네이버 로그인 API 경로
const KAKAO_API_BASE_URL = 'http://localhost:8080/user/kakao'; // 스프링부트 카카오 로그인 API 경로

/**
 * 네이버 로그인 URL 가져오기
 */
export const getNaverAuthUrl = async () => {
  try {
    const response = await fetch(`${NAVER_API_BASE_URL}/auth-url`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.text();
  } catch (error) {
    console.error('네이버 로그인 URL 요청 실패:', error);
    throw error;
  }
};

/**
 * 카카오 로그인 URL 가져오기
 */
export const getKakaoAuthUrl = async () => {
  try {
    const response = await fetch(`${KAKAO_API_BASE_URL}/auth-url`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.text();
  } catch (error) {
    console.error('카카오 로그인 URL 요청 실패:', error);
    throw error;
  }
};

/**
 * 네이버 콜백 처리 (JWT를 반환하지 않고, 회원가입 여부만 확인)
 */
export const handleNaverCallback = async (code, state) => {
  try {
    const response = await fetch(
      `${NAVER_API_BASE_URL}/callback?code=${code}&state=${state}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return { isRegistered: data.isRegistered, user: data.user || null }; // 🔹 user 데이터 추가 반환
  } catch (error) {
    console.error('네이버 콜백 처리 실패:', error);
    throw error;
  }
};

/**
 * 카카오 콜백 처리 (JWT를 반환하지 않고, 회원가입 여부만 확인)
 */
export const handleKakaoCallback = async (code) => {
  try {
    const response = await fetch(`${KAKAO_API_BASE_URL}/callback?code=${code}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return { isRegistered: data.isRegistered, user: data.user || null }; // 🔹 user 데이터 추가 반환
  } catch (error) {
    console.error('카카오 콜백 처리 실패:', error);
    throw error;
  }
};

/**
 * 회원가입 처리
 */
export const handleRegister = async (formData) => {
  alert(formData.id);
  try {
    const response = await fetch('http://localhost:8080/user/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    alert('회원가입이 완료되었습니다. 이전페이지로 이동합니다.');
    return data;
  } catch (error) {
    console.error('회원가입 요청 실패:', error);
    alert('회원가입 중 오류가 발생했습니다. ' + error.message);
    throw error;
  }
};

/**
 * 로그인 처리 (JWT는 HttpOnly 쿠키에 저장되므로 따로 저장하지 않음)
 */
export const handleLogin = async (id, provider) => {
  console.log('🚀 로그인 요청:', id, provider);
  try {
    const response = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // ✅ 쿠키 자동 포함
      body: JSON.stringify({
        id: String(id),
        provider: provider || '',
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert('로그인 성공!');
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('로그인 요청 실패:', error);
  }
};

/**
 * 로그아웃 처리 (쿠키 삭제)
 */
export const handleLogout = async () => {
  try {
    const response = await fetch('http://localhost:8080/user/logout', {
      method: 'POST',
      credentials: 'include', // ✅ 쿠키 자동 포함
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    alert('로그아웃 되었습니다.');
  } catch (error) {
    console.error('로그아웃 요청 실패:', error);
  }
};

/**
 * JWT 자동 갱신 (리프레시 토큰 사용)
 */
export const refreshAccessToken = async () => {
  try {
    const response = await fetch('http://localhost:8080/user/refresh-token', {
      method: 'POST',
      credentials: 'include', // ✅ 쿠키 자동 포함
    });
    if (!response.ok) throw new Error('토큰 갱신 실패');
    console.log('🔄 액세스 토큰 갱신 완료');
  } catch (error) {
    console.error('리프레시 토큰 요청 실패:', error);
  }
};

/**
 * API 요청 시 JWT 자동 포함
 */
export const fetchWithAuth = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include', // ✅ 쿠키 자동 포함
  });

  if (response.status === 401) {
    console.log('🔄 JWT 만료됨, 리프레시 토큰 요청 중...');
    await refreshAccessToken();
    return fetch(url, {
      ...options,
      credentials: 'include',
    });
  }

  return response;
};

/**
 * jwt 쿠키에 저장 되어있는지 확인하는 메소드
 */
export const checkAuthStatus = async () => {
  try {
    const response = await fetch('http://localhost:8080/user/check-auth', {
      method: 'GET',
      credentials: 'include', // ✅ 쿠키 자동 포함
    });

    if (!response.ok) {
      return { authenticated: false };
    }
    const data = await response.json();
    return data; // { authenticated: true, user: {...} }
  } catch (error) {
    return { authenticated: false };
  }
};

/**
 * jwt 쿠키에 저장 되어있는지 확인하는 메소드
 */

export const getUserIdProvider = async () => {
  try {
    const response = await fetch('http://localhost:8080/user/check-auth', {
      method: 'GET',
      credentials: 'include', // ✅ 쿠키 자동 포함
    });

    if (!response.ok) {
      console.warn('JWT가 없거나 만료됨. 로그아웃 처리');
      return { authenticated: false };
    }

    const data = await response.json();
    return data; // { authenticated: true, user: {...} }
  } catch (error) {
    console.error('인증 상태 확인 실패:', error);
    return { authenticated: false };
  }
};
