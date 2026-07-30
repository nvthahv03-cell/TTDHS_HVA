import { ModalManager } from '../ui/modal.js';
import { Toast } from '../ui/toast.js';
import { ModuleManager } from '../modules/module-manager.js';
import { PWA } from '../services/pwa.js';
import { HVAAssistant } from '../features/assistant.js';
import { updateWelcomeTicker } from '../features/ticker.js';
import { renderHome } from '../features/home-renderer.js';
import { $ } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // 1. Khởi tạo hệ thống
    // =========================
    ModalManager.init();
    ModuleManager.init();
    PWA.init();

    // =========================
    // 2. Render giao diện Trang chủ
    // =========================
    renderHome();

    // =========================
    // 3. Khởi tạo các tính năng
    // =========================
    HVAAssistant.render();
    updateWelcomeTicker();

    // =========================
    // 4. Header
    // =========================
    $('#btn-ai')?.addEventListener('click', () => {
        ModalManager.open('ai-modal');
    });

    $('#btn-profile')?.addEventListener('click', () => {
        ModalManager.open('profile-modal');
    });

    $('#toast-close')?.addEventListener('click', () => {
        Toast.hide();
    });

    // =========================
    // 5. Bottom Navigation
    // =========================
    document.querySelectorAll('[data-nav]').forEach(item => {

        item.addEventListener('click', (e) => {

            e.preventDefault();

            const nav = item.dataset.nav;

            switch (nav) {

                case 'home':
                    ModuleManager.close();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    break;

                case 'ai':
                    ModalManager.open('ai-modal');
                    break;

                case 'contact':
                    ModalManager.open('contact-modal');
                    break;

                case 'profile':
                    ModalManager.open('team-modal');
                    break;
            }

        });

    });

});
