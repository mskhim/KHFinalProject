// ✅ 배너 추가 API
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

// ✅ 배너 삭제 API
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
