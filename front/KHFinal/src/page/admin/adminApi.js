// ManagerManage 페이지
export const managerSelectAllBySearch = async (name) => {
  try {
    const response = await fetch(
      `http://localhost:8080/admin/managerSelectAllBySearch?name=${name}`,
      {
        method: 'GET',
        credentials: 'include', // ✅ JWT 쿠키 포함
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('매니저 정보 조회 실패:', error);
    return null;
  }
};

export const managerInsert = async (manager) => {
  try {
    const response = await fetch('http://localhost:8080/admin/managerInsert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(manager),
    });

    if (!response.ok) {
      throw new Error('Failed to insert manager');
    }

    const responseData = await response.text(); // Handle plain text response
    console.log('Manager insert response:', responseData);
    alert('추가가 완료되었습니다');
    return responseData;
  } catch (error) {
    alert('입력값을 확인해주세요. 아이디는 중복될 수 없습니다.');
    console.error('매니저 추가 실패:', error);
    throw error;
  }
};

export const managerUpdate = async (manager) => {
  try {
    const response = await fetch('http://localhost:8080/admin/managerUpdate', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(manager),
    });

    if (!response.ok) {
      const errorData = await response.text(); // Handle plain text response
      console.error('Failed to update manager:', errorData);
      throw new Error('Failed to update manager');
    }

    const responseData = await response.text(); // Handle plain text response
    console.log('Manager update response:', responseData);
    alert('수정이 완료되었습니다');
    return responseData;
  } catch (error) {
    alert('아이디는 중복될 수 없습니다. 중복을 확인해주세요');
    console.error('매니저 수정 실패:', error);
    throw error;
  }
};

export const managerDelete = async (ids) => {
  try {
    const response = await fetch('http://localhost:8080/admin/managerDelete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete managers');
    }

    const responseData = await response.text(); // Handle plain text response
    console.log('Manager delete response:', responseData);
    alert('삭제가 완료되었습니다');
    return responseData;
  } catch (error) {
    alert('삭제 중 오류가 발생했습니다.');
    console.error('매니저 삭제 실패:', error);
    throw error;
  }
};

// ManagerFestivalAuth 페이지
export const managerFestivalAuthSellectAll = async (managerNo) => {
  try {
    const response = await fetch(
      `http://localhost:8080/admin/managerFestivalAuthSellectAll?managerNo=${managerNo}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('축제 권한 조회 실패:', error);
    return [];
  }
};

export const addFestivalAuth = async (managerNo, festivalNo) => {
  try {
    const response = await fetch(
      'http://localhost:8080/admin/addFestivalAuth',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ managerNo, festivalNo }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to add festival auth');
    }

    const responseData = await response.text();
    console.log('Festival auth add response:', responseData);
    alert('축제권한 등록이 완료되었습니다');
    return responseData;
  } catch (error) {
    alert('권한을 등록할 축제를 선택해주세요');
    console.error('축제 권한 추가 실패:', error);
    throw error;
  }
};

export const deleteFestivalAuth = async (authNo) => {
  try {
    const response = await fetch(
      'http://localhost:8080/admin/deleteFestivalAuth',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ authNo }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete festival auth');
    }

    const responseData = await response.text();
    console.log('Festival auth delete response:', responseData);
    alert('축제권한 삭제가 완료되었습니다');
    return responseData;
  } catch (error) {
    console.error('축제 권한 삭제 실패:', error);
    throw error;
  }
};

export const publicDataEventSellectAll = async () => {
  try {
    const response = await fetch(
      'http://localhost:8080/admin/publicDataEventSellectAll',
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('축제 정보 조회 실패:', error);
    return null;
  }
};

// UserManage 페이지
export const userSelectAllBySearch = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8080/admin/userSelectAllBySearch?name=${id}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('유저 정보 조회 실패:', error);
    return null;
  }
};

export const userDelete = async (ids) => {
  try {
    const response = await fetch('http://localhost:8080/admin/userDelete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete users');
    }

    const responseData = await response.text();
    console.log('User delete response:', responseData);
    alert('삭제가 완료되었습니다');
    return responseData;
  } catch (error) {
    alert('삭제 중 오류가 발생했습니다.');
    console.error('유저 삭제 실패:', error);
    throw error;
  }
};

// FestivalManage 페이지
export const festivalSelectAllBySearch = async (eventName) => {
  try {
    const response = await fetch(
      `http://localhost:8080/admin/festivalSelectAllBySearch?eventName=${eventName}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('축제 정보 조회 실패:', error);
    return null;
  }
};

export const festivalDelete = async (ids) => {
  try {
    const response = await fetch('http://localhost:8080/admin/festivalDelete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete festivals');
    }

    const responseData = await response.text();
    console.log('Festival delete response:', responseData);
    alert('삭제가 완료되었습니다');
    return responseData;
  } catch (error) {
    alert('삭제 중 오류가 발생했습니다.');
    console.error('축제 삭제 실패:', error);
    throw error;
  }
};

// ReviewManage 페이지
export const reviewSelectAllBySearch = async (eventName) => {
  try {
    const response = await fetch(
      `http://localhost:8080/admin/reviewSelectAllBySearch?eventName=${eventName}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('리뷰 정보 조회 실패:', error);
    return null;
  }
};

export const reviewDelete = async (ids) => {
  try {
    const response = await fetch('http://localhost:8080/admin/reviewDelete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete reviews');
    }

    const responseData = await response.text();
    console.log('Review delete response:', responseData);
    alert('삭제가 완료되었습니다');
    return responseData;
  } catch (error) {
    alert('삭제 중 오류가 발생했습니다.');
    console.error('리뷰 삭제 실패:', error);
    throw error;
  }
};

// QnAManage 페이지
export const qnaSelectAllBySearch = async (eventName) => {
  try {
    const response = await fetch(
      `http://localhost:8080/admin/qnaSelectAllBySearch?eventName=${eventName}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('QnA 정보 조회 실패:', error);
    return null;
  }
};

export const qnaDelete = async (ids) => {
  try {
    const response = await fetch('http://localhost:8080/admin/qnaDelete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete QnAs');
    }

    const responseData = await response.text();
    console.log('QnA delete response:', responseData);
    alert('삭제가 완료되었습니다');
    return responseData;
  } catch (error) {
    alert('삭제 중 오류가 발생했습니다.');
    console.error('QnA 삭제 실패:', error);
    throw error;
  }
};

// NoticeManage 페이지
export const noticeSelectAllBySearch = async (title) => {
  try {
    const response = await fetch(
      `http://localhost:8080/admin/noticeSelectAllBySearch?title=${title}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('공지사항 정보 조회 실패:', error);
    return null;
  }
};

export const noticeInsert = async (notice) => {
  try {
    const response = await fetch('http://localhost:8080/admin/noticeInsert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(notice),
    });

    if (!response.ok) {
      throw new Error('Failed to insert notice');
    }

    const responseData = await response.text();
    console.log('Notice insert response:', responseData);
    alert('추가가 완료되었습니다');
    return responseData;
  } catch (error) {
    alert('입력값을 확인해주세요.');
    console.error('공지사항 추가 실패:', error);
    throw error;
  }
};

export const noticeUpdate = async (notice) => {
  try {
    const response = await fetch('http://localhost:8080/admin/noticeUpdate', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(notice),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Failed to update notice:', errorData);
      throw new Error('Failed to update notice');
    }

    const responseData = await response.text();
    console.log('Notice update response:', responseData);
    alert('수정이 완료되었습니다');
    return responseData;
  } catch (error) {
    alert('입력값을 확인해주세요.');
    console.error('공지사항 수정 실패:', error);
    throw error;
  }
};

export const noticeDelete = async (ids) => {
  try {
    const response = await fetch('http://localhost:8080/admin/noticeDelete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete notices');
    }

    const responseData = await response.text();
    console.log('Notice delete response:', responseData);
    alert('삭제가 완료되었습니다');
    return responseData;
  } catch (error) {
    alert('삭제 중 오류가 발생했습니다.');
    console.error('공지사항 삭제 실패:', error);
    throw error;
  }
};

// BannerManage 페이지
export const insertBanner = async (formData) => {
  try {
    const response = await fetch('http://localhost:8080/admin/insertBanner', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    return response.ok;
  } catch (error) {
    console.error('배너 추가 실패:', error);
    return false;
  }
};

export const deleteBanner = async (bannerId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/admin/deleteBanner/${bannerId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );

    return response.ok;
  } catch (error) {
    console.error('배너 삭제 실패:', error);
    return false;
  }
};

export const bannerSellectAll = async () => {
  try {
    const response = await fetch(
      'http://localhost:8080/admin/bannerSellectAll',
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('배너 정보 조회 실패:', error);
    return null;
  }
};

// ReservedManage 페이지
export const reservedSelectAllBySearch = async (eventName) => {
  try {
    const response = await fetch(
      `http://localhost:8080/admin/reservedSelectAllBySearch?eventName=${eventName}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('예약 정보 조회 실패:', error);
    return null;
  }
};

// CanceledManage 페이지
export const canceledSelectAllBySearch = async (eventName) => {
  try {
    const response = await fetch(
      `http://localhost:8080/admin/canceledSelectAllBySearch?eventName=${eventName}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('취소된 예약 정보 조회 실패:', error);
    return null;
  }
};

export const eventSellectAll = async () => {
  try {
    const response = await fetch(
      'http://localhost:8080/admin/eventSellectAll',
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('이벤트 정보 조회 실패:', error);
    return null;
  }
};
export const getStats = async () => {
  try {
    const response = await fetch('http://localhost:8080/admin/stats', {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('이벤트 정보 조회 실패:', error);
    return null;
  }
};
export const updatePublicData = async () => {
  alert('업데이트를 시작합니다.');
  try {
    const response = await fetch(
      'http://localhost:8080/event/fetchPublicData',
      {
        method: 'GET',
        credentials: 'include',
      }
    );
  } catch (error) {
    return null;
  }
};
