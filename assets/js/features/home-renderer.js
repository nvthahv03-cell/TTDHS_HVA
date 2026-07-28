import { $ } from '../core/utils.js';
import { ModalManager } from '../ui/modal.js';
import { ModuleManager } from '../modules/module-manager.js';
import { PWA } from '../services/pwa.js';

export function renderHome() {
    const container = $('#home-view');
    if (!container) return;

    container.innerHTML = `
<!-- HVA Assistant -->
<div class="relative mb-3.5 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-indigo-950 via-blue-900 to-slate-900 shadow-xl p-3.5 text-white">
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
            <input type="text" placeholder="Hỏi HVA Assistant điều gì đó..." class="flex-1 bg-transparent outline-none text-[11px] font-medium text-slate-800 placeholder-slate-400">
            <button class="ml-2 w-6 h-6 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition shadow-sm flex items-center justify-center text-white active:scale-95">
                <i class="bi bi-mic-fill text-[10px]"></i>
            </button>
        </div>
    </div>
</div>

<!-- DASHBOARD ĐIỀU HÀNH -->
<div class="mb-4 p-3.5 rounded-2xl bg-slate-900 text-white shadow-lg border border-slate-800 relative overflow-hidden">
    <div class="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl pointer-events-none"></div>
    <div class="relative z-10 flex flex-col gap-3">
        <div class="flex items-center justify-between pb-2.5 border-b border-slate-800">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
                    <i class="bi bi-shield-shaded text-sm"></i>
                </div>
                <div>
                    <div class="text-xs font-black tracking-wider uppercase text-slate-100 flex items-center gap-1.5">
                        THPT HÒA VANG <span class="text-[9px] px-1.5 py-0.2 bg-blue-600/40 text-blue-300 rounded font-bold border border-blue-500/30">NZE</span>
                    </div>
                    <div class="text-[10px] font-medium text-slate-400">Trung tâm Điều hành Số</div>
                </div>
            </div>
            <div class="text-right">
                <div class="text-[11px] font-bold text-cyan-400 tabular-nums">Thứ Ba, 28/07/2026</div>
                <div class="text-[9px] text-emerald-400 flex items-center justify-end gap-1 mt-0.5 font-medium">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Hệ thống trực tuyến</span>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-4 gap-1.5 text-center">
            <div class="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
                <div class="text-[9px] text-slate-400 font-semibold uppercase">KPI ĐH</div>
                <div class="text-xs font-black text-blue-400 mt-0.5 tabular-nums">94%</div>
            </div>
            <div class="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
                <div class="text-[9px] text-slate-400 font-semibold uppercase">Hệ thống</div>
                <div class="text-xs font-black text-emerald-400 mt-0.5 tabular-nums">Ổn định</div>
            </div>
            <div class="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
                <div class="text-[9px] text-slate-400 font-semibold uppercase">Văn bản</div>
                <div class="text-xs font-black text-amber-400 mt-0.5 tabular-nums">02</div>
            </div>
            <div class="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
                <div class="text-[9px] text-slate-400 font-semibold uppercase">Việc khẩn</div>
                <div class="text-xs font-black text-rose-400 mt-0.5 tabular-nums">01</div>
            </div>
        </div>

        <div class="flex items-center gap-2 text-[10px] text-slate-300 font-medium px-2.5 py-1.5 bg-slate-800/50 rounded-xl border border-slate-700/40">
            <span class="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[9px] font-bold uppercase shrink-0">Việc khẩn</span>
            <span class="truncate">Rà soát tiến độ chuẩn bị cơ sở vật chất năm học mới trước 15:00 hôm nay.</span>
        </div>
    </div>
</div>

<!-- QUICK ACTION (DOCK ĐIỀU HÀNH) -->
<div class="grid grid-cols-5 gap-1.5 mb-4">
    <button data-open-modal="document-modal" class="flex flex-col items-center gap-1 p-2 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 active:scale-95 transition-all group">
        <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm shadow-inner group-hover:scale-110 transition-transform">
            <i class="bi bi-plus-circle-fill"></i>
        </div>
        <span class="text-[9px] font-bold text-slate-700 text-center leading-tight">Giao việc</span>
    </button>
    <button data-open-modal="team-modal" class="flex flex-col items-center gap-1 p-2 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-orange-200 active:scale-95 transition-all group">
        <div class="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-sm shadow-inner group-hover:scale-110 transition-transform">
            <i class="bi bi-calendar-check-fill"></i>
        </div>
        <span class="text-[9px] font-bold text-slate-700 text-center leading-tight">Lịch hôm nay</span>
    </button>
    <button data-open-modal="document-modal" class="flex flex-col items-center gap-1 p-2 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-200 active:scale-95 transition-all group">
        <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-sm shadow-inner group-hover:scale-110 transition-transform">
            <i class="bi bi-file-earmark-text-fill"></i>
        </div>
        <span class="text-[9px] font-bold text-slate-700 text-center leading-tight">Văn bản</span>
    </button>
    <button data-open-modal="digital-modal" class="flex flex-col items-center gap-1 p-2 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-cyan-200 active:scale-95 transition-all group">
        <div class="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-sm shadow-inner group-hover:scale-110 transition-transform">
            <i class="bi bi-display-fill"></i>
        </div>
        <span class="text-[9px] font-bold text-slate-700 text-center leading-tight">Điều hành</span>
    </button>
    <button data-open-modal="boiduong-modal" class="flex flex-col items-center gap-1 p-2 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-purple-200 active:scale-95 transition-all group">
        <div class="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-sm shadow-inner group-hover:scale-110 transition-transform">
            <i class="bi bi-clipboard-check-fill"></i>
        </div>
        <span class="text-[9px] font-bold text-slate-700 text-center leading-tight">Nhiệm vụ</span>
    </button>
</div>

<!-- Install Banner -->
<section id="install-banner" class="mb-4 hidden">
    <div class="p-3.5 rounded-2xl bg-gradient-to-r from-brand-teal/20 to-indigo-600/25 border border-brand-glow/30 backdrop-blur-md flex items-center justify-between">
        <div class="flex items-center space-x-3">
            <div class="w-9 h-9 rounded-xl bg-brand-glow/10 flex items-center justify-center text-brand-glow">
                <i class="bi bi-phone-vibrate text-lg animate-bounce"></i>
            </div>
            <div>
                <h4 class="text-xs font-bold text-white uppercase tracking-wider">Cài đặt Ứng dụng</h4>
                <p class="text-[10px] text-teal-200/80 mt-0.5">Thêm nhanh vào màn hình chính</p>
            </div>
        </div>
        <button id="btn-install" class="px-3 py-1 bg-brand-glow hover:bg-teal-400 text-brand-deep font-bold text-xs rounded-xl shadow-md active:scale-95 transition-all">Cài đặt</button>
    </div>
</section>

<!-- 04 TRỤ CỘT CHÍNH -->
<section class="grid grid-cols-2 gap-3 mb-2">
    <div data-open-modal="digital-modal" class="group relative rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white p-3.5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-blue-400/40 active:scale-[0.98]">
        <div class="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="absolute top-2.5 right-2.5 px-1.5 py-0.2 rounded-full bg-white/20 text-[8px] font-extrabold text-white border border-white/30 uppercase">Trụ cột 1</div>
        <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/30">
            <i class="bi bi-globe text-white text-lg"></i>
        </div>
        <h3 class="text-xs font-extrabold tracking-tight text-white mb-0.5">CỔNG THÔNG TIN</h3>
        <p class="text-[10px] text-blue-50 font-medium">Website • Thông báo • Tuyển sinh • Danh bạ</p>
    </div>

    <div data-open-modal="digital-modal" class="group relative rounded-2xl bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 text-white p-3.5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-teal-400/40 active:scale-[0.98]">
        <div class="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="absolute top-2.5 right-2.5 px-1.5 py-0.2 rounded-full bg-white/20 text-[8px] font-extrabold text-white border border-white/30 uppercase">Trụ cột 2</div>
        <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/30">
            <i class="bi bi-cpu text-white text-lg"></i>
        </div>
        <h3 class="text-xs font-extrabold tracking-tight text-white mb-0.5">ĐIỀU HÀNH SỐ</h3>
        <p class="text-[10px] text-teal-50 font-medium">Dashboard • Giao việc • Văn bản • AI</p>
    </div>

    <div data-open-modal="boiduong-modal" class="group relative rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-500 text-white p-3.5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-purple-400/40 active:scale-[0.98]">
        <div class="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="absolute top-2.5 right-2.5 px-1.5 py-0.2 rounded-full bg-white/20 text-[8px] font-extrabold text-white border border-white/30 uppercase">Trụ cột 3</div>
        <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/30">
            <i class="bi bi-journal-check text-white text-lg"></i>
        </div>
        <h3 class="text-xs font-extrabold tracking-tight text-white mb-0.5">CHUYÊN MÔN SỐ</h3>
        <p class="text-[10px] text-purple-50 font-medium">Báo cáo • Tập huấn • Hội thảo • Khảo sát</p>
    </div>

    <div data-open-modal="boiduong-modal" class="group relative rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white p-3.5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-amber-400/40 active:scale-[0.98]">
        <div class="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="absolute top-2.5 right-2.5 px-1.5 py-0.2 rounded-full bg-white/20 text-[8px] font-extrabold text-white border border-white/30 uppercase">Trụ cột 4</div>
        <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/30">
            <i class="bi bi-graph-up-arrow text-white text-lg"></i>
        </div>
        <h3 class="text-xs font-extrabold tracking-tight text-white mb-0.5">QUẢN TRỊ</h3>
        <p class="text-[10px] text-amber-50 font-medium">Kế hoạch • Thi đua • Kiểm tra • KPI</p>
    </div>
</section>
`;
}
