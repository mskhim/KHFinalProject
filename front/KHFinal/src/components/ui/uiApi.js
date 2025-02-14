/**
 * 요청한 role을db에서 체크
 */
export const authCheckRole = async (role) => {
  try {
    const response = await fetch(
      `http://localhost:8080/auth/checkRole?role=${role}`,
      {
        method: 'GET',
        credentials: 'include', // ✅ 쿠키 자동 포함
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await response.json();
    return result.authenticated;
  } catch (error) {
    console.error('jwt 인증 실패:', error);
  }
};

export const authCheckRoleAndUserNo = async (role, userNo) => {
  try {
    const response = await fetch(
      `http://localhost:8080/auth/checkRoleAndUserNo?role=${role}&userNo=${userNo}`,
      {
        method: 'GET',
        credentials: 'include', // ✅ 쿠키 자동 포함
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await response.json();
    return result.authenticated;
  } catch (error) {
    console.error('jwt 인증 실패:', error);
  }
};
