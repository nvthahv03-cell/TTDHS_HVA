/* =========================================================
   HVA ADMINISTRATIVE PREVIEW
   Bộ XEM TRƯỚC dùng chung cho TTĐHS_HVA
   Dùng cho: Họp/Hội nghị - Giao việc - Thông báo - Văn bản...
   ---------------------------------------------------------
   CHỈ XEM:
   - Không gọi API
   - Không lưu
   - Không phát hành
   - Không phụ thuộc WEB_APP_URL
   ========================================================= */
(function () {
    'use strict';
    const HVA_PREVIEW_ID = 'hvaAdministrativePreview';

    /* =====================================================
       1. TIỆN ÍCH
       ===================================================== */
    function esc(value = '') {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function valueOrDash(value) {
        const v = String(value ?? '').trim();
        return v || '—';
    }

    function formatDateVN(value) {
        if (!value) return '—';
        const raw = String(value).trim();
        // yyyy-mm-dd
        if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
            const [y, m, d] = raw.split('-');
            return `${d}/${m}/${y}`;
        }
        return raw;
    }

    function formatMultiline(value) {
        const text = String(value ?? '').trim();
        if (!text) {
            return `
                <span class="hva-preview-empty">
                    Chưa nhập nội dung
                </span>
            `;
        }
        return esc(text).replace(/\n/g, '<br>');
    }

    /* =====================================================
       2. CHUẨN HÓA DANH SÁCH NGƯỜI NHẬN
       ===================================================== */
    function normalizeRecipients(list = []) {
        if (!Array.isArray(list)) return [];
        const result = [];
        const seen = new Set();
        list.forEach(item => {
            let person;
            if (typeof item === 'string') {
                person = {
                    username: item,
                    hoTen: item,
                    chucVu: '',
                    tenTo: ''
                };
            } else {
                item = item || {};
                person = {
                    username:
                        item.username ||
                        item.userName ||
                        item.maGV ||
                        item.id ||
                        '',
                    hoTen:
                        item.hoTen ||
                        item.fullName ||
                        item.name ||
                        item.username ||
                        '',
                    chucVu:
                        item.chucVu ||
                        item.position ||
                        item.vaiTro ||
                        '',
                    tenTo:
                        item.tenTo ||
                        item.department ||
                        item.to ||
                        ''
                };
            }
            const key =
                person.username ||
                person.hoTen;
            if (!key) return;
            if (seen.has(key)) return;
            seen.add(key);
            result.push(person);
        });
        return result;
    }

    /* =====================================================
       3. CSS
       ===================================================== */
    function ensureStyle() {
        if (
            document.getElementById(
                'hvaAdministrativePreviewStyle'
            )
        ) {
            return;
        }
        const style =
            document.createElement('style');
        style.id =
            'hvaAdministrativePreviewStyle';
        style.textContent = `
        #${HVA_PREVIEW_ID} {
            position: fixed;
            inset: 0;
            z-index: 999999;
            font-family: Arial, sans-serif;
        }
        #${HVA_PREVIEW_ID} * {
            box-sizing: border-box;
        }
        .hva-preview-backdrop {
            position: absolute;
            inset: 0;
            background: rgba(15,23,42,.68);
            backdrop-filter: blur(4px);
        }
        .hva-preview-window {
            position: absolute;
            top: 20px;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: min(900px, calc(100vw - 30px));
            display: flex;
            flex-direction: column;
            background: #edf3f8;
            border-radius: 20px;
            overflow: hidden;
            box-shadow:
                0 25px 70px
                rgba(15,23,42,.35);
        }
        /* HEADER */
        .hva-preview-header {
            min-height: 62px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 11px 15px;
            color: white;
            background:
                linear-gradient(
                    135deg,
                    #0F4C81,
                    #176B9C,
                    #1596BD
                );
        }
        .hva-preview-header-left {
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 0;
        }
        .hva-preview-header-icon {
            width: 38px;
            height: 38px;
            border-radius: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255,255,255,.15);
            border:
                1px solid
                rgba(255,255,255,.22);
            flex-shrink: 0;
        }
        .hva-preview-header-title {
            font-size: 13px;
            font-weight: 800;
        }
        .hva-preview-header-sub {
            margin-top: 2px;
            font-size: 9px;
            color:
                rgba(255,255,255,.78);
        }
        .hva-preview-close {
            width: 36px;
            height: 36px;
            border: none;
            border-radius: 10px;
            background:
                rgba(255,255,255,.14);
            color: white;
            cursor: pointer;
        }
        /* BODY */
        .hva-preview-body {
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            padding: 18px;
        }
        /* PAPER */
        .hva-preview-paper {
            position: relative;
            max-width: 760px;
            min-height: 760px;
            margin: auto;
            padding:
                35px 42px 40px;
            background: white;
            border:
                1px solid #dbe4ee;
            box-shadow:
                0 8px 25px
                rgba(15,76,129,.08);
            overflow: hidden;
        }
        /* WATERMARK */
        .hva-preview-watermark {
            position: absolute;
            left: 50%;
            top: 48%;
            transform:
                translate(-50%, -50%)
                rotate(-25deg);
            font-size: 50px;
            font-weight: 900;
            color:
                rgba(15,76,129,.045);
            white-space: nowrap;
            pointer-events: none;
        }
        /* QUỐC HIỆU */
        .hva-preview-letterhead {
            position: relative;
            z-index: 1;
            display: grid;
            grid-template-columns:
                1fr 1.25fr;
            gap: 25px;
            text-align: center;
            font-family:
                "Times New Roman",
                serif;
            color: #111827;
        }
        .hva-preview-agency {
            font-size: 12px;
            line-height: 1.45;
        }
        .hva-preview-school {
            font-size: 12px;
            line-height: 1.45;
            font-weight: bold;
        }
        .hva-preview-national {
            font-size: 12px;
            line-height: 1.45;
            font-weight: bold;
        }
        .hva-preview-motto {
            margin-top: 2px;
            font-size: 12px;
            font-weight: bold;
        }
        .hva-preview-line {
            height: 1px;
            width: 100px;
            margin: 5px auto;
            background: #111827;
        }
        .hva-preview-line.long {
            width: 145px;
        }
        /* TITLE */
        .hva-preview-document-title {
            position: relative;
            z-index: 1;
            margin-top: 30px;
            text-align: center;
            font-family:
                "Times New Roman",
                serif;
        }
        .hva-preview-document-type {
            font-size: 19px;
            font-weight: bold;
        }
        .hva-preview-document-name {
            max-width: 620px;
            margin:
                7px auto 0;
            font-size: 16px;
            font-weight: bold;
            line-height: 1.45;
        }
        /* BADGE */
        .hva-preview-badges {
            position: relative;
            z-index: 1;
            margin-top: 16px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 6px;
        }
        .hva-preview-badge {
            padding:
                5px 9px;
            border-radius: 999px;
            font-size: 9px;
            font-weight: bold;
            color: #0F4C81;
            background: #f0f7fd;
            border:
                1px solid #d4e5f3;
        }
        /* INFORMATION */
        .hva-preview-info {
            position: relative;
            z-index: 1;
            margin-top: 22px;
            border:
                1px solid #d9e3ed;
            border-radius: 11px;
            overflow: hidden;
        }
        .hva-preview-info-row {
            display: grid;
            grid-template-columns:
                140px 1fr;
            border-bottom:
                1px solid #e6edf3;
        }
        .hva-preview-info-row:last-child {
            border-bottom: none;
        }
        .hva-preview-info-label {
            padding: 10px 11px;
            background: #f7fafc;
            color: #0F4C81;
            font-size: 10px;
            font-weight: bold;
        }
        .hva-preview-info-value {
            padding: 10px 12px;
            color: #273449;
            font-size: 11px;
            line-height: 1.5;
        }
        /* SECTION */
        .hva-preview-section {
            position: relative;
            z-index: 1;
            margin-top: 23px;
        }
        .hva-preview-section-title {
            padding-bottom: 7px;
            border-bottom:
                1px solid #cfd9e4;
            color: #0F4C81;
            font-size: 10.5px;
            font-weight: 800;
        }
        .hva-preview-section-content {
            padding-top: 10px;
            color: #263244;
            font-family:
                "Times New Roman",
                serif;
            font-size: 14px;
            line-height: 1.65;
            text-align: justify;
        }
        .hva-preview-empty {
            color: #94a3b8;
            font-style: italic;
        }
        /* RECIPIENT */
        .hva-preview-recipient-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
        }
        .hva-preview-count {
            color: #64748b;
            font-size: 9px;
            font-weight: normal;
        }
        .hva-preview-recipient-grid {
            margin-top: 10px;
            display: grid;
            grid-template-columns:
                repeat(2, 1fr);
            gap: 7px;
        }
        .hva-preview-person {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px;
            border:
                1px solid #e1e8f0;
            border-radius: 9px;
            background: #fbfdff;
        }
        .hva-preview-avatar {
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            flex-shrink: 0;
            background: #e8f3fb;
            color: #0F4C81;
            font-size: 9px;
            font-weight: bold;
        }
        .hva-preview-person-name {
            font-size: 10px;
            font-weight: bold;
            color: #263244;
        }
        .hva-preview-person-meta {
            margin-top: 2px;
            font-size: 8px;
            color: #94a3b8;
        }
        /* SIGN */
        .hva-preview-signature {
            position: relative;
            z-index: 1;
            margin-top: 32px;
            display: grid;
            grid-template-columns:
                1fr 1fr;
            font-family:
                "Times New Roman",
                serif;
            text-align: center;
        }
        .hva-preview-sign-right {
            min-height: 115px;
        }
        .hva-preview-sign-date {
            font-size: 12px;
            font-style: italic;
        }
        .hva-preview-sign-role {
            margin-top: 5px;
            font-size: 12px;
            font-weight: bold;
        }
        .hva-preview-sign-note {
            margin-top: 5px;
            font-size: 9px;
            color: #64748b;
            font-style: italic;
        }
        /* FOOTER */
        .hva-preview-footer {
            padding: 10px 14px;
            display: flex;
            justify-content:
                space-between;
            align-items: center;
            gap: 10px;
            background: white;
            border-top:
                1px solid #dbe4ee;
        }
        .hva-preview-footer-note {
            color: #64748b;
            font-size: 9px;
        }
        .hva-preview-footer-buttons {
            display: flex;
            gap: 8px;
        }
        .hva-preview-btn {
            min-height: 38px;
            padding: 0 14px;
            border-radius: 10px;
            font-size: 10px;
            font-weight: bold;
            cursor: pointer;
        }
        .hva-preview-btn-back {
            color: #475569;
            background: white;
            border:
                1px solid #cbd5e1;
        }
        .hva-preview-btn-ok {
            color: white;
            background: #0F4C81;
            border:
                1px solid #0F4C81;
        }
        /* MOBILE */
        @media (max-width: 640px) {
            .hva-preview-window {
                top: 7px;
                bottom: 7px;
                width:
                    calc(100vw - 14px);
                border-radius: 16px;
            }
            .hva-preview-body {
                padding: 7px;
            }
            .hva-preview-paper {
                min-height: 0;
                padding:
                    24px 16px 30px;
            }
            .hva-preview-letterhead {
                grid-template-columns: 1fr;
                gap: 12px;
            }
            .hva-preview-national-wrap {
                padding-top: 10px;
                border-top:
                    1px dashed #dbe4ee;
            }
            .hva-preview-info-row {
                grid-template-columns:
                    105px 1fr;
            }
            .hva-preview-recipient-grid {
                grid-template-columns: 1fr;
            }
            .hva-preview-signature {
                grid-template-columns: 1fr;
            }
            .hva-preview-sign-left {
                display: none;
            }
            .hva-preview-footer-note {
                display: none;
            }
            .hva-preview-footer-buttons {
                width: 100%;
            }
            .hva-preview-btn {
                flex: 1;
            }
        }
        `;
        document.head.appendChild(style);
    }

    /* =====================================================
       4. INFO ROW
       ===================================================== */
    function infoRow(label, value) {
        return `
            <div class="hva-preview-info-row">
                <div class="hva-preview-info-label">
                    ${esc(label)}
                </div>
                <div class="hva-preview-info-value">
                    ${esc(valueOrDash(value))}
                </div>
            </div>
        `;
    }

    /* =====================================================
       5. NGƯỜI NHẬN
       ===================================================== */
    function renderRecipients(list) {
        const recipients =
            normalizeRecipients(list);
        if (!recipients.length) {
            return `
                <section class="hva-preview-section">
                    <div class="hva-preview-section-title">
                        THÀNH PHẦN NHẬN THÔNG BÁO
                    </div>
                    <div class="hva-preview-section-content">
                        <span class="hva-preview-empty">
                            Chưa chọn người nhận.
                        </span>
                    </div>
                </section>
            `;
        }
        const html =
            recipients.map(person => {
                const meta =
                    [
                        person.chucVu,
                        person.tenTo
                    ]
                    .filter(Boolean)
                    .join(' • ');
                const name =
                    person.hoTen ||
                    person.username;
                const initials =
                    String(name)
                    .trim()
                    .split(/\s+/)
                    .slice(-2)
                    .map(x => x.charAt(0))
                    .join('')
                    .toUpperCase();
                return `
                    <div class="hva-preview-person">
                        <div class="hva-preview-avatar">
                            ${esc(initials || 'HV')}
                        </div>
                        <div>
                            <div class="hva-preview-person-name">
                                ${esc(name)}
                            </div>
                            ${
                                meta
                                ? `
                                    <div class="hva-preview-person-meta">
                                        ${esc(meta)}
                                    </div>
                                `
                                : ''
                            }
                        </div>
                    </div>
                `;
            }).join('');
        return `
            <section class="hva-preview-section">
                <div
                    class="
                        hva-preview-section-title
                        hva-preview-recipient-head
                    "
                >
                    <span>
                        THÀNH PHẦN NHẬN THÔNG BÁO
                    </span>
                    <span class="hva-preview-count">
                        ${recipients.length} người
                    </span>
                </div>
                <div class="hva-preview-recipient-grid">
                    ${html}
                </div>
            </section>
        `;
    }

    /* =====================================================
       6. TẠO NỘI DUNG HỌP
       ===================================================== */
    function buildMeeting(data) {
        const timeText =
            [
                data.time,
                data.date
                    ? formatDateVN(data.date)
                    : '',
                data.session
                    ? `Buổi ${data.session}`
                    : ''
            ]
            .filter(Boolean)
            .join(' • ');
       const meetingDateTime =
    [
        data.time,
        data.date
            ? `${getVietnameseWeekday(data.date)}, ngày ${formatDateVN(data.date)}`
            : ''
    ]
    .filter(Boolean)
    .join(' • ');
        return `
            <div class="hva-preview-info">
               ${infoRow(
             'Loại cuộc họp / Công tác',
             data.meetingType
               )}
                ${infoRow(
                    'Thời gian',
                    timeText
                )}
                ${infoRow(
                    'Địa điểm',
                    data.location
                )}
                ${infoRow(
                    'Chủ trì',
                    data.chairperson
                )}
                ${infoRow(
                    'Thành phần',
                    data.participants
                )}
            </div>
            <section class="hva-preview-section">
                <div class="hva-preview-section-title">
                    NỘI DUNG CUỘC HỌP
                </div>
                <div class="hva-preview-section-content">
                    ${formatMultiline(
                        data.content
                    )}
                </div>
            </section>
            ${renderRecipients(
                data.recipients
            )}
        `;
    }

    /* =====================================================
       7. TẠO NỘI DUNG GIAO VIỆC
       ===================================================== */
    function buildTask(data) {
        return `
            <div class="hva-preview-info">
                ${infoRow(
                    'Người giao',
                    data.assigner
                )}
                ${infoRow(
                    'Ngày giao',
                    formatDateVN(
                        data.assignedDate
                    )
                )}
                ${infoRow(
                    'Hạn hoàn thành',
                    formatDateVN(
                        data.deadline
                    )
                )}
                ${infoRow(
                    'Mức độ ưu tiên',
                    data.priority
                )}
            </div>
            <section class="hva-preview-section">
                <div class="hva-preview-section-title">
                    NỘI DUNG / YÊU CẦU NHIỆM VỤ
                </div>
                <div class="hva-preview-section-content">
                    ${formatMultiline(
                        data.content
                    )}
                </div>
            </section>
            ${renderRecipients(
                data.recipients
            )}
        `;
    }

    /* =====================================================
       8. BUILD DOCUMENT
       ===================================================== */
    function buildDocument(type, data) {
        const isTask =
            type === 'TASK';
        const documentType =
            isTask
                ? 'PHIẾU GIAO NHIỆM VỤ'
                : 'THÔNG BÁO CUỘC HỌP';
        const body =
            isTask
                ? buildTask(data)
                : buildMeeting(data);
        return `
            <div class="hva-preview-paper">
                <div class="hva-preview-watermark">
                    BẢN XEM TRƯỚC
                </div>
                <!-- QUỐC HIỆU -->
                <div class="hva-preview-letterhead">
                    <div>
                        <div class="hva-preview-agency">
                            SỞ GIÁO DỤC VÀ ĐÀO TẠO
                            TP ĐÀ NẴNG
                        </div>
                        <div class="hva-preview-school">
                            TRƯỜNG THPT HÒA VANG
                        </div>
                        <div class="hva-preview-line"></div>
                    </div>
                    <div class="hva-preview-national-wrap">
                        <div class="hva-preview-national">
                            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                        </div>
                        <div class="hva-preview-motto">
                            Độc lập - Tự do - Hạnh phúc
                        </div>
                        <div
                            class="
                                hva-preview-line
                                long
                            "
                        ></div>
                    </div>
                </div>
                <!-- TITLE -->
                <div class="hva-preview-document-title">
                    <div class="hva-preview-document-type">
                        ${documentType}
                    </div>
                   <div class="hva-preview-document-name">
                   ${esc(meetingDateTime)}
               </div>
                </div>
                <!-- STATUS -->
                <div class="hva-preview-badges">
                    <span class="hva-preview-badge">
                        👁 BẢN XEM TRƯỚC
                    </span>
                    <span class="hva-preview-badge">
                        TTĐHS_HVA
                    </span>
                </div>
                ${body}
                <!-- SIGNATURE -->
                <div class="hva-preview-signature">
                    <div class="hva-preview-sign-left"></div>
                    <div class="hva-preview-sign-right">
                        <div class="hva-preview-sign-date">
                            Hòa Vang,
                            ngày ..... tháng ..... năm ........
                        </div>
                        <div class="hva-preview-sign-role">
                            ${
                                isTask
                                    ? 'NGƯỜI GIAO NHIỆM VỤ'
                                    : 'NGƯỜI PHÁT HÀNH'
                            }
                        </div>
                        <div class="hva-preview-sign-note">
                            (Bản xem trước - chưa phát hành)
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /* =====================================================
       9. ĐÓNG PREVIEW
       ===================================================== */
    function close() {
        const root =
            document.getElementById(
                HVA_PREVIEW_ID
            );
        if (root) {
            root.remove();
        }
        document.body.style.overflow = '';
    }

    /* =====================================================
       10. MỞ PREVIEW
       ===================================================== */
    function open(options = {}) {
        close();
        ensureStyle();
        const type =
            String(
                options.type ||
                'MEETING'
            )
            .toUpperCase();
        const data =
            options.data || {};
        const root =
            document.createElement('div');
        root.id =
            HVA_PREVIEW_ID;
        root.innerHTML = `
            <div
                class="hva-preview-backdrop"
                onclick="HVAPreview.close()"
            ></div>
            <div class="hva-preview-window">
                <!-- HEADER -->
                <div class="hva-preview-header">
                    <div class="hva-preview-header-left">
                        <div class="hva-preview-header-icon">
                            <i class="
                                bi
                                bi-file-earmark-text-fill
                            "></i>
                        </div>
                        <div>
                            <div class="hva-preview-header-title">
                                XEM TRƯỚC NỘI DUNG
                            </div>
                            <div class="hva-preview-header-sub">
                                Kiểm tra trước khi lưu
                                hoặc phát hành
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        class="hva-preview-close"
                        onclick="HVAPreview.close()"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <!-- BODY -->
                <div class="hva-preview-body">
                    ${buildDocument(
                        type,
                        data
                    )}
                </div>
                <!-- FOOTER -->
                <div class="hva-preview-footer">
                    <div class="hva-preview-footer-note">
                        Bản xem trước không làm thay đổi dữ liệu.
                    </div>
                    <div class="hva-preview-footer-buttons">
                        <button
                            type="button"
                            class="
                                hva-preview-btn
                                hva-preview-btn-back
                            "
                            onclick="HVAPreview.close()"
                        >
                            ← Quay lại chỉnh sửa
                        </button>
                        <button
                            type="button"
                            class="
                                hva-preview-btn
                                hva-preview-btn-ok
                            "
                            onclick="HVAPreview.close()"
                        >
                            ✓ Đã kiểm tra
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(root);
        document.body.style.overflow =
            'hidden';
    }

    /* =====================================================
       11. ESC ĐỂ ĐÓNG
       ===================================================== */
    document.addEventListener(
        'keydown',
        function (event) {
            if (
                event.key === 'Escape'
            ) {
                close();
            }
        }
    );

    /* =====================================================
       12. PUBLIC API
       ===================================================== */
    window.HVAPreview = {
        version: '1.0.0',
        open,
        close
    };
})();
