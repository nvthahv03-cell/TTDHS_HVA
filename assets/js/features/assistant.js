import { Storage } from '../core/storage.js';
import { $ } from '../core/utils.js';

function getGreeting() {
    const h = new Date().getHours();
    if (h < 11) return '🌅 Chào buổi sáng';
    if (h < 14) return '☀️ Chào buổi trưa';
    if (h < 18) return '🌤️ Chào buổi chiều';
    if (h < 23) return '🌙 Chào buổi tối';
    return '🌌 Chào khuya';
}

function getHonorific(gender, workPosition) {
    const g = (gender || '').trim().toLowerCase();
    const p = (workPosition || '').trim().toLowerCase();
    if (p.includes('hiệu trưởng') || p.includes('phó hiệu trưởng') || p.includes('ttcm') || p.includes('tpcm') || p.includes('giáo viên') || p.includes('gv')) {
        return g === 'nữ' ? 'Cô' : 'Thầy';
    }
    return g === 'nữ' ? 'Chị' : 'Anh';
}

function randomMessage(honor) {
    const list = [
        `Hôm nay tôi có thể hỗ trợ gì cho ${honor.toLowerCase()}?`,
        `Chúc ${honor.toLowerCase()} một ngày làm việc hiệu quả.`,
        `Tôi luôn sẵn sàng hỗ trợ công việc của ${honor.toLowerCase()}.`,
        `Chúc ${honor.toLowerCase()} thật nhiều năng lượng hôm nay.`
    ];
    return list[Math.floor(Math.random() * list.length)];
}

export const HVAAssistant = {
    render() {
        const user = Storage.getUser();
        const honor = getHonorific(user.gender, user.workPosition);

        const greetingEl = $('#assistantGreeting');
        const nameEl = $('#assistantName');
        const posEl = $('#assistantPosition');
        const msgEl = $('#assistantMessage');

        if (greetingEl) greetingEl.textContent = getGreeting();
        if (nameEl) nameEl.textContent = `${honor} ${user.fullName || ''}`;
        if (posEl) posEl.textContent = `${user.workPosition || ''} • ${user.department || ''}`;
        if (msgEl) msgEl.textContent = randomMessage(honor);
    }
};
