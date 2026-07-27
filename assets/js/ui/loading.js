import { $ } from '../core/utils.js';

export const Loading = {
    show(text = 'Đang tải...') {
        const el = $('#loading-overlay');
        if (!el) return;
        const label = el.querySelector('span');
        if (label) label.textContent = text;
        el.classList.remove('hidden-force');
    },

    hide() {
        const el = $('#loading-overlay');
        if (!el) return;
        el.classList.add('hidden-force');
    }
};
