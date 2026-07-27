import { ModalManager } from '../ui/modal.js';
import { Toast } from '../ui/toast.js';
import { Loading } from '../ui/loading.js';
import { ModuleManager } from '../modules/module-manager.js';
import { PWA } from '../services/pwa.js';
import { HVAAssistant } from '../features/assistant.js';
import { updateWelcomeTicker } from '../features/ticker.js';
import { renderHome } from '../features/home-renderer.js';
import { $ } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Init core systems
    ModalManager.init();
    ModuleManager.init();
    PWA.init();

    // 2. Render home
    renderHome();

    // 3. Features
    HVAAssistant.render();
    updateWelcomeTicker();

    // 4. Header buttons
    $('#btn-ai')?.addEventListener('click', () => ModalManager.open('ai-modal'));
    $('#btn-profile')?.addEventListener('click', () => ModalManager.open('profile-modal')); // nếu có
    $('#toast-close')?.addEventListener('click', () => Toast.hide());

    // 5. Bottom nav
    document.querySelectorAll('[data-nav]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const nav = item.dataset.nav;
            if (nav === 'home') {
                ModuleManager.close();
                window.scrollTo(0, 0);
            } else if (nav === 'ai') {
                ModalManager.open('ai-modal');
            } else if (nav === 'contact') {
                ModalManager.open('contact-modal');
            } else if (nav === 'profile') {
                ModalManager.open('team-modal');
            }
        });
    });

    // 6. Boiduong menu (nếu cần bind thêm)
    // Các hàm selectCapSinhHoat, openBoiduongForm... sẽ được chuyển sang module riêng sau
});
