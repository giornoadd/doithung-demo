"use client"

import { useState } from 'react'
import { z } from 'zod'
import type { OCRResponse } from '@/types/ocr'

const schema = z.object({
  amount: z.coerce.number().positive('จำนวนเงินต้องมากกว่า 0'),
  merchant: z.string().nullish().transform(v => (v === '' ? null : v ?? null)),
  date: z.string().refine(v => /^\d{2}\/\d{2}\/\d{4}$/.test(v), 'รูปแบบวันที่ DD/MM/YYYY')
})

function toISO(ddmmyyyy: string): string {
  const [dd, mm, yyyy] = ddmmyyyy.split('/').map(Number)
  const d = new Date(Date.UTC(yyyy, mm - 1, dd))
  return d.toISOString().slice(0, 10)
}

export type EditValues = {
  amount: number
  merchant: string | null
  date: string // DD/MM/YYYY
}

export function EditForm({
  initial,
  onCancel,
  onSubmit,
}: {
  initial: OCRResponse
  onCancel: () => void
  onSubmit: (values: { amount: number; merchant: string | null; dateISO: string }) => void
}) {
  const [values, setValues] = useState<EditValues>({
    amount: initial.amount,
    merchant: initial.merchant,
    date: (() => {
      const [y, m, d] = initial.date.split('-')
      return `${d}/${m}/${y}`
    })(),
  })
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function update<K extends keyof EditValues>(k: K, v: EditValues[K]) {
    setValues(prev => ({ ...prev, [k]: v }))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const res = schema.safeParse(values)
    if (!res.success) {
      setError(res.error.issues[0]?.message ?? 'ข้อมูลไม่ถูกต้อง')
      return
    }
    setError(null)
    setSubmitting(true)
    onSubmit({ amount: res.data.amount, merchant: res.data.merchant ?? null, dateISO: toISO(res.data.date) })
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <div>
        <label className="block text-xs mb-1">จำนวนเงิน (THB)</label>
        <input type="number" step="0.01" value={values.amount}
          onChange={e => update('amount', Number(e.target.value))}
          className="w-full rounded border" required min={0.01} />
      </div>
      <div>
        <label className="block text-xs mb-1">ร้านค้า (ถ้ามี)</label>
        <input type="text" value={values.merchant ?? ''}
          onChange={e => update('merchant', e.target.value)}
          className="w-full rounded border" placeholder="ร้านค้า" />
      </div>
      <div>
        <label className="block text-xs mb-1">วันที่ (DD/MM/YYYY)</label>
        <input type="text" inputMode="numeric" value={values.date}
          onChange={e => update('date', e.target.value)}
          className="w-full rounded border" placeholder="08/11/2025" required />
      </div>
      {error && <div className="text-xs text-red-600">{error}</div>}
      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={submitting} className={`px-3 py-1.5 rounded text-white ${submitting ? 'bg-green-600/60 cursor-not-allowed' : 'bg-green-600'}`}>{submitting ? 'กำลังบันทึก…' : 'บันทึก'}</button>
        <button type="button" onClick={onCancel} disabled={submitting} className={`px-3 py-1.5 rounded border ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}>ยกเลิก</button>
      </div>
    </form>
  )
}
