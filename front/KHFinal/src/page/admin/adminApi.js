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

export const managerInsert = async (manager) => {
  try {
    const response = await fetch("http://localhost:8080/admin/managerInsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(manager),
    });

    if (!response.ok) {
      throw new Error("Failed to insert manager");
    }

    const responseData = await response.text(); // Handle plain text response
    console.log("Manager insert response:", responseData);
    alert("추가가 완료되었습니다");
    return responseData;
  } catch (error) {
    alert("입력값을 확인해주세요. 아이디는 중복될 수 없습니다.");
    console.error("매니저 추가 실패:", error);
    throw error;
  }
};

export const managerUpdate = async (manager) => {
  try {
    const response = await fetch("http://localhost:8080/admin/managerUpdate", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(manager),
    });

    if (!response.ok) {
      const errorData = await response.text(); // Handle plain text response
      console.error("Failed to update manager:", errorData);
      throw new Error("Failed to update manager");
    }

    const responseData = await response.text(); // Handle plain text response
    console.log("Manager update response:", responseData);
    alert("수정이 완료되었습니다");
    return responseData;
  } catch (error) {
    alert("아이디는 중복될 수 없습니다. 중복을 확인해주세요");
    console.error("매니저 수정 실패:", error);
    throw error;
  }
};

export const managerDelete = async (ids) => {
  try {
    const response = await fetch("http://localhost:8080/admin/managerDelete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete managers");
    }

    const responseData = await response.text(); // Handle plain text response
    console.log("Manager delete response:", responseData);
    alert("삭제가 완료되었습니다");
    return responseData;
  } catch (error) {
    alert("삭제 중 오류가 발생했습니다.");
    console.error("매니저 삭제 실패:", error);
    throw error;
  }
};

export const userSelectAllBySearch = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8080/admin/userSelectAllBySearch?name=${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("유저 정보 조회 실패:", error);
    return null;
  }
};

export const userDelete = async (ids) => {
  try {
    const response = await fetch("http://localhost:8080/admin/userDelete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete users");
    }

    const responseData = await response.text();
    console.log("User delete response:", responseData);
    alert("삭제가 완료되었습니다");
    return responseData;
  } catch (error) {
    alert("삭제 중 오류가 발생했습니다.");
    console.error("유저 삭제 실패:", error);
    throw error;
  }
};

export const festivalSelectAllBySearch = async (eventName) => {
  try {
    const response = await fetch(
      `http://localhost:8080/admin/festivalSelectAllBySearch?eventName=${eventName}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("축제 정보 조회 실패:", error);
    return null;
  }
};

export const festivalDelete = async (ids) => {
  try {
    const response = await fetch("http://localhost:8080/admin/festivalDelete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete festivals");
    }

    const responseData = await response.text();
    console.log("Festival delete response:", responseData);
    alert("삭제가 완료되었습니다");
    return responseData;
  } catch (error) {
    alert("삭제 중 오류가 발생했습니다.");
    console.error("축제 삭제 실패:", error);
    throw error;
  }
};
