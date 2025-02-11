/**
 * 공공데이터 축제정보를 받어오는 API
 */

export const selectPublicDataEvent = async () => {
  try {
    const response = await fetch(
      'http://localhost:8080/event/selectPublicDataEvent',
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    console.log(data.dataList);
    return data.dataList;
  } catch (error) {
    return { authenticated: false };
  }
};
