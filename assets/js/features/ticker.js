import { DAYS_VN } from '../core/constants.js';
import { $ } from '../core/utils.js';

export function updateWelcomeTicker() {
    const now = new Date();
    const text = `📅 Hôm nay: ${DAYS_VN[now.getDay()]}, ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}    •    ✨ Chào mừng đến với Trung tâm Điều hành số THPT Hòa Vang    •    🌸 Chúc Quý Thầy, Cô luôn mạnh khỏe - hạnh phúc - một ngày làm việc hiệu quả!`;
    const el = $('#welcomeTicker');
    if (el) el.innerHTML = `<span class="ticker">${text}</span>`;
}
