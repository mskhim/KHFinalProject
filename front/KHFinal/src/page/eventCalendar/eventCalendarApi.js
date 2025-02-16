import { stringify } from 'uuid';

/**
 * 이벤트 리스트 조회
 */
export const selectEventListMonth = async (sortOption) => {
  try {
    const response = await fetch(
      `http://localhost:8080/event/selectEventListMonth`,
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
