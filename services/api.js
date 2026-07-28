// ============================================================================
// HỆ THỐNG KẾT NỐI API GOOGLE SHEETS - TTĐHS THPT HÒA VANG
// ============================================================================

const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwWw1moG7zHpb7tsmdl4pMVtIx0mzKQ_gxuAHGEW1WpjJUAiD9mEYNy-xKSjKr9C9m-/exec"; 

/**
 * Lấy toàn bộ danh sách công việc từ Google Sheets để hiển thị lên App
 * @returns {Promise<Array>} Mảng dữ liệu công việc
 */
async function apiGetTasks() {
  try {
    const response = await fetch(`${GAS_WEB_APP_URL}?action=getTasks`);
    const result = await response.json();
    if (result.status === "success") {
      return result.data;
    }
    throw new Error(result.message || "Không thể tải dữ liệu.");
  } catch (error) {
    console.error("[API ERROR] Lỗi lấy danh sách công việc:", error);
    return [];
  }
}

/**
 * Gửi yêu cầu tạo nhiệm vụ mới từ form trên App xuống Google Sheets
 * @param {Object} taskData - Thông tin chung của nhiệm vụ
 * @param {Array} assignees - Danh sách người nhận
 */
async function apiCreateTask(taskData, assignees) {
  try {
    const response = await fetch(GAS_WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        taskData: taskData,
        assignees: assignees
      })
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("[API ERROR] Lỗi tạo nhiệm vụ mới:", error);
    throw error;
  }
}
