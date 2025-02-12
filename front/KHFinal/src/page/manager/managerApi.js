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
    return data.dataList;
  } catch (error) {
    return { authenticated: false };
  }
};

export const insertEventByManager = async (formData) => {
  try {
    console.log(formData);
    const response = await fetch(
      'http://localhost:8080/manager/insertEventByManager',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );

    return true;
  } catch (error) {
    console.error('축제 등록 실패:', error);
    alert('등록 중 오류가 발생했습니다.');
    return false;
  }
};
