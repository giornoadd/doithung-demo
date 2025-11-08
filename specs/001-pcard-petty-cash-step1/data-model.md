# Phase 1 Data Model – LINE-like Petty Cash (Step 1)

## TypeScript Types

```ts
export type OCRConfidence = {
  amount?: number;      // 0..1
  merchant?: number;    // 0..1
  date?: number;        // 0..1
};

export type OCRResponse = {
  amount: number;       // THB
  currency: 'THB';
  merchant: string | null;
  date: string;         // ISO: YYYY-MM-DD
  confidence: OCRConfidence;
  raw?: string;
};

export type SubmissionRecord = {
  id: string;           // R-YYYYMMDD-XXXX
  fileUrl: string;      // preview URL (object URL or static path)
  amount: number;
  currency: 'THB';
  merchant: string | null;
  date: string;         // ISO
  uploadTime: string;   // ISO
  userId: 'demo-user';
  confidence: OCRConfidence;
  status: 'SUBMITTED';
};

export type ChatMessage = {
  id: string;
  side: 'left' | 'right';
  type: 'text' | 'image' | 'summary' | 'controls' | 'form' | 'confirm';
  payload: unknown;
};
```

## Notes
- Keep last 5 `SubmissionRecord` items in `localStorage['pcard:submissions']` as a JSON array, newest first.
- Confidence threshold (warning): 0.7 by default; configurable constant in `lib/format.ts`.
- Filename heuristic: if the name includes `sample`, mock API returns exact demo values.

