---

description: "Actionable, dependency-ordered tasks for Step 1 prototype"
---

# Tasks: LINE-like Petty Cash (Step 1: Employee Input)

**Input**: Design documents from `specs/001-pcard-petty-cash-step1/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Not explicitly requested; omit test tasks. Validate via acceptance scenarios per story.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Each task includes an exact file path

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and base structure for the Next.js app

- [X] T001 Create project manifest with dependencies in `package.json` (next, react, react-dom, typescript, tailwindcss, postcss, autoprefixer, @tailwindcss/forms, zod, date-fns, clsx)
- [X] T002 Add TypeScript config `tsconfig.json` (strict, jsx: react-jsx, baseUrl)
- [X] T003 Add Next.js config `next.config.ts` (appDir, reactStrictMode)
- [X] T004 Add Tailwind config `tailwind.config.ts` (content globs for `app`, `components`, plugins: `@tailwindcss/forms`)
- [X] T005 Add PostCSS config `postcss.config.js` (tailwindcss, autoprefixer)
- [X] T006 Create global stylesheet with Tailwind layers in `app/globals.css`
- [X] T007 Create base folders: `app/`, `components/`, `lib/`, `types/`, `public/`, `tests/`
- [X] T008 Provide environment example in `.env.example` (OCR_API_URL=, USE_MOCK=true|false)
- [X] T009 Add sample receipt image `public/sample-receipt.jpg`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before any user story

- [X] T010 Create layout with viewport + color meta and safe-area handling in `app/layout.tsx`
- [X] T011 [P] Define OCR types from data model in `types/ocr.ts`
- [X] T012 [P] Implement Thai formatting helpers (currency/date, confidence threshold) in `lib/format.ts`
- [X] T013 [P] Implement ID generator `R-YYYYMMDD-XXXX` in `lib/id.ts`
- [X] T014 [P] Implement localStorage persistence utils (get/set last 5) in `lib/storage.ts`
- [X] T015 [P] Implement OCR API caller with env fallback (real vs mock) in `lib/ocr.ts`
- [X] T016 [P] Implement client image downscale (~2000px) utility in `lib/image.ts`
- [X] T017 Create chat bubble component (left/right, image/text variants) in `components/ChatBubble.tsx`
- [X] T018 Create Rich Menu component (2×2 grid, sticky, safe-areas) in `components/RichMenu.tsx`
- [X] T019 Create lightweight toast utility for UX feedback in `components/Toast.tsx`
- [X] T020 Implement local mock OCR endpoint matching `contracts/ocr.schema.json` in `app/api/ocr/route.ts`

**Checkpoint**: Foundation ready — user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Happy path submission (Priority: P1) 🎯 MVP

**Goal**: Upload a receipt, render AI summary, confirm, and persist a record.

**Independent Test**: Start at landing, upload `public/sample-receipt.jpg`, see AI summary, tap ✅ ยืนยัน, receive confirmation with `R-YYYYMMDD-XXXX` and saved record.

### Implementation

- [X] T021 [P] [US1] Implement landing chat page scaffold with header + wallpaper in `app/page.tsx`
- [X] T022 [P] [US1] Implement Rich Menu wiring (active: ส่งใบเสร็จ) in `app/page.tsx`
- [X] T023 [P] [US1] Add Thai greeting bubble shown when active tile tapped in `app/page.tsx`
- [X] T024 [P] [US1] Implement file uploader (JPG/PNG/PDF ≤10MB) with preview bubble in `components/FileUploader.tsx`
- [X] T025 [US1] Wire file upload to call OCR via `lib/ocr.ts` and handle JSON in `app/page.tsx`
- [X] T026 [P] [US1] Create AI summary bubble (Thai + formatted values) in `components/AISummary.tsx`
- [X] T027 [US1] Show quick replies below summary with buttons in `app/page.tsx` (✅ ยืนยัน, ❌ แก้ไข placeholder)
- [X] T028 [US1] On ✅ ยืนยัน, persist `SubmissionRecord` via `lib/storage.ts` and `lib/id.ts` in `app/page.tsx`
- [X] T029 [US1] Render confirmation bubble with reference id in `app/page.tsx`
- [X] T030 [P] [US1] Add “upload sample” helper button to inject `public/sample-receipt.jpg` in `components/FileUploader.tsx`

**Checkpoint**: User Story 1 fully functional and testable independently

---

## Phase 4: User Story 2 - Edit due to low confidence (Priority: P1)

**Goal**: Allow inline correction when model confidence is low.

**Independent Test**: Use a filename including “sample” or mock payload with low `merchant` confidence (0.40); edit and confirm.

### Implementation

- [X] T031 [P] [US2] Display warning label “(กรุณาตรวจสอบ)” for fields < threshold in `components/AISummary.tsx`
- [X] T032 [P] [US2] Implement inline Edit Form component (amount, merchant, date) with zod validation in `components/EditForm.tsx`
- [X] T033 [US2] Wire ❌ แก้ไข to show `EditForm` prefilled with OCR values in `app/page.tsx`
- [X] T034 [US2] On form submit, update summary values, then reuse ✅ ยืนยัน flow in `app/page.tsx`

**Checkpoint**: User Stories 1 and 2 independently functional

---

## Phase 5: User Story 3 - Error handling and manual entry (Priority: P2)

**Goal**: Robust UX for OCR failure and manual entry path; file handling edge cases.

**Independent Test**: Force OCR error via mock; verify friendly Thai message and manual form path succeeds.

### Implementation

- [X] T035 [P] [US3] Handle OCR error/invalid schema and show Thai error bubble in `app/page.tsx`
- [X] T036 [US3] Provide re-upload OR manual form option when error occurs in `app/page.tsx`
- [X] T037 [US3] Wire manual form path to show empty `EditForm` and proceed to ✅ ยืนยัน in `app/page.tsx`
- [X] T038 [P] [US3] Detect PDF uploads; show note “ใบเสร็จหลายหน้า ระบบอ่านหน้าแรก” in `components/FileUploader.tsx`
- [X] T039 [P] [US3] Downscale large images to ~2000px client-side using `lib/image.ts` in `components/FileUploader.tsx`
- [X] T040 [US3] Fallback to mock when `OCR_API_URL` unreachable and `USE_MOCK=true` in `lib/ocr.ts`

**Checkpoint**: Stories 1–3 independently functional

---

## Phase 6: User Story 4 - History demo (Priority: P3)

**Goal**: View last 5 submissions retained across refresh.

**Independent Test**: Create >5 submissions; refresh; see only the 5 most recent in history.

### Implementation

- [X] T041 [P] [US4] Implement simple history page listing last 5 records in `app/status/page.tsx`
- [X] T042 [US4] Wire Rich Menu tile “ประวัติการเบิก (DEMO)” to navigate to `/status` in `components/RichMenu.tsx`

**Checkpoint**: All targeted stories independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T043 [P] Add focus-visible styles and 44×44 targets where missing in `app/globals.css`
- [X] T044 Ensure image `width`/`height`, `loading="lazy"`, `decoding="async"` applied in `components/FileUploader.tsx`
- [X] T045 [P] Lazy load `EditForm` to reduce initial JS in `components/EditForm.tsx`
- [X] T046 Add safe-area padding for sticky elements (Rich Menu/header) in `app/globals.css`
- [X] T047 Add basic console timings for OCR and render in `app/page.tsx`
- [X] T048 Update quickstart to match implementation details in `specs/001-pcard-petty-cash-step1/quickstart.md`
- [X] T049 Document env vars and mock behavior in `README.md`

---

## Phase 7: Image Upload & AI OCR Integrations

**Purpose**: Optional integrations to enhance demo realism

- [X] T050 [P] Add IMGBB upload utility and envs in `lib/upload.ts` (+ `.env.example`)
- [X] T051 [US1] Auto-upload selected images to IMGBB and attach URL (silent)
- [X] T052 [US1] Add server OCR route using OpenRouter in `app/api/ocr/openrouter/route.ts`
- [X] T053 [US1] Toggle OCR source via env `NEXT_PUBLIC_USE_OPENROUTER`
- [X] T054 [P] Add debug logs for upload/OCR and error paths
- [X] T055 [US1] Implement bottom input bar (camera / sample / text placeholder)
- [X] T056 [P] Timestamp strategy: stamp header and messages once on display
- [X] T057 [US1] Show timestamp under image messages

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): No dependencies — can start immediately
- Foundational (Phase 2): Depends on Setup completion — BLOCKS all user stories
- User Stories (Phases 3–6): Depend on Foundational completion
  - US1 (P1) → US2 (P1) → US3 (P2) → US4 (P3) if sequential
  - Stories can run in parallel after Phase 2 if staffed, but US2 depends on US1 components existing
- Polish (Final Phase): After desired stories complete

### User Story Dependencies

- User Story 1 (P1): No dependency on other stories
- User Story 2 (P1): Depends on US1 summary and confirm scaffolding
- User Story 3 (P2): Can start after US1 OCR/upload scaffolding; independent of US2 except for optional form reuse
- User Story 4 (P3): Independent once storage utils exist

### Within Each User Story

- Prefer: Models/Types → Utilities → UI → Integration
- Keep increments functional at each checkpoint before moving on

### Parallel Opportunities

- [P] in Phase 2: `types/`, `lib/format.ts`, `lib/id.ts`, `lib/storage.ts`, `lib/ocr.ts`, `lib/image.ts`, `components/*` can proceed concurrently
- [P] in US1: Page scaffold, FileUploader, AISummary, “upload sample” helper
- [P] in US3: PDF note and image downscale can be implemented in parallel
- Polish tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

```text
Task: T021 [US1] Implement landing chat page scaffold in app/page.tsx
Task: T024 [US1] Implement FileUploader with preview in components/FileUploader.tsx
Task: T026 [US1] Create AISummary bubble in components/AISummary.tsx
Task: T030 [US1] Add "upload sample" helper in components/FileUploader.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. STOP and VALIDATE: Run through acceptance scenarios for US1
5. Demo to stakeholders

### Incremental Delivery

1. Foundation → US1 (MVP) → Demo
2. Add US2 (edit flow) → Demo
3. Add US3 (error handling) → Demo
4. Add US4 (history) → Demo
