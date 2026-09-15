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

    // =====================================================
    // 1. KHỞI TẠO HỆ THỐNG LÕI
    // =====================================================
    ModalManager.init();
    ModuleManager.init();
    PWA.init();


    // =====================================================
    // 2. RENDER TRANG CHỦ
    // Phải render Home trước để tạo DOM cho HVA Assistant
    // =====================================================
    renderHome();


    // =====================================================
    // 3. KHỞI TẠO CÁC FEATURE TRÊN HOME
    // =====================================================
    HVAAssistant.render();
    updateWelcomeTicker();


    // =====================================================
    // 4. CÁC NÚT HEADER
    // =====================================================
    $('#btn-ai')?.addEventListener('click', () => {
        ModalManager.open('ai-modal');
    });

    $('#btn-profile')?.addEventListener('click', () => {
        ModalManager.open('profile-modal');
    });

    $('#toast-close')?.addEventListener('click', () => {
        Toast.hide();
    });


    // =====================================================
    // 5. BOTTOM NAVIGATION
    // =====================================================
    document.querySelectorAll('[data-nav]').forEach(item => {

        item.addEventListener('click', (e) => {

            e.preventDefault();

            const nav = item.dataset.nav;

            if (nav === 'home') {

                ModuleManager.close();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

            } else if (nav === 'ai') {

                ModalManager.open('ai-modal');

            } else if (nav === 'contact') {

                ModalManager.open('contact-modal');

            } else if (nav === 'profile') {

                ModalManager.open('team-modal');

            }

        });

    });


    // =====================================================
    // 6. ĐIỀU HÀNH SỐ
    // =====================================================
    document.addEventListener('click', (e) => {

        const card = e.target.closest(
            '[data-open-modal="digital-modal"]'
        );

        if (!card) return;

        e.preventDefault();

        ModalManager.open('digital-modal');

    });


    // =====================================================
    // 7. CÁC MODULE BỔ SUNG
    // =====================================================
    // Boiduong menu:
    // Các hàm selectCapSinhHoat, openBoiduongForm...
    // sẽ được chuyển sang module riêng sau.

});
