# Implementation Plan: LINE-like Petty Cash (Step 1: Employee Input)

**Branch**: `001-pcard-petty-cash-step1` | **Date**: 2025-11-08 | **Spec**: specs/001-pcard-petty-cash-step1/spec.md
**Input**: Feature specification from `/specs/001-pcard-petty-cash-step1/spec.md`

## Summary

Build a mobile-first, LINE-like chat prototype (web) for Step 1: Employee Input. The app simulates a receipt submission flow, calls an OCR endpoint (real or local mock), renders an AI summary in Thai with confidence indicators, allows inline edits, and persists a confirmation to localStorage with a unique reference id. It intentionally excludes Steps 2–3 and any real LINE API or auth.

Approach: Next.js (App Router) + React + TypeScript + Tailwind. Provide `/api/ocr` mock with the exact response schema. Toggle real vs mock by `OCR_API_URL` and `USE_MOCK` envs. Ensure constitution compliance (mobile-first, accessibility, performance budgets) and include a sample image and demo helpers.

## Technical Context

**Language/Version**: TypeScript 5, Next.js 14+ (App Router), Node.js 18+  
**Primary Dependencies**: next, react, react-dom, tailwindcss, @tailwindcss/forms, zod, date-fns (th locale), clsx  
**Optional Utilities**: lucide-react (icons), nanoid (id generation) or custom id util  
**Storage**: Browser `localStorage` (last 5 records)  
**Testing**: Vitest + @testing-library/react + @testing-library/user-event (unit), Playwright (optional snapshot)  
**Target Platform**: Web (mobile-first, Thai locale, Asia/Bangkok)  
**Project Type**: Single web app (Next.js)  
**Performance Goals**: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms on Slow 4G + ~6× CPU (guideline)  
**Constraints**: Initial JS ≤ 150 KB gzip, critical CSS ≤ 50 KB, images with `width/height`, lazy loading  
**Scale/Scope**: Single primary flow; no backend DB; mock API for OCR

## Constitution Check

Gate items derived from `.specify/memory/constitution.md` (must be satisfied in implementation):
- Viewport meta (`width=device-width, initial-scale=1, viewport-fit=cover`); declare `color-scheme` and `theme-color`.
- Tokens and typography: Tailwind config as design tokens; base font ≥ 16px; fluid type via `clamp()` in CSS where applicable.
- Layout: Single-column baseline at ≤360px; no fixed widths that break small screens; safe-area padding via `env(safe-area-inset-*)` for sticky Rich Menu.
- Accessibility: WCAG 2.1 AA; keyboard navigation; `:focus-visible`; touch targets ≥ 44×44 px; color contrast ≥ 4.5:1.
- Media: images with `width/height`, `loading="lazy"`, `decoding="async"`; responsive `srcset/sizes` for the sample where relevant.
- Performance: JS budget ≤ 150 KB gzip; critical CSS ≤ 50 KB; avoid long main-thread tasks; lazy load non-critical.
- Security: CSP-friendly patterns; avoid inline scripts; HTTPS expected for real API usage; SRI for third-party if any.
- Browser support: Last 2 evergreen + iOS Safari (last 2); test breakpoints 320×640, 360×800, 390×844, 768×1024.
- Observability (demo-level): basic console timings; optional RUM hook placeholder.

Re-check this gate after Phase 1 design and before final verification.

## Project Structure

### Documentation (this feature)

```text
specs/001-pcard-petty-cash-step1/
├── plan.md              # This file (/speckit.plan output)
├── research.md          # Phase 0: UI + locale + OCR findings
├── data-model.md        # Phase 1: types and data shapes
├── quickstart.md        # Phase 1: how to run the app
└── contracts/
    └── ocr.schema.json  # API contract for OCR (mock + real shape)
```

### Source Code (repository root)

```text
app/                         # Next.js App Router
├── layout.tsx               # viewport meta, color-scheme, theme-color
├── page.tsx                 # main chat UI (Screen A/B/C)
├── status/page.tsx          # (stretch) simple history/status view (DEMO)
├── api/ocr/route.ts         # local mock OCR endpoint
└── globals.css              # tailwind + tokens + safe-area styles

components/
├── ChatBubble.tsx           # left/right message bubbles
├── RichMenu.tsx             # 4-tile grid (bottom sticky)
├── FileUploader.tsx         # camera/file picker + preview
├── AISummary.tsx            # Thai summary bubble with warnings
├── EditForm.tsx             # inline form (amount, merchant, date)
└── Toast.tsx                # simple toast utility (optional)

lib/
├── ocr.ts                   # API caller with env fallback (real/mock)
├── id.ts                    # R-YYYYMMDD-XXXX generator
├── storage.ts               # localStorage persistence (keep last 5)
├── image.ts                 # client downscale (~2000px) via canvas
└── format.ts                # TH currency and date formatting helpers

types/
└── ocr.ts                   # OCRResponse, OCRConfidence, SubmissionRecord

public/
└── sample-receipt.jpg       # sample image for demo button

tests/
└── unit/
    └── formatters.test.ts   # amount/date/threshold helpers

.env.example                 # OCR_API_URL, USE_MOCK=true|false
tailwind.config.ts           # tokens, color-scheme
postcss.config.js            # tailwind integration
```

**Structure Decision**: Single Next.js web app in the repository root, using App Router. Local mock API at `app/api/ocr/route.ts`. All UI under `app/` with reusable components in `components/`. Utilities in `lib/`, strict types in `types/`.

## Phase Plan & Milestones

1) Phase 0 – Repo setup (scaffold)
   - Initialize Next.js (App Router), Tailwind, TypeScript. Add tokens, viewport meta, color-scheme, theme-color. Add sample image and `.env.example`.

2) Phase 1 – Shell UI + Rich Menu
   - Build chat shell (Screen A) with sticky Rich Menu (safe-area). Add greeting and active tile state.

3) Phase 2 – Upload & Preview
   - Implement camera/file picker (JPG/PNG/PDF), 10MB validation, client downscale (~2000px), preview bubble. PDF note: first page only.

4) Phase 3 – OCR API (mock + real toggle)
   - Add `/api/ocr` with schema + `zod` validation. Env toggle `OCR_API_URL` and `USE_MOCK`. Handle failures and timeouts.

5) Phase 4 – AI Summary + Actions
   - Render Thai summary bubble with warnings when confidence < 0.7. Add ✅ ยืนยัน / ❌ แก้ไข actions.

6) Phase 5 – Inline Edit Form
   - Client validation: amount > 0, date DD/MM/YYYY (store ISO), merchant optional. Update summary on submit.

7) Phase 6 – Persist + Confirmation
   - Generate id `R-YYYYMMDD-XXXX`, persist record (last 5) to localStorage, show confirmation bubble.

8) Phase 7 – Stretch: Status (DEMO)
   - `/status` lists last 5 submissions with status badges.

9) Phase 8 – Constitution Verification
   - Accessibility pass (keyboard, focus-visible, contrast, touch targets) and performance checks (LCP/CLS/INP) on localhost. Cross-browser/viewports sanity.

10) Phase 9 – Docs & Tests
   - README usage, env switches, thresholds. Unit tests for format/threshold helpers.

## UI Requirements (from Mock UI)

Reference mock: line-prototype.html

- Screen A (Landing)
  - Header: status time and 3 status dots; title “Doi Tung Finance”; subtitle “LINE Official Account”.
  - Greeting bubble (left) with avatar “DT”; read receipt text “อ่านแล้ว 09:40”.
  - Rich Menu: 2×2 grid, tiles include icon, Thai label, small sublabel. Active tile: “ส่งใบเสร็จ (เบิกเงิน)” with sublabel “เริ่มใช้งาน”. Others show “Demo”.
  - Floating button: “🔄 Restart Demo”.

- Screen B/C (Chat Flow)
  - Header: back chevron, avatar “DT”, title, subtitle “กำลังตอบกลับ”.
  - Messages area scrolls; wallpaper background; bubbles max-width ~80%, radius ~20px, left tail/right tail styles.
  - Input bar: camera button (44×44), attachments icon, placeholder “ข้อความ”. Camera opens upload (simulated in mock).
  - Quick replies area appears after AI summary with two buttons:
    - Confirm: label must be “✅ ยืนยัน” (note: fix typo seen in mock).
    - Edit: “❌ แก้ไข” opens inline form (not implemented in mock; implement in app).

- Thai copy updates
  - Greeting (upload prompt): include PNG and PDF note, e.g., “สวัสดีครับ! 🙏 กรุณาถ่ายรูปหรือส่งไฟล์ใบเสร็จ (PDF/JPG/PNG) ได้เลยครับ”. Add multi‑page note when PDF detected.
  - AI summary: follow spec format with confidence warning “(กรุณาตรวจสอบ)” for fields < 0.7.

- Accessibility and mobile-first
  - Touch targets ≥44×44px; `:focus-visible` styles on all actionable elements; semantic landmarks; safe-area padding for sticky elements.
  - No horizontal scroll on 320–390 px widths; content uses fluid units; images include `width/height` attributes.

## UI Deltas To Implement (vs Mock)

- Fix typo: replace “✅ ยืนยืน” with “✅ ยืนยัน” in confirm copy.
- Implement the ❌ แก้ไข inline form with validation and update summary after submit.
- Replace placeholder image with local `public/sample-receipt.jpg` and add “upload sample” helper.
- Add confidence warnings “(กรุณาตรวจสอบ)” when confidence < 0.7.
- Add client downscale (~2000px) before upload; PDF note “ใบเสร็จหลายหน้า ระบบอ่านหน้าแรก”.
- Ensure safe-area insets on header and rich menu; visible focus styles; aria-labels on icon buttons.

## Risk & Mitigation

- Thai date formatting pitfalls (Buddhist calendar vs Gregorian): use `date-fns` formatting `dd/MM/yyyy` to ensure AD year; avoid `Intl.DateTimeFormat('th-TH')` for year.
- Large images on low-end devices: limit canvas memory usage; scale in steps if needed; cap at ~2000px.
- PDF previews in-browser: for simplicity, show a placeholder preview and note; actual OCR handles page 1 server-side. Avoid heavy PDF parsing libs.
- Performance budgets in dev: keep dependencies lean; lazy load non-critical components; avoid heavy icon sets.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
