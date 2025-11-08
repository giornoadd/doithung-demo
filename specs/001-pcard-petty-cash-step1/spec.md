# Feature Specification: LINE-like Petty Cash (Step 1: Employee Input)

**Feature Branch**: `001-pcard-petty-cash-step1`  
**Created**: 2025-11-08  
**Status**: Draft  
**Input**: User description provided via `/speckit.specify`:

Build a web prototype that SIMULATES a LINE chat journey for “Petty Cash cancellation via P-Card – Step 1: Employee Input”
Goal
- Give finance stakeholders a tangible demo of a LINE-like experience where an employee submits a receipt, AI (OCR) extracts fields, and the user confirms or edits before submission.
- Scope is ONLY Step 1 (Employee Input). Steps 2–3 are out of scope.
Core Flow (happy path)
1) Landing shows a LINE-like chat screen with a Rich Menu (4 tiles at bottom):
   - ส่งใบเสร็จ (เบิกเงิน) [ACTIVE]
   - ตรวจสอบสถานะ (DEMO)
   - ประวัติการเบิก (DEMO)
   - FAQ (DEMO)

2) When user taps “ส่งใบเสร็จ (เบิกเงิน)”, show greeting message in Thai:
   - "สวัสดีครับ! 🙏 กรุณาถ่ายรูปหรือส่งไฟล์ใบเสร็จ (PDF/JPG/PNG) ได้เลยครับ"

3) User uploads a file (camera/file picker). Accept JPG/PNG/PDF(1 page), max 10MB. Show the preview inside a chat bubble.

4) Frontend calls OCR API endpoint with the uploaded file.
   - Allow switching between REAL and MOCK via env var `OCR_API_URL`. If unset, use local mock.
   - Request (multipart/form-data or base64) includes: file, filename, mime_type.
   - Response JSON schema (use this for mock):
     {
       "amount": 150.00,          // number, THB
       "currency": "THB",
       "merchant": "ร้านกาแฟดอยตุง", // may be null
       "date": "2025-11-08",      // ISO date
       "confidence": { "amount":0.98, "merchant":0.40, "date":0.90 },
       "raw": "optional string"
     }

5) Render an AI summary bubble (Thai), e.g.:
   "AI ตรวจสอบข้อมูลเบื้องต้น:
    • ยอดเงิน: 150.00 บาท
    • ร้านค้า: (ไม่พบข้อมูล)
    • วันที่: 08/11/2025

    ยอดเงินนี้ (150 บาท) ถูกต้อง และจะถูกส่งไปที่ระบบ my petty cash เพื่อให้ Branch Manager ทำการ Approve นะครับ"

   - Fields with confidence < 0.7 show a warning “(กรุณาตรวจสอบ)” icon/text.

6) Show two buttons:
   - ✅ ยืนยัน
   - ❌ แก้ไข

7) On “❌ แก้ไข”, open an inline form with client-side validation:
   - amount (required, >0), merchant (optional but recommended), date (required, DD/MM/YYYY)
   - Pre-fill with OCR values; Thai date formatting on UI but store ISO.
   - Submit → replace AI summary with the edited values; then proceed as “ยืนยัน”.

8) On “✅ ยืนยัน”, persist a submission and reply with a confirmation:
   - Persist to local storage (mock DB) with fields:
     {
       "id": "R-${YYYYMMDD}-${XXXX}", "file_url", "amount", "currency",
       "merchant", "date", "upload_time", "user_id":"demo-user",
       "confidence": { ... }, "status":"SUBMITTED"
     }
   - Reply bubble: "รับใบเสร็จเรียบร้อยครับ หมายเลขอ้างอิง: R-20251108-0001"

Secondary Flows / Error Handling
- OCR fail or empty fields → show message:
  "ขออภัยครับ อ่านใบเสร็จไม่ชัดเจน กรุณาลองอัปโหลดใหม่ หรือกรอกข้อมูลด้วยตัวเอง"
  Offer re-upload OR open manual form (same as edit form but empty).
- PDF multi-page → use page 1 and note in UI: "ใบเสร็จหลายหน้า ระบบอ่านหน้าแรก"
- Large image → auto downscale on client before upload (to ~2000px max dimension).

Demo Screens (match the screenshots)
- Screen A (Landing + Rich Menu)
- Screen B (Greeting + Upload bubble)
- Screen C (AI summary + ✅ยืนยัน / ❌แก้ไข) with example values identical to screenshots

Non-Functional / Tech Choice
- Implement with Next.js (App Router), React, TypeScript, Tailwind. Mobile-first, Thai locale, Asia/Bangkok timezone.
- Components: chat bubbles (left/right), rich menu grid, file uploader, inline edit form, toast.
- Provide .env.example (`OCR_API_URL`, `USE_MOCK=true|false`).
- Provide a local mock OCR endpoint at `/api/ocr` that returns the example JSON above. If filename contains "sample", return the exact demo values from screenshots.
- Include `sample-receipt.jpg` in /public and wire a quick “upload sample” button for demo.

Out of Scope
- Real LINE Messaging API integration
- Authentication
- Steps 2–3 (Dashboard, Program Tracking, SAP output)

Acceptance Criteria
- Uploading a sample image shows a preview bubble and an AI summary bubble in Thai within 2 seconds on localhost.
- Confidence < 0.7 flags the field with a warning note "(กรุณาตรวจสอบ)".
- “❌ แก้ไข” lets user correct fields and the corrected values are reflected in the confirmation message.
- “✅ ยืนยัน” stores a record in local storage and replies with a unique reference id.
- Refreshing the page keeps the last 5 submissions (history demo).
- README explains: install, run (npm run dev), env config, how to switch between MOCK and REAL OCR, and where to change thresholds.

Stretch (optional if time permits)
- Minimal “ตรวจสอบสถานะ (DEMO)” view that lists the last 5 submissions from local storage with status badges.
- Unit test for the amount/date formatter and confidence threshold helper.

---

## User Scenarios & Testing (mandatory)

### User Story 1 - Happy path submission (Priority: P1)

As an employee, I can upload a receipt and confirm an AI-parsed summary to submit a petty cash cancellation request.

**Why this priority**: Delivers the core demo value (Step 1 only) end-to-end for stakeholders.

**Independent Test**: Start from landing, upload `sample-receipt.jpg`, see AI summary, tap ✅ ยืนยัน, receive confirmation and persisted record.

**Acceptance Scenarios**:
1. Given landing screen with Rich Menu, When I tap “ส่งใบเสร็จ (เบิกเงิน)”, Then I see the Thai greeting message.
2. Given greeting message, When I upload a JPG/PNG/PDF(≤10MB), Then a preview appears inside a chat bubble within 2 seconds on localhost.
3. Given a successful OCR response, When the AI summary renders, Then amount/date show formatted for Thai, missing merchant shows “(ไม่พบข้อมูล)”.
4. Given summary shows, When I tap ✅ ยืนยัน, Then a record is saved to localStorage and I receive a reference id `R-YYYYMMDD-XXXX`.

---

### User Story 2 - Edit due to low confidence (Priority: P1)

As an employee, I can correct OCR values inline when the model is unsure.

**Why this priority**: Ensures data quality and demonstrates interactive correction.

**Independent Test**: Use a file named with “sample” or mock payload that returns low merchant confidence (0.40); edit and confirm.

**Acceptance Scenarios**:
1. Given confidence.merchant < 0.7, When the summary shows, Then the merchant line displays “(กรุณาตรวจสอบ)”.
2. Given the summary is visible, When I tap ❌ แก้ไข, Then an inline form opens with amount, merchant, date prefilled.
3. Given the form, When I enter amount > 0 and a valid Thai date DD/MM/YYYY, Then the form can submit; invalid inputs show client-side errors.
4. Given the edited values, When I submit the form, Then the summary updates and flows into ✅ ยืนยัน behavior.

---

### User Story 3 - Error handling and manual entry (Priority: P2)

As an employee, if OCR fails or fields are missing, I can retry upload or enter details manually.

**Why this priority**: Ensures robustness and demo credibility.

**Independent Test**: Force OCR failure via mock; confirm the error message appears and manual form path succeeds.

**Acceptance Scenarios**:
1. Given OCR returns error/empty, When handling response, Then show: “ขออภัยครับ อ่านใบเสร็จไม่ชัดเจน...” with re-upload and manual form options.
2. Given a PDF with multiple pages, When uploaded, Then page 1 is used and a note “ใบเสร็จหลายหน้า ระบบอ่านหน้าแรก” displays.
3. Given a very large image, When selected, Then the client downsizes to ~2000px max dimension before upload.

---

### User Story 4 - History demo (Priority: P3)

As a user, I can see the last 5 submissions retained across refresh.

**Why this priority**: Supports demo continuity; not critical to core flow.

**Independent Test**: Refresh the page and see records persisted in local storage.

**Acceptance Scenarios**:
1. Given I have >5 submissions, When I refresh, Then only the most recent 5 remain available in history.

---

### Edge Cases

- File type validation: only JPG/PNG/PDF accepted; size ≤10MB; clear error otherwise.
- PDF >1 page: only first page is sent to OCR; show note.
- Network issues: if `OCR_API_URL` unreachable and `USE_MOCK=true`, fallback to mock; otherwise show retry.
- Offline mode: disable OCR call, allow manual form path.
- Date formatting: UI uses DD/MM/YYYY (Thai), stored as ISO (YYYY-MM-DD).
- iOS safe areas: chat and rich menu respect safe-area insets.
- Accessibility: all interactive elements keyboard accessible, visible focus, 44×44 touch targets.

---

## Requirements (mandatory)

### Functional Requirements

- FR-001: Provide a mobile-first LINE-like chat UI with Rich Menu (4 tiles[ส่งใบเสร็จ (เบิกเงิน), ตรวจสอบสถานะ, ประวัติการเบิก, FAQ]) where only “ส่งใบเสร็จ (เบิกเงิน)” is active.
- FR-002: Accept uploads via camera/file picker for JPG/PNG/PDF (single page), ≤10MB; show a preview bubble.
- FR-003: Call OCR endpoint with file, filename, mime_type; use `OCR_API_URL` if set; otherwise use local mock `/api/ocr`.
- FR-004: Implement mock OCR that returns the specified schema; if filename contains “sample”, return demo values matching screenshots.
- FR-005: Render an AI summary bubble in Thai using OCR values; mark any field with confidence < 0.7 with “(กรุณาตรวจสอบ)”.
- FR-006: Provide ✅ ยืนยัน and ❌ แก้ไข actions below the summary.
- FR-007: ❌ แก้ไข opens inline form with validation: amount required >0, merchant optional, date required DD/MM/YYYY; prefill with OCR; store ISO on submit.
- FR-008: ✅ ยืนยัน persists a record in localStorage with shape: `{ id, file_url, amount, currency, merchant, date, upload_time, user_id:"demo-user", confidence, status:"SUBMITTED" }`.
- FR-009: Confirmation bubble shows reference id formatted `R-${YYYYMMDD}-${XXXX}`.
- FR-010: OCR failure path shows friendly Thai error; allows re-upload or manual form (empty fields) leading to confirmation flow.
- FR-011: Provide an “upload sample” button that loads `/public/sample-receipt.jpg`.
- FR-012: Provide `.env.example` with `OCR_API_URL` and `USE_MOCK=true|false` and README instructions.
- FR-013: Honor Asia/Bangkok timezone and Thai locale in formatted output.
- FR-014: Maintain last 5 submissions in localStorage for simple history demo (stretch P3).

### Non-Functional & Constitution Alignment

- NF-001 (Mobile-first): Single-column baseline ≤360px; Rich Menu sticky with safe-area padding; no fixed widths that break small viewports.
- NF-002 (Accessibility): WCAG 2.1 AA: keyboard accessible, visible focus, color contrast; touch targets ≥44×44px; skip-to-content present.
- NF-003 (Delivery): Defer/async scripts; code-split by route/component where feasible; lazy load heavy modules.
- NF-004 (Media): Use `loading="lazy"` and `decoding="async"`; provide `width`/`height` to avoid layout shift; responsive `srcset/sizes` for images where applicable.
- NF-005 (Security): Prefer CSP-friendly patterns; avoid inline scripts/styles; HTTPS expected in production.
- NF-006 (Browser support): Test on iOS Safari and latest Chrome/Edge/Firefox; graceful degradation for unsupported features.

### Key Entities

- SubmissionRecord: `{ id: string, fileUrl: string, amount: number, currency: 'THB', merchant?: string|null, date: string (ISO), uploadTime: string (ISO), userId: string, confidence: { amount?: number, merchant?: number, date?: number }, status: 'SUBMITTED' }`

---

## Success Criteria (mandatory)

### Measurable Outcomes

- SC-001: Uploading `sample-receipt.jpg` produces preview and AI summary bubble in Thai within 2 seconds on localhost.
- SC-002: Any field with confidence < 0.7 displays a visible “(กรุณาตรวจสอบ)” warning next to the field.
- SC-003: Editing via ❌ แก้ไข updates the summary and the subsequent confirmation reflects edited values.
- SC-004: ✅ ยืนยัน persists a new record in localStorage with a unique `R-YYYYMMDD-XXXX` id; last 5 retained across refresh.
- SC-005: UI passes basic accessibility checks (no critical axe violations) and adheres to touch target sizes.
- SC-006: Layout functions across 320×640, 360×800, and 390×844 without horizontal scroll; safe areas respected on iOS notch devices.

