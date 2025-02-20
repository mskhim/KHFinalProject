// 전체 공지사항을 불러오는 함수 (검색어 포함)
export const getReply = async (no) => {
  try {
    const response = await fetch(
      `http://localhost:8080/qna/getReply?no=${no}`,
      {
        method: "GET",
        credentials: "include", // 쿠키 포함 필수
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("공지사항을 불러오는 중 오류 발생", error);
    return [];
  }
};
