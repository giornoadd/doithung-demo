import type { SubmissionRecord } from '@/types/ocr'

const KEY = 'pcard:submissions'

export function getSubmissions(): SubmissionRecord[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const data = JSON.parse(raw) as SubmissionRecord[]
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function addSubmission(rec: SubmissionRecord) {
  if (typeof window === 'undefined') return
  const all = [rec, ...getSubmissions()].slice(0, 5)
  localStorage.setItem(KEY, JSON.stringify(all))
}

