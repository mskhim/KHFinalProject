import { stringify } from 'uuid';

/**
 * 이벤트 리스트 조회
 */
export const selectEventList = async (sortOption) => {
  try {
    const response = await fetch(
      `http://localhost:8080/event/selectEventList`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sortOption),
      }
    );
    const data = await response.json();
    return data.dataList;
  } catch (error) {
    alert('오류가 발생했습니다. ' + error.message);
    throw error;
  }
};

/**
 * 이벤트 조회
 */
export const selectEventRead = async (no) => {
  try {
    const response = await fetch(
      `http://localhost:8080/event/selectEventRead?&no=${no}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    return data.dataList;
  } catch (error) {
    alert('오류가 발생했습니다. ' + error.message);
    throw error;
  }
};

/**
 * 이벤트 삭제
 */
export const deleteEvent = async (userNo, eventNo) => {
  try {
    const response = await fetch('http://localhost:8080/event/deleteEvent', {
      method: 'DELETE',
      credentials: 'include', // ✅ 쿠키 자동 포함
      body: JSON.stringify({
        userAccountNo: userNo,
        no: eventNo,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    alert(data.message);
    return data.state;
  } catch (error) {
    alert('게시글 삭제가 불가능합니다.');
  }
};

/**
 * 장바구니 추가
 */
export const insertEventToCart = async (formData) => {
  try {
    const response = await fetch(
      'http://localhost:8080/event/insertEventToCart',
      {
        method: 'POST',
        credentials: 'include', // ✅ 쿠키 자동 포함
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    alert(data.message);
    return data.state;
  } catch (error) {
    alert('장바구니 추가에 실패했습니다.');
  }
};

/**
 * 이벤트 리뷰 조회
 */
export const selectEventReview = async (no, page) => {
  try {
    const response = await fetch(
      `http://localhost:8080/event/selectEventReview?page=${page}&no=${no}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    alert('오류가 발생했습니다. ' + error.message);
    throw error;
  }
};

/**
 * 댓글입력
 */
export const insertEventReview = async (formData) => {
  try {
    const response = await fetch(
      'http://localhost:8080/event/insertEventReview',
      {
        method: 'POST',
        credentials: 'include', // ✅ 쿠키 자동 포함
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    alert(data.message);
  } catch (error) {
    alert('리뷰 등록에 실패했습니다.');
  }
};

/**
 * 댓글삭제
 */
export const deleteEventReview = async (userNo, reviewNo) => {
  try {
    const response = await fetch(
      'http://localhost:8080/event/deleteEventReview',
      {
        method: 'DELETE',
        credentials: 'include', // ✅ 쿠키 자동 포함
        body: JSON.stringify({
          userAccountNo: userNo,
          no: reviewNo,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    alert(data.message);
  } catch (error) {
    alert('리뷰 삭제가 불가능합니다.');
  }
};
