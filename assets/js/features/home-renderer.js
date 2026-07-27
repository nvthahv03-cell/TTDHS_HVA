import { $ } from '../core/utils.js';
import { ModalManager } from '../ui/modal.js';
import { ModuleManager } from '../modules/module-manager.js';
import { PWA } from '../services/pwa.js';

export function renderHome() {
    const container = $('#home-view');
    if (!container) return;

    container.innerHTML = `
<!-- HVA Assistant -->
<div class="relative mb-3 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 shadow-xl">
    <div class="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
    <div class="relative p-3">
        <div class="flex items-center gap-2 mb-1">
            <h2 class="text-xl font-bold text-white leading-none">🤖 HVA Assistant <span class="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-semibold text-white">AI</span></h2>
        </div>
        <div class="mb-2">
            <div class="flex items-center flex-wrap gap-x-2">
                <span id="assistantGreeting" class="text-white text-sm">👋 Xin chào,</span>
                <span id="assistantName" class="text-white text-lg font-bold leading-tight">...</span>
            </div>
            <div id="assistantPosition" class="text-cyan-100 text-xs leading-tight mt-1">...</div>
        </div>
        <div id="assistantMessage" class="bg-white/90 rounded-xl px-3 py-2 text-sm text-slate-700 shadow mb-2">Xin chào!</div>
        <div class="flex items-center bg-white rounded-full px-3 py-1.5 shadow-md">
            <input type="text" placeholder="Hỏi HVA Assistant..." class="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400">
            <button class="ml-2 w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center">
                <i class="bi bi-mic-fill text-white text-lg"></i>
            </button>
        </div>
    </div>
</div>

<!-- Welcome Ticker -->
<div class="overflow-hidden rounded-xl bg-white border border-slate-300 shadow-sm py-2 px-3 mb-3">
    <div id="welcomeTicker" class="whitespace-nowrap text-sm font-medium text-slate-700"></div>
</div>

<!-- Install Banner -->
<section id="install-banner" class="mb-4">
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
<section class="mb-3 mt-2">
    <div class="p-4 rounded-2xl bg-gradient-to-r from-brand-teal/10 to-indigo-500/10 border border-brand-teal/20 backdrop-blur-md">
        <p class="text-base font-semibold text-center text-[#0F4C81]">Kết nối – Điều hành – Hiệu quả</p>
    </div>
</section>

<!-- Grid Cards -->
<section class="grid grid-cols-2 gap-3 mb-6">
    <div data-open-modal="document-modal" class="group relative rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] active:scale-[0.97] border border-white/10 hover:border-brand-glow/40 p-4 shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
        <div class="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-cyan-500/10 blur-md group-hover:scale-150 transition-all duration-500"></div>
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-3">
            <i class="bi bi-house-door-fill text-white text-lg"></i>
        </div>
        <h3 class="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">Trang chủ TTĐHS</h3>
        <p class="text-[11px] text-slate-600 mt-1 line-clamp-1">THPT Hòa Vang</p>
    </div>

    <div data-open-modal="digital-modal" class="group relative rounded-2xl bg-white/25 backdrop-blur-xl hover:bg-white/35 active:scale-[0.97] border border-white/40 hover:border-cyan-300 p-4 shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
        <div class="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-cyan-400/10 blur-2xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform duration-300">
            <i class="bi bi-display-fill text-white text-lg"></i>
        </div>
        <h3 class="text-sm font-bold text-slate-800 group-hover:text-cyan-700 transition-colors">Chuyển đổi số</h3>
        <p class="text-[11px] text-slate-500 mt-1 line-clamp-1">Điều hành số • Học liệu • Phần mềm</p>
    </div>

    <div data-open-modal="boiduong-modal" class="group relative rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] active:scale-[0.97] border border-white/10 hover:border-brand-glow/40 p-4 shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
        <div class="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-violet-500/10 blur-md group-hover:scale-150 transition-all duration-500"></div>
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/20 shrink-0">
            <i class="bi bi-clipboard-data-fill text-white text-xl"></i>
        </div>
        <h3 class="text-sm font-bold text-slate-800 group-hover:text-violet-700 transition-colors">Báo cáo trực tuyến</h3>
        <p class="text-[11px] text-slate-500 mt-1 line-clamp-1">Tập huấn • Hội thảo • Sinh hoạt CM</p>
    </div>

    <div data-open-modal="team-modal" class="group relative rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] active:scale-[0.97] border border-white/10 hover:border-brand-glow/40 p-4 shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
        <div class="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-violet-500/10 blur-md group-hover:scale-150 transition-all duration-500"></div>
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/20 shrink-0">
            <i class="bi bi-calendar-event-fill text-white text-xl"></i>
        </div>
        <h3 class="text-sm font-bold text-slate-800 group-hover:text-violet-700 transition-colors">Hoạt động</h3>
        <p class="text-[11px] text-slate-500 mt-1 line-clamp-1">Lịch tháng • Lịch tuần • Đột xuất</p>
    </div>
</section>
`;


    // ===== VIỆC CỦA TÔI HÔM NAY =====
    container.innerHTML += `
<div class="flex flex-col gap-6 p-6 rounded-2xl bg-white/3 backdrop-blur-md border border-white/10 shadow-xl hover-lift animate-fade-in mb-6">
    <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-slate-800 flex items-center gap-2.5">
            <i class="bi bi-clipboard-check text-lg bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent"></i>
            VIỆC CỦA TÔI HÔM NAY
        </h3>
        <a href="#" class="text-sm font-medium text-sky-600 hover:text-amber-500 transition-colors">Xem tất cả</a>
    </div>

    <div class="grid grid-cols-2 gap-3">
        <div class="p-3.5 rounded-xl bg-white/4 border border-white/10 flex flex-col justify-between hover-lift">
            <span class="text-xs text-slate-500 font-medium">Chưa tiếp nhận</span>
            <span class="text-xl font-bold text-rose-500 mt-1 tabular-nums">03</span>
        </div>
        <div class="p-3.5 rounded-xl bg-white/4 border border-white/10 flex flex-col justify-between hover-lift">
            <span class="text-xs text-slate-500 font-medium">Đang thực hiện</span>
            <span class="text-xl font-bold text-amber-600 mt-1 tabular-nums">08</span>
        </div>
        <div class="p-3.5 rounded-xl bg-white/4 border border-white/10 flex flex-col justify-between hover-lift">
            <span class="text-xs text-slate-500 font-medium">Chờ duyệt</span>
            <span class="text-xl font-bold text-sky-600 mt-1 tabular-nums">02</span>
        </div>
        <div class="p-3.5 rounded-xl bg-white/4 border border-white/10 flex flex-col justify-between hover-lift">
            <span class="text-xs text-slate-500 font-medium">Quá hạn</span>
            <span class="text-xl font-bold text-rose-600 mt-1 tabular-nums">01</span>
        </div>
    </div>

    <div class="flex flex-col gap-3">
        <!-- Công việc 1 -->
        <div class="p-3.5 rounded-xl bg-white/4 border border-white/15 hover-lift flex flex-col gap-2.5">
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2.5 min-w-0">
                    <i class="bi bi-file-earmark-text text-base bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent shrink-0"></i>
                    <span class="text-sm font-semibold text-slate-800 line-clamp-1">Duyệt kế hoạch ôn thi học sinh giỏi cấp tỉnh</span>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                    <span class="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold tracking-tight bg-rose-500/12 text-rose-600 rounded-md border border-rose-500/25">Cao</span>
                    <span class="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-tight bg-rose-500/10 text-rose-600 rounded-full border border-rose-500/20">Còn 1 ngày</span>
                </div>
            </div>
            <div class="flex items-center gap-3 w-full pl-6">
                <div class="flex-1 h-2 bg-slate-200/50 rounded-full overflow-hidden p-0.5 border border-white/20 shadow-inner">
                    <div class="h-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 rounded-full" style="width:75%"></div>
                </div>
                <span class="text-[11px] font-semibold text-slate-600 shrink-0 tabular-nums">75%</span>
            </div>
            <div class="flex items-center justify-between text-xs text-slate-500 pl-6 pt-1 border-t border-white/5">
                <span>Giao: Hiệu trưởng</span>
                <span class="tabular-nums">Hạn: 24/07/2026</span>
            </div>
        </div>

        <!-- Công việc 2 -->
        <div class="p-3.5 rounded-xl bg-white/4 border border-white/15 hover-lift flex flex-col gap-2.5">
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2.5 min-w-0">
                    <i class="bi bi-shield-check text-base bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent shrink-0"></i>
                    <span class="text-sm font-semibold text-slate-800 line-clamp-1">Ký quyết định phân công hội đồng coi thi</span>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                    <span class="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold tracking-tight bg-amber-500/12 text-amber-600 rounded-md border border-amber-500/25">Trung bình</span>
                    <span class="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-tight bg-amber-500/10 text-amber-600 rounded-full border border-amber-500/20">Hôm nay</span>
                </div>
            </div>
            <div class="flex items-center gap-3 w-full pl-6">
                <div class="flex-1 h-2 bg-slate-200/50 rounded-full overflow-hidden p-0.5 border border-white/20 shadow-inner">
                    <div class="h-full bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 rounded-full" style="width:40%"></div>
                </div>
                <span class="text-[11px] font-semibold text-slate-600 shrink-0 tabular-nums">40%</span>
            </div>
            <div class="flex items-center justify-between text-xs text-slate-500 pl-6 pt-1 border-t border-white/5">
                <span>Giao: Văn thư</span>
                <span class="tabular-nums">Hạn: 23/07/2026</span>
            </div>
        </div>

        <!-- Công việc 3 -->
        <div class="p-3.5 rounded-xl bg-white/4 border border-white/15 hover-lift flex flex-col gap-2.5">
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2.5 min-w-0">
                    <i class="bi bi-journal-code text-base bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent shrink-0"></i>
                    <span class="text-sm font-semibold text-slate-800 line-clamp-1">Rà soát danh mục Sáng kiến năm học</span>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                    <span class="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold tracking-tight bg-sky-500/12 text-sky-600 rounded-md border border-sky-500/25">Thấp</span>
                    <span class="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-tight bg-sky-500/10 text-sky-600 rounded-full border border-sky-500/20">Còn 5 ngày</span>
                </div>
            </div>
            <div class="flex items-center gap-3 w-full pl-6">
                <div class="flex-1 h-2 bg-slate-200/50 rounded-full overflow-hidden p-0.5 border border-white/20 shadow-inner">
                    <div class="h-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 rounded-full" style="width:100%"></div>
                </div>
                <span class="text-[11px] font-semibold text-slate-600 shrink-0 tabular-nums">100%</span>
            </div>
            <div class="flex items-center justify-between text-xs text-slate-500 pl-6 pt-1 border-t border-white/5">
                <span>Giao: Tổ CM Toán</span>
                <span class="tabular-nums">Hạn: 28/07/2026</span>
            </div>
        </div>
    </div>
</div>

<!-- THÔNG BÁO BGH -->
<div class="flex flex-col gap-6 p-6 rounded-2xl bg-white/3 backdrop-blur-md border border-white/10 shadow-xl hover-lift animate-fade-in mb-6">
    <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-slate-800 flex items-center gap-2.5">
            <i class="bi bi-megaphone text-lg bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent"></i>
            THÔNG BÁO BGH
        </h3>
        <a href="#" class="text-sm font-medium text-sky-600 hover:text-red-500 transition-colors">Xem tất cả</a>
    </div>
    <div class="flex flex-col gap-3">
        <!-- TB 1 -->
        <div class="p-3.5 rounded-xl bg-white/4 border border-white/15 cursor-pointer hover-lift flex flex-col gap-2" data-notification="tb1">
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-start gap-2.5 min-w-0">
                    <i class="bi bi-exclamation-octagon text-base text-rose-500 shrink-0 mt-0.5"></i>
                    <div class="flex flex-col gap-1 min-w-0">
                        <span class="text-sm font-semibold text-slate-800 line-clamp-1">Lịch triển khai công tác chuẩn bị cơ sở vật chất năm học mới 2026 - 2027</span>
                        <p class="text-xs text-slate-500 line-clamp-1">Yêu cầu các tổ trưởng chuyên môn kiểm kê trang thiết bị phòng học bộ môn...</p>
                    </div>
                </div>
                <div class="flex flex-col items-end gap-1.5 shrink-0">
                    <span class="inline-flex items-center px-2 py-0.5 text-[10px] font-extrabold tracking-wide uppercase bg-rose-500 text-white rounded-full shadow-sm animate-pulse">NEW</span>
                    <span class="inline-flex items-center px-2 py-0.5 text-[10px] font-bold tracking-tight bg-rose-500/12 text-rose-600 rounded border border-rose-500/25">Khẩn</span>
                </div>
            </div>
            <div class="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-white/10 pl-6">
                <span class="flex items-center gap-1.5 tabular-nums"><i class="bi bi-calendar3"></i> 23/07/2026</span>
                <span class="flex items-center gap-1.5 tabular-nums"><i class="bi bi-clock"></i> 08:30</span>
            </div>
        </div>

        <!-- TB 2 -->
        <div class="p-3.5 rounded-xl bg-white/4 border border-white/15 cursor-pointer hover-lift flex flex-col gap-2" data-notification="tb2">
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-start gap-2.5 min-w-0">
                    <i class="bi bi-exclamation-triangle text-base text-amber-500 shrink-0 mt-0.5"></i>
                    <div class="flex flex-col gap-1 min-w-0">
                        <span class="text-sm font-semibold text-slate-800 line-clamp-1">V/v tổ chức sơ kết phong trào thi đua dạy tốt - học tốt đợt thi đua thứ tư</span>
                        <p class="text-xs text-slate-500 line-clamp-1">Tổng hợp minh chứng thành tích thi đua gửi về văn phòng hội đồng...</p>
                    </div>
                </div>
                <div class="flex flex-col items-end gap-1.5 shrink-0">
                    <span class="inline-flex items-center px-2 py-0.5 text-[10px] font-extrabold tracking-wide uppercase bg-rose-500 text-white rounded-full shadow-sm animate-pulse">NEW</span>
                    <span class="inline-flex items-center px-2 py-0.5 text-[10px] font-bold tracking-tight bg-amber-500/12 text-amber-600 rounded border border-amber-500/25">Quan trọng</span>
                </div>
            </div>
            <div class="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-white/10 pl-6">
                <span class="flex items-center gap-1.5 tabular-nums"><i class="bi bi-calendar3"></i> 22/07/2026</span>
                <span class="flex items-center gap-1.5 tabular-nums"><i class="bi bi-clock"></i> 14:00</span>
            </div>
        </div>

        <!-- TB 3 -->
        <div class="p-3.5 rounded-xl bg-white/4 border border-white/15 cursor-pointer hover-lift flex flex-col gap-2" data-notification="tb3">
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-start gap-2.5 min-w-0">
                    <i class="bi bi-calendar-event text-base text-emerald-500 shrink-0 mt-0.5"></i>
                    <div class="flex flex-col gap-1 min-w-0">
                        <span class="text-sm font-semibold text-slate-800 line-clamp-1">Kế hoạch tham gia tập huấn nâng cao năng lực ứng dụng Chuyển đổi số trong quản lý</span>
                        <p class="text-xs text-slate-500 line-clamp-1">Danh sách cán bộ giáo viên tham gia lớp tập huấn trực tuyến tại phòng họp...</p>
                    </div>
                </div>
                <div class="flex flex-col items-end gap-1.5 shrink-0">
                    <span class="inline-flex items-center px-2 py-0.5 text-[10px] font-bold tracking-tight bg-emerald-500/12 text-emerald-600 rounded border border-emerald-500/25">Kế hoạch</span>
                </div>
            </div>
            <div class="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-white/10 pl-6">
                <span class="flex items-center gap-1.5 tabular-nums"><i class="bi bi-calendar3"></i> 20/07/2026</span>
                <span class="flex items-center gap-1.5 tabular-nums"><i class="bi bi-clock"></i> 09:15</span>
            </div>
        </div>
    </div>
</div>

<!-- TIN TỨC GIÁO DỤC & CĐS -->
<div class="flex flex-col gap-6 p-6 rounded-2xl bg-white/3 backdrop-blur-md border border-white/10 shadow-xl hover-lift animate-fade-in mb-6">
    <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-slate-800 flex items-center gap-2.5">
            <i class="bi bi-newspaper text-lg bg-gradient-to-r from-emerald-500 to-cyan-600 bg-clip-text text-transparent"></i>
            TIN TỨC GIÁO DỤC & CĐS
        </h3>
        <a href="#" class="text-sm font-medium text-sky-600 hover:text-emerald-500 transition-colors">Xem tất cả</a>
    </div>
    <div class="flex flex-col gap-4">
        <a href="#" class="group flex items-center gap-3.5 p-2 rounded-xl bg-white/4 border border-white/15 hover-lift">
            <div class="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-slate-200/50 flex items-center justify-center">
                <div class="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-blue-600/20 flex items-center justify-center">
                    <i class="bi bi-image text-sky-600 text-xl transition-transform duration-500 group-hover:scale-110"></i>
                </div>
            </div>
            <div class="flex flex-col gap-1 flex-1 min-w-0">
                <div class="flex items-center justify-between">
                    <span class="inline-flex items-center px-2 py-0.5 text-[9px] font-bold tracking-tight bg-sky-500/12 text-sky-600 rounded border border-sky-500/25">Bộ GDĐT</span>
                    <span class="text-[11px] text-slate-500 tabular-nums">23/07/2026</span>
                </div>
                <h4 class="text-sm font-semibold text-slate-800 group-hover:text-sky-600 transition-colors line-clamp-2">Đổi mới phương pháp kiểm tra đánh giá theo chương trình giáo dục phổ thông mới</h4>
            </div>
        </a>
        <a href="#" class="group flex items-center gap-3.5 p-2 rounded-xl bg-white/4 border border-white/15 hover-lift">
            <div class="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-slate-200/50 flex items-center justify-center">
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 flex items-center justify-center">
                    <i class="bi bi-cpu text-emerald-600 text-xl transition-transform duration-500 group-hover:scale-110"></i>
                </div>
            </div>
            <div class="flex flex-col gap-1 flex-1 min-w-0">
                <div class="flex items-center justify-between">
                    <span class="inline-flex items-center px-2 py-0.5 text-[9px] font-bold tracking-tight bg-emerald-500/12 text-emerald-600 rounded border border-emerald-500/25">Sở GDĐT</span>
                    <span class="text-[11px] text-slate-500 tabular-nums">21/07/2026</span>
                </div>
                <h4 class="text-sm font-semibold text-slate-800 group-hover:text-sky-600 transition-colors line-clamp-2">Ứng dụng Trí tuệ nhân tạo trong xây dựng hệ thống quản trị trường học thông minh</h4>
            </div>
        </a>
        <a href="#" class="group flex items-center gap-3.5 p-2 rounded-xl bg-white/4 border border-white/15 hover-lift">
            <div class="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-slate-200/50 flex items-center justify-center">
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 flex items-center justify-center">
                    <i class="bi bi-mortarboard text-indigo-600 text-xl transition-transform duration-500 group-hover:scale-110"></i>
                </div>
            </div>
            <div class="flex flex-col gap-1 flex-1 min-w-0">
                <div class="flex items-center justify-between">
                    <span class="inline-flex items-center px-2 py-0.5 text-[9px] font-bold tracking-tight bg-indigo-500/12 text-indigo-600 rounded border border-indigo-500/25">THPT Hòa Vang</span>
                    <span class="text-[11px] text-slate-500 tabular-nums">19/07/2026</span>
                </div>
                <h4 class="text-sm font-semibold text-slate-800 group-hover:text-sky-600 transition-colors line-clamp-2">Trường THPT Hòa Vang đẩy mạnh phong trào tự học và sáng tạo số trong giáo viên</h4>
            </div>
        </a>
    </div>
</div>
`;

    // Bind events sau khi render
    bindHomeEvents();
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
