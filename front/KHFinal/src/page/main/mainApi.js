export const topSeries = async () => {
  try {
    const response = await fetch(`http://localhost:8080/main/topSeries`);
    if (!response.ok) {
      throw new Error('서버 응답이 올바르지 않습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error(`top4를 불러오는 중 오류 발생:`, error);
    return null;
  }
};
