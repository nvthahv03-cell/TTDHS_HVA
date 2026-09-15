import { Storage } from '../core/storage.js';
import { $ } from '../core/utils.js';

// =====================================================
// HVA ASSISTANT - LỜI CHÀO & DANH XƯNG THỐNG NHẤT
// - CBQL/GV: Nam = Thầy, Nữ = Cô
// - Nhân viên: Nam = Anh, Nữ = Chị
// - 22:00–04:59: Chào khuya + nhắc nghỉ ngơi
// =====================================================

function firstValue(user, keys) {
    for (const key of keys) {
        const value = user?.[key];
        if (value !== undefined && value !== null && String(value).trim()) {
            return String(value).trim();
        }
    }
    return '';
}

function normalizeText(value) {
    return String(value || '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/\s+/g, ' ');
}

function getGender(user) {
    const raw = normalizeText(firstValue(user, [
        'gioiTinh', 'GIOITINH', 'gender', 'sex', 'phai'
    ]));

    if (raw === 'nu' || raw === 'female') return 'NU';
    if (raw === 'nam' || raw === 'male') return 'NAM';

    // Chỉ dùng danh xưng đã có trong hồ sơ làm phương án dự phòng.
    const title = normalizeText(firstValue(user, ['danhXung', 'xungHo']));
    if (['co', 'chi', 'ba'].includes(title)) return 'NU';
    if (['thay', 'anh', 'ong'].includes(title)) return 'NAM';

    return '';
}

function getStaffGroup(user) {
    const raw = normalizeText([
        firstValue(user, ['nhomNhanSu', 'nhom', 'loaiNhanSu', 'doiTuong']),
        firstValue(user, ['role', 'vaiTro']),
        firstValue(user, ['chucDanh', 'chucVu', 'CHUCVU']),
        firstValue(user, ['viTriViecLam', 'viTri', 'workPosition', 'position']),
        firstValue(user, ['department', 'toBoPhan', 'to_BoPhan', 'boPhan'])
    ].filter(Boolean).join(' '));

    if (/(hieu truong|pho hieu truong|ban giam hieu|bgh|cbql|can bo quan ly)/.test(raw)) {
        return 'CBQL';
    }

    if (/(giao vien|teacher|(^| )gv( |$)|ttcm|tpcm|to truong chuyen mon|to pho chuyen mon)/.test(raw)) {
        return 'GV';
    }

    if (/(nhan vien|staff|van thu|giao vu|ke toan|thu vien|y te|bao ve|tap vu|thiet bi)/.test(raw)) {
        return 'NV';
    }

    return '';
}

function getHonorific(user) {
    const gender = getGender(user);
    const group = getStaffGroup(user);

    // Không đoán giới tính khi hồ sơ thiếu dữ liệu.
    if (!gender) return '';

    if (group === 'NV') {
        return gender === 'NU' ? 'Chị' : 'Anh';
    }

    // CBQL/GV và trường hợp chưa phân nhóm nhưng là tài khoản nhà trường:
    // dùng Thầy/Cô theo giới tính.
    return gender === 'NU' ? 'Cô' : 'Thầy';
}

function getGreetingInfo() {
    const h = new Date().getHours();

    if (h >= 22 || h < 5) {
        return {
            text: '🌙 Chào khuya',
            isNight: true,
            hour: h
        };
    }
    if (h < 11) return { text: '🌅 Chào buổi sáng', isNight: false, hour: h };
    if (h < 14) return { text: '☀️ Chào buổi trưa', isNight: false, hour: h };
    if (h < 18) return { text: '🌤️ Chào buổi chiều', isNight: false, hour: h };
    return { text: '🌙 Chào buổi tối', isNight: false, hour: h };
}

function getNightMessage(honor, hour) {
    const subject = honor || 'Thầy/Cô';

    if (hour >= 23 || hour < 5) {
        return `Đã khá khuya rồi, ${subject} nên nghỉ ngơi sớm để giữ sức cho ngày mai nhé.`;
    }

    return `Khuya rồi, ${subject} nhớ nghỉ ngơi sớm nhé!`;
}

function randomMessage(honor, greetingInfo) {
    if (greetingInfo.isNight) {
        return getNightMessage(honor, greetingInfo.hour);
    }

    const subject = honor ? honor.toLowerCase() : 'thầy/cô';
    const list = [
        `Hôm nay tôi có thể hỗ trợ gì cho ${subject}?`,
        `Chúc ${subject} một ngày làm việc hiệu quả.`,
        `Tôi luôn sẵn sàng hỗ trợ công việc của ${subject}.`,
        `Chúc ${subject} thật nhiều năng lượng hôm nay.`
    ];

    return list[Math.floor(Math.random() * list.length)];
}

function renderAssistantGreeting() {
    const user = Storage.getUser() || {};
    const honor = getHonorific(user);
    const greetingInfo = getGreetingInfo();

    const fullName = firstValue(user, [
        'fullName', 'hoTen', 'HO_TEN', 'hoten', 'name', 'username'
    ]);

    const workPosition = firstValue(user, [
        'workPosition', 'viTriViecLam', 'viTri', 'chucVu',
        'CHUCVU', 'position', 'chucDanh', 'vaiTro'
    ]);

    const department = firstValue(user, [
        'department', 'toBoPhan', 'to_BoPhan', 'tenTo',
        'toChuyenMon', 'boPhan', 'donVi'
    ]);

    const greetingEl = $('#assistantGreeting');
    const nameEl = $('#assistantName');
    const posEl = $('#assistantPosition');
    const msgEl = $('#assistantMessage');
    const nightNoteEl = $('#assistantNightNote');

    if (greetingEl) {
        greetingEl.textContent = greetingInfo.text;
    }

    if (nameEl) {
        nameEl.textContent =
            [honor, fullName].filter(Boolean).join(' ') || 'Người dùng HVA';
    }

    if (posEl) {
        const parts = [];
        if (workPosition) parts.push(workPosition);

        if (
            department &&
            normalizeText(department) !== normalizeText(workPosition)
        ) {
            parts.push(department);
        }

        posEl.textContent = parts.join(' • ') || 'HVA Digital';
    }

    if (msgEl) {
        msgEl.textContent = randomMessage(honor, greetingInfo);
    }

    // Nếu HomeRenderer có sẵn dòng assistantNightNote thì dùng luôn.
    // Không tạo thêm DOM mới để tránh làm thay đổi giao diện hiện tại.
    if (nightNoteEl) {
        if (greetingInfo.isNight) {
            nightNoteEl.textContent = getNightMessage(honor, greetingInfo.hour);
            nightNoteEl.classList.remove('hidden');
        } else {
            nightNoteEl.textContent = '';
            nightNoteEl.classList.add('hidden');
        }
    }
}

export const HVAAssistant = {
    render() {
        renderAssistantGreeting();
    }
};
