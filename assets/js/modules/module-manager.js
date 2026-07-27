import { Loading } from '../ui/loading.js';
import { Toast } from '../ui/toast.js';
import { lockScroll, unlockScroll } from '../core/utils.js';
import { MODULES } from '../core/constants.js';

const cache = new Map();
let currentModule = null;
let container = null;

export const ModuleManager = {
    init() {
        container = document.getElementById('module-container');
        if (!container) console.error('[ModuleManager] #module-container not found');
    },

    async open(moduleKey, options = {}) {
        if (!container) return;

        const url = MODULES[moduleKey] || moduleKey;
        if (!url) {
            Toast.show('Module không tồn tại');
            return;
        }

        try {
            Loading.show();
            lockScroll();

            let html = cache.get(url);
            if (!html || options.force) {
                const res = await fetch(url, { cache: 'no-cache' });
                if (!res.ok) throw new Error(`Không tải được module: ${url}`);
                html = await res.text();
                if (options.cache !== false) cache.set(url, html);
            }

            // Cleanup previous
            this.destroy();

            container.innerHTML = html;
            container.classList.remove('hidden');
            container.classList.add('entering');
            requestAnimationFrame(() => {
                container.classList.remove('entering');
                container.classList.add('entered');
            });

            // Re-execute scripts inside module
            this._runScripts(container);

            currentModule = { key: moduleKey, url };
            history.pushState({ module: moduleKey }, '', `#${moduleKey}`);

        } catch (err) {
            console.error(err);
            Toast.show(err.message || 'Lỗi tải module');
            unlockScroll();
        } finally {
            Loading.hide();
        }
    },

    close() {
        if (!container || !currentModule) return;

        container.classList.remove('entered');
        container.classList.add('leaving');

        setTimeout(() => {
            this.destroy();
            container.classList.add('hidden');
            container.classList.remove('leaving');
            unlockScroll();
            history.replaceState(null, '', location.pathname);
        }, 250);
    },

    destroy() {
        if (!container) return;
        // Remove all event listeners by clearing content
        container.innerHTML = '';
        currentModule = null;
    },

    reload() {
        if (currentModule) {
            this.open(currentModule.key, { force: true });
        }
    },

    cache(url, html) {
        cache.set(url, html);
    },

    clearCache() {
        cache.clear();
    },

    preload(urls = []) {
        urls.forEach(async (url) => {
            if (cache.has(url)) return;
            try {
                const res = await fetch(url);
                if (res.ok) cache.set(url, await res.text());
            } catch (_) {}
        });
    },

    _runScripts(root) {
        root.querySelectorAll('script').forEach(old => {
            const s = document.createElement('script');
            if (old.src) s.src = old.src;
            else s.textContent = old.textContent;
            document.body.appendChild(s);
            // Optional: remove after run to avoid duplicate
            setTimeout(() => s.remove(), 0);
        });
    }
};

// Browser Back support
window.addEventListener('popstate', (e) => {
    if (e.state?.module) {
        ModuleManager.open(e.state.module);
    } else {
        ModuleManager.close();
    }
});
