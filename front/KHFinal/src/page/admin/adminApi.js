export const managerSelectAllBySearch = async (name) => {
  try {
    const response = await fetch(
      `http://localhost:8080/admin/managerSelectAllBySearch?name=${name}`,
      {
        method: "GET",
        credentials: "include", // ✅ JWT 쿠키 포함
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("매니저 정보 조회 실패:", error);
    return null;
  }
};
