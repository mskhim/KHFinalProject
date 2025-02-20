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
export const handleLogin = async (id, provider, pwd) => {
  try {
    const response = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // ✅ 쿠키 자동 포함
      body: JSON.stringify({
        id: id,
        pwd: pwd,
        provider: provider || '',
      }),
    });
    const data = await response.json();
    if (data.success) {
      alert(`${data.nickname}님, 환영합니다!`);
    } else {
      alert(data.message);
    }
    return data;
  } catch (error) {
    alert('실패');
    console.error('로그인 요청 실패:', error);
    return false;
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
 * API 요청 시 JWT 자동 연장
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
 * jwt 쿠키에 저장 되어있는지 확인하는 메소/
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

/*
 * JWT쿠키 검사를 통해 로그인 상태를 확인한 후,
 * 마이페이지에 회원 정보를 불러옴./
 */
export const getUserData = async () => {
  try {
    const response = await fetch('http://localhost:8080/user/getUserData', {
      method: 'GET',
      credentials: 'include', // ✅ 쿠키 자동 포함
    });

    if (!response.ok) {
      return { authenticated: false };
    }

    const data = await response.json();
    // const data = {
    //   "authenticated", true,
    //   "message", "JWT 유효",
    //   "user", user
    // };
    return data.user; // { authenticated: true, user: {...} }
  } catch (error) {
    return { authenticated: false };
  }
};

/*
* JWT쿠키 검사를 통해 로그인 상태를 확인한 후,
* 마이페이지에 불러온 회원 정보를 수정함./
*/
export const updateUserData = async (formData) => {
  try {
    const response = await fetch('http://localhost:8080/user/updateUserData', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // ✅ 쿠키 자동 포함
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      return { authenticated: false };
    }

    const data = await response.json();
    return data; // { authenticated: true, user: {...} }
  } catch (error) {
    return { authenticated: false };
  }
}

/*
* JWT쿠키 검사를 통해 로그인 상태를 확인한 후,
* 마이페이지에 출력된 이메일, 비밀번호 입력을 통해 회원 탈퇴 진행./
*/
export const deleteUserData = async (formData) => {
  try {
    const response = await fetch('http://localhost:8080/user/deleteUserData', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // ✅ 쿠키 자동 포함
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.authenticated) {  // 서버의 응답 확인
      alert(data.message);  // 서버에서 받은 메시지 표시
    } else {
      alert(data.message);  // 서버에서 받은 메시지 표시
    }
    return data.authenticated;  // 서버에서 받은 성공 여부 반환
  } catch (error)
  {
    console.error("회원 탈퇴 오류:", error);  // 서버 요청 오류에 대한 로그 출력
    alert('서버 요청에 실패했습니다. 다시 시도해주세요.');
    
    return false;
  }
}

/*
 * JWT쿠키 검사를 통해 로그인 상태를 확인한 후,
 * 장바구니 정보를 불러옴./
 */
export const getCartData = async () => {
  try
  {
    const response = await fetch('http://localhost:8080/user/getCartData',{
      method: 'GET',
      credentials: 'include', // ✅ 쿠키 자동 포함
    });

    if (!response.ok)
    {
      return { authenticated: false };
    }

    const data = await response.json();
    return data.cartDTO; // { authenticated: true, cartDTO: {...} }
  } catch (error)
  {
    return { authenticated: false };
  }
};

/*
* JWT쿠키 검사를 통해 로그인 상태를 확인한 후,
* 장바구니 내역을 삭제함./
*/
export const deleteCartData = async (cart) => {
  try {
    const response = await fetch('http://localhost:8080/user/deleteCartData', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),  // Cart 객체를 JSON으로 보냄
      credentials: 'include',  // 쿠키 자동 포함
    });

    const data = await response.json();  // 응답 데이터 파싱

    console.log('서버 응답:', data);  // 디버깅 용도

    return data;  // 응답값 그대로 반환 (프론트에서 처리)
  } catch (error) {
    console.error("장바구니 삭제 오류:", error);  // 서버 요청 오류에 대한 로그 출력
    return { authenticated: false, message: '서버 요청에 실패했습니다. 다시 시도해주세요.' };
  }
};

/*
 * JWT쿠키 검사를 통해 로그인 상태를 확인한 후,
 * 예매 내역을 조회함.
 */
export const getReservedData = async () =>
{
  try
  {
    // 예매 내역 조회 API 호출
    const response = await fetch('http://localhost:8080/user/getReservedData', {
      method: 'GET',
      credentials: 'include', // ✅ 쿠키 자동 포함
    });

    // 응답이 OK가 아니면 인증 실패 처리
    if (!response.ok)
    {
      return { authenticated: false };
    }

    // 응답 데이터 파싱
    const data = await response.json();

    // 예매 내역이 있으면 반환, 없으면 빈 배열을 반환
    if (data.authenticated)
    {
      return { authenticated: true, reservedData: data.reservedData };
    }

  } catch (error)
  {
    // 예외가 발생하면 인증 실패로 처리
    return { authenticated: false, message: "서버 오류가 발생했습니다." };
  }
};

/*
 * JWT쿠키 검사를 통해 로그인 상태를 확인한 후,
 * 조회된 예매내역을 취소(삭제)함.
 */
export const deleteReservedData = async (reservationId) => {
  try {
    // 예매 내역 취소(삭제) API 호출
    const response = await fetch('http://localhost:8080/user/deleteReservedData', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // ✅ 쿠키 자동 포함
      body: JSON.stringify({ no: reservationId }), // 삭제할 예약 번호
    });

    // 응답이 OK가 아니면 인증 실패 처리
    if (!response.ok) {
      const errorData = await response.json();
      return { authenticated: false, message: errorData.message || "예매 취소 실패" };
    }

    // 응답 데이터 파싱
    const data = await response.json();

    // 예매 취소가 성공한 경우 처리
    if (data.authenticated) {
      return { authenticated: true, message: "예매 취소가 완료되었습니다." };
    } else {
      return { authenticated: false, message: data.message || "예매 취소 실패" };
    }

  } catch (error) {
    // 예외가 발생하면 오류 처리
    return { authenticated: false, message: "서버 오류가 발생했습니다." };
  }
};

/*
 * JWT쿠키 검사를 통해 로그인 상태를 확인한 후,
 * 취소된 예매 내역을 조회함.
 */
export const getReservedCancelData = async () => {
  try {
    // 취소된 예매 내역 조회 API 호출
    const response = await fetch('http://localhost:8080/user/getReservedCancelData', {
      method: 'GET',
      credentials: 'include', // ✅ 쿠키 자동 포함
    });

    // 응답이 OK가 아니면 인증 실패 처리
    if (!response.ok) {
      return { authenticated: false };
    }

    // 응답 데이터 파싱
    const data = await response.json();
    console.log('취소된 예매 내역 데이터:', data); // 콘솔 로그 추가

    // 취소된 예매 내역이 있으면 반환, 없으면 빈 배열을 반환
    if (data.authenticated) {
      return { authenticated: true, reservedCancelData: data.reservedCancelData };
    } else {
      return { authenticated: false, message: data.message || "취소된 예매 내역이 없습니다." };
    }

  } catch (error) {
    // 예외가 발생하면 인증 실패로 처리
    console.error('취소된 예매 내역 조회 실패:', error); // 콘솔 로그 추가
    return { authenticated: false, message: "서버 오류가 발생했습니다." };
  }
};

/**
 * 이메일을 받아서 일반회원가입 User를 가져오는 API, 아이디만 가져올것
 */
export const getCommonUserIdByEmail = async (email) => {
  try {
    const response = await fetch(
      `http://localhost:8080/user/findCommonUserIdByEmail?email=${email}`,
      {
        method: 'GET',
        credentials: 'include', // ✅ JWT 쿠키 포함
      }
    );

    if (!response.ok) {
      alert('❌ 해당 이메일로 가입된 계정이 없습니다.');
      return null;
    }

    const data = await response.json();
    return data.user; // { id, username, email, role, ... }
  } catch (error) {
    console.error('이메일 기반 사용자 조회 실패:', error);
    return null;
  }
};
/**
 * 이메일과 아이디를 받아서 아이디를 이메일로 전송하는 API
 */
export const sendIdByEmail = async (email, id) => {
  try {
    const response = await fetch('http://localhost:8080/email/sendUserId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, id: id }),
    });

    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error('❌ 이메일 전송 실패:', error);
  }
};
/**
 * 이메일과 아이디를 받아서 일반회원가입 User를 가져오는 API
 */
export const getCommonUserPwdByEmail = async (email, id) => {
  try {
    const response = await fetch(
      `http://localhost:8080/user/findCommonUserPwdByEmail?email=${email}&id=${id}`,
      {
        method: 'GET',
        credentials: 'include', // ✅ JWT 쿠키 포함
      }
    );

    if (!response.ok) {
      alert('❌ 해당 이메일 또는 아이디로 가입된 계정이 없습니다.');
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('이메일 기반 사용자 조회 실패:', error);
    return null;
  }
};
/**
 * 아이디와 임시비밀번호 를 받아서 db에 저장된 비밀번호를 변경하는 API
 */
export const updateRandomPwdById = async (id, pwd) => {
  try {
    const response = await fetch(
      'http://localhost:8080/user/updateRandomPwdById',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, pwd: pwd }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data.flag;
  } catch (error) {
    console.error('❌ 이메일 전송 실패:', error);
  }
};
/**
 * 이메일을 받아서 임시 비밀번호를 이메일로 전송하는 API
 */
export const sendPwdByEmail = async (email, pwd) => {
  try {
    const response = await fetch('http://localhost:8080/email/sendUserPwd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, pwd: pwd }),
    });
    const result = await response.text();
  } catch (error) {
    console.error('❌ 이메일 전송 실패:', error);
  }
};
/**
 * 닉네임 중복확인 API
 */
export const checkNickName = async (nickname) => {
  try {
    const response = await fetch(
      `http://localhost:8080/user/checkNickName?nickname=${nickname}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    if (data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('❌ api 호출 실패:', error);
  }
};

/**
 * 아이디 중복확인 API
 */
export const checkId = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8080/user/checkId?id=${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    if (data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('❌ api 호출 실패:', error);
  }
};
/**
 * 이메일 중복확인 API
 */
export const checkEmail = async (email) => {
  try {
    const response = await fetch(
      `http://localhost:8080/user/checkEmail?email=${email}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    if (data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('❌ api 호출 실패:', error);
  }
};