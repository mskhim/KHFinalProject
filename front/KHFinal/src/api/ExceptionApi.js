import axios from 'axios';

const exApi = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // 쿠키 인증 유지
});

// 응답 인터셉터 설정
exApi.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 반환
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const errorCode = error.response.data?.errorCode || null;
      const message = error.response.data?.message || '서버 오류 발생';

      console.log('API 응답 오류:', status, errorCode, message); // ✅ 디버깅용 로그 추가

      if (status === 403) {
        // ✅ 403 Forbidden 감지
        console.log('403 Forbidden 감지됨');
        alert('접근 권한이 없습니다.');
        return Promise.reject(error); // ✅ Axios 요청을 거부하고 `catch()`에서 처리
      }

      if (status === 401) {
        // ✅ 401 Unauthorized (로그인 필요)
        alert('로그인이 필요합니다.');
        return Promise.reject(error);
      }
      switch (errorCode) {
        case 'DUPLICATE_ERROR':
          alert(message || '동일한 데이터가 존재합니다.');
          break;
        case 'AUTH_REQUIRED':
          alert('로그인이 필요합니다.');
          window.location.href = '/userLoginPage';
          break;
        case 'ACCESS_DENIED':
          alert('접근 권한이 없습니다.');
          window.location.href = '/unauthorized';
          break;
        case 'FK_CONSTRAINT_ERROR':
          alert('이 데이터는 삭제할 수 없습니다.');
          break;
        case 'DATA_TOO_LONG':
          alert('입력한 데이터가 너무 깁니다.');
          break;
        case 'INVALID_REQUEST':
          alert(message || '잘못된 요청입니다.');
          break;
        default:
          alert(message || '서버 오류가 발생했습니다.');
      }
    }
    return Promise.reject(error); // 오류를 그대로 반환
  }
);

export default exApi;
