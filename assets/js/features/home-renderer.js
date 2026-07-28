import { $ } from '../core/utils.js';
import { ModalManager } from '../ui/modal.js';
import { ModuleManager } from '../modules/module-manager.js';
import { PWA } from '../services/pwa.js';

export function renderHome() {
    const container = $('#home-view');
    if (!container) return;

    container.innerHTML = `
<!-- HVA Assistant -->
<div class="relative mb-4 overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-indigo-950 via-blue-900 to-slate-900 shadow-2xl p-4 text-white">
    <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none"></div>
    <div class="absolute top-0 right-0 p-4 opacity-10">
        <i class="bi bi-cpu text-8xl"></i>
    </div>
    <div class="relative z-10">
        <div class="flex items-center justify-between mb-2.5">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                    <i class="bi bi-robot text-cyan-300 text-base"></i>
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

        <div class="mb-3 bg-white/10 backdrop-blur-md rounded-2xl p-2.5 border border-white/15 shadow-sm">
            <div class="flex items-center flex-wrap gap-x-1.5">
                <span id="assistantGreeting" class="text-cyan-100 text-[11px] font-medium">👋 Xin chào,</span>
                <span id="assistantName" class="text-white text-xs font-bold leading-tight">...</span>
            </div>
            <div id="assistantPosition" class="text-cyan-200/90 text-[10px] font-medium leading-tight mt-0.5">...</div>
        </div>

        <div id="assistantMessage" class="bg-white/95 backdrop-blur-xl rounded-2xl px-3.5 py-2.5 text-[11px] font-medium text-slate-800 shadow-lg mb-2.5 border border-white/40 flex items-start gap-2">
            <i class="bi bi-chat-quote-fill text-indigo-600 text-xs shrink-0 mt-0.5"></i>
            <span class="leading-relaxed">Xin chào!</span>
        </div>

        <div class="flex items-center bg-white/95 backdrop-blur-xl rounded-2xl px-3 py-1.5 shadow-lg border border-white/50">
            <input type="text" placeholder="Hỏi HVA Assistant điều gì đó..." class="flex-1 bg-transparent outline-none text-[11px] font-medium text-slate-800 placeholder-slate-400">
            <button class="ml-2 w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition shadow-md flex items-center justify-center text-white active:scale-95">
                <i class="bi bi-mic-fill text-xs"></i>
            </button>
        </div>
    </div>
</div>

<!-- HERO DASHBOARD & LIVE STATUS -->
<div class="mb-5 p-4 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 relative overflow-hidden">
    <div class="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="relative z-10 flex flex-col gap-3.5">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
                    <i class="bi bi-shield-shaded text-base"></i>
                </div>
                <div>
                    <div class="text-xs font-black tracking-wider uppercase text-slate-100 flex items-center gap-1.5">
                        THPT HÒA VANG <span class="text-[9px] px-1.5 py-0.2 bg-blue-600/40 text-blue-300 rounded font-bold border border-blue-500/30">NZE</span>
                    </div>
                    <div class="text-[10px] font-medium text-slate-400">Trung tâm Điều hành Số</div>
                </div>
            </div>
            <div class="text-right">
                <div class="text-xs font-bold text-cyan-400 tabular-nums">Thứ Ba, 28/07/2026</div>
                <div class="text-[9px] text-emerald-400 flex items-center justify-end gap-1 mt-0.5 font-medium">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Hệ thống hoạt động bình thường</span>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-4 gap-2 text-center">
            <div class="p-2 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
                <div class="text-[9px] text-slate-400 font-semibold uppercase">Công việc</div>
                <div class="text-sm font-black text-blue-400 mt-0.5 tabular-nums">08</div>
            </div>
            <div class="p-2 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
                <div class="text-[9px] text-slate-400 font-semibold uppercase">Thông báo</div>
                <div class="text-sm font-black text-rose-400 mt-0.5 tabular-nums">03</div>
            </div>
            <div class="p-2 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
                <div class="text-[9px] text-slate-400 font-semibold uppercase">Văn bản</div>
                <div class="text-sm font-black text-amber-400 mt-0.5 tabular-nums">02</div>
            </div>
            <div class="p-2 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
                <div class="text-[9px] text-slate-400 font-semibold uppercase">Quá hạn</div>
                <div class="text-sm font-black text-red-400 mt-0.5 tabular-nums">01</div>
            </div>
        </div>

        <div class="flex items-center justify-between text-[10px] text-slate-400 pt-1 font-medium px-1">
            <span class="flex items-center gap-1"><i class="bi bi-hdd-network text-blue-400"></i> Đồng bộ dữ liệu thành công</span>
            <span class="flex items-center gap-1 tabular-nums"><i class="bi bi-clock-history text-slate-400"></i> Cập nhật lúc 07:43</span>
        </div>
    </div>
</div>

<!-- QUICK ACTIONS (APP STYLE) -->
<div class="grid grid-cols-5 gap-2 mb-5">
    <button data-open-modal="document-modal" class="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 active:scale-95 transition-all group">
        <div class="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-base shadow-inner group-hover:scale-110 transition-transform">
            <i class="bi bi-plus-circle-fill"></i>
        </div>
        <span class="text-[10px] font-bold text-slate-700 text-center leading-tight">Giao việc</span>
    </button>
    <button data-open-modal="team-modal" class="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-orange-200 active:scale-95 transition-all group">
        <div class="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center text-base shadow-inner group-hover:scale-110 transition-transform">
            <i class="bi bi-calendar-check-fill"></i>
        </div>
        <span class="text-[10px] font-bold text-slate-700 text-center leading-tight">Lịch ngày</span>
    </button>
    <button data-open-modal="document-modal" class="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-200 active:scale-95 transition-all group">
        <div class="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-base shadow-inner group-hover:scale-110 transition-transform">
            <i class="bi bi-file-earmark-text-fill"></i>
        </div>
        <span class="text-[10px] font-bold text-slate-700 text-center leading-tight">Văn bản</span>
    </button>
    <button class="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-cyan-200 active:scale-95 transition-all group">
        <div class="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-base shadow-inner group-hover:scale-110 transition-transform">
            <i class="bi bi-robot"></i>
        </div>
        <span class="text-[10px] font-bold text-slate-700 text-center leading-tight">AI Assistant</span>
    </button>
    <button data-open-modal="boiduong-modal" class="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-purple-200 active:scale-95 transition-all group">
        <div class="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-base shadow-inner group-hover:scale-110 transition-transform">
            <i class="bi bi-bar-chart-fill"></i>
        </div>
        <span class="text-[10px] font-bold text-slate-700 text-center leading-tight">Báo cáo</span>
    </button>
</div>

<!-- Welcome Ticker -->
<div class="overflow-hidden rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm py-2.5 px-4 mb-4 flex items-center gap-3">
    <div class="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
        <i class="bi bi-megaphone-fill text-xs"></i>
    </div>
    <div id="welcomeTicker" class="whitespace-nowrap text-xs font-semibold text-slate-700 overflow-hidden text-ellipsis"></div>
</div>

<!-- Install Banner -->
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

<!-- GRID MENU (MODULES VỚI CÁ TÍNH RIÊNG) -->
<section class="grid grid-cols-2 gap-3.5 mb-6">
    <div data-open-modal="document-modal" class="group relative rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-4 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-blue-700/50 active:scale-[0.98]">
        <div class="absolute top-0 right-0 w-24 h-24 bg-blue-400/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-blue-500/30 text-[9px] font-extrabold text-blue-200 border border-blue-400/30 uppercase">TTĐHS</div>
        <div class="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-inner mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/20">
            <i class="bi bi-house-door-fill text-cyan-300 text-xl"></i>
        </div>
        <h3 class="text-xs font-extrabold tracking-tight text-white mb-1">Trang chủ TTĐHS</h3>
        <p class="text-[10px] text-blue-200/80 font-medium">THPT Hòa Vang • Điều hành</p>
    </div>

    <div data-open-modal="digital-modal" class="group relative rounded-3xl bg-gradient-to-br from-cyan-900 via-teal-900 to-slate-900 text-white p-4 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-cyan-700/50 active:scale-[0.98]">
        <div class="absolute top-0 right-0 w-24 h-24 bg-cyan-400/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-cyan-500/30 text-[9px] font-extrabold text-cyan-200 border border-cyan-400/30 uppercase">Digital</div>
        <div class="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-inner mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/20">
            <i class="bi bi-display-fill text-cyan-300 text-xl"></i>
        </div>
        <h3 class="text-xs font-extrabold tracking-tight text-white mb-1">Chuyển đổi số</h3>
        <p class="text-[10px] text-cyan-200/80 font-medium">Học liệu • Phần mềm • AI</p>
    </div>

    <div data-open-modal="boiduong-modal" class="group relative rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 text-white p-4 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-purple-700/50 active:scale-[0.98]">
        <div class="absolute top-0 right-0 w-24 h-24 bg-purple-400/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-purple-500/30 text-[9px] font-extrabold text-purple-200 border border-purple-400/30 uppercase">Online</div>
        <div class="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-inner mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/20">
            <i class="bi bi-clipboard-data-fill text-purple-300 text-xl"></i>
        </div>
        <h3 class="text-xs font-extrabold tracking-tight text-white mb-1">Báo cáo trực tuyến</h3>
        <p class="text-[10px] text-purple-200/80 font-medium">Tập huấn • Hội thảo • CM</p>
    </div>

    <div data-open-modal="team-modal" class="group relative rounded-3xl bg-gradient-to-br from-amber-950 via-orange-950 to-slate-900 text-white p-4 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-orange-700/50 active:scale-[0.98]">
        <div class="absolute top-0 right-0 w-24 h-24 bg-orange-400/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-orange-500/30 text-[9px] font-extrabold text-orange-200 border border-orange-400/30 uppercase">Events</div>
        <div class="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-inner mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/20">
            <i class="bi bi-calendar-event-fill text-orange-300 text-xl"></i>
        </div>
        <h3 class="text-xs font-extrabold tracking-tight text-white mb-1">Hoạt động</h3>
        <p class="text-[10px] text-orange-200/80 font-medium">Lịch tháng • Lịch tuần</p>
    </div>
</section>

<!-- VIỆC CỦA TÔI (DASHBOARD QUẢN LÝ CÔNG VIỆC) -->
<div class="flex flex-col gap-4 p-5 rounded-3xl bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-slate-50/90 backdrop-blur-xl border border-blue-200/80 shadow-xl shadow-blue-500/5 mb-6">
    <div class="flex items-center justify-between">
        <h3 class="text-xs font-black text-slate-900 tracking-wider uppercase flex items-center gap-2">
            <div class="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <i class="bi bi-clipboard-check text-xs"></i>
            </div>
            VIỆC CỦA TÔI HÔM NAY
        </h3>
        <a href="#" class="text-xs font-bold text-blue-600 hover:text-indigo-600 transition-colors flex items-center gap-1">Tất cả <i class="bi bi-chevron-right text-[10px]"></i></a>
    </div>

    <!-- Quick Statistics KPI Bar -->
    <div class="grid grid-cols-4 gap-2">
        <div class="p-2.5 rounded-2xl bg-white border border-rose-100 flex flex-col justify-between shadow-sm text-center">
            <span class="text-[9px] text-slate-500 font-bold uppercase">Chưa tiếp nhận</span>
            <span class="text-sm font-black text-rose-600 mt-1 tabular-nums">03</span>
        </div>
        <div class="p-2.5 rounded-2xl bg-white border border-amber-100 flex flex-col justify-between shadow-sm text-center">
            <span class="text-[9px] text-slate-500 font-bold uppercase">Đang thực hiện</span>
            <span class="text-sm font-black text-amber-600 mt-1 tabular-nums">08</span>
        </div>
        <div class="p-2.5 rounded-2xl bg-white border border-blue-100 flex flex-col justify-between shadow-sm text-center">
            <span class="text-[9px] text-slate-500 font-bold uppercase">Chờ duyệt</span>
            <span class="text-sm font-black text-blue-600 mt-1 tabular-nums">02</span>
        </div>
        <div class="p-2.5 rounded-2xl bg-white border border-red-100 flex flex-col justify-between shadow-sm text-center">
            <span class="text-[9px] text-slate-500 font-bold uppercase">Quá hạn</span>
            <span class="text-sm font-black text-red-600 mt-1 tabular-nums">01</span>
        </div>
    </div>

    <!-- Task Hierarchy Cards -->
    <div class="flex flex-col gap-3">
        <!-- Task 1: High Priority (Larger/Prominent) -->
        <div class="p-4 rounded-2xl bg-white border-2 border-blue-500/30 shadow-md flex flex-col gap-3 group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-2 h-full bg-blue-600"></div>
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                        <i class="bi bi-file-earmark-text text-sm"></i>
                    </div>
                    <div>
                        <div class="flex items-center gap-1.5 mb-0.5">
                            <span class="px-1.5 py-0.2 text-[8px] font-black bg-rose-500 text-white rounded uppercase">Khẩn cấp</span>
                            <span class="text-[10px] text-slate-400 font-bold">Hạn: 24/07/2026</span>
                        </div>
                        <span class="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">Duyệt kế hoạch ôn thi học sinh giỏi cấp tỉnh</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-1.5">
                <div class="flex items-center justify-between text-[10px] font-bold text-slate-600">
                    <span>Tiến độ thực hiện</span>
                    <span class="tabular-nums text-blue-600">75%</span>
                </div>
                <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div class="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" style="width:75%"></div>
                </div>
            </div>
            <div class="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-100 font-medium">
                <span class="text-slate-600 font-bold">Giao bởi: Hiệu trưởng</span>
                <span class="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-bold">Còn 1 ngày</span>
            </div>
        </div>

        <!-- Task 2: Medium Priority -->
        <div class="p-3.5 rounded-2xl bg-white/95 border border-slate-200 shadow-sm flex flex-col gap-2.5">
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                        <i class="bi bi-shield-check text-sm"></i>
                    </div>
                    <div>
                        <span class="text-[9px] font-extrabold text-amber-600 uppercase bg-amber-50 px-1.5 py-0.2 rounded">Trung bình</span>
                        <span class="text-xs font-bold text-slate-900 block mt-0.5 line-clamp-1">Ký quyết định phân công hội đồng coi thi</span>
                    </div>
                </div>
                <span class="px-2 py-0.5 text-[9px] font-bold bg-amber-50 text-amber-700 rounded-full shrink-0">Hôm nay</span>
            </div>
            <div class="flex items-center gap-2 w-full">
                <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-emerald-500 rounded-full" style="width:40%"></div>
                </div>
                <span class="text-[10px] font-bold text-slate-500 tabular-nums">40%</span>
            </div>
        </div>

        <!-- Task 3: Lower Priority -->
        <div class="p-3.5 rounded-2xl bg-white/95 border border-slate-200 shadow-sm flex flex-col gap-2.5">
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                        <i class="bi bi-journal-code text-sm"></i>
                    </div>
                    <div>
                        <span class="text-[9px] font-extrabold text-sky-600 uppercase bg-sky-50 px-1.5 py-0.2 rounded">Thấp</span>
                        <span class="text-xs font-bold text-slate-900 block mt-0.5 line-clamp-1">Rà soát danh mục Sáng kiến năm học</span>
                    </div>
                </div>
                <span class="px-2 py-0.5 text-[9px] font-bold bg-sky-50 text-sky-700 rounded-full shrink-0">Còn 5 ngày</span>
            </div>
            <div class="flex items-center gap-2 w-full">
                <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-indigo-500 rounded-full" style="width:100%"></div>
                </div>
                <span class="text-[10px] font-bold text-slate-500 tabular-nums">100%</span>
            </div>
        </div>
    </div>
</div>

<!-- THÔNG BÁO (NOTIFICATION CENTER) -->
<div class="flex flex-col gap-4 p-5 rounded-3xl bg-gradient-to-br from-rose-50/90 via-pink-50/50 to-slate-50/90 backdrop-blur-xl border border-rose-200/80 shadow-xl shadow-rose-500/5 mb-6">
    <div class="flex items-center justify-between">
        <h3 class="text-xs font-black text-slate-900 tracking-wider uppercase flex items-center gap-2">
            <div class="w-7 h-7 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
                <i class="bi bi-bell-fill text-xs"></i>
            </div>
            TRUNG TÂM THÔNG BÁO BGH
        </h3>
        <a href="#" class="text-xs font-bold text-rose-600 hover:text-pink-600 transition-colors flex items-center gap-1">Tất cả <i class="bi bi-chevron-right text-[10px]"></i></a>
    </div>

    <div class="flex flex-col gap-3">
        <!-- Notification Item 1 -->
        <div class="p-4 rounded-2xl bg-white border border-rose-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col gap-2.5 group relative overflow-hidden" data-notification="tb1">
            <div class="absolute top-0 right-0 w-1.5 h-full bg-rose-600"></div>
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-start gap-2.5 min-w-0">
                    <div class="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                        <i class="bi bi-exclamation-octagon-fill text-sm"></i>
                    </div>
                    <div>
                        <div class="flex items-center gap-1.5 mb-1">
                            <span class="px-1.5 py-0.5 text-[8px] font-black bg-rose-600 text-white rounded uppercase shadow-sm">NEW</span>
                            <span class="px-1.5 py-0.5 text-[9px] font-bold bg-rose-50 text-rose-700 rounded border border-rose-200">Khẩn</span>
                        </div>
                        <span class="text-xs font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-1">Lịch triển khai công tác chuẩn bị cơ sở vật chất năm học mới 2026 - 2027</span>
                    </div>
                </div>
            </div>
            <p class="text-[11px] text-slate-600 line-clamp-1 font-medium pl-10">Yêu cầu các tổ trưởng chuyên môn kiểm kê trang thiết bị phòng học bộ môn...</p>
            <div class="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100 pl-10 font-medium">
                <span class="flex items-center gap-1 tabular-nums"><i class="bi bi-calendar3"></i> 23/07/2026</span>
                <span class="flex items-center gap-1 tabular-nums"><i class="bi bi-clock"></i> 08:30</span>
            </div>
        </div>

        <!-- Notification Item 2 -->
        <div class="p-4 rounded-2xl bg-white border border-amber-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col gap-2.5 group relative overflow-hidden" data-notification="tb2">
            <div class="absolute top-0 right-0 w-1.5 h-full bg-amber-500"></div>
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-start gap-2.5 min-w-0">
                    <div class="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                        <i class="bi bi-exclamation-triangle-fill text-sm"></i>
                    </div>
                    <div>
                        <div class="flex items-center gap-1.5 mb-1">
                            <span class="px-1.5 py-0.5 text-[8px] font-black bg-rose-600 text-white rounded uppercase shadow-sm">NEW</span>
                            <span class="px-1.5 py-0.5 text-[9px] font-bold bg-amber-50 text-amber-700 rounded border border-amber-200">Quan trọng</span>
                        </div>
                        <span class="text-xs font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">V/v tổ chức sơ kết phong trào thi đua dạy tốt - học tốt đợt thi đua thứ tư</span>
                    </div>
                </div>
            </div>
            <p class="text-[11px] text-slate-600 line-clamp-1 font-medium pl-10">Tổng hợp minh chứng thành tích thi đua gửi về văn phòng hội đồng...</p>
            <div class="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100 pl-10 font-medium">
                <span class="flex items-center gap-1 tabular-nums"><i class="bi bi-calendar3"></i> 22/07/2026</span>
                <span class="flex items-center gap-1 tabular-nums"><i class="bi bi-clock"></i> 14:00</span>
            </div>
        </div>

        <!-- Notification Item 3 -->
        <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col gap-2.5 group" data-notification="tb3">
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-start gap-2.5 min-w-0">
                    <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <i class="bi bi-calendar-event-fill text-sm"></i>
                    </div>
                    <div>
                        <div class="flex items-center gap-1.5 mb-1">
                            <span class="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-50 text-emerald-700 rounded border border-emerald-200">Kế hoạch</span>
                        </div>
                        <span class="text-xs font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">Kế hoạch tham gia tập huấn nâng cao năng lực ứng dụng Chuyển đổi số</span>
                    </div>
                </div>
            </div>
            <p class="text-[11px] text-slate-600 line-clamp-1 font-medium pl-10">Danh sách cán bộ giáo viên tham gia lớp tập huấn trực tuyến tại phòng họp...</p>
            <div class="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100 pl-10 font-medium">
                <span class="flex items-center gap-1 tabular-nums"><i class="bi bi-calendar3"></i> 20/07/2026</span>
                <span class="flex items-center gap-1 tabular-nums"><i class="bi bi-clock"></i> 09:15</span>
            </div>
        </div>
    </div>
</div>

<!-- TIN TỨC (APP NEWS CARDS) -->
<div class="flex flex-col gap-4 p-5 rounded-3xl bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-slate-50/90 backdrop-blur-xl border border-emerald-200/80 shadow-xl shadow-emerald-500/5 mb-6">
    <div class="flex items-center justify-between">
        <h3 class="text-xs font-black text-slate-900 tracking-wider uppercase flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                <i class="bi bi-newspaper text-xs"></i>
            </div>
            TIN TỨC GIÁO DỤC & CĐS
        </h3>
        <a href="#" class="text-xs font-bold text-emerald-600 hover:text-teal-600 transition-colors flex items-center gap-1">Tất cả <i class="bi bi-chevron-right text-[10px]"></i></a>
    </div>

    <div class="flex flex-col gap-3">
        <!-- News Card 1 -->
        <a href="#" class="group flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-all">
            <div class="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border border-emerald-100 bg-slate-100 flex items-center justify-center">
                <div class="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-sky-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <i class="bi bi-image text-blue-600 text-xl"></i>
                </div>
            </div>
            <div class="flex flex-col gap-1.5 flex-1 min-w-0">
                <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 text-[9px] font-bold bg-blue-50 text-blue-700 rounded border border-blue-100 uppercase">Bộ GDĐT</span>
                    <span class="text-[10px] text-slate-400 tabular-nums font-medium">23/07/2026</span>
                </div>
                <h4 class="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-relaxed">Đổi mới phương pháp kiểm tra đánh giá theo chương trình giáo dục phổ thông mới</h4>
            </div>
        </a>

        <!-- News Card 2 -->
        <a href="#" class="group flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-all">
            <div class="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border border-emerald-100 bg-slate-100 flex items-center justify-center">
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/15 to-teal-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <i class="bi bi-cpu text-emerald-600 text-xl"></i>
                </div>
            </div>
            <div class="flex flex-col gap-1.5 flex-1 min-w-0">
                <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 text-[9px] font-bold bg-emerald-50 text-emerald-700 rounded border border-emerald-100 uppercase">Sở GDĐT</span>
                    <span class="text-[10px] text-slate-400 tabular-nums font-medium">21/07/2026</span>
                </div>
                <h4 class="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-relaxed">Ứng dụng Trí tuệ nhân tạo trong xây dựng hệ thống quản trị trường học thông minh</h4>
            </div>
        </a>

        <!-- News Card 3 -->
        <a href="#" class="group flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-all">
            <div class="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border border-emerald-100 bg-slate-100 flex items-center justify-center">
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/15 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <i class="bi bi-mortarboard text-indigo-600 text-xl"></i>
                </div>
            </div>
            <div class="flex flex-col gap-1.5 flex-1 min-w-0">
                <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 text-[9px] font-bold bg-indigo-50 text-indigo-700 rounded border border-indigo-100 uppercase">THPT Hòa Vang</span>
                    <span class="text-[10px] text-slate-400 tabular-nums font-medium">19/07/2026</span>
                </div>
                <h4 class="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-relaxed">Trường THPT Hòa Vang đẩy mạnh phong trào tự học và sáng tạo số trong giáo viên</h4>
            </div>
        </a>
    </div>
</div>
`;

    bindHomeEvents();
}

function bindHomeEvents() {
    const btnInstall = document.getElementById('btn-install');
    if (btnInstall) {
        btnInstall.addEventListener('click', () => PWA.handleInstall());
    }

    document.querySelectorAll('[data-open-modal]').forEach(el => {
        el.addEventListener('click', () => {
            const id = el.dataset.openModal;
            if (id) ModalManager.open(id);
        });
    });
}
