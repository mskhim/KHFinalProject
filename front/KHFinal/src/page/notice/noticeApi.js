// 전체 공지사항을 불러오는 함수 (검색어 포함)
export const fetchAllNotices = async (keyword = '') => {
  try {
    const response = await fetch(
      `http://localhost:8080/notice/all?keyword=${encodeURIComponent(keyword)}`
    );
    if (!response.ok) {
      throw new Error('서버 응답이 올바르지 않습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('공지사항을 불러오는 중 오류 발생', error);
    return [];
  }
};

// ✅ 공지사항 데이터를 가져오는 비동기 함수
export const fetchNotices = async (page, pageSize) => {
  try {
    const response = await fetch(
      `http://localhost:8080/notice?page=${page}&pageSize=${pageSize}`
    ); // 백엔드 API 호출
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

export const fetchTotalNoticesCount = async () => {
  try {
    const response = await fetch('http://localhost:8080/notice/count');
    if (!response.ok) {
      throw new Error('Failed to fetch total notices count');
    }
    const totalCount = await response.json();
    return totalCount;
  } catch (error) {
    console.error('Error fetching total notices count:', error);
    return 0;
  }
};
