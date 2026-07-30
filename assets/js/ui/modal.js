import { $, $$, on, lockScroll, unlockScroll } from '../core/utils.js';

const openModals = new Set();
let escHandler = null;

export const ModalManager = {
    open(id) {
        const modal = document.getElementById(id);
        if (!modal) return;

        modal.classList.remove('hidden-force');
        openModals.add(id);
        lockScroll();
        this._bindEsc();
    },

    close(id) {
        const modal = document.getElementById(id);
        if (!modal) return;

        modal.classList.add('hidden-force');
        openModals.delete(id);

        if (openModals.size === 0) {
            unlockScroll();
            this._unbindEsc();
        }
    },

    closeAll() {
        openModals.forEach(id => this.close(id));
    },

    isOpen(id) {
        return openModals.has(id);
    },

    _bindEsc() {
        if (escHandler) return;

        escHandler = (e) => {
            if (e.key === 'Escape' && openModals.size > 0) {
                const last = [...openModals].pop();
                this.close(last);
            }
        };

        document.addEventListener('keydown', escHandler);
    },

    _unbindEsc() {
        if (!escHandler) return;

        document.removeEventListener('keydown', escHandler);
        escHandler = null;
    },

    init() {

        // Đóng khi click nền
        on(window, 'click', (e) => {
            openModals.forEach(id => {
                const modal = document.getElementById(id);
                if (modal && e.target === modal) {
                    this.close(id);
                }
            });
        });

        // Nút đóng
        $$('[data-close-modal]').forEach(btn => {
            on(btn, 'click', () => {
                const id = btn.dataset.closeModal;
                if (id) this.close(id);
            });
        });

        // Nút mở
        $$('[data-open-modal]').forEach(btn => {
            on(btn, 'click', (e) => {
                e.preventDefault();

                const id = btn.dataset.openModal;
                if (id) this.open(id);
            });
        });

    }
};
