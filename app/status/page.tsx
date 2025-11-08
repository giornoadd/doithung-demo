"use client"

import { getSubmissions } from '@/lib/storage'
import { useEffect, useState } from 'react'
import type { SubmissionRecord } from '@/types/ocr'
import { toThaiDateDisplay, formatTHCurrency } from '@/lib/format'

export default function StatusPage() {
  const [items, setItems] = useState<SubmissionRecord[]>([])
  useEffect(() => {
    setItems(getSubmissions())
  }, [])

  return (
    <div className="min-h-screen p-4 space-y-3">
      <h1 className="text-lg font-semibold">ประวัติการเบิก (ล่าสุด 5 รายการ)</h1>
      {items.length === 0 && <div className="text-sm text-gray-500">ยังไม่มีรายการ</div>}
      <ul className="space-y-2">
        {items.map((r) => (
          <li key={r.id} className="rounded-lg border p-3">
            <div className="font-medium">{r.id}</div>
            <div className="text-sm text-gray-600">
              {formatTHCurrency(r.amount)} · {toThaiDateDisplay(r.date)} · {r.merchant ?? '(ไม่พบข้อมูล)'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

