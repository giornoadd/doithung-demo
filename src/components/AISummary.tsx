import { CONFIDENCE_THRESHOLD, formatTHCurrency, toThaiDateDisplay } from '@/lib/format'
import type { OCRResponse } from '@/types/ocr'

export function AISummary({ data }: { data: OCRResponse }) {
  const warn = (v?: number) => v !== undefined && v < CONFIDENCE_THRESHOLD
  const date = toThaiDateDisplay(data.date)
  return (
    <div className="whitespace-pre-line">
      <div className="font-medium">AI ตรวจสอบข้อมูลเบื้องต้น:</div>
      <ul className="mt-1 space-y-0.5">
        <li>
          • ยอดเงิน: {formatTHCurrency(data.amount)} บาท
          {warn(data.confidence?.amount) && <span className="text-amber-600"> (กรุณาตรวจสอบ)</span>}
        </li>
        <li>
          • ร้านค้า: {data.merchant ?? '(ไม่พบข้อมูล)'}
          {warn(data.confidence?.merchant) && <span className="text-amber-600"> (กรุณาตรวจสอบ)</span>}
        </li>
        <li>
          • วันที่: {date}
          {warn(data.confidence?.date) && <span className="text-amber-600"> (กรุณาตรวจสอบ)</span>}
        </li>
      </ul>
      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
        ยอดเงินนี้ ({Math.round(data.amount)} บาท) ถูกต้อง และจะถูกส่งไปที่ระบบ my petty cash เพื่อให้ Branch Manager ทำการ Approve นะครับ
      </p>
    </div>
  )
}

