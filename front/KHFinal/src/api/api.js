// ✅ React에서 403 응답 감지 후 자동 리다이렉트하는 fetch 래퍼 함수
export const fetchWithAuth = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include', // ✅ 쿠키 포함 (JWT 전달)
    });

    if (response.status === 403) {
      window.location.href = '/unauthorized'; // ✅ 403 발생 시 리다이렉트
    }

    return response.json(); // ✅ JSON 응답 반환
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error;
  }
};
export const customFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include', // ✅ 쿠키 포함 (JWT 전달)
    });

    // ✅ 403 Forbidden 처리 (에러 발생시키지 않고 null 반환)
    if (response.status === 403) {
      console.warn('🚨 접근 권한 없음! 로그인 페이지로 이동합니다.');
      window.location.href = '/unauthorized';
      return null; // ✅ 여기서 반환하면 이후 `response.json()` 실행 안 됨
    }

    return response;
  } catch (error) {
    console.error('❌ API 요청 중 오류 발생:', error);
    throw error;
  }
};
