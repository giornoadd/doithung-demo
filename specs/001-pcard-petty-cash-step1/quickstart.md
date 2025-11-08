# Quickstart – LINE-like Petty Cash (Step 1)

## Prerequisites
- Node.js 21+
- yarn

## Setup
1) Install dependencies
   - `yarn`

2) Environment – choose ONE OCR source
   - Copy `.env.example` → `.env.local` and configure:
   - Local mock (default):
     - `USE_MOCK=true`
   - Real OCR API:
     - `USE_MOCK=false`
     - `OCR_API_URL=https://your-real-ocr.example/ocr`
   - OpenRouter (Vision LLM) after upload to imgbb:
     - `NEXT_PUBLIC_USE_OPENROUTER=true`
     - `OPENROUTER_API_KEY=sk-or-...` (server-side, do NOT prefix with NEXT_PUBLIC)
     - `OPENROUTER_MODEL=openrouter/polaris-alpha` (or your preferred model)

3) Optional image hosting (auto-upload on select)
   - `NEXT_PUBLIC_IMGBB_KEY=<your_imgbb_key>`
   - `NEXT_PUBLIC_IMGBB_EXPIRATION=600` (seconds, optional)

4) Run
   - `yarn dev` and open `http://localhost:3000`

## Demo Flow
- Tap “ส่งใบเสร็จ (เบิกเงิน)” → bottom input bar appears (camera/upload sample).
- Pick an image (JPG/PNG). If IMGBB key set → uploads silently to imgbb.
- If OpenRouter is enabled → server calls OpenRouter OCR with the image URL and
  returns a summary; otherwise local mock/real OCR is used.
- See preview bubble, then AI summary (Thai). Low confidence shows “(กรุณาตรวจสอบ)”.
- Tap ❌ แก้ไข to correct fields; tap ✅ ยืนยัน to persist. A reference like
  `R-20251108-0001` appears. History available at `/status`.
 - Open history at `/status` from the Rich Menu (ประวัติการเบิก).

## Where to change thresholds & config
- Confidence threshold and formatting helpers: `src/lib/format.ts`.
- Toggle OCR sources in `.env.local`:
  - Mock: `USE_MOCK=true`
  - Real API: `OCR_API_URL=...`, `USE_MOCK=false`
  - OpenRouter: `NEXT_PUBLIC_USE_OPENROUTER=true`, `OPENROUTER_API_KEY=...`
- IMGBB upload keys: `NEXT_PUBLIC_IMGBB_KEY`, `NEXT_PUBLIC_IMGBB_EXPIRATION`

## Time display
- Header time and message timestamps are stamped at display-time and do not update live.
