// 전체 공지사항을 불러오는 함수 (검색어 포함)
export const getReply = async (no) => {
  try {
    const response = await fetch(
      `http://localhost:8080/qna/getReply?no=${no}`,
      {
        method: 'GET',
        credentials: 'include', // 쿠키 포함 필수
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('공지사항을 불러오는 중 오류 발생', error);
    return [];
  }
};

// 전체 공지사항을 불러오는 함수 (검색어 포함)
export const getQnaList = async (sortDTO) => {
  try {
    const response = await fetch(`http://localhost:8080/qna/list`, {
      method: 'POST',
      credentials: 'include', // 쿠키 포함 필수
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sortDTO),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('공지사항을 불러오는 중 오류 발생', error);
    return [];
  }
};

// 전체 공지사항을 불러오는 함수 (검색어 포함)
export const getisAuthenticated = async (eventNo) => {
  try {
    const response = await fetch(
      `http://localhost:8080/qna/getisAuthenticated?eventNo=${eventNo}`,
      {
        method: 'GET',
        credentials: 'include', // 쿠키 포함 필수
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('공지사항을 불러오는 중 오류 발생', error);
    return [];
  }
};

// QnA 답변 등록 함수
export const submitReply = async (replyData) => {
  try {
    const response = await fetch('http://localhost:8080/qna/reply', {
      method: 'POST',
      credentials: 'include', // 쿠키 포함 필수
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(replyData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('답변 등록 중 오류 발생', error);
    return { authenticated: false };
  }
};

// QnA 답변 등록 함수
export const deleteQna = async (no) => {
  try {
    const response = await fetch(`http://localhost:8080/qna/delete?no=${no}`, {
      method: 'DELETE',
      credentials: 'include', // 쿠키 포함 필수
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('삭제 실패', error);
    return { authenticated: false };
  }
};
