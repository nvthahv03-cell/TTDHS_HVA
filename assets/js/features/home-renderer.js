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
<!-- KHU VỰC 3 PHÍM TÁC VỤ NHANH (PHONG CÁCH VNeID) -->
<!-- ========================================== -->

<!-- ==================== VIỆC CỦA TÔI ==================== -->
<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4 mb-6">

  <!-- ========== VIỆC ĐƯỢC GIAO ========== -->
  <div class="relative flex flex-col items-center">
    <button type="button"
      id="btn-my-assigned"
      onclick="openMyTasks('ASSIGNED', event)"
      class="group relative flex flex-col items-center justify-center p-2 bg-transparent border-none cursor-pointer">

      <span id="countAssigned"
        class="absolute -top-1 right-0 min-w-[22px] h-[22px] px-1.5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
        0
      </span>

      <div class="text-[#2563EB] text-[40px] sm:text-[50px] leading-none mb-2 transition-transform duration-200 group-hover:scale-110">
        <i class="bi bi-inbox-fill"></i>
      </div>

      <span class="font-bold text-[13px] sm:text-[15px] text-[#1E3A8A] text-center">
        Việc được giao
      </span>

      <span class="text-[10px] sm:text-xs text-slate-500 mt-1">
        Chưa tiếp nhận
      </span>
    </button>
  </div>


  <!-- ========== ĐANG THỰC HIỆN ========== -->
  <div class="relative flex flex-col items-center">
    <button type="button"
      id="btn-my-doing"
      onclick="openMyTasks('DOING', event)"
      class="group relative flex flex-col items-center justify-center p-2 bg-transparent border-none cursor-pointer">

      <span id="countDoing"
        class="absolute -top-1 right-0 min-w-[22px] h-[22px] px-1.5 rounded-full bg-amber-500 text-white text-[11px] font-bold flex items-center justify-center">
        0
      </span>

      <div class="text-amber-500 text-[40px] sm:text-[50px] leading-none mb-2 transition-transform duration-200 group-hover:scale-110">
        <i class="bi bi-hourglass-split"></i>
      </div>

      <span class="font-bold text-[13px] sm:text-[15px] text-slate-800 text-center">
        Đang thực hiện
      </span>

      <span class="text-[10px] sm:text-xs text-slate-500 mt-1">
        Đã tiếp nhận
      </span>
    </button>
  </div>


  <!-- ========== QUÁ HẠN ========== -->
  <div class="relative flex flex-col items-center">
    <button type="button"
      id="btn-my-overdue"
      onclick="openMyTasks('OVERDUE', event)"
      class="group relative flex flex-col items-center justify-center p-2 bg-transparent border-none cursor-pointer">

      <span id="countOverdue"
        class="absolute -top-1 right-0 min-w-[22px] h-[22px] px-1.5 rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center justify-center">
        0
      </span>

      <div class="text-red-600 text-[40px] sm:text-[50px] leading-none mb-2 transition-transform duration-200 group-hover:scale-110">
        <i class="bi bi-exclamation-triangle-fill"></i>
      </div>

      <span class="font-bold text-[13px] sm:text-[15px] text-red-700 text-center">
        Quá hạn
      </span>

      <span class="text-[10px] sm:text-xs text-red-500 mt-1">
        Chưa hoàn thành
      </span>
    </button>
  </div>


  <!-- ========== ĐÃ HOÀN THÀNH ========== -->
  <div class="relative flex flex-col items-center">
    <button type="button"
      id="btn-my-completed"
      onclick="openMyTasks('COMPLETED', event)"
      class="group relative flex flex-col items-center justify-center p-2 bg-transparent border-none cursor-pointer">

      <span id="countCompleted"
        class="absolute -top-1 right-0 min-w-[22px] h-[22px] px-1.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center">
        0
      </span>

      <div class="text-emerald-600 text-[40px] sm:text-[50px] leading-none mb-2 transition-transform duration-200 group-hover:scale-110">
        <i class="bi bi-check-circle-fill"></i>
      </div>

      <span class="font-bold text-[13px] sm:text-[15px] text-emerald-700 text-center">
        Đã hoàn thành
      </span>

      <span class="text-[10px] sm:text-xs text-slate-500 mt-1">
        Đã xác nhận
      </span>
    </button>
  </div>

</div>

<!-- CONTAINER 3 TÁC VỤ VNeID STYLE -->
<div class="flex justify-center items-start gap-2 sm:gap-8 md:gap-12 mb-8 relative z-30 max-w-lg mx-auto px-4">

  <!-- ================= SHORTCUT 1: LỊCH CÔNG TÁC ================= -->
  <div class="relative flex flex-col items-center">
    <!-- Nút bấm Shortcut 1 -->
    <button type="button"
            id="btn-menu-lich-tb"
            onclick="toggleDashboardMenu('menu-lich-tb', event)"
            class="flex flex-col items-center justify-center p-2 bg-transparent border-none cursor-pointer group outline-none select-none">
      
      <!-- Icon Outline Style VNeID -->
      <div class="text-[#2563EB] text-[40px] sm:text-[50px] leading-none mb-2 transition-transform duration-200 ease-out group-hover:scale-108 group-hover:text-blue-500 group-active:scale-95">
        <i class="bi bi-calendar3"></i>
      </div>

      <!-- Tiêu đề dưới Icon -->
      <span class="font-bold text-[13px] sm:text-[15px] text-[#1E3A8A] transition-colors duration-200 group-hover:text-blue-600 text-center whitespace-nowrap">
        Lịch công tác
      </span>
    </button>

    <!-- Menu Dropdown 1 -->
   <div id="menu-lich-tb" class="dashboard-dropdown hidden absolute top-full left-0 sm:-left-4 mt-3 w-64 sm:w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 p-2 z-50 transition-all text-left" onclick="event.stopPropagation()">
      
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

    </div>
  </div>

  <!-- ================= SHORTCUT 2: TÀI NGUYÊN SỐ ================= -->
  <div class="relative flex flex-col items-center">
    <!-- Nút bấm Shortcut 2 -->
    <button type="button"
            id="btn-menu-tai-nguyen"
            onclick="toggleDashboardMenu('menu-thong-tin', event)"
            class="flex flex-col items-center justify-center p-2 bg-transparent border-none cursor-pointer group outline-none select-none">

      <!-- Icon Outline Style VNeID -->
      <div class="text-[#2563EB] text-[40px] sm:text-[50px] leading-none mb-2 transition-transform duration-200 ease-out group-hover:scale-108 group-hover:text-blue-500 group-active:scale-95">
        <i class="bi bi-folder2-open"></i>
      </div>

      <!-- Tiêu đề dưới Icon -->
      <span class="font-bold text-[13px] sm:text-[15px] text-[#1E3A8A] transition-colors duration-200 group-hover:text-blue-600 text-center whitespace-nowrap">
        Tài nguyên số
      </span>
    </button>

    <!-- Menu Dropdown 2 (Gộp Thông tin, Văn bản, Biểu mẫu, Học liệu số, Tra cứu) -->
    <div id="menu-thong-tin" class="dashboard-dropdown hidden absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 sm:w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 p-2 z-50 transition-all text-left" onclick="event.stopPropagation()">
      
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

    </div>
  </div>

  <!-- ================= SHORTCUT 3: TIỆN ÍCH SỐ ================= -->
  <div class="relative flex flex-col items-center">
    <!-- Nút bấm Shortcut 3 -->
    <button type="button"
            id="btn-menu-tien-ich"
            onclick="toggleDashboardMenu('menu-hoc-lieu', event)"
            class="flex flex-col items-center justify-center p-2 bg-transparent border-none cursor-pointer group outline-none select-none">

      <!-- Icon Outline Style VNeID -->
      <div class="text-[#2563EB] text-[40px] sm:text-[50px] leading-none mb-2 transition-transform duration-200 ease-out group-hover:scale-108 group-hover:text-blue-500 group-active:scale-95">
        <i class="bi bi-lightning-charge"></i>
      </div>

      <!-- Tiêu đề dưới Icon -->
      <span class="font-bold text-[13px] sm:text-[15px] text-[#1E3A8A] transition-colors duration-200 group-hover:text-blue-600 text-center whitespace-nowrap">
        Tiện ích số
      </span>
    </button>

    <!-- Menu Dropdown 3 (AI, Hướng dẫn số, Công cụ, Liên kết) -->
    <div id="menu-hoc-lieu" class="dashboard-dropdown hidden absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 sm:w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 p-2 z-50 transition-all text-left" onclick="event.stopPropagation()">
      
      <!-- AI -->
      <div class="dashboard-item p-2 hover:bg-purple-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-robot text-teal-500 text-sm"></i> AI</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-teal-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('ai-chatgpt')"><i class="bi bi-chat-dots"></i> ChatGPT</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-teal-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('ai-gemini')"><i class="bi bi-stars"></i> Gemini</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-teal-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('ai-copilot')"><i class="bi bi-cpu"></i> Copilot</div>
        </div>
      </div>

      <!-- Hướng dẫn số -->
      <div class="dashboard-item p-2 hover:bg-blue-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-book-half text-blue-500 text-sm"></i> Hướng dẫn số</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('hd-google-workspace')"><i class="bi bi-google"></i> Google Workspace</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('hd-microsoft-365')"><i class="bi bi-microsoft"></i> Microsoft 365</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('hd-ai')"><i class="bi bi-cpu"></i> AI</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('hd-ttdhs-hva')"><i class="bi bi-building font-bold"></i> TTĐHS_HVA</div>
        </div>
      </div>

      <!-- Công cụ -->
      <div class="dashboard-item p-2 hover:bg-sky-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-tools text-sky-500 text-sm"></i> Công cụ</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-sky-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('cc-qr')"><i class="bi bi-qr-code"></i> QR</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-sky-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('cc-pdf')"><i class="bi bi-file-earmark-pdf"></i> PDF</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-sky-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('cc-ocr')"><i class="bi bi-text-paragraph"></i> OCR</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-sky-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('cc-may-tinh')"><i class="bi bi-calculator"></i> Máy tính</div>
        </div>
      </div>

      <!-- Liên kết -->
      <div class="dashboard-item p-2 hover:bg-emerald-50/80 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2.5 text-xs font-semibold text-slate-700"><i class="bi bi-link-45deg text-emerald-500 text-sm"></i> Liên kết</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('lk-emis')"><i class="bi bi-box-arrow-up-right"></i> EMIS</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('lk-csdl-nganh')"><i class="bi bi-database"></i> CSDL ngành</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('lk-smas')"><i class="bi bi-journal-check"></i> SMAS</div>
        </div>
      </div>

    </div>
  </div>

</div>


<!-- ========================================== -->
<!-- SCRIPT ĐIỀU KHIỂN DÁSHBOARD DROPDOWNS      -->
<!-- ========================================== -->
<script>
  function toggleDashboardMenu(menuId, event) {
    if (event) event.stopPropagation();
    
    // Đóng tất cả dropdowns khác
    const allDropdowns = document.querySelectorAll('.dashboard-dropdown');
    allDropdowns.forEach(dropdown => {
      if (dropdown.id !== menuId) {
        dropdown.classList.add('hidden');
      }
    });

    // Toggle menu hiện tại
    const targetMenu = document.getElementById(menuId);
    if (targetMenu) {
      targetMenu.classList.toggle('hidden');
    }
  }

  function toggleSubmenu(element, event) {
    if (event) event.stopPropagation();
    
    const submenu = element.querySelector('.dashboard-submenu');
    const chevron = element.querySelector('.bi-chevron-right, .bi-chevron-down');
    
    if (submenu) {
      const isHidden = submenu.classList.contains('hidden');
      
      // Đóng các submenu khác trong cùng dropdown
      const parentDropdown = element.closest('.dashboard-dropdown');
      if (parentDropdown) {
        parentDropdown.querySelectorAll('.dashboard-submenu').forEach(sub => {
          sub.classList.add('hidden');
        });
        parentDropdown.querySelectorAll('.bi-chevron-down').forEach(icon => {
          icon.classList.remove('bi-chevron-down');
          icon.classList.add('bi-chevron-right');
        });
      }

      // Mở/Đóng submenu hiện tại
      if (isHidden) {
        submenu.classList.remove('hidden');
        if (chevron) {
          chevron.classList.remove('bi-chevron-right');
          chevron.classList.add('bi-chevron-down');
        }
      }
    }
  }

  // Đóng dropdown khi click ra ngoài
  document.addEventListener('click', function(event) {
    const isClickInside = event.target.closest('.relative');
    if (!isClickInside) {
      document.querySelectorAll('.dashboard-dropdown').forEach(dropdown => {
        dropdown.classList.add('hidden');
      });
    }
  });
</script>
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

        <!-- Dropup Menu Nghiệp vụ số theo chuẩn sơ đồ cây -->
       
        <div id="nghiepvuso-dropdown" 
        data-dropdown-menu 
        class="hidden fixed sm:absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-0 bottom-4 sm:bottom-[calc(100%+0.6rem)] z-[999] w-[90vw] sm:w-[320px] max-h-[70vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 space-y-1">
            <!-- tiêu đề MENU -->
            <div class="flex items-center gap-2 px-2 py-1 mb-2 text-xs font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800">
                <i class="bi bi-mortarboard-fill text-purple-600"></i>
                <span>NGHIỆP VỤ SỐ</span>
            </div>

            <!-- 1. HỘI NGHỊ - HỌP (Có các mục con) -->
            <div class="relative">
                <button type="button"
                    onclick="event.stopPropagation();
                             document.getElementById('hoinghi-sub-items').classList.toggle('hidden');
                             document.getElementById('hoinghi-sub-arrow').classList.toggle('rotate-90');"
                    class="w-full flex items-center justify-between px-2 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors">
                    <div class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 shrink-0">
                            <i class="bi bi-people-fill text-sm"></i>
                        </div>
                        <span>Hội nghị - Họp</span>
                    </div>
                    <i id="hoinghi-sub-arrow" class="bi bi-chevron-right text-xs text-slate-400 transition-transform duration-200"></i>
                </button>

                <!-- Các mục con của Hội nghị - Họp -->
                <div id="hoinghi-sub-items" class="pl-6 ml-3 border-l-2 border-purple-200 dark:border-purple-800/50 my-1 space-y-0.5">
                    <a href="thong-bao-hop.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-purple-50 hover:text-purple-700 transition">
                        <i class="bi bi-megaphone text-purple-500"></i> Thông báo
                    </a>
                    <a href="thanh-phan-hop.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-purple-50 hover:text-purple-700 transition">
                        <i class="bi bi-person-lines-fill text-purple-500"></i> Thành phần
                    </a>
                    <a href="tai-lieu-hop.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-purple-50 hover:text-purple-700 transition">
                        <i class="bi bi-file-earmark-text text-purple-500"></i> Tài liệu
                    </a>
                    <a href="xac-nhan-tham-du.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-purple-50 hover:text-purple-700 transition">
                        <i class="bi bi-check2-square text-purple-500"></i> Xác nhận tham dự
                    </a>
                    <a href="diem-danh-hop.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-purple-50 hover:text-purple-700 transition">
                        <i class="bi bi-qr-code-scan text-purple-500"></i> Điểm danh
                    </a>
                    <a href="bien-ban-ket-luan.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-purple-50 hover:text-purple-700 transition">
                        <i class="bi bi-journal-text text-purple-500"></i> Biên bản - Kết luận
                    </a>
                    <a href="nhiem-vu-sau-hop.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-purple-50 hover:text-purple-700 transition">
                        <i class="bi bi-list-check text-purple-500"></i> Nhiệm vụ sau họp
                    </a>
                    <a href="xuat-du-lieu-hop.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-purple-50 hover:text-purple-700 transition">
                        <i class="bi bi-file-earmark-spreadsheet text-purple-500"></i> Xuất dữ liệu
                    </a>
                </div>
            </div>

           <!-- Menu Bồi dưỡng chuyên môn -->
<div class="relative border-y border-slate-100 dark:border-slate-700/50 my-1 py-1">

    <button type="button"
        onclick="event.stopPropagation();
                 document.getElementById('bdcm-sub-items').classList.toggle('hidden');
                 document.getElementById('bdcm-sub-arrow').classList.toggle('rotate-90');"
        class="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group">

        <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 group-hover:scale-105 transition-transform">
                <i class="bi bi-mortarboard text-lg"></i>
            </div>

            <span>Bồi dưỡng chuyên môn</span>
        </div>

        <i id="bdcm-sub-arrow"
           class="bi bi-chevron-right text-xs text-slate-400 transition-transform duration-300"></i>
    </button>

    <!-- Menu cấp 2 (Giữ nguyên chính xác 5 mục và link của Thầy) -->
    <div id="bdcm-sub-items"
         class="hidden ml-14 mt-2 border-l-2 border-purple-200 dark:border-purple-800 pl-4 space-y-1">

        <a href="baocao-tap-huan.html"
           class="block py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-400 transition">
            Tập huấn
        </a>

        <a href="HoiThao.html"
           class="block py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-400 transition">
            Hội thảo
        </a>

        <a href="baocao-shcm.html"
           class="block py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-400 transition">
            Sinh hoạt chuyên môn
        </a>

        <a href="baocao-bdtx.html"
           class="block py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-400 transition">
            Bồi dưỡng thường xuyên
        </a>

        <a href="baocao-khac.html"
           class="block py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-400 transition">
            Khác
        </a>

    </div>

</div>

            <!-- 3. BÁO CÁO CHUYÊN MÔN -->
            <a href="baocao-chuyenmon.html" class="flex items-center gap-2.5 px-2 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition">
                <div class="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 shrink-0">
                    <i class="bi bi-bar-chart-line text-sm"></i>
                </div>
                <span>Báo cáo chuyên môn</span>
            </a>

            <!-- 4. HOẠT ĐỘNG GIÁO DỤC -->
            <a href="hoatdong-giaoduc.html" class="flex items-center gap-2.5 px-2 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition">
                <div class="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 shrink-0">
                    <i class="bi bi-trophy text-sm"></i>
                </div>
                <span>Hoạt động giáo dục</span>
            </a>

            <!-- 5. CÁC CUỘC THI -->
            <a href="cac-cuoc-thi.html" class="flex items-center gap-2.5 px-2 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition">
                <div class="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 shrink-0">
                    <i class="bi bi-award text-sm"></i>
                </div>
                <span>Các cuộc thi</span>
            </a>

            <!-- 6. CHUYỂN ĐỔI SỐ -->
            <a href="chuyen-doi-so.html" class="flex items-center gap-2.5 px-2 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition">
                <div class="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 shrink-0">
                    <i class="bi bi-laptop text-sm"></i>
                </div>
                <span>Chuyển đổi số</span>
            </a>

            <!-- 7. HÀNH CHÍNH -->
            <a href="hanh-chinh.html" class="flex items-center gap-2.5 px-2 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition">
                <div class="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 shrink-0">
                    <i class="bi bi-building text-sm"></i>
                </div>
                <span>Hành chính</span>
            </a>

        </div>
    </div>

    <!-- TRỤ CỘT 3: ĐIỀU HÀNH SỐ -->
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
            <p class="text-[10px] text-teal-50 font-medium">Giao việc • Lịch • ...</p>
        </div>

        <!-- Dropup Menu Điều hành số -->
        <div id="dieuhanhso-dropdown" data-dropdown-menu class="hidden absolute right-0 w-[240px] bottom-[calc(100%+0.5rem)] z-50 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-2 space-y-1 transition-all duration-200 max-h-[280px] overflow-y-auto">
            <a href="Giaonhanviec.html" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 transition-colors">
                <div class="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 shrink-0">
                    <i class="bi bi-clipboard-check text-sm"></i>
                </div>
                <span>📋 Giao việc</span>
            </a>
            <a href="Lichcongtac.html"
   class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 transition-colors">

    <div class="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 shrink-0">
        <i class="bi bi-calendar3 text-sm"></i>
    </div>

    <span>📅 Lịch công tác</span>

</a>
        </div>
    </div>

    <!-- TRỤ CỘT 4: QUẢN TRỊ -->
    <div class="relative">
        <div data-dropdown-toggle="quantri-dropdown" class="group relative rounded-2xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white p-3.5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-visible border border-slate-500/40 active:scale-[0.98]">
            <div class="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
            <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/30">
                <i class="bi bi-graph-up-arrow text-white text-lg"></i>
            </div>
            <div class="flex items-center justify-between">
                <h3 class="text-xs font-extrabold tracking-tight text-white mb-0.5">QUẢN TRỊ</h3>
                <i class="bi bi-chevron-up text-xs text-slate-200 transition-transform duration-300" data-dropdown-arrow></i>
            </div>
            <p class="text-[10px] text-slate-100 font-medium">Kế hoạch • Thi đua • KPI</p>
        </div>

        <!-- Dropup Menu Quản trị theo chuẩn sơ đồ cây -->
        <div id="quantri-dropdown"
            data-dropdown-menu
            class="hidden absolute right-0 bottom-[calc(100%+0.6rem)] z-[999] w-[340px] max-w-[92vw] max-h-[80vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 space-y-1">

            <!-- Tiêu đề Menu -->
            <div class="flex items-center gap-2 px-2 py-1 mb-2 text-xs font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800">
                <i class="bi bi-bar-chart-fill text-slate-700 dark:text-slate-300"></i>
                <span>QUẢN TRỊ</span>
            </div>

            <!-- 1. KẾ HOẠCH -->
            <div class="relative">
                <button type="button"
                    onclick="event.stopPropagation();
                             document.getElementById('kehoach-sub-items').classList.toggle('hidden');
                             document.getElementById('kehoach-sub-arrow').classList.toggle('rotate-90');"
                    class="w-full flex items-center justify-between px-2 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <div class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                            <i class="bi bi-calendar-event text-sm"></i>
                        </div>
                        <span>Kế hoạch</span>
                    </div>
                    <i id="kehoach-sub-arrow" class="bi bi-chevron-right text-xs text-slate-400 transition-transform duration-200"></i>
                </button>
                <div id="kehoach-sub-items" class="pl-6 ml-3 border-l-2 border-slate-200 dark:border-slate-700 my-1 space-y-0.5">
                    <a href="ke-hoach-nam-hoc.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-journal-check text-slate-500"></i> Kế hoạch năm học
                    </a>
                    <a href="ke-hoach-thang.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-calendar-month text-slate-500"></i> Kế hoạch tháng
                    </a>
                    <a href="ke-hoach-tuan.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-calendar-week text-slate-500"></i> Kế hoạch tuần
                    </a>
                    <a href="theo-doi-tien-do.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-hourglass-split text-slate-500"></i> Theo dõi tiến độ
                    </a>
                </div>
            </div>

            <!-- 2. DASHBOARD -->
            <div class="relative">
                <button type="button"
                    onclick="event.stopPropagation();
                             document.getElementById('dashboard-sub-items').classList.toggle('hidden');
                             document.getElementById('dashboard-sub-arrow').classList.toggle('rotate-90');"
                    class="w-full flex items-center justify-between px-2 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <div class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                            <i class="bi bi-grid-1x2 text-sm"></i>
                        </div>
                        <span>Dashboard</span>
                    </div>
                    <i id="dashboard-sub-arrow" class="bi bi-chevron-right text-xs text-slate-400 transition-transform duration-200"></i>
                </button>
                <div id="dashboard-sub-items" class="hidden pl-6 ml-3 border-l-2 border-slate-200 dark:border-slate-700 my-1 space-y-0.5">
                    <a href="db-chuyen-mon.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-book text-slate-500"></i> Chuyên môn
                    </a>
                    <a href="db-chuyen-doi-so.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-laptop text-slate-500"></i> Chuyển đổi số
                    </a>
                    <a href="db-thi-dua.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-award text-slate-500"></i> Thi đua
                    </a>
                    <a href="db-tong-hop.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-pie-chart text-slate-500"></i> Tổng hợp
                    </a>
                </div>
            </div>

            <!-- 3. THI ĐỦA - KHEN THƯỞNG -->
            <div class="relative">
                <button type="button"
                    onclick="event.stopPropagation();
                             document.getElementById('thidua-sub-items').classList.toggle('hidden');
                             document.getElementById('thidua-sub-arrow').classList.toggle('rotate-90');"
                    class="w-full flex items-center justify-between px-2 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <div class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                            <i class="bi bi-trophy text-sm"></i>
                        </div>
                        <span>Thi đua - Khen thưởng</span>
                    </div>
                    <i id="thidua-sub-arrow" class="bi bi-chevron-right text-xs text-slate-400 transition-transform duration-200"></i>
                </button>
                <div id="thidua-sub-items" class="hidden pl-6 ml-3 border-l-2 border-slate-200 dark:border-slate-700 my-1 space-y-0.5">
                    <a href="td-ca-nhan.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-person text-slate-500"></i> Cá nhân
                    </a>
                    <a href="td-to-chuyen-mon.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-people text-slate-500"></i> Tổ chuyên môn
                    </a>
                    <a href="td-minh-chung.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-folder-check text-slate-500"></i> Minh chứng
                    </a>
                    <a href="td-tong-hop.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-card-checklist text-slate-500"></i> Tổng hợp
                    </a>
                </div>
            </div>

            <!-- 4. KPI -->
            <div class="relative">
                <button type="button"
                    onclick="event.stopPropagation();
                             document.getElementById('kpi-sub-items').classList.toggle('hidden');
                             document.getElementById('kpi-sub-arrow').classList.toggle('rotate-90');"
                    class="w-full flex items-center justify-between px-2 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <div class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                            <i class="bi bi-speedometer2 text-sm"></i>
                        </div>
                        <span>KPI</span>
                    </div>
                    <i id="kpi-sub-arrow" class="bi bi-chevron-right text-xs text-slate-400 transition-transform duration-200"></i>
                </button>
                <div id="kpi-sub-items" class="hidden pl-6 ml-3 border-l-2 border-slate-200 dark:border-slate-700 my-1 space-y-0.5">
                    <a href="kpi-ca-nhan.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-person-badge text-slate-500"></i> KPI cá nhân
                    </a>
                    <a href="kpi-to.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-diagram-3 text-slate-500"></i> KPI tổ
                    </a>
                    <a href="kpi-thong-ke.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-graph-up text-slate-500"></i> Thống kê
                    </a>
                    <a href="kpi-danh-gia.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-star text-slate-500"></i> Đánh giá
                    </a>
                </div>
            </div>

            <!-- 5. THỐNG KÊ -->
            <div class="relative">
                <button type="button"
                    onclick="event.stopPropagation();
                             document.getElementById('thongke-sub-items').classList.toggle('hidden');
                             document.getElementById('thongke-sub-arrow').classList.toggle('rotate-90');"
                    class="w-full flex items-center justify-between px-2 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <div class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                            <i class="bi bi-[#108343] bi-bar-chart text-sm"></i>
                        </div>
                        <span>Thống kê</span>
                    </div>
                    <i id="thongke-sub-arrow" class="bi bi-chevron-right text-xs text-slate-400 transition-transform duration-200"></i>
                </button>
                <div id="thongke-sub-items" class="hidden pl-6 ml-3 border-l-2 border-slate-200 dark:border-slate-700 my-1 space-y-0.5">
                    <a href="bao-cao-tong-hop.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-file-earmark-bar-graph text-slate-500"></i> Báo cáo tổng hợp
                    </a>
                    <a href="bieu-do.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-graph-down text-slate-500"></i> Biểu đồ
                    </a>
                    <a href="xuat-excel.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-file-earmark-excel text-emerald-600"></i> Xuất Excel
                    </a>
                    <a href="xuat-pdf.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-file-earmark-pdf text-red-500"></i> Xuất PDF
                    </a>
                </div>
            </div>

            <!-- 6. HỆ THỐNG -->
            <div class="relative">
                <button type="button"
                    onclick="event.stopPropagation();
                             document.getElementById('hethong-sub-items').classList.toggle('hidden');
                             document.getElementById('hethong-sub-arrow').classList.toggle('rotate-90');"
                    class="w-full flex items-center justify-between px-2 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <div class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                            <i class="bi bi-gear text-sm"></i>
                        </div>
                        <span>Hệ thống</span>
                    </div>
                    <i id="hethong-sub-arrow" class="bi bi-chevron-right text-xs text-slate-400 transition-transform duration-200"></i>
                </button>
                <div id="hethong-sub-items" class="hidden pl-6 ml-3 border-l-2 border-slate-200 dark:border-slate-700 my-1 space-y-0.5">
                    <a href="danh-muc.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-list-nested text-slate-500"></i> Danh mục
                    </a>
                    <a href="phan-quyen.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-shield-lock text-slate-500"></i> Phân quyền
                    </a>
                    <a href="nhat-ky-he-thong.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-clock-history text-slate-500"></i> Nhật ký hệ thống
                    </a>
                    <a href="cau-hinh.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <i class="bi bi-sliders text-slate-500"></i> Cấu hình
                    </a>
                </div>
            </div>

        </div>
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
