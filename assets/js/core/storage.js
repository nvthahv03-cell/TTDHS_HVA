import { STORAGE_KEYS } from './constants.js';

export const Storage = {
    get(key, fallback = null) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch {
            return fallback;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('[Storage] set error', e);
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    getUser() {
        const user = this.get(STORAGE_KEYS.USER, {});
        return {
            name: user.name || user.fullName || '',
            fullName: user.fullName || user.name || '',
            department: user.department || '',
            position: user.position || user.chucVu || user.workPosition || '',
            workPosition: user.workPosition || user.position || '',
            gender: user.gender || ''
        };
    }
};
