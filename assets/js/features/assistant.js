import { Storage } from '../core/storage.js';
import { STORAGE_KEYS } from '../core/constants.js';
import { $ } from '../core/utils.js';

// =====================================================
// HVA ASSISTANT V2 REAL DATA - 15/09/2026
// - Xưng danh theo hồ sơ nhân sự
// - Chào theo thời gian, 22:00–04:59 chào khuya
// - Hội thoại ngay trên Home
// - Enter / nút gửi
// - Nhập giọng nói nếu trình duyệt hỗ trợ
// - Đọc dữ liệu nhiệm vụ thật từ Backend HVA theo tài khoản đăng nhập
// - Router tác vụ HVA + điều hướng an toàn
// - Không chứa AI API key ở frontend
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

    const title = normalizeText(firstValue(user, ['danhXung', 'xungHo']));
    if (['co', 'chi', 'ba'].includes(title)) return 'NU';
    if (['thay', 'anh', 'ong'].includes(title)) return 'NAM';
    return '';
}

function isEmployeePosition(value) {
    const p = normalizeText(value);
    return !!p && /(^| )(nhan vien|van thu|giao vu|ke toan|thu vien|y te|bao ve|tap vu|thiet bi|thu quy|lai xe|phuc vu)( |$)/.test(p);
}

function isManagerPosition(value) {
    const p = normalizeText(value);
    return !!p && /(hieu truong|pho hieu truong|ban giam hieu|bgh|can bo quan ly|cbql)/.test(p);
}

function isTeacherPosition(value) {
    const p = normalizeText(value);
    return !!p && /(giao vien|teacher|(^| )gv( |$)|ttcm|tpcm|to truong chuyen mon|to pho chuyen mon)/.test(p);
}

function getStaffGroup(user) {
    const workPosition = firstValue(user, [
        'workPosition', 'viTriViecLam', 'viTri', 'position',
        'chucVu', 'CHUCVU', 'chucDanh'
    ]);

    if (isEmployeePosition(workPosition)) return 'NV';
    if (isManagerPosition(workPosition)) return 'CBQL';
    if (isTeacherPosition(workPosition)) return 'GV';

    const personnelGroup = normalizeText(firstValue(user, [
        'nhomNhanSu', 'nhom', 'loaiNhanSu', 'doiTuong'
    ]));
    if (/(nhan vien|staff)/.test(personnelGroup)) return 'NV';
    if (/(cbql|can bo quan ly|ban giam hieu)/.test(personnelGroup)) return 'CBQL';
    if (/(giao vien|teacher|(^| )gv( |$))/.test(personnelGroup)) return 'GV';

    const role = normalizeText(firstValue(user, ['role', 'vaiTro']));
    if (/(nhan vien|staff|(^| )nv( |$))/.test(role)) return 'NV';
    if (/(cbql|can bo quan ly|ban giam hieu)/.test(role)) return 'CBQL';
    if (/(giao vien|teacher|(^| )gv( |$)|ttcm|tpcm)/.test(role)) return 'GV';

    const dep = normalizeText(firstValue(user, [
        'department', 'toBoPhan', 'to_BoPhan', 'boPhan', 'tenTo'
    ]));
    if (/(van phong|y te|van thu|giao vu|ke toan|thu vien|bao ve|tap vu|thiet bi)/.test(dep)) return 'NV';

    return '';
}

function getHonorific(user) {
    const gender = getGender(user);
    const group = getStaffGroup(user);
    if (!gender) return '';
    if (group === 'NV') return gender === 'NU' ? 'Chị' : 'Anh';
    if (group === 'CBQL' || group === 'GV') return gender === 'NU' ? 'Cô' : 'Thầy';
    return gender === 'NU' ? 'Cô' : 'Thầy';
}

function getGreetingInfo() {
    const h = new Date().getHours();
    if (h >= 22 || h < 5) return { text: '🌙 Chào khuya', isNight: true, hour: h };
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
    if (greetingInfo.isNight) return getNightMessage(honor, greetingInfo.hour);
    const subject = honor ? honor.toLowerCase() : 'thầy/cô';
    const list = [
        `Hôm nay tôi có thể hỗ trợ gì cho ${subject}?`,
        `Chúc ${subject} một ngày làm việc hiệu quả.`,
        `Tôi luôn sẵn sàng hỗ trợ công việc của ${subject}.`,
        `Chúc ${subject} thật nhiều năng lượng hôm nay.`
    ];
    return list[Math.floor(Math.random() * list.length)];
}

function getProfile() {
    // Storage.getUser() là hồ sơ rút gọn dùng cho giao diện.
    // Assistant V2 cần object đăng nhập đầy đủ để lấy đúng username.
    const storedUser = Storage.get(STORAGE_KEYS.USER, {}) || {};
    const compactUser = Storage.getUser() || {};
    const user = { ...compactUser, ...storedUser };

    return {
        raw: user,
        username: firstValue(user, [
            'username', 'userName', 'tenDangNhap', 'maGV', 'maGv', 'account'
        ]),
        honor: getHonorific(user),
        fullName: firstValue(user, [
            'fullName', 'hoTen', 'HO_TEN', 'hoten', 'name', 'username'
        ]),
        workPosition: firstValue(user, [
            'workPosition', 'viTriViecLam', 'viTri', 'position',
            'chucVu', 'CHUCVU', 'chucDanh', 'vaiTro'
        ]),
        department: firstValue(user, [
            'department', 'toBoPhan', 'to_BoPhan', 'tenTo',
            'toChuyenMon', 'boPhan', 'donVi'
        ]),
        group: getStaffGroup(user)
    };
}

function renderAssistantGreeting() {
    const p = getProfile();
    const greetingInfo = getGreetingInfo();

    const greetingEl = $('#assistantGreeting');
    const nameEl = $('#assistantName');
    const posEl = $('#assistantPosition');
    const msgEl = $('#assistantMessage');
    const nightNoteEl = $('#assistantNightNote');

    if (greetingEl) greetingEl.textContent = greetingInfo.text;
    if (nameEl) nameEl.textContent = [p.honor, p.fullName].filter(Boolean).join(' ') || 'Người dùng HVA';

    if (posEl) {
        const parts = [];
        if (p.workPosition) parts.push(p.workPosition);
        if (p.department && normalizeText(p.department) !== normalizeText(p.workPosition)) {
            parts.push(p.department);
        }
        posEl.textContent = parts.join(' • ') || 'HVA Digital';
    }

    if (msgEl) msgEl.textContent = randomMessage(p.honor, greetingInfo);

    if (nightNoteEl) {
        if (greetingInfo.isNight) {
            nightNoteEl.textContent = getNightMessage(p.honor, greetingInfo.hour);
            nightNoteEl.classList.remove('hidden');
        } else {
            nightNoteEl.textContent = '';
            nightNoteEl.classList.add('hidden');
        }
    }
}

function escapeHTML(value) {
    return String(value || '').replace(/[&<>"']/g, ch => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[ch]));
}

function addBubble(role, text, actions = []) {
    const panel = $('#assistantConversation');
    const messages = $('#assistantMessages');
    if (!panel || !messages) return;

    panel.classList.remove('hidden');

    const mine = role === 'user';
    const row = document.createElement('div');
    row.className = `flex ${mine ? 'justify-end' : 'justify-start'}`;

    const actionHTML = actions.length
        ? `<div class="mt-2 flex flex-wrap gap-1.5">
            ${actions.map((a, i) => `
                <button type="button"
                    data-hva-action="${escapeHTML(a.action)}"
                    data-hva-value="${escapeHTML(a.value || '')}"
                    class="hva-ai-action rounded-lg border border-cyan-200/40 bg-white/10 hover:bg-white/20 px-2 py-1 text-[9.5px] font-bold text-cyan-50 transition">
                    ${escapeHTML(a.label)}
                </button>`).join('')}
           </div>`
        : '';

    row.innerHTML = `
        <div class="max-w-[88%] rounded-xl px-2.5 py-2 text-[10.5px] leading-relaxed
            ${mine ? 'bg-cyan-500 text-white rounded-br-sm' : 'bg-white/10 border border-white/15 text-white rounded-bl-sm'}">
            <div>${escapeHTML(text).replace(/\n/g, '<br>')}</div>
            ${actionHTML}
        </div>`;

    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
}

function setBusy(busy) {
    const btn = $('#assistantSendBtn');
    const input = $('#assistantInput');
    if (btn) {
        btn.disabled = busy;
        btn.classList.toggle('opacity-60', busy);
        btn.innerHTML = busy
            ? '<i class="bi bi-three-dots text-[13px]"></i>'
            : '<i class="bi bi-arrow-up text-[11px]"></i>';
    }
    if (input) input.disabled = busy;
}


const HVA_TASK_API_URL =
    'https://script.google.com/macros/s/AKfycbzj-6VHIUrnRfIBvzpM2R9ImU3Ikov8C49xNfB8JhcrN9kJTSBqwRgK63fea_Jbyr4U/exec';

let taskCache = { username: '', at: 0, data: null };
const TASK_CACHE_TTL_MS = 30000;

function isMyWorkQuestion(question) {
    const q = normalizeText(question);
    return /(viec cua toi|nhiem vu cua toi|con viec gi|toi co viec gi|hom nay.*viec|viec.*hom nay|qua han|dang thuc hien|sap den han|sap het han)/.test(q);
}

function parseHVADeadline(value) {
    if (!value) return null;
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value;

    const s = String(value).trim();
    if (!s) return null;

    // dd/MM/yyyy [HH:mm]
    let m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2}))?$/);
    if (m) {
        return new Date(
            Number(m[3]), Number(m[2]) - 1, Number(m[1]),
            Number(m[4] || 23), Number(m[5] || 59), 59
        );
    }

    // yyyy-MM-dd / ISO / giá trị Date parse được.
    const d = new Date(s);
    return Number.isNaN(d.getTime()) ? null : d;
}

function normalizeTaskStatus(value) {
    return normalizeText(value);
}

function isCompletedTask(task) {
    const status = normalizeTaskStatus(task?.trangThai);
    return status.includes('hoan thanh') || Number(task?.tienDo || 0) >= 100;
}

function isOverdueTask(task, now = new Date()) {
    if (isCompletedTask(task)) return false;
    const deadline = parseHVADeadline(task?.hanHoanThanh);
    return !!deadline && deadline.getTime() < now.getTime();
}

function formatDeadline(value) {
    const d = parseHVADeadline(value);
    if (!d) return String(value || '').trim();
    const hasTime = /\d{1,2}:\d{2}/.test(String(value || ''));
    return d.toLocaleDateString('vi-VN') +
        (hasTime ? ` ${d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}` : '');
}

function taskTimeValue(task) {
    const d = parseHVADeadline(task?.hanHoanThanh);
    return d ? d.getTime() : Number.MAX_SAFE_INTEGER;
}

async function fetchMyTasks({ force = false } = {}) {
    const p = getProfile();
    if (!p.username) throw new Error('MISSING_USERNAME');

    const now = Date.now();
    if (!force && taskCache.username === p.username &&
        Array.isArray(taskCache.data) && now - taskCache.at < TASK_CACHE_TTL_MS) {
        return taskCache.data;
    }

    const url = HVA_TASK_API_URL +
        '?action=getTaskByUser&username=' + encodeURIComponent(p.username) +
        '&_=' + now;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    try {
        const response = await fetch(url, { method: 'GET', cache: 'no-store', signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP_${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('INVALID_TASK_DATA');
        taskCache = { username: p.username, at: Date.now(), data };
        return data;
    } finally {
        clearTimeout(timeoutId);
    }
}

function buildMyWorkAnswer(tasks) {
    const p = getProfile();
    const call = p.honor || 'Thầy/Cô';
    const now = new Date();
    const all = Array.isArray(tasks) ? tasks : [];

    const completed = [], overdue = [], doing = [], assigned = [];
    for (const task of all) {
        if (isCompletedTask(task)) completed.push(task);
        else if (isOverdueTask(task, now)) overdue.push(task);
        else if (normalizeTaskStatus(task?.trangThai).includes('dang thuc hien')) doing.push(task);
        else assigned.push(task);
    }

    const active = [...assigned, ...doing, ...overdue];
    if (!active.length) {
        return {
            text: `${call} hiện không có nhiệm vụ nào đang chờ xử lý trong “Việc của tôi”.`,
            actions: [{ label: 'Mở Việc của tôi', action: 'mywork', value: '' }]
        };
    }

    const lines = [`${call} hiện có ${active.length} nhiệm vụ cần theo dõi.`];
    if (assigned.length) lines.push(`• ${assigned.length} việc được giao`);
    if (doing.length) lines.push(`• ${doing.length} việc đang thực hiện`);
    if (overdue.length) lines.push(`• ${overdue.length} việc quá hạn`);

    if (overdue.length) {
        const t = overdue.slice().sort((x,y) => taskTimeValue(x)-taskTimeValue(y))[0];
        lines.push('', `Cần ưu tiên: ${String(t.tieuDe || t.noiDung || 'Nhiệm vụ').trim()}${t.hanHoanThanh ? ` — hạn ${formatDeadline(t.hanHoanThanh)}` : ''}.`);
    } else {
        const future = [...assigned, ...doing].filter(t => parseHVADeadline(t.hanHoanThanh))
            .sort((x,y) => taskTimeValue(x)-taskTimeValue(y));
        if (future[0]) {
            const t = future[0];
            lines.push('', `Gần hạn nhất: ${String(t.tieuDe || t.noiDung || 'Nhiệm vụ').trim()} — hạn ${formatDeadline(t.hanHoanThanh)}.`);
        }
    }
    return {
        text: lines.join('\n'),
        actions: [{ label: `Xem ${active.length} việc`, action: 'mywork', value: '' }]
    };
}

async function answerMyWorkFromBackend() {
    try {
        const tasks = await fetchMyTasks();
        return buildMyWorkAnswer(tasks);
    } catch (error) {
        console.error('[HVA Assistant][MyWork]', error);

        if (error?.message === 'MISSING_USERNAME') {
            return {
                text: 'Em chưa xác định được tên đăng nhập của tài khoản hiện tại. Vui lòng đăng xuất và đăng nhập lại HVA.',
                actions: []
            };
        }

        return {
            text: 'Em chưa đọc được dữ liệu “Việc của tôi” từ HVA lúc này. Thầy/Cô có thể mở trực tiếp khu vực này và thử lại sau.',
            actions: [{ label: 'Mở Việc của tôi', action: 'mywork', value: '' }]
        };
    }
}

function localAssistantAnswer(question) {
    const p = getProfile();
    const q = normalizeText(question);
    const call = p.honor || 'Thầy/Cô';
    const name = [p.honor, p.fullName].filter(Boolean).join(' ');

    if (/^(xin chao|chao|hello|hi)\b/.test(q)) {
        return { text: `Xin chào ${name || call}. HVA Assistant đã sẵn sàng hỗ trợ.` };
    }

    if (/(toi la ai|thong tin cua toi|ho so cua toi|tai khoan cua toi)/.test(q)) {
        return {
            text: `${name || 'Tài khoản HVA'}${p.workPosition ? ` • ${p.workPosition}` : ''}${p.department ? ` • ${p.department}` : ''}.`
        };
    }

    if (/(lich ca nhan|lich cua toi|google calendar)/.test(q)) {
        return {
            text: `${call} có thể mở Lịch cá nhân để xem ngày–tuần–tháng, nhắc việc và Google Calendar.`,
            actions: [{ label: 'Mở Lịch cá nhân', action: 'href', value: 'LichCaNhan.html' }]
        };
    }

    if (/(lich cong tac|lich tuan|lich thang)/.test(q)) {
        return {
            text: `Em mở khu vực Lịch công tác để ${call.toLowerCase()} xem lịch của nhà trường.`,
            actions: [{ label: 'Mở Lịch công tác', action: 'module', value: 'lich-tuan' }]
        };
    }

    if (/(van ban|kho van ban|tra cuu van ban)/.test(q)) {
        return {
            text: `${call} có thể vào Kho văn bản để tra cứu văn bản HVA.`,
            actions: [{ label: 'Mở Kho văn bản', action: 'href', value: 'Vanban.html' }]
        };
    }

    if (/(hom nay ngay may|ngay hom nay|may gio|gio bay gio)/.test(q)) {
        const now = new Date();
        return {
            text: `Bây giờ là ${now.toLocaleTimeString('vi-VN', {hour:'2-digit', minute:'2-digit'})}, ngày ${now.toLocaleDateString('vi-VN')}.`
        };
    }

    if (/(lam duoc gi|giup duoc gi|chuc nang|tro giup|huong dan)/.test(q)) {
        return {
            text: `HVA Assistant hiện đã đọc được dữ liệu thật của “Việc của tôi” theo tài khoản đăng nhập; đồng thời hỗ trợ mở Lịch cá nhân, Lịch công tác và Kho văn bản. Các nguồn dữ liệu HVA khác sẽ được nối tiếp theo từng nghiệp vụ.`,
            actions: [
                { label: 'Lịch cá nhân', action: 'href', value: 'LichCaNhan.html' },
                { label: 'Việc của tôi', action: 'mywork', value: '' },
                { label: 'Kho văn bản', action: 'href', value: 'Vanban.html' }
            ]
        };
    }

    return {
        text: `Thầy/Cô muốn hỏi gì khác thì cứ nói hoặc soạn tin nhắn nhé. Em sẽ hỗ trợ hoặc chuyển đến trợ lý ảo khi phù hợp.`,
        actions: [{ label: 'Xem gợi ý', action: 'suggest', value: '' }]
    };
}

async function handleQuestion(rawQuestion) {
    const input = $('#assistantInput');
    const question = String(rawQuestion ?? input?.value ?? '').trim();
    if (!question) {
        input?.focus();
        return;
    }

    if (input) input.value = '';
    addBubble('user', question);
    setBusy(true);

    try {
        // V2: câu hỏi về “Việc của tôi” đọc dữ liệu thật từ Backend HVA.
        // Các tác vụ chưa nối dữ liệu vẫn dùng router cục bộ an toàn.
        const answer = isMyWorkQuestion(question)
            ? await answerMyWorkFromBackend()
            : localAssistantAnswer(question);

        addBubble('assistant', answer.text, answer.actions || []);
    } catch (error) {
        console.error('[HVA Assistant]', error);
        addBubble('assistant', 'HVA Assistant đang gặp lỗi xử lý. Vui lòng thử lại.');
    } finally {
        setBusy(false);
        input?.focus();
    }
}

function runAction(action, value) {
    if (action === 'href' && value) {
        window.location.href = value;
        return;
    }

    if (action === 'module' && value) {
        if (typeof window.loadModule === 'function') {
            window.loadModule(value);
        } else {
            addBubble('assistant', 'Chức năng điều hướng module chưa sẵn sàng trên trang này.');
        }
        return;
    }

    if (action === 'mywork') {
        const btn = $('#btn-my-work');
        if (btn) btn.click();
        else addBubble('assistant', 'Không tìm thấy khu vực “Việc của tôi” trên trang hiện tại.');
        return;
    }

    if (action === 'prompt' && value) {
        const input = $('#assistantInput');
        if (input) input.value = value;
        handleQuestion(value);
        return;
    }
    if (action === 'suggest') toggleSuggestions(true);
}

const ASSISTANT_SUGGESTIONS = [
    'Tóm tắt ngày làm việc của tôi',
    'Hôm nay tôi có việc gì?',
    'Việc nào cần ưu tiên xử lý?',
    'Việc nào sắp đến hạn?',
    'Lịch tuần có thay đổi, bổ sung không?',
    'Sáng thứ Bảy tuần này có cuộc họp nào không?',
    'Có khảo sát, bình chọn nào sắp hết hạn không?',
    'Tôi có thông báo mới nào chưa đọc?'
];

function renderSuggestions() {
    const list = $('#assistantSuggestList');
    if (!list || list.dataset.hvaReady === '1') return;
    list.dataset.hvaReady = '1';
    const frag = document.createDocumentFragment();
    ASSISTANT_SUGGESTIONS.forEach(text => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'hva-assistant-suggestion w-full text-left rounded-lg px-2.5 py-1.5 text-[9.5px] font-semibold text-cyan-50 bg-white/10 hover:bg-white/20 transition';
        btn.textContent = text;
        btn.dataset.prompt = text;
        frag.appendChild(btn);
    });
    const note = document.createElement('div');
    note.className = 'px-2.5 pt-1.5 pb-1 text-[9px] leading-snug text-cyan-100/90';
    note.textContent = '💬 Thầy/Cô muốn hỏi gì khác thì cứ nói hoặc soạn tin nhắn nhé. Em sẽ hỗ trợ hoặc chuyển đến trợ lý ảo khi phù hợp.';
    frag.appendChild(note);
    list.appendChild(frag);
}
function toggleSuggestions(forceOpen = null) {
    const panel = $('#assistantSuggestPanel');
    if (!panel) return;
    renderSuggestions();
    const open = forceOpen === null ? panel.classList.contains('hidden') : !!forceOpen;
    panel.classList.toggle('hidden', !open);
}

function bindConversation() {
    const input = $('#assistantInput');
    const send = $('#assistantSendBtn');
    const mic = $('#assistantMicBtn');
    const clear = $('#assistantClearBtn');
    const suggestBtn = $('#assistantSuggestBtn');
    const suggestList = $('#assistantSuggestList');
    const messages = $('#assistantMessages');

    if (!input || !send) return;

    // Chống bind trùng khi Home render lại.
    if (send.dataset.hvaBound === '1') return;
    send.dataset.hvaBound = '1';

    send.addEventListener('click', () => handleQuestion());

    input.addEventListener('keydown', event => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleQuestion();
        }
    });

    messages?.addEventListener('click', event => {
        const btn = event.target.closest('.hva-ai-action');
        if (!btn) return;
        runAction(btn.dataset.hvaAction, btn.dataset.hvaValue);
    });

    clear?.addEventListener('click', () => {
        if (messages) messages.innerHTML = '';
        $('#assistantConversation')?.classList.add('hidden');
        $('#assistantSuggestPanel')?.classList.add('hidden');
        input.value = '';
        input.focus();
    });

    suggestBtn?.addEventListener('click', () => toggleSuggestions());
    suggestList?.addEventListener('click', event => {
        const btn = event.target.closest('.hva-assistant-suggestion');
        if (!btn) return;
        const prompt = btn.dataset.prompt || '';
        toggleSuggestions(false);
        if (prompt) handleQuestion(prompt);
    });

    if (mic) {
        mic.addEventListener('click', () => startVoiceInput(mic, input));
    }
}

function startVoiceInput(mic, input) {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
        addBubble('assistant', 'Trình duyệt này chưa hỗ trợ nhập giọng nói. Có thể gõ câu hỏi và nhấn Enter.');
        return;
    }

    const recognition = new Recognition();
    recognition.lang = 'vi-VN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    mic.classList.add('animate-pulse');
    mic.title = 'Đang nghe...';

    recognition.onresult = event => {
        const text = event.results?.[0]?.[0]?.transcript || '';
        if (input) {
            input.value = text;
            input.focus();
        }
    };

    recognition.onerror = () => {
        addBubble('assistant', 'Em chưa nghe rõ. Vui lòng thử lại hoặc nhập bằng bàn phím.');
    };

    recognition.onend = () => {
        mic.classList.remove('animate-pulse');
        mic.title = 'Nhập bằng giọng nói';
    };

    recognition.start();
}

export const HVAAssistant = {
    render() {
        renderAssistantGreeting();
        bindConversation();
    }
};
