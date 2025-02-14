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
