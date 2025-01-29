const API_BASE_URL = "http://localhost:8080/user"; // 스프링 부트 user API 경로

// 네이버 로그인 URL 가져오기
export const getAuthUrl = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth-url`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const url = await response.text(); // 응답의 실제 텍스트 가져오기
    return url; // 네이버 로그인 URL 반환
  } catch (error) {
    console.error("네이버 로그인 URL 요청 실패:", error);
    throw error;
  }
};
// 콜백 처리 (Access Token 및 사용자 정보 요청)
export const handleCallback = async (code, state) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/callback?code=${code}&state=${state}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // JSON 데이터 파싱
    const accessToken = data.accessToken; // Access Token
    const userInfo = data.userInfo; // 사용자 정보
    const userJwt = data.userJwt; // 사용자 정보

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken); // Access Token 저장
      localStorage.setItem("userJwt", userJwt); // Access Token 저장

      console.log("Access Token 저장 완료:", accessToken);
    } else {
      console.error("Access Token이 없습니다!");
    }

    return { accessToken, userInfo }; // Access Token과 사용자 정보 반환
  } catch (error) {
    console.error("콜백 처리 실패:", error);
    throw error;
  }
};
