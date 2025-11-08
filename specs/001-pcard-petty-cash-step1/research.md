# Phase 0 Research – LINE-like Petty Cash (Step 1)

## UI Patterns
- Chat layout: Single-column, sticky bottom Rich Menu respecting safe areas. Bubbles with max-width ~80% and readable line length (45–75ch).
- Input patterns: Camera/file picker + inline edit form; 44×44 px targets; `:focus-visible` for keyboard.
- Thai locale: Use DD/MM/YYYY on UI; persist ISO YYYY-MM-DD. Currency: THB with Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).

## Libraries & Rationale
- Next.js (App Router): Built-in API routes, streaming-friendly, straightforward deploy later.
- Tailwind + @tailwindcss/forms: Tokens (spacing, colors), accessible form defaults.
- date-fns: Lightweight date formatting/parsing with explicit patterns; avoids Buddhist-year gotcha of some Intl APIs.
- zod: Runtime validation for OCR response and form data.
- Optional icons (lucide-react): Visual cues for warnings and actions.

## OCR Handling
- Request: multipart/form-data or base64. For demo, use multipart with fields: file, filename, mime_type.
- Mock: `/api/ocr` validates and returns schema. Filenames containing "sample" return exact demo values; else return plausible defaults with variable confidence.
- Error Modes: timeout, non-200, invalid schema → show friendly Thai message and offer re-upload or manual form.

### Optional – Vision LLM via OpenRouter
- Upload image to IMGBB (Base64) and pass the public URL to OpenRouter `chat/completions` with an image tool message.
- Server route: `app/api/ocr/openrouter/route.ts` to keep API key server-side.
- Prompt: "extract receipt in json format with {total, store, date}. Return only JSON."
- Map `{total, store, date}` → `{amount, merchant, date}` on server; ensure ISO date.

## Performance & Accessibility Notes
- Budgets: Initial JS ≤ 150 KB gzip; critical CSS ≤ 50 KB. Lazy load non-critical UI (e.g., EditForm) if needed.
- Images: Provide `width/height`, `loading="lazy"`, `decoding="async"`, `object-fit: contain` for preview.
- Motion: Wrap non-essential animations in `@media (prefers-reduced-motion) {}`.
- Color Contrast: Tailwind tokens chosen to hit ≥ 4.5:1 for text.

## Cross-Browser Targets
- iOS Safari (latest 2), Chrome/Android, Chrome, Edge, Firefox desktop. Viewports: 320×640, 360×800, 390×844.

## Open Questions / Decisions
- Toast library vs custom: go lightweight custom.
- Persistent store beyond localStorage: out of scope.
