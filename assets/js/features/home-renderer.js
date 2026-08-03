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
        <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                    <i class="bi bi-robot text-cyan-300 text-sm"></i>
                </div>
                <div>
                    <h2 class="text-xs font-extrabold tracking-tight leading-tight flex items-center gap-1.5">
                        HVA Assistant
                        <span class="px-1.5 py-0.5 rounded-full bg-cyan-400/30 text-[9px] font-bold text-cyan-100 border border-cyan-300/30">AI Pro</span>
                    </h2>
                    <p class="text-[10px] text-cyan-200/80">Trợ lý điều hành thông minh</p>
                </div>
            </div>
        </div>
        <div class="mb-2.5 bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/15 shadow-sm">
            <div class="flex items-center flex-wrap gap-x-1.5">
                <span id="assistantGreeting" class="text-cyan-100 text-[11px] font-medium">👋 Xin chào,</span>
                <span id="assistantName" class="text-white text-xs font-bold leading-tight">...</span>
            </div>
            <div id="assistantPosition" class="text-cyan-200/90 text-[10px] font-medium leading-tight mt-0.5">...</div>
        </div>
        <div id="assistantMessage" class="bg-white/95 backdrop-blur-xl rounded-xl px-3 py-2 text-[11px] font-medium text-slate-800 shadow-md mb-2 border border-white/40 flex items-start gap-2">
            <i class="bi bi-chat-quote-fill text-indigo-600 text-xs shrink-0 mt-0.5"></i>
            <span class="leading-relaxed">Xin chào!</span>
        </div>
        <div class="flex items-center bg-white/95 backdrop-blur-xl rounded-xl px-2.5 py-1 shadow-md border border-white/50">
            <input type="text" id="assistantInput" placeholder="Hỏi HVA Assistant điều gì đó..." class="flex-1 bg-transparent outline-none text-[11px] font-medium text-slate-800 placeholder-slate-400">
            <button id="assistantMicBtn" class="ml-2 w-6 h-6 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition shadow-sm flex items-center justify-center text-white active:scale-95">
                <i class="bi bi-mic-fill text-[10px]"></i>
            </button>
        </div>
    </div>
</div>
<!-- ========================================== -->
<!-- KHU VỰC 3 PHÍM TÁC VỤ NHANH (FULL FIXED CODE) -->
<!-- ========================================== -->
<div class="grid grid-cols-3 gap-2.5 sm:gap-4 mb-4 relative z-30">

  <!-- ================= SHORTCUT 1: LỊCH - THÔNG BÁO ================= -->
  <div class="relative">
    <!-- Nút bấm Shortcut 1 -->
    <button type="button" 
            onclick="toggleDashboardMenu('menu-lich-tb', event)"
            class="w-full glass-glow-blue rounded-2xl p-2.5 sm:p-4 flex flex-col items-center justify-center text-center relative shortcut-hover cursor-pointer active:scale-95 border border-slate-100/80 group">
      
      <!-- Badge xanh (Luôn cố định góc trên phải) -->
      <span class="absolute top-2 right-2 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white shadow-sm z-10"></span>
      
      <!-- Frame Icon -->
      <div class="w-14 h-14 sm:w-18 sm:h-18 flex items-center justify-center mb-2 rounded-2xl bg-blue-50 border border-blue-200 shadow-sm relative">
        <i class="bi bi-calendar-check-fill text-2xl sm:text-3xl text-blue-600 transition-transform duration-300 group-hover:scale-110"></i>
        <!-- Đồng hồ nhỏ -->
        <div class="absolute bottom-1 right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white border border-blue-300 flex items-center justify-center shadow-sm">
          <i class="bi bi-clock text-[9px] sm:text-[10px] text-blue-600"></i>
        </div>
      </div>
      
      <!-- Nhãn tiêu đề -->
      <span class="font-bold text-[11px] sm:text-xs uppercase leading-tight text-slate-700 tracking-wide">
        LỊCH - THÔNG BÁO
      </span>

      <!-- Sub-text (Chấm xanh khóa cố định dòng đầu) -->
      <div class="mt-1 text-[10px] text-emerald-600 font-medium flex items-start justify-center gap-1.5 leading-tight w-full">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-0.5"></span>
        <span>3 lịch • 5 thông báo</span>
      </div>
    </button>

    <!-- Menu Dropdown 1 -->
    <div id="menu-lich-tb" class="dashboard-dropdown hidden absolute top-full left-0 mt-2 w-60 sm:w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 transition-all" onclick="event.stopPropagation()">
      
      <div class="dashboard-item p-2 hover:bg-blue-50 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2 text-xs font-semibold text-slate-700"><i class="bi bi-calendar3 text-blue-500 text-sm"></i> Lịch công tác</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('lich-tuan')"><i class="bi bi-calendar-week"></i> Lịch tuần</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('lich-thang')"><i class="bi bi-calendar-month"></i> Lịch tháng</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('lich-dot-xuat')"><i class="bi bi-calendar-event"></i> Lịch đột xuất</div>
        </div>
      </div>

      <div class="dashboard-item p-2 hover:bg-amber-50 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2 text-xs font-semibold text-slate-700"><i class="bi bi-bell-fill text-amber-500 text-sm"></i> Thông báo</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-amber-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('tb-moi')"><i class="bi bi-bell"></i> Thông báo mới</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-amber-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('tb-quan-trong')"><i class="bi bi-exclamation-diamond"></i> Thông báo quan trọng</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-amber-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('tb-da-luu')"><i class="bi bi-bookmark-check"></i> Thông báo đã lưu</div>
        </div>
      </div>

      <div class="dashboard-item p-2 hover:bg-emerald-50 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2 text-xs font-semibold text-slate-700"><i class="bi bi-check2-square text-emerald-500 text-sm"></i> Việc của tôi</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('viec-moi-giao')"><i class="bi bi-plus-circle"></i> Việc mới giao</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('viec-dang-thuc-hien')"><i class="bi bi-hourglass-split"></i> Đang thực hiện</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('viec-da-hoan-thanh')"><i class="bi bi-check-circle"></i> Đã hoàn thành</div>
        </div>
      </div>

      <div class="dashboard-item p-2 hover:bg-rose-50 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2 text-xs font-semibold text-slate-700"><i class="bi bi-alarm-fill text-rose-500 text-sm"></i> Nhắc việc</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-rose-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('nhac-hom-nay')"><i class="bi bi-clock-history"></i> Hôm nay</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-rose-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('nhac-tuan-nay')"><i class="bi bi-calendar-minus"></i> Tuần này</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-rose-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('nhac-qua-han')"><i class="bi bi-exclamation-triangle"></i> Quá hạn</div>
        </div>
      </div>

    </div>
  </div>

  <!-- ================= SHORTCUT 2: VĂN BẢN BIỂU MẪU ================= -->
  <div class="relative">
    <!-- Nút bấm Shortcut 2 -->
    <button type="button" 
            onclick="toggleDashboardMenu('menu-van-ban', event)"
            class="w-full glass-glow-blue rounded-2xl p-2.5 sm:p-4 flex flex-col items-center justify-center text-center relative shortcut-hover cursor-pointer active:scale-95 border border-slate-100/80 group">
      
      <!-- Badge số 2 -->
      <span class="absolute top-2 right-2 px-1.5 py-0.5 min-w-[20px] bg-red-500 text-white text-[10px] font-extrabold rounded-full border-2 border-white shadow-sm z-10 leading-none flex items-center justify-center">2</span>
      
      <!-- Frame Icon -->
      <div class="w-14 h-14 sm:w-18 sm:h-18 flex items-center justify-center mb-2 rounded-2xl bg-blue-50 border border-blue-200 shadow-sm">
        <i class="bi bi-folder2-open text-2xl sm:text-3xl text-blue-600 transition-transform duration-300 group-hover:scale-110"></i>
      </div>
      
      <!-- Nhãn tiêu đề -->
      <span class="font-bold text-[11px] sm:text-xs uppercase leading-tight text-slate-700 tracking-wide">
        VĂN BẢN BIỂU MẪU
      </span>
      
      <!-- Sub-text -->
      <span class="mt-1 text-[10px] text-slate-500 font-medium leading-tight">
        2 văn bản chưa đọc
      </span>
    </button>

    <!-- Menu Dropdown 2 -->
    <div id="menu-van-ban" class="dashboard-dropdown hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 sm:w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 transition-all" onclick="event.stopPropagation()">
      
      <div class="dashboard-item p-2 hover:bg-blue-50 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2 text-xs font-semibold text-slate-700"><i class="bi bi-file-earmark-text-fill text-blue-500 text-sm"></i> Văn bản</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('van-ban-den')"><i class="bi bi-inbox-fill"></i> Văn bản đến</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('van-ban-di')"><i class="bi bi-send-fill"></i> Văn bản đi</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('van-ban-noi-bo')"><i class="bi bi-building"></i> Văn bản nội bộ</div>
        </div>
      </div>

      <div class="dashboard-item p-2 hover:bg-indigo-50 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2 text-xs font-semibold text-slate-700"><i class="bi bi-ui-checks text-indigo-500 text-sm"></i> Biểu mẫu</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('bieu-mau-dien-tu')"><i class="bi bi-laptop"></i> Biểu mẫu điện tử</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('bieu-mau-chuyen-mon')"><i class="bi bi-journal-bookmark"></i> Biểu mẫu chuyên môn</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('bieu-mau-hanh-chinh')"><i class="bi bi-briefcase"></i> Biểu mẫu hành chính</div>
        </div>
      </div>

      <div class="dashboard-item p-2 hover:bg-cyan-50 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2 text-xs font-semibold text-slate-700"><i class="bi bi-bar-chart-line-fill text-cyan-500 text-sm"></i> Báo cáo</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-cyan-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('bao-cao-truc-tuyen')"><i class="bi bi-cloud-arrow-up"></i> Báo cáo trực tuyến</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-cyan-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('bao-cao-dinh-ky')"><i class="bi bi-calendar2-check"></i> Báo cáo định kỳ</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-cyan-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('bao-cao-thong-ke')"><i class="bi bi-pie-chart"></i> Báo cáo thống kê</div>
        </div>
      </div>

    </div>
  </div>

  <!-- ================= SHORTCUT 3: HỌC LIỆU SỐ ================= -->
  <div class="relative">
    <!-- Nút bấm Shortcut 3 -->
    <button type="button" 
            onclick="toggleDashboardMenu('menu-hoc-lieu', event)"
            class="w-full glass-glow-blue rounded-2xl p-2.5 sm:p-4 flex flex-col items-center justify-center text-center relative shortcut-hover cursor-pointer active:scale-95 border border-slate-100/80 group">
      
      <!-- Badge số 5 -->
      <span class="absolute top-2 right-2 px-1.5 py-0.5 min-w-[20px] bg-amber-500 text-white text-[10px] font-extrabold rounded-full border-2 border-white shadow-sm z-10 leading-none flex items-center justify-center">5</span>
      
      <!-- Frame Icon -->
      <div class="w-14 h-14 sm:w-18 sm:h-18 flex items-center justify-center mb-2 rounded-2xl bg-blue-50 border border-blue-200 shadow-sm relative">
        <i class="bi bi-book-half text-2xl sm:text-3xl text-blue-600 transition-transform duration-300 group-hover:scale-110"></i>
        <!-- Sóng âm trang trí -->
        <div class="absolute -right-1 top-1/2 -translate-y-1/2 flex flex-col gap-[2px]">
          <div class="w-2 h-[2px] bg-blue-400 rounded-full rotate-12"></div>
          <div class="w-3 h-[2px] bg-blue-500 rounded-full"></div>
          <div class="w-2 h-[2px] bg-blue-400 rounded-full -rotate-12"></div>
        </div>
      </div>
      
      <!-- Nhãn tiêu đề -->
      <span class="font-bold text-[11px] sm:text-xs uppercase leading-tight text-slate-700 tracking-wide">
        HỌC LIỆU SỐ
      </span>
      
      <!-- Sub-text -->
      <span class="mt-1 text-[10px] text-amber-600 font-medium leading-tight">
        Kho tài nguyên số
      </span>
    </button>

    <!-- Menu Dropdown 3 -->
    <div id="menu-hoc-lieu" class="dashboard-dropdown hidden absolute top-full right-0 mt-2 w-60 sm:w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 transition-all" onclick="event.stopPropagation()">
      
      <div class="dashboard-item p-2 hover:bg-blue-50 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2 text-xs font-semibold text-slate-700"><i class="bi bi-journal-text text-blue-500 text-sm"></i> Giáo án</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('giao-an-dien-tu')"><i class="bi bi-file-earmark-code"></i> Giáo án điện tử</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('giao-an-minh-hoa')"><i class="bi bi-file-earmark-slides"></i> Giáo án minh họa</div>
        </div>
      </div>

      <div class="dashboard-item p-2 hover:bg-purple-50 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2 text-xs font-semibold text-slate-700"><i class="bi bi-card-checklist text-purple-500 text-sm"></i> Ngân hàng đề</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-purple-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('de-kiem-tra')"><i class="bi bi-file-earmark-check"></i> Đề kiểm tra</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-purple-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('de-thi')"><i class="bi bi-journal-check"></i> Đề thi</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-purple-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('ma-tran-de')"><i class="bi bi-grid-3x3"></i> Ma trận đề</div>
        </div>
      </div>

      <div class="dashboard-item p-2 hover:bg-red-50 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2 text-xs font-semibold text-slate-700"><i class="bi bi-play-btn-fill text-red-500 text-sm"></i> Video</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-red-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('video-bai-giang')"><i class="bi bi-file-earmark-play"></i> Video bài giảng</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-red-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('video-tap-huan')"><i class="bi bi-display"></i> Video tập huấn</div>
        </div>
      </div>

      <div class="dashboard-item p-2 hover:bg-teal-50 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2 text-xs font-semibold text-slate-700"><i class="bi bi-robot text-teal-500 text-sm"></i> AI hỗ trợ</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-teal-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('ai-chatgpt')"><i class="bi bi-chat-dots"></i> ChatGPT</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-teal-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('ai-gemini')"><i class="bi bi-stars"></i> Gemini</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-teal-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('ai-copilot')"><i class="bi bi-cpu"></i> Copilot</div>
        </div>
      </div>

      <div class="dashboard-item p-2 hover:bg-amber-50 rounded-xl cursor-pointer transition-colors" onclick="toggleSubmenu(this, event)">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2 text-xs font-semibold text-slate-700"><i class="bi bi-archive-fill text-amber-500 text-sm"></i> Kho học liệu</span>
          <i class="bi bi-chevron-right text-[10px] opacity-60"></i>
        </div>
        <div class="dashboard-submenu hidden pl-6 pt-2 space-y-1">
          <div class="p-1.5 text-xs text-slate-600 hover:text-amber-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('kho-bo-gddt')"><i class="bi bi-bank"></i> Bộ GDĐT</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-amber-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('kho-so-gddt')"><i class="bi bi-building"></i> Sở GDĐT</div>
          <div class="p-1.5 text-xs text-slate-600 hover:text-amber-600 rounded-lg hover:bg-white flex items-center gap-2" onclick="loadModule('kho-nha-truong')"><i class="bi bi-house-door"></i> Nhà trường</div>
        </div>
      </div>

    </div>
  </div>

</div>

<!-- VIỆC CỦA TÔI -->
<div class="flex items-center mt-2 mb-3">
    <div class="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-slate-300"></div>

    <div class="mx-3 px-4 py-1 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm flex items-center gap-2">
        <i class="bi bi-person-workspace text-[#0F4C81] text-sm"></i>
        <span class="text-[13px] font-bold uppercase tracking-wide text-[#0F4C81]">
            VIỆC CỦA TÔI
        </span>
    </div>

    <div class="flex-1 h-px bg-gradient-to-l from-transparent via-slate-300 to-slate-300"></div>
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

    <!-- TRỤ CỘT 2: NGHIỆP VỤ SỐ (Đã chuyển lên Card 2) -->
    <div class="relative">
        <div data-dropdown-toggle="nghiepvuso-dropdown" class="group relative rounded-2xl bg-gradient-to-br from-indigo-700 via-blue-700 to-sky-600 text-white p-3.5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-blue-400/40 active:scale-[0.98]">
            <div class="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
            <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/30">
                <i class="bi bi-journal-check text-white text-lg"></i>
            </div>
            <div class="flex items-center justify-between">
                <h3 class="text-xs font-extrabold tracking-tight text-white mb-0.5">NGHIỆP VỤ SỐ</h3>
                <i class="bi bi-chevron-up text-xs text-blue-100 transition-transform duration-300" data-dropdown-arrow></i>
            </div>
            <p class="text-[10px] text-blue-50 font-medium">Chuyên môn • Hoạt động • Hội thảo</p>
        </div>

        <!-- Dropup Menu Nghiệp vụ số -->
        <div id="nghiepvuso-dropdown" data-dropdown-menu class="hidden absolute left-0 w-[280px] sm:w-[320px] max-h-[70vh] overflow-y-auto bottom-[calc(100%+0.5rem)] z-50 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-2.5 space-y-1 transition-all duration-300">
            <a href="#" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                <div class="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0"><i class="bi bi-journal-bookmark text-sm"></i></div>
                <span>📘 Báo cáo chuyên môn</span>
            </a>
            <a href="#" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                <div class="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0"><i class="bi bi-bullseye text-sm"></i></div>
                <span>🎯 Báo cáo hoạt động giáo dục</span>
            </a>

            <!-- Menu Bồi dưỡng chuyên môn -->
            <div class="border-y border-slate-100 dark:border-slate-700/50 my-1 py-1">
                <button type="button" onclick="event.stopPropagation(); document.getElementById('bdcm-sub-items').classList.toggle('hidden'); document.getElementById('bdcm-sub-arrow').classList.toggle('rotate-180');" class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-50 transition-colors">
                    <div class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0"><i class="bi bi-mortarboard text-sm"></i></div>
                        <span>🎓 Bồi dưỡng chuyên môn</span>
                    </div>
                    <i id="bdcm-sub-arrow" class="bi bi-chevron-down text-[10px] text-slate-400 transition-transform duration-300"></i>
                </button>
                <div id="bdcm-sub-items" class="hidden pl-6 pr-1 pt-1 space-y-1">
                    <a href="baocao-tap-huan.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-slate-600 hover:bg-purple-100/50 hover:text-purple-700">1. Tập huấn</a>
                    <a href="HoiThao.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-slate-600 hover:bg-purple-100/50 hover:text-purple-700">2. Hội thảo</a>
                    <a href="baocao-shcm.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-slate-600 hover:bg-purple-100/50 hover:text-purple-700">3. Sinh hoạt CM</a>
                    <a href="baocao-bdtx.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-slate-600 hover:bg-purple-100/50 hover:text-purple-700">4. Bồi dưỡng thường xuyên</a>
                    <a href="baocao-khac.html" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-slate-600 hover:bg-purple-100/50 hover:text-purple-700">5. Khác</a>
                </div>
            </div>

            <a href="#" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                <div class="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0"><i class="bi bi-trophy text-sm"></i></div>
                <span>🏆 Báo cáo các cuộc thi</span>
            </a>
            <a href="#" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                <div class="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0"><i class="bi bi-laptop text-sm"></i></div>
                <span>💻 Báo cáo chuyển đổi số</span>
            </a>
            <a href="#" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                <div class="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0"><i class="bi bi-building text-sm"></i></div>
                <span>🏫 Báo cáo hành chính</span>
            </a>
        </div>
    </div>
     <!-- TRỤ CỘT 3: ĐIỀU HÀNH SỐ (Màu đậm mới + Chuyển sang Card 3) -->
    <div class="relative">
        <div data-dropdown-toggle="dieuhanhso-dropdown" class="group relative rounded-2xl bg-gradient-to-br from-teal-700 via-emerald-700 to-cyan-700 text-white p-3.5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-teal-400/40 active:scale-[0.98]">
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
        console.log("CLICK:", this.dataset.dropdownToggle);

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
