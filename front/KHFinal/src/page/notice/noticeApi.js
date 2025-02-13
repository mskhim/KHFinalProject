// ✅ 공지사항 데이터를 가져오는 비동기 함수
export const fetchNotices = async () => {
  try {
    const response = await fetch('http://localhost:8080/notice'); // 백엔드 API 호출
    if (!response.ok) {
      throw new Error('서버 응답이 올바르지 않습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('공지사항을 불러오는 중 오류 발생', error);
    throw error;
  }
};

// ✅ 특정 공지사항을 ID로 가져오는 함수
export const fetchNoticeById = async (no) => {
  try {
    const response = await fetch(`http://localhost:8080/notice/${no}`);
    if (!response.ok) {
      throw new Error('서버 응답이 올바르지 않습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error(`공지사항 (ID: ${no})을 불러오는 중 오류 발생:`, error);
    return null;
  }
};
