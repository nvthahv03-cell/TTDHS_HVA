import { Storage } from '../core/storage.js';
import { $ } from '../core/utils.js';

// =====================================================
// HVA ASSISTANT V1 - 15/09/2026
// - Xưng danh theo hồ sơ nhân sự
// - Chào theo thời gian, 22:00–04:59 chào khuya
// - Hội thoại ngay trên Home
// - Enter / nút gửi
// - Nhập giọng nói nếu trình duyệt hỗ trợ
// - Router tác vụ HVA an toàn (chỉ điều hướng/tra cứu cục bộ)
// - Không chứa API key; sẵn điểm nối Backend AI ở V2
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
    const user = Storage.getUser() || {};
    return {
        raw: user,
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

    if (/(viec cua toi|nhiem vu cua toi|con viec gi|viec gi|qua han|dang thuc hien)/.test(q)) {
        return {
            text: `Em có thể mở “Việc của tôi”. Ở V1 em chưa tự đọc số liệu backend để tránh trả lời sai; bước kế tiếp sẽ nối dữ liệu nhiệm vụ thật.`,
            actions: [{ label: 'Mở Việc của tôi', action: 'mywork', value: '' }]
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
            text: `V1 hiện hỗ trợ nhận diện tài khoản, hội thoại trên Home, mở Lịch cá nhân, Lịch công tác, Việc của tôi và Kho văn bản. AI tổng hợp dữ liệu HVA sẽ được nối qua Backend ở V2.`,
            actions: [
                { label: 'Lịch cá nhân', action: 'href', value: 'LichCaNhan.html' },
                { label: 'Việc của tôi', action: 'mywork', value: '' },
                { label: 'Kho văn bản', action: 'href', value: 'Vanban.html' }
            ]
        };
    }

    return {
        text: `Em đã nhận câu hỏi của ${call.toLowerCase()}. HVA Assistant V1 hiện mới xử lý các tác vụ HVA cục bộ; câu hỏi mở/soạn thảo/tổng hợp sẽ hoạt động khi mình nối Backend AI ở bước tiếp theo.`,
        actions: [{ label: 'Xem khả năng V1', action: 'prompt', value: 'Bạn làm được gì?' }]
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
        // V1: router cục bộ, KHÔNG giả lập AI và KHÔNG để API key ở frontend.
        // V2: thay khối dưới bằng fetch tới Backend HVA Assistant.
        const answer = localAssistantAnswer(question);
        await new Promise(resolve => setTimeout(resolve, 180));
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
    }
}

function bindConversation() {
    const input = $('#assistantInput');
    const send = $('#assistantSendBtn');
    const mic = $('#assistantMicBtn');
    const clear = $('#assistantClearBtn');
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
        input.focus();
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
