import { $ } from '../core/utils.js';
import { ModalManager } from '../ui/modal.js';
import { ModuleManager } from '../modules/module-manager.js';
import { PWA } from '../services/pwa.js';

export function renderHome() {
    const container = $('#home-view');
    if (!container) return;

    container.innerHTML = `
<!-- HVA Assistant -->
<div class="relative mb-2 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-indigo-950 via-blue-900 to-slate-900 shadow-xl p-3.5 text-white">

    <div class="absolute -right-10 -bottom-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none"></div>

    <div class="absolute top-0 right-0 p-3 opacity-10">
        <i class="bi bi-cpu text-7xl"></i>
    </div>

    <div class="relative z-10">

        <!-- Header -->
        <div class="flex items-center justify-between mb-2">

            <div class="flex items-center gap-2">

                <div class="w-7 h-7 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                    <i class="bi bi-robot text-cyan-300 text-sm"></i>
                </div>

                <div>

                    <h2 class="text-xs font-extrabold tracking-tight leading-tight flex items-center gap-1.5">

                        HVA Assistant

                        <span class="px-1.5 py-0.5 rounded-full bg-cyan-400/30 text-[9px] font-bold text-cyan-100 border border-cyan-300/30">

                            AI Pro

                        </span>

                    </h2>

                    <p class="text-[10px] text-cyan-200/80">

                        Trợ lý điều hành thông minh

                    </p>

                </div>

            </div>

        </div>

        <!-- Người dùng -->
        <div class="mb-2 bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/15 shadow-sm">

            <div class="flex items-center flex-wrap gap-x-1.5">

                <span id="assistantGreeting"
                      class="text-cyan-100 text-[11px] font-medium">

                    👋 Xin chào,

                </span>

                <span id="assistantName"
                      class="text-white text-xs font-bold leading-tight">

                    ...

                </span>

            </div>

            <div id="assistantPosition"
                 class="text-cyan-200/90 text-[10px] font-medium leading-tight mt-0.5">

                ...

            </div>

        </div>

        <!-- Ô hỏi AI -->
        <div class="mt-2 flex items-center bg-white/95 backdrop-blur-xl rounded-xl px-2.5 py-2 shadow-md border border-white/50">

            <input
                type="text"
                id="assistantInput"
                placeholder="Hỏi HVA Assistant điều gì đó..."
                class="flex-1 bg-transparent outline-none text-[11px] font-medium text-slate-800 placeholder-slate-400"
            >

            <!-- Micro -->
            <button
                id="assistantMicBtn"
                class="ml-2 w-8 h-8 rounded-lg
                       bg-gradient-to-r from-sky-500 to-cyan-500
                       hover:from-sky-600 hover:to-cyan-600
                       transition shadow-sm
                       flex items-center justify-center
                       text-white active:scale-95">

                <i class="bi bi-mic-fill text-[11px]"></i>

            </button>

            <!-- Gửi -->
            <button
                id="assistantSendBtn"
                class="ml-2 w-8 h-8 rounded-lg
                       bg-gradient-to-r from-[#0F4C81] to-[#29B6F6]
                       hover:from-[#0B3E69] hover:to-[#1DA1F2]
                       transition shadow-sm
                       flex items-center justify-center
                       text-white active:scale-95">

                <i class="bi bi-arrow-up text-[11px]"></i>

            </button>

        </div>

    </div>

</div>
<!-- ========================================== -->
<!-- KHU VỰC 4 PHÍM TÁC VỤ NHANH (FLUENT DESIGN 4 COLUMNS) -->
<!-- ========================================== -->
<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 relative z-30">

  <!-- ================= SHORTCUT 1: LỊCH - TKB ================= -->
  <div class="relative">
    <!-- Nút bấm Shortcut 1 -->
    <button type="button"
            onclick="toggleDashboardMenu('menu-lich-tb', event)"
            class="w-full bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center text-center relative cursor-pointer active:scale-95 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(59,130,246,0.12)] hover:border-blue-200 transition-all duration-300 group">

      <!-- Frame Icon Fluent -->
      <div class="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3 rounded-2xl bg-blue-50 border border-blue-100/80 transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-100/80">
        <i class="bi bi-calendar-event-fill text-2xl sm:text-3xl text-blue-600"></i>
      </div>

      <!-- Tiêu đề -->
      <span class="font-bold text-xs sm:text-[13px] uppercase tracking-wider text-slate-800 leading-snug">
        LỊCH - TKB
      </span>
    </button>

    <!-- Menu Dropdown 1 -->
    <div id="menu-lich-tb" class="dashboard-dropdown hidden absolute top-full left-0 mt-2 w-64 sm:w-70 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 p-2 z-50 transition-all" onclick="event.stopPropagation()">
      
      <!-- Lịch công tác -->
      <div class="dashboard-item p-2 hover:bg-blue-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-calendar3 text-blue-500 text-sm"></i> Lịch công tác</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('lich-tuan')"><i class="bi bi-calendar-week"></i> Lịch tuần</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('lich-thang')"><i class="bi bi-calendar-month"></i> Lịch tháng</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('lich-dot-xuat')"><i class="bi bi-calendar-event"></i> Lịch đột xuất</div>
        </div>
      </div>

      <!-- Thời khóa biểu cá nhân -->
      <div class="dashboard-item p-2 hover:bg-blue-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-person-badge-fill text-sky-500 text-sm"></i> Thời khóa biểu cá nhân</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-sky-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('tkb-canhan-tuan')"><i class="bi bi-clock"></i> TKB Theo tuần</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-sky-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('tkb-canhan-thaydoi')"><i class="bi bi-arrow-repeat"></i> Báo dạy bù / Lịch dạy thay</div>
        </div>
      </div>

      <!-- Thời khóa biểu toàn trường -->
      <div class="dashboard-item p-2 hover:bg-blue-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-grid-3x3-gap-fill text-indigo-500 text-sm"></i> Thời khóa biểu toàn trường</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('tkb-truong-lop')"><i class="bi bi-building"></i> Theo Lớp học</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('tkb-truong-giaovien')"><i class="bi bi-people-fill"></i> Theo Giáo viên</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('tkb-truong-phongchuyenmon')"><i class="bi bi-door-open-fill"></i> Theo Phòng bộ môn</div>
        </div>
      </div>

    </div>
  </div>

  <!-- ================= SHORTCUT 2: THÔNG TIN ================= -->
  <div class="relative">
    <!-- Nút bấm Shortcut 2 -->
    <button type="button"
            onclick="toggleDashboardMenu('menu-thong-tin', event)"
            class="w-full bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center text-center relative cursor-pointer active:scale-95 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(245,158,11,0.12)] hover:border-amber-200 transition-all duration-300 group">

      <!-- Frame Icon Fluent -->
      <div class="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3 rounded-2xl bg-amber-50 border border-amber-100/80 transition-all duration-300 group-hover:scale-105 group-hover:bg-amber-100/80">
        <i class="bi bi-megaphone-fill text-2xl sm:text-3xl text-amber-500"></i>
      </div>

      <!-- Tiêu đề -->
      <span class="font-bold text-xs sm:text-[13px] uppercase tracking-wider text-slate-800 leading-snug">
        THÔNG TIN
      </span>
    </button>

    <!-- Menu Dropdown 2 -->
    <div id="menu-thong-tin" class="dashboard-dropdown hidden absolute top-full left-0 sm:left-1/2 sm:-translate-x-1/2 mt-2 w-64 sm:w-70 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 p-2 z-50 transition-all" onclick="event.stopPropagation()">
      
      <!-- 📣 Thông báo -->
      <div class="dashboard-item p-2 hover:bg-amber-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-bell-fill text-amber-500 text-sm"></i> Thông báo</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-amber-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('tb-moi')"><i class="bi bi-bell"></i> Thông báo mới</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-amber-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('tb-quan-trong')"><i class="bi bi-exclamation-diamond"></i> Thông báo quan trọng</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-amber-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('tb-da-luu')"><i class="bi bi-bookmark-check"></i> Thông báo đã lưu</div>
        </div>
      </div>

      <!-- 📰 Tin tức -->
      <div class="dashboard-item p-2 hover:bg-amber-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-newspaper text-orange-500 text-sm"></i> Tin tức</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-orange-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('tin-nha-truong')"><i class="bi bi-building font-bold"></i> Tin nhà trường</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-orange-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('tin-nganh-giao-duc')"><i class="bi bi-globe"></i> Tin ngành Giáo dục</div>
        </div>
      </div>

      <!-- 📅 Sự kiện -->
      <div class="dashboard-item p-2 hover:bg-amber-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-calendar-event-fill text-rose-500 text-sm"></i> Sự kiện</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-rose-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('su-kien-sap-dien-ra')"><i class="bi bi-clock-history"></i> Sự kiện sắp diễn ra</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-rose-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('su-kien-da-qua')"><i class="bi bi-check2-circle"></i> Sự kiện đã qua</div>
        </div>
      </div>

      <!-- 📷 Thư viện ảnh -->
      <div class="dashboard-item p-2 hover:bg-amber-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-images text-emerald-500 text-sm"></i> Thư viện ảnh</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('thu-vien-anh-hoat-dong')"><i class="bi bi-image"></i> Ảnh hoạt động</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('thu-vien-anh-tu-lieu')"><i class="bi bi-archive"></i> Ảnh tư liệu</div>
        </div>
      </div>

      <!-- 🎬 Video -->
      <div class="dashboard-item p-2 hover:bg-amber-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-play-btn-fill text-red-500 text-sm"></i> Video</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-red-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('video-su-kien')"><i class="bi bi-film"></i> Video sự kiện</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-red-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('video-truyen-thong')"><i class="bi bi-tv"></i> Video truyền thông</div>
        </div>
      </div>

    </div>
  </div>

  <!-- ================= SHORTCUT 3: VĂN BẢN ================= -->
  <div class="relative">
    <!-- Nút bấm Shortcut 3 -->
    <button type="button"
            onclick="toggleDashboardMenu('menu-van-ban', event)"
            class="w-full bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center text-center relative cursor-pointer active:scale-95 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(16,185,129,0.12)] hover:border-emerald-200 transition-all duration-300 group">

      <!-- Frame Icon Fluent -->
      <div class="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3 rounded-2xl bg-emerald-50 border border-emerald-100/80 transition-all duration-300 group-hover:scale-105 group-hover:bg-emerald-100/80">
        <i class="bi bi-file-earmark-text-fill text-2xl sm:text-3xl text-emerald-600"></i>
      </div>

      <!-- Tiêu đề -->
      <span class="font-bold text-xs sm:text-[13px] uppercase tracking-wider text-slate-800 leading-snug">
        VĂN BẢN
      </span>
    </button>

    <!-- Menu Dropdown 3 -->
    <div id="menu-van-ban" class="dashboard-dropdown hidden absolute top-full right-0 sm:right-1/2 sm:translate-x-1/2 mt-2 w-64 sm:w-70 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 p-2 z-50 transition-all" onclick="event.stopPropagation()">
      
      <!-- Văn bản đến -->
      <div class="dashboard-item p-2 hover:bg-emerald-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-inbox-fill text-emerald-500 text-sm"></i> Văn bản đến</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('van-ban-den')"><i class="bi bi-file-earmark-arrow-down"></i> Tất cả văn bản đến</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('van-ban-den-chua-xu-ly')"><i class="bi bi-exclamation-circle"></i> Chưa xử lý</div>
        </div>
      </div>

      <!-- Văn bản đi -->
      <div class="dashboard-item p-2 hover:bg-emerald-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-send-fill text-teal-500 text-sm"></i> Văn bản đi</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-teal-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('van-ban-di')"><i class="bi bi-file-earmark-arrow-up"></i> Văn bản đã phát hành</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-teal-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('van-ban-noi-bo')"><i class="bi bi-building"></i> Văn bản nội bộ</div>
        </div>
      </div>

      <!-- Biểu mẫu -->
      <div class="dashboard-item p-2 hover:bg-emerald-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-ui-checks text-cyan-500 text-sm"></i> Biểu mẫu</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-cyan-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('bieu-mau-dien-tu')"><i class="bi bi-laptop"></i> Biểu mẫu điện tử</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-cyan-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('bieu-mau-chuyen-mon')"><i class="bi bi-journal-bookmark"></i> Biểu mẫu chuyên môn</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-cyan-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('bieu-mau-hanh-chinh')"><i class="bi bi-briefcase"></i> Biểu mẫu hành chính</div>
        </div>
      </div>

      <!-- Tra cứu -->
      <div class="dashboard-item p-2 hover:bg-emerald-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-search text-slate-600 text-sm"></i> Tra cứu</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-slate-800 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('tra-cuu-van-ban')"><i class="bi bi-file-earmark-search"></i> Tra cứu văn bản</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-slate-800 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('tra-cuu-ho-so')"><i class="bi bi-folder-search"></i> Tra cứu hồ sơ công việc</div>
        </div>
      </div>

    </div>
  </div>

  <!-- ================= SHORTCUT 4: HỌC LIỆU SỐ ================= -->
  <div class="relative">
    <!-- Nút bấm Shortcut 4 -->
    <button type="button"
            onclick="toggleDashboardMenu('menu-hoc-lieu', event)"
            class="w-full bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center text-center relative cursor-pointer active:scale-95 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(147,51,234,0.12)] hover:border-purple-200 transition-all duration-300 group">

      <!-- Frame Icon Fluent -->
      <div class="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3 rounded-2xl bg-purple-50 border border-purple-100/80 transition-all duration-300 group-hover:scale-105 group-hover:bg-purple-100/80">
        <i class="bi bi-journal-bookmark-fill text-2xl sm:text-3xl text-purple-600"></i>
      </div>

      <!-- Tiêu đề -->
      <span class="font-bold text-xs sm:text-[13px] uppercase tracking-wider text-slate-800 leading-snug">
        HỌC LIỆU SỐ
      </span>
    </button>

    <!-- Menu Dropdown 4 -->
    <div id="menu-hoc-lieu" class="dashboard-dropdown hidden absolute top-full right-0 mt-2 w-64 sm:w-70 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 p-2 z-50 transition-all" onclick="event.stopPropagation()">
      
      <!-- Kho học liệu -->
      <div class="dashboard-item p-2 hover:bg-purple-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-archive-fill text-purple-500 text-sm"></i> Kho học liệu</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-purple-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('kho-bo-gddt')"><i class="bi bi-bank"></i> Bộ GDĐT</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-purple-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('kho-so-gddt')"><i class="bi bi-building"></i> Sở GDĐT</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-purple-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('kho-nha-truong')"><i class="bi bi-house-door"></i> Nhà trường</div>
        </div>
      </div>

      <!-- Video học tập -->
      <div class="dashboard-item p-2 hover:bg-purple-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-play-btn-fill text-red-500 text-sm"></i> Video học tập</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-red-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('video-bai-giang')"><i class="bi bi-file-earmark-play"></i> Video bài giảng</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-red-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('video-tap-huan')"><i class="bi bi-display"></i> Video tập huấn</div>
        </div>
      </div>

      <!-- Tài liệu số -->
      <div class="dashboard-item p-2 hover:bg-purple-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-journal-text text-indigo-500 text-sm"></i> Tài liệu số</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('giao-an-dien-tu')"><i class="bi bi-file-earmark-code"></i> Giáo án điện tử</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('de-kiem-tra')"><i class="bi bi-file-earmark-check"></i> Ngân hàng đề thi / kiểm tra</div>
        </div>
      </div>

      <!-- AI học tập -->
      <div class="dashboard-item p-2 hover:bg-purple-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-robot text-teal-500 text-sm"></i> AI học tập</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-teal-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('ai-chatgpt')"><i class="bi bi-chat-dots"></i> ChatGPT</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-teal-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('ai-gemini')"><i class="bi bi-stars"></i> Gemini</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-teal-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('ai-copilot')"><i class="bi bi-cpu"></i> Copilot</div>
        </div>
      </div>

    </div>
  </div>

</div>
<!-- KHUNG BAO CHỮ CHẠY (Dùng marquee chuẩn HTML) -->
<div class="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-cyan-50/80 border border-blue-100 shadow-sm p-2 mb-3 backdrop-blur-md flex items-center gap-2.5">
    
    <!-- Badge Cố định bên trái -->
    <!-- Badge đổi thành NHẮC VIỆC với icon chuông báo hiệu -->
    <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-bold shadow-xs shrink-0 z-10">
        <i class="bi bi-bell-fill text-amber-300 text-xs animate-bounce"></i>
        <span class="uppercase tracking-wider">NHẮC VIỆC</span>
    </div>

    <!-- Dải chữ chạy dùng thẻ marquee -->
    <marquee onmouseover="this.stop();" onmouseout="this.start();" scrollamount="5" class="text-xs font-semibold text-slate-700 flex items-center">
        <span class="inline-flex items-center gap-1.5 mr-8">
            <span class="text-blue-600 font-bold">•</span> Hoàn thành báo cáo chuyên môn năm học trước ngày 15 hàng tháng.
        </span>
        <span class="inline-flex items-center gap-1.5 mr-8">
            <span class="text-purple-600 font-bold">•</span> Lịch họp Chuyên môn định kỳ tuần này chuyển sang sáng Thứ 5.
        </span>
        <span class="inline-flex items-center gap-1.5 mr-8">
            <span class="text-emerald-600 font-bold">•</span> Đã cập nhật danh sách Phê duyệt kế hoạch bài dạy mới trên hệ thống.
        </span>
    </marquee>
</div>

<!-- 04 TRỤ CỘT CHÍNH -->
<section class="grid grid-cols-2 gap-3 mb-2">

    <!-- TRỤ CỘT 1: CỔNG THÔNG TIN -->
    <div onclick="window.open('https://thpthoavang.edu.vn/', '_blank')" class="group relative rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white p-3.5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-blue-400/40 active:scale-[0.98]">
        <div class="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/30">
            <i class="bi bi-globe text-white text-lg"></i>
        </div>
        <h3 class="text-xs font-extrabold tracking-tight text-white mb-0.5">CỔNG THÔNG TIN</h3>
        <p class="text-[10px] text-blue-50 font-medium">Website • Thông báo • Tin tức</p>
    </div>

   <!-- TRỤ CỘT 2: NGHIỆP VỤ SỐ -->
<div class="relative">
    <div data-dropdown-toggle="nghiepvuso-dropdown"
        class="group relative rounded-2xl bg-gradient-to-br from-indigo-700 via-blue-700 to-sky-600 text-white p-3.5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-visible border border-blue-400/40 active:scale-[0.98]">

        <div class="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>

        <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/30">
            <i class="bi bi-journal-check text-white text-lg"></i>
        </div>

        <div class="flex items-center justify-between">
            <h3 class="text-xs font-extrabold tracking-tight text-white mb-0.5">
                NGHIỆP VỤ SỐ
            </h3>
            <i class="bi bi-chevron-up text-xs text-blue-100 transition-transform duration-300"
                data-dropdown-arrow></i>
        </div>

        <p class="text-[10px] text-blue-50 font-medium">
            Chuyên môn • Hoạt động • Hội thảo
        </p>
    </div>

    <!-- Dropup Menu -->
    <div id="nghiepvuso-dropdown"
        data-dropdown-menu
        class="hidden absolute right-0 bottom-[calc(100%+0.6rem)] z-[999] w-[430px] max-w-[92vw] bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 space-y-1">

        <a href="#" class="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-purple-50 transition">
            <div class="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                <i class="bi bi-journal-bookmark text-lg"></i>
            </div>
            <span class="text-sm font-semibold text-slate-700">
                Báo cáo chuyên môn
            </span>
        </a>

        <a href="#" class="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-purple-50 transition">
            <div class="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                <i class="bi bi-bullseye text-sm"></i>
            </div>
            <span class="text-base font-semibold text-slate-700">
                Báo cáo hoạt động giáo dục
            </span>
        </a>
        

<!-- Menu Bồi dưỡng chuyên môn -->
<div class="relative border-y border-slate-100 dark:border-slate-700/50 my-1 py-1">

    <button type="button"
        onclick="event.stopPropagation();
                 document.getElementById('bdcm-sub-items').classList.toggle('hidden');
                 document.getElementById('bdcm-sub-arrow').classList.toggle('bi-chevron-right');
                 document.getElementById('bdcm-sub-arrow').classList.toggle('bi-chevron-down');"
        class="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-50 transition-colors">

        <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                <i class="bi bi-mortarboard text-lg"></i>
            </div>

            <span>Bồi dưỡng chuyên môn</span>
        </div>

        <i id="bdcm-sub-arrow"
           class="bi bi-chevron-right text-xs text-slate-400 transition-all duration-300"></i>
    </button>

    <!-- Menu cấp 2 -->
    <div id="bdcm-sub-items"
         class="hidden ml-14 mt-2 border-l-2 border-purple-200 pl-4 space-y-1">

        <a href="baocao-tap-huan.html"
           class="block py-2 text-sm text-slate-600 hover:text-purple-700 transition">
            Tập huấn
        </a>

        <a href="HoiThao.html"
           class="block py-2 text-sm text-slate-600 hover:text-purple-700 transition">
            Hội thảo
        </a>

        <a href="baocao-shcm.html"
           class="block py-2 text-sm text-slate-600 hover:text-purple-700 transition">
            Sinh hoạt chuyên môn
        </a>

        <a href="baocao-bdtx.html"
           class="block py-2 text-sm text-slate-600 hover:text-purple-700 transition">
            Bồi dưỡng thường xuyên
        </a>

        <a href="baocao-khac.html"
           class="block py-2 text-sm text-slate-600 hover:text-purple-700 transition">
            Khác
        </a>

    </div>

</div>

            <a href="#" class="flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0"><i class="bi bi-trophy text-sm"></i></div>
                <span>Báo cáo các cuộc thi</span>
            </a>
            <a href="#" class="flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0"><i class="bi bi-laptop text-lg"></i></div>
                <span>Báo cáo chuyển đổi số</span>
            </a>
            <a href="#" class="flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0"><i class="bi bi-building text-lg"></i></div>
                <span>Báo cáo hành chính</span>
            </a>
        </div>
    </div>

     <!-- TRỤ CỘT 3: ĐIỀU HÀNH SỐ (Màu đậm mới + Chuyển sang Card 3) -->
    <div class="relative">
        <div data-dropdown-toggle="dieuhanhso-dropdown" class="group relative rounded-2xl bg-gradient-to-br from-teal-700 via-emerald-700 to-cyan-700 text-white p-3.5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-visible border border-teal-400/40 active:scale-[0.98]">
            <div class="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
            <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/30">
                <i class="bi bi-cpu text-white text-lg"></i>
            </div>
            <div class="flex items-center justify-between">
                <h3 class="text-xs font-extrabold tracking-tight text-white mb-0.5">ĐIỀU HÀNH SỐ</h3>
                <i class="bi bi-chevron-up text-xs text-teal-100 transition-transform duration-300" data-dropdown-arrow></i>
            </div>
            <p class="text-[10px] text-teal-50 font-medium">Giao việc • Văn bản • AI • Dashboard</p>
        </div>

        <!-- Dropup Menu Điều hành số -->
        <div id="dieuhanhso-dropdown" data-dropdown-menu class="hidden absolute right-0 w-[240px] bottom-[calc(100%+0.5rem)] z-50 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-2 space-y-1 transition-all duration-200 max-h-[280px] overflow-y-auto">
            <a href="Giaonhanviec.html" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 transition-colors">
                <div class="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 shrink-0">
                    <i class="bi bi-clipboard-check text-sm"></i>
                </div>
                <span>📋 Giao việc</span>
            </a>
            <button onclick="alert('Chức năng đang phát triển')" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 transition-colors text-left">
                <div class="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 shrink-0">
                    <i class="bi bi-calendar3 text-sm"></i>
                </div>
                <span>📅 Lịch công tác</span>
            </button>
        </div>
    </div>

    <!-- TRỤ CỘT 4: QUẢN TRỊ -->
    <div data-open-modal="boiduong-modal" class="group relative rounded-2xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white p-3.5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-slate-500/40 active:scale-[0.98]">
        <div class="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/30">
            <i class="bi bi-graph-up-arrow text-white text-lg"></i>
        </div>
        <h3 class="text-xs font-extrabold tracking-tight text-white mb-0.5">QUẢN TRỊ</h3>
        <p class="text-[10px] text-slate-100 font-medium">Kế hoạch • Thi đua • KPI</p>
    </div>

</section>
`;
// 2. Khởi tạo các sự kiện giao diện và PWA App
    initMenuLogic();
    renderPWAPopups();
    bindHomeEvents();
}

// ==========================================
// LOGIC MENU XỔ DOWN / UP
// ==========================================
function initMenuLogic() {
    window.toggleDashboardMenu = function(menuId, event) {
        if (event) event.stopPropagation();
        const targetMenu = document.getElementById(menuId);
        if (!targetMenu) return;

        const isHidden = targetMenu.classList.contains('hidden');
        document.querySelectorAll('.dashboard-dropdown').forEach(m => m.classList.add('hidden'));

        if (isHidden) targetMenu.classList.remove('hidden');
    };

    window.toggleSubmenu = function(element, event) {
        if (event) event.stopPropagation();
        const submenu = element.querySelector('.dashboard-submenu');
        const arrowIcon = element.querySelector('.bi-chevron-right, .bi-chevron-down');

        if (submenu) {
            const isHidden = submenu.classList.contains('hidden');
            const parent = element.parentElement;
            if (parent) {
                parent.querySelectorAll('.dashboard-submenu').forEach(s => s.classList.add('hidden'));
                parent.querySelectorAll('.bi-chevron-down').forEach(i => {
                    i.classList.remove('bi-chevron-down');
                    i.classList.add('bi-chevron-right');
                });
            }

            if (isHidden) {
                submenu.classList.remove('hidden');
                if (arrowIcon) {
                    arrowIcon.classList.remove('bi-chevron-right');
                    arrowIcon.classList.add('bi-chevron-down');
                }
            }
        }
    };

   document.querySelectorAll("[data-dropdown-toggle]").forEach(btn => {

    btn.addEventListener("click", function (e) {
        

        e.stopPropagation();
       

        const menuId = this.dataset.dropdownToggle;
        const menu = document.getElementById(menuId);

        document.querySelectorAll("[data-dropdown-menu]").forEach(m => {
            if (m !== menu) m.classList.add("hidden");
        });

        menu.classList.toggle("hidden");
    });

});

document.addEventListener("click", () => {

    document.querySelectorAll("[data-dropdown-menu]").forEach(menu => {
        menu.classList.add("hidden");
    });

});
}
// ==========================================
// LOGIC CÀI ĐẶT PWA APP (ANDROID & IOS)
// ==========================================
function renderPWAPopups() {
    if (document.getElementById('pwa-custom-popup')) return;

    const popupHtml = `
    <div id="pwa-custom-popup" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 hidden">
        <div class="w-full max-w-xs bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-6 text-center">
            
            <!-- ANDROID -->
            <div id="pwa-android-content" class="hidden">
                <div class="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl mx-auto flex items-center justify-center text-2xl mb-4 shadow-inner">
                    📱
                </div>
                <h3 class="text-base font-bold text-slate-900 mb-1">Cài đặt ứng dụng</h3>
                <p class="text-xs text-slate-500 mb-6">Thêm TTĐHS_HVA vào màn hình chính để truy cập nhanh và tiện lợi hơn.</p>
                <div class="flex gap-2.5">
                    <button id="pwa-dismiss-btn" class="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition">Để sau</button>
                    <button id="pwa-confirm-btn" class="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition">Cài đặt ngay</button>
                </div>
            </div>

            <!-- iOS -->
            <div id="pwa-ios-content" class="hidden text-left">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="text-sm font-bold text-slate-900">Cài đặt trên iPhone/iPad</h3>
                    <button id="pwa-ios-close" class="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 text-xs font-bold">✕</button>
                </div>
                <p class="text-xs text-slate-500 mb-4">Thực hiện các bước sau:</p>
                <div class="space-y-2.5 mb-5 text-xs text-slate-700 font-medium">
                    <div class="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span class="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                        <span>Nhấn nút <b>Chia sẻ</b> (Share)</span>
                    </div>
                    <div class="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span class="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                        <span>Chọn <b>Add to Home Screen</b></span>
                    </div>
                    <div class="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span class="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                        <span>Nhấn <b>Thêm</b> (Add)</span>
                    </div>
                </div>
                <button id="pwa-ios-got-it" class="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold">Đã hiểu</button>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHtml);
}

function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
}

function showPWAPopup(isIOSDevice = false) {
    const popup = document.getElementById('pwa-custom-popup');
    if (!popup) return;

    document.getElementById('pwa-android-content')?.classList.toggle('hidden', isIOSDevice);
    document.getElementById('pwa-ios-content')?.classList.toggle('hidden', !isIOSDevice);

    popup.classList.remove('hidden');
}

function hidePWAPopup() {
    document.getElementById('pwa-custom-popup')?.classList.add('hidden');
}

function bindHomeEvents() {
    // Sự kiện Nút Android
    document.getElementById('pwa-dismiss-btn')?.addEventListener('click', () => {
        hidePWAPopup();
        localStorage.setItem('pwa-dismissed', Date.now().toString());
    });

    document.getElementById('pwa-confirm-btn')?.addEventListener('click', () => {
        hidePWAPopup();
        if (window.deferredPrompt) {
            window.deferredPrompt.prompt();
            window.deferredPrompt.userChoice.then(() => {
                window.deferredPrompt = null;
            });
        } else if (typeof PWA?.install === 'function') {
            PWA.install();
        }
    });

    // Sự kiện Nút iOS
    document.getElementById('pwa-ios-close')?.addEventListener('click', hidePWAPopup);
    document.getElementById('pwa-ios-got-it')?.addEventListener('click', () => {
        hidePWAPopup();
        localStorage.setItem('pwa-ios-dismissed', Date.now().toString());
    });

    // Không hiển thị nếu ứng dụng đã được cài đặt (chạy ở chế độ standalone)
    if (isStandalone()) return;

   
    // Lắng nghe và kiểm tra thiết bị iOS
    if (isIOS()) {
        const iosDismissed = localStorage.getItem('pwa-ios-dismissed');
        if (!iosDismissed || Date.now() - Number(iosDismissed) > 2 * 24 * 60 * 60 * 1000) {
            setTimeout(() => showPWAPopup(true), 1500);
        }
    }
}
