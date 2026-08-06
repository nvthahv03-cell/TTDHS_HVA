/**
 * ==============================================================================
 * HỆ THỐNG TTĐHS_HVA - MODULE GIAO NHIỆM VỤ ĐIỀU HÀNH
 * Backend Apps Script Enterprise Architecture
 * ==============================================================================
 */

// ==============================================================================
// 1. CONFIGURATION LAYER (CẤU HÌNH HỆ THỐNG)
// ==============================================================================
const CONFIG = {
  DB_NHAN_SU: {
    ID: "17IlljRPaCelw53lgM_71FSvLe_r19Uw5u_DA9LeV1PY",
    SHEET_NAME: "Du_lieu_NhanSu_HVA",
    HEADER_ROW: 6,
    DATA_START_ROW: 7
  },
  DB_DIEU_HANH: {
    ID: "187oZGAsM-p7W3gjhi4Lym6o3evdzoHGVnRT9Li2wU5g",
    SHEET_GIAO_VIEC: "DB_03_GiaoViec",
    SHEET_VAN_BAN: "DB_01_VanBan", // Sheet văn bản mặc định, nếu không tìm thấy sẽ fallback
    SHEET_AUDIT_LOG: "DB_AuditLog",
    HEADER_ROW: 1,
    DATA_START_ROW: 2
  },
  TASK_STATUS: {
    NEW: "Mới khởi tạo",
    RECEIVED: "Đã tiếp nhận",
    IN_PROGRESS: "Đang thực hiện",
    COMPLETED: "Hoàn thành",
    OVERDUE: "Quá hạn"
  }
};

// Global Memory Cache trong cùng một vòng đời Request
let _nhanSuCache = null;

// ==============================================================================
// 2. DATABASE LAYER (TẦNG THAO TÁC CSDL GOOGLE SHEETS)
// ==============================================================================
const DbContext = {
  /**
   * Mở Sheet an toàn theo ID và Tên Sheet
   */
  getSheet: function (spreadsheetId, sheetName) {
    const ss = SpreadsheetApp.openById(spreadsheetId);
    let sheet = ss.getSheetByName(sheetName);
    
    // Auto-fallback cho Sheet Văn Bản nếu không đúng tên chính xác
    if (!sheet && spreadsheetId === CONFIG.DB_DIEU_HANH.ID) {
      const sheets = ss.getSheets();
      for (let i = 0; i < sheets.length; i++) {
        const name = sheets[i].getName().toLowerCase();
        if (name.includes("vanban") || name.includes("văn bản")) {
          sheet = sheets[i];
          break;
        }
      }
    }
    return sheet;
  },

  /**
   * Đọc toàn bộ dữ liệu Nhân sự (Có Caching)
   */
  getNhanSuData: function () {
    if (_nhanSuCache) return _nhanSuCache;

    const sheet = this.getSheet(CONFIG.DB_NHAN_SU.ID, CONFIG.DB_NHAN_SU.SHEET_NAME);
    if (!sheet) return [];

    const fullData = sheet.getDataRange().getValues();
    if (fullData.length < CONFIG.DB_NHAN_SU.HEADER_ROW) return [];

    const headers = fullData[CONFIG.DB_NHAN_SU.HEADER_ROW - 1];
    
    let colHoTen = -1;
    let colTo = -1;
    let colUsername = -1;
    let colVaiTro = -1;

    for (let c = 0; c < headers.length; c++) {
      const h = String(headers[c]).trim().toLowerCase();
      if (h.includes("họ tên") || h.includes("ho ten")) colHoTen = c;
      else if (h.includes("tổ") || h.includes("bộ phận") || h.includes("to/bo phan")) colTo = c;
      else if (h.includes("username") || h.includes("mã gv") || h.includes("ma gv")) colUsername = c;
      else if (h.includes("vai trò") || h.includes("chức vụ") || h.includes("vai tro")) colVaiTro = c;
    }

    if (colHoTen === -1) colHoTen = 1;
    if (colTo === -1) colTo = 10;
    if (colUsername === -1) colUsername = 12;
    if (colVaiTro === -1) colVaiTro = 14;

    const result = [];
    for (let r = CONFIG.DB_NHAN_SU.DATA_START_ROW - 1; r < fullData.length; r++) {
      const row = fullData[r];
      const hoTen = String(row[colHoTen] || "").trim();
      const to = String(row[colTo] || "").trim();
      const username = String(row[colUsername] || "").trim();
      const vaiTro = String(row[colVaiTro] || "").trim();

      if (hoTen || username) {
        result.push({
          hoTen: hoTen,
          to: to,
          username: username || hoTen,
          vaiTro: vaiTro
        });
      }
    }

    _nhanSuCache = result;
    return _nhanSuCache;
  },

  /**
   * Đọc toàn bộ danh sách Nhiệm vụ
   */
  getTaskData: function () {
    const sheet = this.getSheet(CONFIG.DB_DIEU_HANH.ID, CONFIG.DB_DIEU_HANH.SHEET_GIAO_VIEC);
    if (!sheet) return { sheet: null, data: [] };

    const data = sheet.getDataRange().getValues();
    return { sheet: sheet, data: data };
  },

  /**
   * Ghi batch nhiều dòng nhiệm vụ xuống Database
   */
  insertTaskBatch: function (rows) {
    if (!rows || rows.length === 0) return false;
    const sheet = this.getSheet(CONFIG.DB_DIEU_HANH.ID, CONFIG.DB_DIEU_HANH.SHEET_GIAO_VIEC);
    if (!sheet) throw new Error("Không thể mở CSDL Điều hành: " + CONFIG.DB_DIEU_HANH.SHEET_GIAO_VIEC);

    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, rows.length, rows[0].length).setValues(rows);
    return true;
  },

  /**
   * Ghi Audit Log vào hệ thống
   */
  writeAuditLog: function (action, actor, targetId, details) {
    try {
      const ss = SpreadsheetApp.openById(CONFIG.DB_DIEU_HANH.ID);
      let logSheet = ss.getSheetByName(CONFIG.DB_DIEU_HANH.SHEET_AUDIT_LOG);
      if (!logSheet) {
        logSheet = ss.insertSheet(CONFIG.DB_DIEU_HANH.SHEET_AUDIT_LOG);
        logSheet.appendRow(["Thời gian", "Hành động", "Người thực hiện", "Mã đối tượng", "Chi tiết"]);
      }
      logSheet.appendRow([new Date(), action, actor, targetId, JSON.stringify(details)]);
    } catch (e) {
      Logger.log("Lỗi ghi AuditLog: " + e.toString());
    }
  }
};

// ==============================================================================
// 3. SERVICE LAYER (TẦNG XỬ LÝ LOGIC NGHIỆP VỤ)
// ==============================================================================
const TaskService = {
  /**
   * Lấy danh sách Tổ / Bộ phận
   */
  getDanhSachTo: function () {
    const data = DbContext.getNhanSuData();
    const counts = {};
    data.forEach(item => {
      if (item.to) {
        counts[item.to] = (counts[item.to] || 0) + 1;
      }
    });

    const sortedTo = Object.keys(counts).sort((a, b) => a.localeCompare(b, "vi"));
    return sortedTo.map(key => ({
      tenTo: key,
      soLuong: counts[key]
    }));
  },

  /**
   * Lấy nhân sự theo Tổ
   */
  getNhanSuTheoTo: function (tenTo) {
    const data = DbContext.getNhanSuData();
    const filtered = data.filter(item => !tenTo || item.to.toLowerCase() === tenTo.trim().toLowerCase());
    filtered.sort((a, b) => a.hoTen.localeCompare(b.hoTen, "vi"));
    return filtered.map(item => ({
      username: item.username,
      hoTen: item.hoTen,
      vaiTro: item.vaiTro,
      to: item.to,
      chucVu: item.vaiTro
    }));
  },

  /**
   * Tìm kiếm văn bản chỉ đạo
   */
  searchVanBan: function (q) {
    if (!q) return [];
    const query = q.toLowerCase();
    try {
      const sheet = DbContext.getSheet(CONFIG.DB_DIEU_HANH.ID, CONFIG.DB_DIEU_HANH.SHEET_VAN_BAN);
      if (!sheet) return [];

      const data = sheet.getDataRange().getValues();
      if (data.length <= 1) return [];

      const results = [];
      for (let r = 1; r < data.length; r++) {
        const row = data[r];
        const strRow = row.join(" ").toLowerCase();
        if (strRow.includes(query)) {
          results.push({
            soVanBan: row[0] || "",
            tenVanBan: row[1] || "",
            ngayBanHanh: row[2] ? Utilities.formatDate(new Date(row[2]), Session.getScriptTimeZone(), "dd/MM/yyyy") : "",
            nguoiKy: row[3] || "",
            trichYeu: row[4] || ""
          });
        }
      }
      return results;
    } catch (err) {
      return [];
    }
  },

  /**
   * Tạo nhiệm vụ mới (Tách dòng tự động cho từng cá nhân)
   */
  createTask: function (payload) {
    // Validation
    if (!payload.nguoiGiao || String(payload.nguoiGiao).trim() === "") {
      return { success: false, message: "Thiếu thông tin người giao nhiệm vụ." };
    }
    if (!payload.tieuDe || String(payload.tieuDe).trim() === "") {
      return { success: false, message: "Tiêu đề công việc không được để trống." };
    }
    if (!payload.noiDung || String(payload.noiDung).trim() === "") {
      return { success: false, message: "Nội dung chỉ đạo không được để trống." };
    }
    if (!payload.hanHoanThanh) {
      return { success: false, message: "Hạn hoàn thành không được để trống." };
    }
    const danhSachNguoiNhan = payload.danhSachNguoiNhan || [];
    if (!Array.isArray(danhSachNguoiNhan) || danhSachNguoiNhan.length === 0) {
      return { success: false, message: "Chưa chọn đối tượng nhận nhiệm vụ." };
    }

    const timeStamp = new Date();
    const rowsToInsert = [];
    const taskIds = [];

    danhSachNguoiNhan.forEach(nguoiNhan => {
      const idTask = "TASK_" + timeStamp.getTime() + "_" + Math.floor(Math.random() * 10000);
      taskIds.push(idTask);
      
      const row = [
        idTask,
        timeStamp,
        payload.nguoiGiao || "",
        payload.chucVuNguoiGiao || "",
        payload.toNguoiGiao || "",
        nguoiNhan.username || "",
        nguoiNhan.hoTen || "",
        nguoiNhan.chucVu || nguoiNhan.vaiTro || "",
        nguoiNhan.toBoPhan || nguoiNhan.to || "",
        payload.loaiNhiemVu || "",
        payload.nguonGiao || "",
        payload.soVanBan || "",
        payload.tenVanBan || "",
        payload.mucDo || "",
        payload.tieuDe || "",
        payload.noiDung || "",
        payload.yeuCauMinhChung || "",
        payload.hanHoanThanh || "",
        CONFIG.TASK_STATUS.NEW,
        "", // Tiến độ mặc định
        0   // Tiêu chí % tiến độ
      ];
      rowsToInsert.push(row);
    });

    DbContext.insertTaskBatch(rowsToInsert);

    // Ghi Audit Log
    DbContext.writeAuditLog("CREATE_TASK", payload.nguoiGiao, taskIds.join(", "), {
      soLuongNhan: rowsToInsert.length,
      tieuDe: payload.tieuDe
    });

    return {
      success: true,
      message: "Tạo nhiệm vụ thành công cho " + rowsToInsert.length + " cá nhân."
    };
  },

  /**
   * Lấy danh sách nhiệm vụ của 1 Username
   */
  getTaskByUser: function (username) {
    if (!username) return [];
    const { data } = DbContext.getTaskData();
    if (data.length <= 1) return [];

    const userTasks = [];
    const targetUser = String(username).trim().toLowerCase();

    for (let r = 1; r < data.length; r++) {
      const row = data[r];
      const taskUser = String(row[5] || "").trim().toLowerCase();
      if (taskUser === targetUser) {
        userTasks.push({
          idTask: row[0],
          ngayGiao: row[1] ? Utilities.formatDate(new Date(row[1]), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm") : "",
          nguoiGiao: row[2],
          chucVuNguoiGiao: row[3],
          toNguoiGiao: row[4],
          loaiNhiemVu: row[9],
          nguonGiao: row[10],
          soVanBan: row[11],
          tenVanBan: row[12],
          mucDo: row[13],
          tieuDe: row[14],
          noiDung: row[15],
          yeuCauMinhChung: row[16],
          hanHoanThanh: row[17],
          trangThai: row[18] || CONFIG.TASK_STATUS.NEW,
          tienDo: row[20] || 0
        });
      }
    }
    return userTasks;
  },

  /**
   * Lấy chi tiết 1 nhiệm vụ theo ID
   */
  getTaskDetail: function (idTask) {
    if (!idTask) return null;
    const { data } = DbContext.getTaskData();
    if (data.length <= 1) return null;

    const targetId = String(idTask).trim();
    for (let r = 1; r < data.length; r++) {
      const row = data[r];
      if (String(row[0]).trim() === targetId) {
        return {
          idTask: row[0],
          ngayGiao: row[1] ? Utilities.formatDate(new Date(row[1]), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm") : "",
          nguoiGiao: row[2],
          chucVuNguoiGiao: row[3],
          toNguoiGiao: row[4],
          usernameNguoiNhan: row[5],
          hoTenNguoiNhan: row[6],
          chucVuNguoiNhan: row[7],
          toNguoiNhan: row[8],
          loaiNhiemVu: row[9],
          nguonGiao: row[10],
          soVanBan: row[11],
          tenVanBan: row[12],
          mucDo: row[13],
          tieuDe: row[14],
          noiDung: row[15],
          yeuCauMinhChung: row[16],
          hanHoanThanh: row[17],
          trangThai: row[18] || CONFIG.TASK_STATUS.NEW,
          ghiChu: row[19] || "",
          tienDo: row[20] || 0
        };
      }
    }
    return null;
  },

  /**
   * Cập nhật trạng thái Nhiệm vụ
   */
  updateTaskStatus: function (payload) {
    const idTask = payload.idTask || payload.id;
    const newStatus = payload.trangThai || payload.status;
    const updatedBy = payload.updatedBy || payload.username || "System";

    if (!idTask || !newStatus) {
      return { success: false, message: "Thiếu idTask hoặc trangThai mới." };
    }

    const validStatuses = Object.values(CONFIG.TASK_STATUS);
    if (!validStatuses.includes(newStatus)) {
      return { success: false, message: "Trạng thái không hợp lệ: " + newStatus };
    }

    const { sheet, data } = DbContext.getTaskData();
    if (!sheet || data.length <= 1) {
      return { success: false, message: "Không tìm thấy dữ liệu nhiệm vụ." };
    }

    const targetId = String(idTask).trim();
    for (let r = 1; r < data.length; r++) {
      if (String(data[r][0]).trim() === targetId) {
        const rowNum = r + 1;
        sheet.getRange(rowNum, 19).setValue(newStatus); // Cột S: Trạng thái

        DbContext.writeAuditLog("UPDATE_STATUS", updatedBy, idTask, { oldStatus: data[r][18], newStatus: newStatus });
        return { success: true, message: "Cập nhật trạng thái thành công." };
      }
    }

    return { success: false, message: "Không tìm thấy mã nhiệm vụ: " + idTask };
  },

  /**
   * Cập nhật tiến độ hoàn thành (% từ 0 - 100)
   */
  updateTaskProgress: function (payload) {
    const idTask = payload.idTask || payload.id;
    let progress = parseInt(payload.tienDo || payload.progress, 10);
    const updatedBy = payload.updatedBy || payload.username || "System";

    if (!idTask || isNaN(progress)) {
      return { success: false, message: "Thiếu idTask hoặc giá trị tiến độ." };
    }

    if (progress < 0) progress = 0;
    if (progress > 100) progress = 100;

    const { sheet, data } = DbContext.getTaskData();
    if (!sheet || data.length <= 1) {
      return { success: false, message: "Không tìm thấy dữ liệu nhiệm vụ." };
    }

    const targetId = String(idTask).trim();
    for (let r = 1; r < data.length; r++) {
      if (String(data[r][0]).trim() === targetId) {
        const rowNum = r + 1;
        sheet.getRange(rowNum, 21).setValue(progress); // Cột U: % Tiến độ

        // Tự động chuyển trạng thái nếu tiến độ đạt 100%
        if (progress === 100) {
          sheet.getRange(rowNum, 19).setValue(CONFIG.TASK_STATUS.COMPLETED);
        } else if (progress > 0 && data[r][18] === CONFIG.TASK_STATUS.NEW) {
          sheet.getRange(rowNum, 19).setValue(CONFIG.TASK_STATUS.IN_PROGRESS);
        }

        DbContext.writeAuditLog("UPDATE_PROGRESS", updatedBy, idTask, { progress: progress });
        return { success: true, message: "Cập nhật tiến độ thành công." };
      }
    }

    return { success: false, message: "Không tìm thấy mã nhiệm vụ: " + idTask };
  }
};

// ==============================================================================
// 4. API LAYER (TẦNG TIẾP NHẬN & PHẢN HỒI REQUEST FRONTEND)
// ==============================================================================

/**
 * Trả kết quả MimeType JSON chuẩn Enterprise
 */
function responseJSON(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Xử lý HTTP GET Requests
 */
function doGet(e) {
  try {
    const params = (e && e.parameter) ? e.parameter : {};
    const action = params.action || "";

    switch (action) {
      case "getDanhSachTo":
        return responseJSON(TaskService.getDanhSachTo());

      case "getNhanSuTheoTo":
        const tenTo = params.to || params.tenTo || "";
        return responseJSON(TaskService.getNhanSuTheoTo(tenTo));

      case "searchVanBan":
        const q = params.q || "";
        return responseJSON(TaskService.searchVanBan(q));

      case "getTaskByUser":
        const username = params.username || "";
        return responseJSON(TaskService.getTaskByUser(username));

      case "getTaskDetail":
        const idTask = params.id || params.idTask || "";
        return responseJSON(TaskService.getTaskDetail(idTask));

      default:
        return responseJSON([]);
    }
  } catch (err) {
    return responseJSON({ success: false, message: err.toString() });
  }
}

/**
 * Xử lý HTTP POST Requests
 */
function doPost(e) {
  try {
    let contents = {};
    if (e && e.postData && e.postData.contents) {
      contents = JSON.parse(e.postData.contents);
    }

    const action = contents.action || (e && e.parameter ? e.parameter.action : "");

    switch (action) {
      case "createTask":
        return responseJSON(TaskService.createTask(contents));

      case "updateTaskStatus":
        return responseJSON(TaskService.updateTaskStatus(contents));

      case "updateTaskProgress":
        return responseJSON(TaskService.updateTaskProgress(contents));

      default:
        return responseJSON({ success: false, message: "Action không hợp lệ: " + action });
    }
  } catch (err) {
    return responseJSON({ success: false, message: err.toString() });
  }
}
