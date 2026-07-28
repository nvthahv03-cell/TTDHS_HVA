import { $ } from '../core/utils.js';
import { ModalManager } from '../ui/modal.js';
import { ModuleManager } from '../modules/module-manager.js';
import { PWA } from '../services/pwa.js';

export function renderHome() {
    const container = $('#home-view');
    if (!container) return;

    container.innerHTML = `
<!-- HVA Assistant -->
<div class="relative mb-3 overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-lg p-3 text-white">
    <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none"></div>
    <div class="relative z-10">
        <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <i class="bi bi-robot text-xs"></i>
                </div>
                <div>
                    <h2 class="text-xs font-bold tracking-tight text-slate-100 flex items-center gap-1.5">
                        HVA Assistant 
                        <span class="px-1.5 py-0.2 rounded bg-blue-500/20 text-[9px] font-bold text-blue-300 border border-blue-500/30">AI Pro</span>
                    </h2>
                    <p class="text-[10px] text-slate-400">Trợ lý điều hành thông minh</p>
                </div>
            </div>
        </div>

        <div class="mb-2 bg-slate-800/80 rounded-xl p-2 border border-slate-700/60">
            <div class="flex items-center flex-wrap gap-x-1.5">
                <span id="assistantGreeting" class="text-slate-300 text-[11px] font-medium">👋 Xin chào,</span>
                <span id="assistantName" class="text-white text-xs font-bold leading-tight">...</span>
            </div>
            <div id="assistantPosition" class="text-blue-400 text-[10px] font-medium leading-tight mt-0.5">...</div>
        </div>

        <div id="assistantMessage" class="bg-slate-800/50 rounded-xl px-2.5 py-2 text-[11px] font-medium text-slate-200 mb-2 border border-slate-700/50 flex items-start gap-2">
            <i class="bi bi-info-circle-fill text-blue-400 text-xs shrink-0 mt-0.5"></i>
            <span class="leading-relaxed">Hệ thống hoạt động ổn định. Có 01 việc khẩn cần xử lý ngay.</span>
        </div>

        <div class="flex items-center bg-slate-800 rounded-xl px-2.5 py-1 border border-slate-700">
            <input type="text" placeholder="Hỏi HVA Assistant điều gì đó..." class="flex-1 bg-transparent outline-none text-[11px] font-medium text-white placeholder-slate-400">
            <button class="ml-2 w-6 h-6 rounded-lg bg-blue-600 hover:bg-blue-500 transition flex items-center justify-center text-white active:scale-95">
                <i class="bi bi-mic-fill text-[10px]"></i>
            </button>
        </div>
    </div>
</div>

<!-- DASHBOARD ĐIỀU HÀNH -->
<div class="mb-3 p-3 rounded-2xl bg-slate-900 text-white shadow-lg border border-slate-800 relative">
    <div class="flex flex-col gap-2.5">
        <div class="flex items-center justify-between pb-2 border-b border-slate-800">
            <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
                    <i class="bi bi-shield-shaded text-xs"></i>
                </div>
                <div>
                    <div class="text-xs font-bold tracking-wider uppercase text-slate-100 flex items-center gap-1.5">
                        THPT HÒA VANG <span class="text-[9px] px-1 py-0.2 bg-blue-900/60 text-blue-300 rounded font-bold border border-blue-700/50">NZE</span>
                    </div>
                    <div class="text-[10px] text-slate-400">Trung tâm Điều hành Số</div>
                </div>
            </div>
            <div class="text-right">
                <div class="text-[11px] font-bold text-slate-200 tabular-nums">Thứ Ba, 28/07/2026</div>
                <div class="text-[9px] text-emerald-400 flex items-center justify-end gap-1 font-medium">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Trực tuyến</span>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-4 gap-1.5 text-center">
            <div class="p-1.5 rounded-lg bg-slate-800 border border-slate-700/80">
                <div class="text-[9px] text-slate-400 uppercase font-bold">KPI ĐH</div>
                <div class="text-xs font-black text-blue-400 mt-0.5 tabular-nums">94%</div>
            </div>
            <div class="p-1.5 rounded-lg bg-slate-800 border border-slate-700/80">
                <div class="text-[9px] text-slate-400 uppercase font-bold">Hệ thống</div>
                <div class="text-xs font-black text-emerald-400 mt-0.5 tabular-nums">Ổn định</div>
            </div>
            <div class="p-1.5 rounded-lg bg-slate-800 border border-slate-700/80">
                <div class="text-[9px] text-slate-400 uppercase font-bold">Văn bản</div>
                <div class="text-xs font-black text-amber-400 mt-0.5 tabular-nums">02</div>
            </div>
            <div class="p-1.5 rounded-lg bg-slate-800 border border-slate-700/80">
                <div class="text-[9px] text-slate-400 uppercase font-bold">Việc khẩn</div>
                <div class="text-xs font-black text-rose-400 mt-0.5 tabular-nums">01</div>
            </div>
        </div>

        <div class="flex items-center gap-2 text-[10px] text-slate-300 font-medium px-2 py-1.5 bg-slate-800/60 rounded-lg border border-slate-700/50">
            <span class="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[9px] font-bold uppercase shrink-0">Việc khẩn</span>
            <span class="truncate">Rà soát tiến độ chuẩn bị cơ sở vật chất năm học mới trước 15:00 hôm nay.</span>
        </div>
    </div>
</div>

<!-- QUICK ACTION (DOCK ĐIỀU HÀNH) -->
<div class="grid grid-cols-5 gap-1.5 mb-3">
    <button data-open-modal="document-modal" class="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 transition-all text-white">
        <div class="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center text-xs border border-blue-500/30">
            <i class="bi bi-plus-lg"></i>
        </div>
        <span class="text-[9px] font-bold text-slate-300 text-center leading-tight">Giao việc</span>
    </button>
    <button data-open-modal="team-modal" class="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 transition-all text-white">
        <div class="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center text-xs border border-amber-500/30">
            <i class="bi bi-calendar-day"></i>
        </div>
        <span class="text-[9px] font-bold text-slate-300 text-center leading-tight">Hôm nay</span>
    </button>
    <button data-open-modal="document-modal" class="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 transition-all text-white">
        <div class="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center text-xs border border-emerald-500/30">
            <i class="bi bi-file-earmark-text"></i>
        </div>
        <span class="text-[9px] font-bold text-slate-300 text-center leading-tight">Văn bản</span>
    </button>
    <button data-open-modal="digital-modal" class="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 transition-all text-white">
        <div class="w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center text-xs border border-cyan-500/30">
            <i class="bi bi-display"></i>
        </div>
        <span class="text-[9px] font-bold text-slate-300 text-center leading-tight">Dashboard</span>
    </button>
    <button data-open-modal="boiduong-modal" class="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 transition-all text-white">
        <div class="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center text-xs border border-purple-500/30">
            <i class="bi bi-clipboard-check"></i>
        </div>
        <span class="text-[9px] font-bold text-slate-300 text-center leading-tight">Nhiệm vụ</span>
    </button>
</div>

<!-- Install Banner -->
<section id="install-banner" class="mb-3 hidden">
    <div class="p-3 rounded-xl bg-slate-900 border border-blue-500/30 flex items-center justify-between text-white">
        <div class="flex items-center space-x-2.5">
            <div class="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                <i class="bi bi-phone-vibrate text-sm"></i>
            </div>
            <div>
                <h4 class="text-xs font-bold text-white uppercase tracking-wider">Cài đặt Ứng dụng</h4>
                <p class="text-[10px] text-slate-400">Thêm nhanh TTĐHS_HVA vào màn hình chính</p>
            </div>
        </div>
        <button id="btn-install" class="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow transition-all">Cài đặt</button>
    </div>
</section>

<!-- 04 MODULE CHÍNH -->
<section class="grid grid-cols-2 gap-2.5 mb-2">
    <div data-open-modal="digital-modal" class="group relative rounded-2xl bg-slate-900 text-white p-3 shadow-md hover:border-blue-500/50 transition-all cursor-pointer overflow-hidden border border-slate-800">
        <div class="absolute top-2.5 right-2.5 px-1.5 py-0.2 rounded bg-slate-800 text-[8px] font-bold text-slate-300 border border-slate-700 uppercase">Trụ cột 1</div>
        <div class="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-2.5 text-blue-400">
            <i class="bi bi-globe text-base"></i>
        </div>
        <h3 class="text-xs font-bold text-white mb-0.5">THÔNG TIN SỐ</h3>
        <p class="text-[10px] text-slate-400 leading-tight">Website • Thông báo • Tuyển sinh • Danh bạ</p>
    </div>

    <div data-open-modal="digital-modal" class="group relative rounded-2xl bg-slate-900 text-white p-3 shadow-md hover:border-cyan-500/50 transition-all cursor-pointer overflow-hidden border border-slate-800">
        <div class="absolute top-2.5 right-2.5 px-1.5 py-0.2 rounded bg-slate-800 text-[8px] font-bold text-cyan-300 border border-slate-700 uppercase">Trụ cột 2</div>
        <div class="w-9 h-9 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center mb-2.5 text-cyan-400">
            <i class="bi bi-cpu text-base"></i>
        </div>
        <h3 class="text-xs font-bold text-white mb-0.5">ĐIỀU HÀNH SỐ</h3>
        <p class="text-[10px] text-slate-400 leading-tight">Dashboard • Giao việc • Văn bản • Lịch • AI</p>
    </div>

    <div data-open-modal="boiduong-modal" class="group relative rounded-2xl bg-slate-900 text-white p-3 shadow-md hover:border-purple-500/50 transition-all cursor-pointer overflow-hidden border border-slate-800">
        <div class="absolute top-2.5 right-2.5 px-1.5 py-0.2 rounded bg-slate-800 text-[8px] font-bold text-purple-300 border border-slate-700 uppercase">Trụ cột 3</div>
        <div class="w-9 h-9 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center mb-2.5 text-purple-400">
            <i class="bi bi-journal-check text-base"></i>
        </div>
        <h3 class="text-xs font-bold text-white mb-0.5">TÁC NGHIỆP SỐ</h3>
        <p class="text-[10px] text-slate-400 leading-tight">Chuyên môn • Báo cáo • Tập huấn • Khảo sát</p>
    </div>

    <div data-open-modal="boiduong-modal" class="group relative rounded-2xl bg-slate-900 text-white p-3 shadow-md hover:border-amber-500/50 transition-all cursor-pointer overflow-hidden border border-slate-800">
        <div class="absolute top-2.5 right-2.5 px-1.5 py-0.2 rounded bg-slate-800 text-[8px] font-bold text-amber-300 border border-slate-700 uppercase">Trụ cột 4</div>
        <div class="w-9 h-9 rounded-xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center mb-2.5 text-amber-400">
            <i class="bi bi-graph-up-arrow text-base"></i>
        </div>
        <h3 class="text-xs font-bold text-white mb-0.5">QUẢN TRỊ CHIẾN LƯỢC</h3>
        <p class="text-[10px] text-slate-400 leading-tight">KPI • Thi đua • Kiểm định • Quản trị rủi ro</p>
    </div>
</section>
`;
}
