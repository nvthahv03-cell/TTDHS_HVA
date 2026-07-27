import { Storage } from '../core/storage.js';
import { STORAGE_KEYS } from '../core/constants.js';
import { Toast } from '../ui/toast.js';
import { $ } from '../core/utils.js';

let deferredPrompt = null;

export const PWA = {
    init() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            const banner = $('#install-banner');
            if (banner) banner.classList.remove('hidden-force');
        });

        window.addEventListener('appinstalled', () => {
            deferredPrompt = null;
            Storage.set(STORAGE_KEYS.PWA_INSTALLED, true);
            this._hideBanner();
            this._showSuccess();
        });

        // Check already installed
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
        if (isStandalone || Storage.get(STORAGE_KEYS.PWA_INSTALLED)) {
            this._hideBanner();
        }
    },

    async handleInstall() {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                deferredPrompt = null;
                this._showSuccess();
            }
        } else {
            this._showIOSGuide(true);
        }
    },

    _hideBanner() {
        const banner = $('#install-banner');
        if (banner) banner.classList.add('hidden-force');
    },

    _showSuccess() {
        // Giữ nguyên HTML success modal từ code gốc
        const html = `
            <div id="install-success-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                <div class="bg-zinc-900 border border-emerald-500/50 rounded-2xl max-w-sm w-full p-6 text-white shadow-2xl relative text-center">
                    <div class="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">🎉</div>
                    <h3 class="text-lg font-bold text-emerald-400 mb-2">Cài đặt thành công!</h3>
                    <p class="text-sm text-zinc-300 mb-6 leading-relaxed">
                        Ứng dụng đã được thêm vào Màn hình chính. Thầy hãy <b>thoát trình duyệt và bấm vào biểu tượng ứng dụng ngoài Màn hình chính</b> để trải nghiệm nhé!
                    </p>
                    <button onclick="document.getElementById('install-success-modal').remove()" class="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 font-semibold text-zinc-950 rounded-xl transition-all shadow-lg">Đã hiểu</button>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', html);
    },

    _showIOSGuide(force = false) {
        if (!force && Storage.get(STORAGE_KEYS.HIDE_IOS_GUIDE)) return;
        const html = `
            <div id="ios-guide-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                <div class="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-sm w-full p-6 text-white shadow-2xl relative">
                    <h3 class="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2"><span>📲 Cài đặt lên Thiết bị</span></h3>
                    <p class="text-sm text-zinc-300 mb-4 leading-relaxed">Để đưa ứng dụng ra màn hình chính, thầy thực hiện 2 bước đơn giản:</p>
                    <ol class="text-sm text-zinc-300 space-y-2 mb-6 list-decimal list-inside bg-zinc-800/50 p-3 rounded-xl border border-zinc-700/50">
                        <li>Nhấn vào nút <b>Chia sẻ (Share)</b> hoặc <b>Menu (⋮)</b> ở góc trình duyệt.</li>
                        <li>Chọn <b>'Thêm vào Màn hình chính' (Add to Home Screen)</b> hoặc <b>'Cài đặt ứng dụng'</b>.</li>
                    </ol>
                    <button onclick="localStorage.setItem('hideIOSGuide','true');document.getElementById('ios-guide-modal').remove();" class="w-full py-2.5 bg-amber-500 hover:bg-amber-600 font-semibold text-zinc-950 rounded-xl transition-all shadow-lg">Đã hiểu</button>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', html);
    }
};
