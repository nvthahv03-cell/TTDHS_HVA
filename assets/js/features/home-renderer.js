import { $ } from '../core/utils.js';
import { ModalManager } from '../ui/modal.js';
import { ModuleManager } from '../modules/module-manager.js';
import { PWA } from '../services/pwa.js';

export function renderHome() {
    const container = $('#home-view');
    if (!container) return;

    container.innerHTML = `
<!-- HVA Assistant -->
<div class="relative mb-5 overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-700 shadow-2xl p-5 text-white">
    <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none"></div>
    <div class="absolute top-0 right-0 p-4 opacity-10">
        <i class="bi bi-cpu text-8xl"></i>
    </div>
    <div class="relative z-10">
        <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                    <i class="bi bi-robot text-cyan-300 text-lg"></i>
                </div>
                <div>
                    <h2 class="text-base font-extrabold tracking-tight leading-tight flex items-center gap-1.5">
                        HVA Assistant 
                        <span class="px-2 py-0.5 rounded-full bg-cyan-400/30 text-[10px] font-bold text-cyan-100 border border-cyan-300/30">AI Pro</span>
                    </h2>
                    <p class="text-[11px] text-cyan-200/80">Trợ lý điều hành thông minh</p>
                </div>
            </div>
        </div>

        <div class="mb-3.5 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 shadow-sm">
            <div class="flex items-center flex-wrap gap-x-2">
                <span id="assistantGreeting" class="text-cyan-100 text-xs font-medium">👋 Xin chào,</span>
                <span id="assistantName" class="text-white text-base font-bold leading-tight">...</span>
            </div>
            <div id="assistantPosition" class="text-cyan-200/90 text-xs font-medium leading-tight mt-0.5">...</div>
        </div>

        <div id="assistantMessage" class="bg-white/95 backdrop-blur-xl rounded-2xl px-4 py-3 text-xs font-medium text-slate-800 shadow-lg mb-3 border border-white/40 flex items-start gap-2.5">
            <i class="bi bi-chat-quote-fill text-indigo-600 text-sm shrink-0 mt-0.5"></i>
            <span class="leading-relaxed">Xin chào!</span>
        </div>

        <div class="flex items-center bg-white/95 backdrop-blur-xl rounded-2xl px-3.5 py-2 shadow-lg border border-white/50">
            <input type="text" placeholder="Hỏi HVA Assistant điều gì đó..." class="flex-1 bg-transparent outline-none text-xs font-medium text-slate-800 placeholder-slate-400">
            <button class="ml-2 w-8 h-8 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition shadow-md flex items-center justify-center text-white active:scale-95">
                <i class="bi bi-mic-fill text-sm"></i>
            </button>
        </div>
    </div>
</div>

<!-- Welcome Ticker -->
<div class="overflow-hidden rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm py-2.5 px-4 mb-4 flex items-center gap-3">
    <div class="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
        <i class="bi bi-megaphone-fill text-xs"></i>
    </div>
    <div id="welcomeTicker" class="whitespace-nowrap text-xs font-semibold text-slate-700 overflow-hidden text-ellipsis"></div>
</div>

<!-- Install Banner (Ẩn mặc định hoặc thay thế bằng logic popup nổi theo yêu cầu) -->
<section id="install-banner" class="mb-4 hidden">
    <div class="p-4 rounded-2xl bg-gradient-to-r from-brand-teal/20 to-indigo-600/25 border border-brand-glow/30 backdrop-blur-md flex items-center justify-between">
        <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-brand-glow/10 flex items-center justify-center text-brand-glow">
                <i class="bi bi-phone-vibrate text-xl animate-bounce"></i>
            </div>
            <div>
                <h4 class="text-xs font-bold text-white uppercase tracking-wider">Cài đặt Ứng dụng</h4>
                <p class="text-[11px] text-teal-200/80 mt-0.5">Thêm nhanh vào màn hình chính</p>
            </div>
        </div>
        <button id="btn-install" class="px-3.5 py-1.5 bg-brand-glow hover:bg-teal-400 text-brand-deep font-bold text-xs rounded-xl shadow-lg active:scale-95 transition-all">Cài đặt ngay</button>
    </div>
</section>

<!-- Phương châm -->
<section class="mb-4">
    <div class="p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-indigo-500/10 border border-blue-500/20 backdrop-blur-md shadow-sm">
        <p class="text-xs font-bold text-center tracking-wider uppercase bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-700 bg-clip-text text-transparent">Kết nối – Điều hành – Hiệu quả</p>
    </div>
</section>

<!-- Grid Cards -->
<section class="grid grid-cols-2 gap-3.5 mb-6">
    <div data-open-modal="document-modal" class="group relative rounded-3xl bg-gradient-to-br from-blue-500/5 via-blue-50 to-cyan-50/60 hover:from-blue-500/10 hover:to-cyan-100 active:scale-[0.98] border border-blue-200/60 hover:border-blue-400 p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden">
        <div class="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-blue-500/10 blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25 mb-3 group-hover:scale-110 transition-transform duration-300">
            <i class="bi bi-house-door-fill text-white text-xl"></i>
        </div>
        <h3 class="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors tracking-tight">Trang chủ TTĐHS</h3>
        <p class="text-[10px] font-medium text-slate-500 mt-0.5 line-clamp-1">THPT Hòa Vang</p>
    </div>

    <div data-open-modal="digital-modal" class="group relative rounded-3xl bg-gradient-to-br from-cyan-500/5 via-cyan-50 to-sky-50/60 hover:from-cyan-500/10 hover:to-sky-100 active:scale-[0.98] border border-cyan-200/60 hover:border-cyan-400 p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden">
        <div class="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-cyan-500/10 blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 to-sky-500 flex items-center justify-center shadow-lg shadow-cyan-500/25 mb-3 group-hover:scale-110 transition-transform duration-300">
            <i class="bi bi-display-fill text-white text-xl"></i>
        </div>
        <h3 class="text-xs font-bold text-slate-900 group-hover:text-cyan-700 transition-colors tracking-tight">Chuyển đổi số</h3>
        <p class="text-[10px] font-medium text-slate-500 mt-0.5 line-clamp-1">Điều hành số • Học liệu • Phần mềm</p>
    </div>

    <div data-open-modal="boiduong-modal" class="group relative rounded-3xl bg-gradient-to-br from-purple-500/5 via-purple-50 to-indigo-50/60 hover:from-purple-500/10 hover:to-indigo-100 active:scale-[0.98] border border-purple-200/60 hover:border-purple-400 p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden">
        <div class="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-purple-500/10 blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/25 mb-3 group-hover:scale-110 transition-transform duration-300">
            <i class="bi bi-clipboard-data-fill text-white text-xl"></i>
        </div>
        <h3 class="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors tracking-tight">Báo cáo trực tuyến</h3>
        <p class="text-[10px] font-medium text-slate-500 mt-0.5 line-clamp-1">Tập huấn • Hội thảo • Sinh hoạt CM</p>
    </div>

    <div data-open-modal="team-modal" class="group relative rounded-3xl bg-gradient-to-br from-orange-500/5 via-orange-50 to-amber-50/60 hover:from-orange-500/10 hover:to-amber-100 active:scale-[0.98] border border-orange-200/60 hover:border-orange-400 p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden">
        <div class="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-orange-500/10 blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25 mb-3 group-hover:scale-110 transition-transform duration-300">
            <i class="bi bi-calendar-event-fill text-white text-xl"></i>
        </div>
        <h3 class="text-xs font-bold text-slate-900 group-hover:text-orange-700 transition-colors tracking-tight">Hoạt động</h3>
        <p class="text-[10px] font-medium text-slate-500 mt-0.5 line-clamp-1">Lịch tháng • Lịch tuần • Đột xuất</p>
    </div>
</section>
`;

    // ===== VIỆC CỦA TÔI HÔM NAY =====
    container.innerHTML += `
<div class="flex flex-col gap-5 p-5 rounded-3xl bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-slate-50/80 backdrop-blur-xl border border-blue-200/60 shadow-lg shadow-blue-500/5 mb-6">
    <div class="flex items-center justify-between">
        <h3 class="text-xs font-black text-slate-900 tracking-wider uppercase flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <i class="bi bi-clipboard-check text-xs"></i>
            </div>
            VIỆC CỦA TÔI HÔM NAY
        </h3>
        <a href="#" class="text-xs font-bold text-blue-600 hover:text-indigo-600 transition-colors flex items-center gap-1">Xem tất cả <i class="bi bi-chevron-right text-[10px]"></i></a>
    </div>

    <div class="grid grid-cols-4 gap-2">
        <div class="p-2.5 rounded-2xl bg-white/90 border border-rose-100 flex flex-col justify-between shadow-sm hover:shadow transition-all text-center">
            <span class="text-[10px] text-slate-500 font-semibold uppercase">Chưa tiếp nhận</span>
            <span class="text-base font-extrabold text-rose-600 mt-1 tabular-nums">03</span>
        </div>
        <div class="p-2.5 rounded-2xl bg-white/90 border border-amber-100 flex flex-col justify-between shadow-sm hover:shadow transition-all text-center">
            <span class="text-[10px] text-slate-500 font-semibold uppercase">Đang thực hiện</span>
            <span class="text-base font-extrabold text-amber-600 mt-1 tabular-nums">08</span>
        </div>
        <div class="p-2.5 rounded-2xl bg-white/90 border border-blue-100 flex flex-col justify-between shadow-sm hover:shadow transition-all text-center">
            <span class="text-[10px] text-slate-500 font-semibold uppercase">Chờ duyệt</span>
            <span class="text-base font-extrabold text-blue-600 mt-1 tabular-nums">02</span>
        </div>
        <div class="p-2.5 rounded-2xl bg-white/90 border border-red-100 flex flex-col justify-between shadow-sm hover:shadow transition-all text-center">
            <span class="text-[10px] text-slate-500 font-semibold uppercase">Quá hạn</span>
            <span class="text-base font-extrabold text-red-600 mt-1 tabular-nums">01</span>
        </div>
    </div>

    <div class="flex flex-col gap-3">
        <!-- Công việc 1 -->
        <div class="p-3.5 rounded-2xl bg-white/95 border border-blue-100/80 shadow-sm hover:shadow-md transition-all flex flex-col gap-2.5 group">
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                        <i class="bi bi-file-earmark-text text-sm"></i>
                    </div>
                    <span class="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">Duyệt kế hoạch ôn thi học sinh giỏi cấp tỉnh</span>
                </div>
                <div class="flex items-center gap-1 shrink-0">
                    <span class="px-2 py-0.5 text-[9px] font-extrabold bg-rose-500/10 text-rose-600 rounded-md border border-rose-500/20 uppercase">Cao</span>
                    <span class="px-2 py-0.5 text-[9px] font-bold bg-rose-50 text-rose-600 rounded-full">Còn 1 ngày</span>
                </div>
            </div>
            <div class="flex items-center gap-2.5 w-full pl-10">
                <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div class="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" style="width:75%"></div>
                </div>
                <span class="text-[10px] font-extrabold text-slate-600 tabular-nums">75%</span>
            </div>
            <div class="flex items-center justify-between text-[11px] text-slate-500 pl-10 pt-2 border-t border-slate-100 font-medium">
                <span class="text-slate-600">Giao: Hiệu trưởng</span>
                <span class="tabular-nums text-slate-500">Hạn: 24/07/2026</span>
            </div>
        </div>

        <!-- Công việc 2 -->
        <div class="p-3.5 rounded-2xl bg-white/95 border border-blue-100/80 shadow-sm hover:shadow-md transition-all flex flex-col gap-2.5 group">
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                        <i class="bi bi-shield-check text-sm"></i>
                    </div>
                    <span class="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">Ký quyết định phân công hội đồng coi thi</span>
                </div>
                <div class="flex items-center gap-1 shrink-0">
                    <span class="px-2 py-0.5 text-[9px] font-extrabold bg-amber-500/10 text-amber-600 rounded-md border border-amber-500/20 uppercase">Trung bình</span>
                    <span class="px-2 py-0.5 text-[9px] font-bold bg-amber-50 text-amber-600 rounded-full">Hôm nay</span>
                </div>
            </div>
            <div class="flex items-center gap-2.5 w-full pl-10">
                <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div class="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" style="width:40%"></div>
                </div>
                <span class="text-[10px] font-extrabold text-slate-600 tabular-nums">40%</span>
            </div>
            <div class="flex items-center justify-between text-[11px] text-slate-500 pl-10 pt-2 border-t border-slate-100 font-medium">
                <span class="text-slate-600">Giao: Văn thư</span>
                <span class="tabular-nums text-slate-500">Hạn: 23/07/2026</span>
            </div>
        </div>

        <!-- Công việc 3 -->
        <div class="p-3.5 rounded-2xl bg-white/95 border border-blue-100/80 shadow-sm hover:shadow-md transition-all flex flex-col gap-2.5 group">
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                        <i class="bi bi-journal-code text-sm"></i>
                    </div>
                    <span class="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">Rà soát danh mục Sáng kiến năm học</span>
                </div>
                <div class="flex items-center gap-1 shrink-0">
                    <span class="px-2 py-0.5 text-[9px] font-extrabold bg-sky-500/10 text-sky-600 rounded-md border border-sky-500/20 uppercase">Thấp</span>
                    <span class="px-2 py-0.5 text-[9px] font-bold bg-sky-50 text-sky-600 rounded-full">Còn 5 ngày</span>
                </div>
            </div>
            <div class="flex items-center gap-2.5 w-full pl-10">
                <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" style="width:100%"></div>
                </div>
                <span class="text-[10px] font-extrabold text-slate-600 tabular-nums">100%</span>
            </div>
            <div class="flex items-center justify-between text-[11px] text-slate-500 pl-10 pt-2 border-t border-slate-100 font-medium">
                <span class="text-slate-600">Giao: Tổ CM Toán</span>
                <span class="tabular-nums text-slate-500">Hạn: 28/07/2026</span>
            </div>
        </div>
    </div>
</div>

<!-- THÔNG BÁO BGH -->
<div class="flex flex-col gap-5 p-5 rounded-3xl bg-gradient-to-br from-rose-50/80 via-pink-50/40 to-slate-50/80 backdrop-blur-xl border border-rose-200/60 shadow-lg shadow-rose-500/5 mb-6">
    <div class="flex items-center justify-between">
        <h3 class="text-xs font-black text-slate-900 tracking-wider uppercase flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
                <i class="bi bi-megaphone text-xs"></i>
            </div>
            THÔNG BÁO BGH
        </h3>
        <a href="#" class="text-xs font-bold text-rose-600 hover:text-pink-600 transition-colors flex items-center gap-1">Xem tất cả <i class="bi bi-chevron-right text-[10px]"></i></a>
    </div>
    <div class="flex flex-col gap-3">
        <!-- TB 1 -->
        <div class="p-4 rounded-2xl bg-white/95 border border-rose-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col gap-2 group" data-notification="tb1">
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-start gap-2.5 min-w-0">
                    <div class="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100 mt-0.5">
                        <i class="bi bi-exclamation-octagon text-sm"></i>
                    </div>
                    <div class="flex flex-col gap-1 min-w-0">
                        <span class="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-1">Lịch triển khai công tác chuẩn bị cơ sở vật chất năm học mới 2026 - 2027</span>
                        <p class="text-[11px] text-slate-500 line-clamp-1 font-medium">Yêu cầu các tổ trưởng chuyên môn kiểm kê trang thiết bị phòng học bộ môn...</p>
                    </div>
                </div>
                <div class="flex flex-col items-end gap-1 shrink-0">
                    <span class="px-2 py-0.5 text-[9px] font-black bg-rose-600 text-white rounded-full shadow-sm animate-pulse uppercase">NEW</span>
                    <span class="px-2 py-0.5 text-[9px] font-bold bg-rose-50 text-rose-600 rounded border border-rose-100">Khẩn</span>
                </div>
            </div>
            <div class="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 pl-10 font-medium">
                <span class="flex items-center gap-1 tabular-nums"><i class="bi bi-calendar3"></i> 23/07/2026</span>
                <span class="flex items-center gap-1 tabular-nums"><i class="bi bi-clock"></i> 08:30</span>
            </div>
        </div>

        <!-- TB 2 -->
        <div class="p-4 rounded-2xl bg-white/95 border border-rose-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col gap-2 group" data-notification="tb2">
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-start gap-2.5 min-w-0">
                    <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 mt-0.5">
                        <i class="bi bi-exclamation-triangle text-sm"></i>
                    </div>
                    <div class="flex flex-col gap-1 min-w-0">
                        <span class="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">V/v tổ chức sơ kết phong trào thi đua dạy tốt - học tốt đợt thi đua thứ tư</span>
                        <p class="text-[11px] text-slate-500 line-clamp-1 font-medium">Tổng hợp minh chứng thành tích thi đua gửi về văn phòng hội đồng...</p>
                    </div>
                </div>
                <div class="flex flex-col items-end gap-1 shrink-0">
                    <span class="px-2 py-0.5 text-[9px] font-black bg-rose-600 text-white rounded-full shadow-sm animate-pulse uppercase">NEW</span>
                    <span class="px-2 py-0.5 text-[9px] font-bold bg-amber-50 text-amber-600 rounded border border-amber-100">Quan trọng</span>
                </div>
            </div>
            <div class="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 pl-10 font-medium">
                <span class="flex items-center gap-1 tabular-nums"><i class="bi bi-calendar3"></i> 22/07/2026</span>
                <span class="flex items-center gap-1 tabular-nums"><i class="bi bi-clock"></i> 14:00</span>
            </div>
        </div>

        <!-- TB 3 -->
        <div class="p-4 rounded-2xl bg-white/95 border border-rose-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col gap-2 group" data-notification="tb3">
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-start gap-2.5 min-w-0">
                    <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 mt-0.5">
                        <i class="bi bi-calendar-event text-sm"></i>
                    </div>
                    <div class="flex flex-col gap-1 min-w-0">
                        <span class="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">Kế hoạch tham gia tập huấn nâng cao năng lực ứng dụng Chuyển đổi số trong quản lý</span>
                        <p class="text-[11px] text-slate-500 line-clamp-1 font-medium">Danh sách cán bộ giáo viên tham gia lớp tập huấn trực tuyến tại phòng họp...</p>
                    </div>
                </div>
                <div class="flex flex-col items-end gap-1 shrink-0">
                    <span class="px-2 py-0.5 text-[9px] font-bold bg-emerald-50 text-emerald-600 rounded border border-emerald-100 uppercase">Kế hoạch</span>
                </div>
            </div>
            <div class="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 pl-10 font-medium">
                <span class="flex items-center gap-1 tabular-nums"><i class="bi bi-calendar3"></i> 20/07/2026</span>
                <span class="flex items-center gap-1 tabular-nums"><i class="bi bi-clock"></i> 09:15</span>
            </div>
        </div>
    </div>
</div>

<!-- TIN TỨC GIÁO DỤC & CĐS -->
<div class="flex flex-col gap-5 p-5 rounded-3xl bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-slate-50/80 backdrop-blur-xl border border-emerald-200/60 shadow-lg shadow-emerald-500/5 mb-6">
    <div class="flex items-center justify-between">
        <h3 class="text-xs font-black text-slate-900 tracking-wider uppercase flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                <i class="bi bi-newspaper text-xs"></i>
            </div>
            TIN TỨC GIÁO DỤC & CĐS
        </h3>
        <a href="#" class="text-xs font-bold text-emerald-600 hover:text-teal-600 transition-colors flex items-center gap-1">Xem tất cả <i class="bi bi-chevron-right text-[10px]"></i></a>
    </div>
    <div class="flex flex-col gap-3">
        <a href="#" class="group flex items-center gap-3.5 p-3 rounded-2xl bg-white/95 border border-emerald-100 shadow-sm hover:shadow-md transition-all">
            <div class="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border border-emerald-100 bg-slate-100 flex items-center justify-center">
                <div class="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-sky-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <i class="bi bi-image text-blue-600 text-lg"></i>
                </div>
            </div>
            <div class="flex flex-col gap-1 flex-1 min-w-0">
                <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 text-[9px] font-bold bg-blue-50 text-blue-600 rounded border border-blue-100 uppercase">Bộ GDĐT</span>
                    <span class="text-[10px] text-slate-400 tabular-nums font-medium">23/07/2026</span>
                </div>
                <h4 class="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-relaxed">Đổi mới phương pháp kiểm tra đánh giá theo chương trình giáo dục phổ thông mới</h4>
            </div>
        </a>
        <a href="#" class="group flex items-center gap-3.5 p-3 rounded-2xl bg-white/95 border border-emerald-100 shadow-sm hover:shadow-md transition-all">
            <div class="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border border-emerald-100 bg-slate-100 flex items-center justify-center">
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/15 to-teal-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <i class="bi bi-cpu text-emerald-600 text-lg"></i>
                </div>
            </div>
            <div class="flex flex-col gap-1 flex-1 min-w-0">
                <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 text-[9px] font-bold bg-emerald-50 text-emerald-600 rounded border border-emerald-100 uppercase">Sở GDĐT</span>
                    <span class="text-[10px] text-slate-400 tabular-nums font-medium">21/07/2026</span>
                </div>
                <h4 class="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-relaxed">Ứng dụng Trí tuệ nhân tạo trong xây dựng hệ thống quản trị trường học thông minh</h4>
            </div>
        </a>
        <a href="#" class="group flex items-center gap-3.5 p-3 rounded-2xl bg-white/95 border border-emerald-100 shadow-sm hover:shadow-md transition-all">
            <div class="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border border-emerald-100 bg-slate-100 flex items-center justify-center">
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/15 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <i class="bi bi-mortarboard text-indigo-600 text-lg"></i>
                </div>
            </div>
            <div class="flex flex-col gap-1 flex-1 min-w-0">
                <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 text-[9px] font-bold bg-indigo-50 text-indigo-600 rounded border border-indigo-100 uppercase">THPT Hòa Vang</span>
                    <span class="text-[10px] text-slate-400 tabular-nums font-medium">19/07/2026</span>
                </div>
                <h4 class="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-relaxed">Trường THPT Hòa Vang đẩy mạnh phong trào tự học và sáng tạo số trong giáo viên</h4>
            </div>
        </a>
    </div>
</div>
`;

    // Popup Cài đặt ứng dụng (PWA) & Popup Chúc mừng sinh nhật (Hệ thống thiết kế sẵn)
    renderPWAPopups();
    renderBirthdayModal();

    // Bind events sau khi render
    bindHomeEvents();
}

function renderPWAPopups() {
    if (document.getElementById('pwa-custom-popup')) return;

    const popupHtml = `
    <div id="pwa-custom-popup" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 hidden animate-fade-in">
        <div class="w-full max-w-xs bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-6 text-center">
            <div id="pwa-android-content" class="hidden">
                <div class="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl mx-auto flex items-center justify-center text-2xl mb-4 shadow-inner">
                    📱
                </div>
                <h3 class="text-base font-bold text-slate-900 mb-1">Cài đặt ứng dụng TTĐHS_HVA</h3>
                <p class="text-xs text-slate-500 mb-6">Thêm ứng dụng vào màn hình chính để truy cập nhanh chóng và tiện lợi hơn.</p>
                <div class="flex gap-2.5">
                    <button id="pwa-dismiss-btn" class="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition">Để sau</button>
                    <button id="pwa-confirm-btn" class="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition">Cài đặt ngay</button>
                </div>
            </div>

            <div id="pwa-ios-content" class="hidden text-left">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="text-sm font-bold text-slate-900">Cài đặt trên iPhone/iPad</h3>
                    <button id="pwa-ios-close" class="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 text-xs font-bold">✕</button>
                </div>
                <p class="text-xs text-slate-500 mb-4">Thực hiện các bước sau để thêm vào Màn hình chính:</p>
                <div class="space-y-2.5 mb-5 text-xs text-slate-700 font-medium">
                    <div class="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span class="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                        <span>Nhấn nút <b>Chia sẻ</b> (Share) ở thanh công cụ trình duyệt.</span>
                    </div>
                    <div class="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span class="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                        <span>Chọn <b>Add to Home Screen</b> (Thêm vào MH chính).</span>
                    </div>
                    <div class="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span class="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                        <span>Nhấn <b>Thêm</b> (Add) ở góc trên bên phải.</span>
                    </div>
                </div>
                <button id="pwa-ios-got-it" class="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-500/25">Đã hiểu</button>
            </div>

            <div id="pwa-success-content" class="hidden">
                <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl mx-auto flex items-center justify-center text-2xl mb-4 shadow-inner">
                    🎉
                </div>
                <h3 class="text-base font-bold text-slate-900 mb-1">Chúc mừng!</h3>
                <p class="text-xs text-slate-600 mb-6 leading-relaxed">Ứng dụng đã được cài đặt thành công.<br>Vui lòng đóng trình duyệt và mở ứng dụng từ biểu tượng HVA trên Màn hình chính để có trải nghiệm tốt nhất.</p>
                <button id="pwa-success-close" class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 transition">Đóng</button>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', popupHtml);

    // Logic hiển thị popup chỉ 1 lần nếu chưa tương tác
    if (!localStorage.getItem('hva_pwa_popup_shown')) {
        setTimeout(() => {
            const popup = document.getElementById('pwa-custom-popup');
            if (popup) {
                popup.classList.remove('hidden');
                const isIos = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
                if (isIos) {
                    document.getElementById('pwa-ios-content').classList.remove('hidden');
                } else {
                    document.getElementById('pwa-android-content').classList.remove('hidden');
                }
            }
        }, 1500);
    }

    document.getElementById('pwa-dismiss-btn')?.addEventListener('click', () => {
        document.getElementById('pwa-custom-popup').classList.add('hidden');
        localStorage.setItem('hva_pwa_popup_shown', 'true');
    });
    document.getElementById('pwa-confirm-btn')?.addEventListener('click', () => {
        document.getElementById('pwa-android-content').classList.add('hidden');
        document.getElementById('pwa-success-content').classList.remove('hidden');
        localStorage.setItem('hva_pwa_popup_shown', 'true');
        PWA.handleInstall();
    });
    document.getElementById('pwa-ios-close')?.addEventListener('click', () => {
        document.getElementById('pwa-custom-popup').classList.add('hidden');
        localStorage.setItem('hva_pwa_popup_shown', 'true');
    });
    document.getElementById('pwa-ios-got-it')?.addEventListener('click', () => {
        document.getElementById('pwa-custom-popup').classList.add('hidden');
        localStorage.setItem('hva_pwa_popup_shown', 'true');
    });
    document.getElementById('pwa-success-close')?.addEventListener('click', () => {
        document.getElementById('pwa-custom-popup').classList.add('hidden');
    });
}

function renderBirthdayModal() {
    if (document.getElementById('birthday-modal')) return;

    const modalHtml = `
    <div id="birthday-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 hidden animate-fade-in">
        <div class="w-full max-w-xs bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl shadow-2xl overflow-hidden border border-amber-200/60 p-6 text-center relative">
            <div class="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>
            <div class="w-16 h-16 bg-gradient-to-tr from-amber-500 to-orange-500 text-white rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 shadow-lg shadow-orange-500/30">
                🎂
            </div>
            <h3 class="text-lg font-black text-slate-900 mb-1">Chúc mừng sinh nhật</h3>
            <div id="birthday-greeting-name" class="text-sm font-bold text-amber-700 mb-3">Thầy...</div>
            <p id="birthday-greeting-msg" class="text-xs text-slate-600 mb-6 leading-relaxed">Kính chúc Thầy/Cô luôn dồi dào sức khỏe, hạnh phúc và gặt hái được nhiều thành công rực rỡ trong sự nghiệp trồng người!</p>
            <button id="birthday-thanks-btn" class="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold shadow-lg shadow-orange-500/25 transition">Cảm ơn</button>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('birthday-thanks-btn')?.addEventListener('click', () => {
        document.getElementById('birthday-modal').classList.add('hidden');
    });

    // Hàm kiểm tra sinh nhật giả lập hoặc kích hoạt sẵn sàng khi có dữ liệu ngày sinh
    window.checkBirthdayTrigger = (userData) => {
        if (!userData || !userData.dob) return;
        const today = new Date();
        const dob = new Date(userData.dob);
        if (today.getDate() === dob.getDate() && today.getMonth() === dob.getMonth()) {
            let prefix = 'Thầy';
            if (userData.role === 'teacher') prefix = userData.gender === 'female' ? 'Cô' : 'Thầy';
            else if (userData.role === 'staff') prefix = userData.gender === 'female' ? 'Chị' : 'Anh';
            
            const nameEl = document.getElementById('birthday-greeting-name');
            if (nameEl) nameEl.innerText = `${prefix} ${userData.name || ''}`;
            
            document.getElementById('birthday-modal').classList.remove('hidden');
        }
    };
}

function bindHomeEvents() {
    // Install button
    const btnInstall = document.getElementById('btn-install');
    if (btnInstall) {
        btnInstall.addEventListener('click', () => PWA.handleInstall());
    }

    // Open modal từ data-attribute
    document.querySelectorAll('[data-open-modal]').forEach(el => {
        el.addEventListener('click', () => {
            const id = el.dataset.openModal;
            if (id) ModalManager.open(id);
        });
    });
}
