export function $(selector, parent = document) {
    return parent.querySelector(selector);
}

export function $$(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
}

export function on(el, event, handler, options) {
    if (!el) return () => {};
    el.addEventListener(event, handler, options);
    return () => el.removeEventListener(event, handler, options);
}

export function debounce(fn, delay = 200) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

export function lockScroll() {
    document.body.classList.add('overflow-hidden');
}

export function unlockScroll() {
    document.body.classList.remove('overflow-hidden');
}

export function escapeHtml(str = '') {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
