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
            <input type="text" id="assistantInput" placeholder="Hỏi HVA Assistant điều gì đó..." class="flex-1 bg-transparent outline-none text-[11px] font-medium text-slate-800 placeholder-slate-400">
            <button id="assistantMicBtn" class="ml-2 w-6 h-6 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition shadow-sm flex items-center justify-center text-white active:scale-95">
                <i class="bi bi-mic-fill text-[10px]"></i>
            </button>
        </div>
    </div>
</div>
<!-- Background Effect -->
<div class="absolute -top-20 -left-20 w-56 h-56 bg-blue-600/30 rounded-full blur-3xl pointer-events-none"></div>
<div class="absolute top-1/2 -right-20 w-56 h-56 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

<!-- 2. BA PHÍM TÁC VỤ NHANH (Shortcut style) -->
<div class="grid grid-cols-3 gap-3 mb-4 relative z-10">

  <!-- Shortcut 1: Lịch công tác -->
  <div class="glass-glow-blue rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center text-center relative shortcut-hover cursor-pointer active:scale-95">
    <div class="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-2.5 rounded-2xl bg-blue-500/25 border border-blue-300/50 shadow-[0_0_20px_rgba(59,130,246,0.5),inset_0_1px_0_rgba(191,219,254,0.3)]">
      <i class="bi bi-calendar3 text-[34px] sm:text-[40px] text-white"
         style="text-shadow: 0 1px 0 #93c5fd, 0 2px 0 #60a5fa, 0 3px 6px rgba(37,99,235,0.6), 0 0 14px rgba(96,165,250,0.5);"></i>
    </div>
    <span class="font-bold text-[11px] sm:text-xs uppercase leading-tight text-white tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
      LỊCH CÔNG TÁC
    </span>
  </div>

  <!-- Shortcut 2: Văn bản - Biểu mẫu -->
  <div class="glass-glow-blue rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center text-center relative shortcut-hover cursor-pointer active:scale-95">
    <div class="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-2.5 rounded-2xl bg-blue-500/25 border border-blue-300/50 shadow-[0_0_20px_rgba(59,130,246,0.5),inset_0_1px_0_rgba(191,219,254,0.3)]">
      <i class="bi bi-file-earmark-text text-[34px] sm:text-[40px] text-white"
         style="text-shadow: 0 1px 0 #93c5fd, 0 2px 0 #60a5fa, 0 3px 6px rgba(37,99,235,0.6), 0 0 14px rgba(96,165,250,0.5);"></i>
    </div>
    <span class="font-bold text-[11px] sm:text-xs uppercase leading-tight text-white tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
      VĂN BẢN BIỂU MẪU
    </span>
  </div>

  <!-- Shortcut 3: Thông tin - Thông báo -->
  <div class="glass-glow-blue rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center text-center relative shortcut-hover cursor-pointer active:scale-95">
    <div class="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-2.5 rounded-2xl bg-blue-500/25 border border-blue-300/50 shadow-[0_0_20px_rgba(59,130,246,0.5),inset_0_1px_0_rgba(191,219,254,0.3)]">
      <i class="bi bi-megaphone text-[34px] sm:text-[40px] text-white"
         style="text-shadow: 0 1px 0 #93c5fd, 0 2px 0 #60a5fa, 0 3px 6px rgba(37,99,235,0.6), 0 0 14px rgba(96,165,250,0.5);"></i>
    </div>
    <span class="font-bold text-[11px] sm:text-xs uppercase leading-tight text-white tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
      THÔNG TIN THÔNG BÁO
    </span>
  </div>

</div>
<!-- 04 TRỤ CỘT CHÍNH -->
<section class="grid grid-cols-2 gap-3 mb-2">
    <div data-open-modal="digital-modal" class="group relative rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white p-3.5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-blue-400/40 active:scale-[0.98]">
        <div class="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/30">
            <i class="bi bi-globe text-white text-lg"></i>
        </div>
        <h3 class="text-xs font-extrabold tracking-tight text-white mb-0.5">CỔNG THÔNG TIN</h3>
        <p class="text-[10px] text-blue-50 font-medium">Website • Thông báo • Tuyển sinh • Danh bạ</p>
    </div>
    <div data-open-modal="digital-modal" class="group relative rounded-2xl bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 text-white p-3.5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-teal-400/40 active:scale-[0.98]">
        <div class="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/30">
            <i class="bi bi-cpu text-white text-lg"></i>
        </div>
        <h3 class="text-xs font-extrabold tracking-tight text-white mb-0.5">ĐIỀU HÀNH SỐ</h3>
        <p class="text-[10px] text-teal-50 font-medium">Dashboard • Giao việc • Văn bản • AI</p>
    </div>
    <div data-open-modal="boiduong-modal" class="group relative rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-500 text-white p-3.5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-purple-400/40 active:scale-[0.98]">
        <div class="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/30">
            <i class="bi bi-journal-check text-white text-lg"></i>
        </div>
        <h3 class="text-xs font-extrabold tracking-tight text-white mb-0.5">CHUYÊN MÔN SỐ</h3>
        <p class="text-[10px] text-purple-50 font-medium">Báo cáo • Tập huấn • Hội thảo • Khảo sát</p>
    </div>
    <div data-open-modal="boiduong-modal" class="group relative rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white p-3.5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-amber-400/40 active:scale-[0.98]">
        <div class="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
        <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/30">
            <i class="bi bi-graph-up-arrow text-white text-lg"></i>
        </div>
        <h3 class="text-xs font-extrabold tracking-tight text-white mb-0.5">QUẢN TRỊ</h3>
        <p class="text-[10px] text-amber-50 font-medium">Kế hoạch • Thi đua • Kiểm tra • KPI</p>
    </div>
</section>
`;

    renderPWAPopups();
    renderBirthdayModal();
    bindHomeEvents();
}

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

function renderBirthdayModal() {
    if (document.getElementById('birthday-modal')) return;
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
    // Nút Android
    document.getElementById('pwa-dismiss-btn')?.addEventListener('click', () => {
        hidePWAPopup();
        localStorage.setItem('pwa-dismissed', Date.now().toString());
    });

    document.getElementById('pwa-confirm-btn')?.addEventListener('click', () => {
        hidePWAPopup();
        // Gọi cài đặt thật
        if (window.deferredPrompt) {
            window.deferredPrompt.prompt();
            window.deferredPrompt.userChoice.then(() => {
                window.deferredPrompt = null;
            });
        } else if (typeof PWA?.install === 'function') {
            PWA.install();
        }
    });

    // Nút iOS
    document.getElementById('pwa-ios-close')?.addEventListener('click', hidePWAPopup);
    document.getElementById('pwa-ios-got-it')?.addEventListener('click', () => {
        hidePWAPopup();
        localStorage.setItem('pwa-ios-dismissed', Date.now().toString());
    });

    // Chỉ hiện khi chưa cài
    if (isStandalone()) return;

    // Android: bắt sự kiện beforeinstallprompt → hiện popup
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        window.deferredPrompt = e;

        const dismissed = localStorage.getItem('pwa-dismissed');
        if (!dismissed || Date.now() - Number(dismissed) > 12 * 60 * 60 * 1000) {
            setTimeout(() => showPWAPopup(false), 1200);
        }
    });

    // iOS
    if (isIOS()) {
        const iosDismissed = localStorage.getItem('pwa-ios-dismissed');
        if (!iosDismissed || Date.now() - Number(iosDismissed) > 2 * 24 * 60 * 60 * 1000) {
            setTimeout(() => showPWAPopup(true), 1500);
        }
    }
}


