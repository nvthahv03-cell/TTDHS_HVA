import { $ } from '../core/utils.js';

let timeoutId = null;

export const Toast = {
    show(message, duration = 5000) {
        const el = $('#toast-message');
        const text = $('#toast-text');
        if (!el || !text) return;

        text.textContent = message;
        el.classList.remove('hidden-force', 'opacity-0', 'scale-90', 'pointer-events-none');
        el.classList.add('opacity-100', 'scale-100');

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => this.hide(), duration);
    },

    hide() {
        const el = $('#toast-message');
        if (!el) return;
        el.classList.remove('opacity-100', 'scale-100');
        el.classList.add('opacity-0', 'scale-90', 'pointer-events-none');
        setTimeout(() => el.classList.add('hidden-force'), 300);
    }
};
