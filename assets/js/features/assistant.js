import { Storage } from '../core/storage.js';
import { $ } from '../core/utils.js';

// =====================================================
// HVA ASSISTANT - DANH XƯNG & LỜI CHÀO THỐNG NHẤT
//
// QUY TẮC CHỐT:
// 1. CBQL / Giáo viên:
//    - Nam -> Thầy
//    - Nữ  -> Cô
// 2. Nhân viên:
//    - Nam -> Anh
//    - Nữ  -> Chị
// 3. Ưu tiên nhận diện NHÂN VIÊN theo Vị trí việc làm / chức vụ
//    trước khi xét các vai trò hệ thống khác.
// 4. 22:00–04:59: Chào khuya + nhắc nghỉ ngơi.
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
        'gioiTinh', 'gender', 'GIOITINH', 'sex', 'phai'
    ]));

    if (raw === 'nu' || raw === 'female') return 'NU';
    if (raw === 'nam' || raw === 'male') return 'NAM';

    // Chỉ dùng danh xưng có sẵn trong hồ sơ làm fallback.
    const title = normalizeText(firstValue(user, ['danhXung', 'xungHo']));
    if (['co', 'chi', 'ba'].includes(title)) return 'NU';
    if (['thay', 'anh', 'ong'].includes(title)) return 'NAM';

    return '';
}

function isEmployeePosition(value) {
    const p = normalizeText(value);
    if (!p) return false;

    // Nhóm vị trí nhân viên trường học.
    return /(^| )(nhan vien|van thu|giao vu|ke toan|thu vien|y te|bao ve|tap vu|thiet bi|thu quy|lai xe|phuc vu)( |$)/.test(p);
}

function isManagerPosition(value) {
    const p = normalizeText(value);
    if (!p) return false;

    return /(hieu truong|pho hieu truong|ban giam hieu|bgh|can bo quan ly|cbql)/.test(p);
}

function isTeacherPosition(value) {
    const p = normalizeText(value);
    if (!p) return false;

    return /(giao vien|teacher|(^| )gv( |$)|ttcm|tpcm|to truong chuyen mon|to pho chuyen mon)/.test(p);
}

function getStaffGroup(user) {
    // -------------------------------------------------
    // ƯU TIÊN 1: Vị trí việc làm / chức vụ thực tế.
    // Đây là nguồn quyết định cách xưng hô.
    // -------------------------------------------------
    const workPosition = firstValue(user, [
        'workPosition',
        'viTriViecLam',
        'viTri',
        'position',
        'chucVu',
        'CHUCVU',
        'chucDanh'
    ]);

    // Nếu vị trí việc làm là Nhân viên thì CHỐT NV ngay,
    // không để role/vaiTro hệ thống phía sau ghi đè.
    if (isEmployeePosition(workPosition)) return 'NV';

    if (isManagerPosition(workPosition)) return 'CBQL';

    if (isTeacherPosition(workPosition)) return 'GV';

    // -------------------------------------------------
    // ƯU TIÊN 2: Nhóm nhân sự / vai trò nghiệp vụ.
    // Chỉ dùng khi Vị trí việc làm chưa đủ để phân nhóm.
    // -------------------------------------------------
    const personnelGroup = normalizeText(firstValue(user, [
        'nhomNhanSu',
        'nhom',
        'loaiNhanSu',
        'doiTuong'
    ]));

    if (/(nhan vien|staff)/.test(personnelGroup)) return 'NV';
    if (/(cbql|can bo quan ly|ban giam hieu)/.test(personnelGroup)) return 'CBQL';
    if (/(giao vien|teacher|(^| )gv( |$))/.test(personnelGroup)) return 'GV';

    // -------------------------------------------------
    // ƯU TIÊN 3: role/vaiTro hệ thống.
    // Không cho role hệ thống làm mất phân loại NV đã có.
    // -------------------------------------------------
    const role = normalizeText(firstValue(user, [
        'role',
        'vaiTro'
    ]));

    if (/(nhan vien|staff|(^| )nv( |$))/.test(role)) return 'NV';
    if (/(cbql|can bo quan ly|ban giam hieu)/.test(role)) return 'CBQL';
    if (/(giao vien|teacher|(^| )gv( |$)|ttcm|tpcm)/.test(role)) return 'GV';

    // -------------------------------------------------
    // ƯU TIÊN 4: Tổ/Bộ phận - chỉ làm fallback.
    // -------------------------------------------------
    const department = firstValue(user, [
        'department',
        'toBoPhan',
        'to_BoPhan',
        'boPhan',
        'tenTo'
    ]);

    const dep = normalizeText(department);

    if (
        /(van phong|y te|van thu|giao vu|ke toan|thu vien|bao ve|tap vu|thiet bi)/.test(dep)
    ) {
        return 'NV';
    }

    return '';
}

function getHonorific(user) {
    const gender = getGender(user);
    const group = getStaffGroup(user);

    // Không đoán giới tính nếu CSDL chưa có dữ liệu.
    if (!gender) return '';

    if (group === 'NV') {
        return gender === 'NU' ? 'Chị' : 'Anh';
    }

    if (group === 'CBQL' || group === 'GV') {
        return gender === 'NU' ? 'Cô' : 'Thầy';
    }

    // Nếu chưa phân nhóm được nhưng đã có giới tính:
    // dùng cách xưng hô nhà trường mặc định Thầy/Cô.
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

    if (h < 11) {
        return { text: '🌅 Chào buổi sáng', isNight: false, hour: h };
    }

    if (h < 14) {
        return { text: '☀️ Chào buổi trưa', isNight: false, hour: h };
    }

    if (h < 18) {
        return { text: '🌤️ Chào buổi chiều', isNight: false, hour: h };
    }

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
        'fullName',
        'hoTen',
        'HO_TEN',
        'hoten',
        'name',
        'username'
    ]);

    const workPosition = firstValue(user, [
        'workPosition',
        'viTriViecLam',
        'viTri',
        'position',
        'chucVu',
        'CHUCVU',
        'chucDanh',
        'vaiTro'
    ]);

    const department = firstValue(user, [
        'department',
        'toBoPhan',
        'to_BoPhan',
        'tenTo',
        'toChuyenMon',
        'boPhan',
        'donVi'
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

        if (workPosition) {
            parts.push(workPosition);
        }

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

    // HomeRenderer đã có sẵn assistantNightNote.
    // Chỉ cập nhật nội dung, không tạo DOM mới.
    if (nightNoteEl) {
        if (greetingInfo.isNight) {
            nightNoteEl.textContent =
                getNightMessage(honor, greetingInfo.hour);
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
