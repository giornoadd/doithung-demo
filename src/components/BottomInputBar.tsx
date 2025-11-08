"use client"

import { useRef, useState } from 'react'
import { downscaleImage } from '@/lib/image'

type Props = {
  onSelected: (file: File, previewUrl: string, note?: string) => void
}

const ACCEPT = 'image/jpeg,image/png,application/pdf'
const MAX_MB = 10

export function BottomInputBar({ onSelected }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File) {
    if (file.size > MAX_MB * 1024 * 1024) {
      setError('ไฟล์ใหญ่เกินไป (≤10MB)')
      return
    }
    let note: string | undefined
    let f = file
    if (file.type === 'application/pdf') {
      note = 'ใบเสร็จหลายหน้า ระบบอ่านหน้าแรก'
    } else if (file.type.startsWith('image/')) {
      f = await downscaleImage(file, 2000)
    }
    const url = URL.createObjectURL(f)
    onSelected(f, url, note)
    setError(null)
  }

  function openPicker() {
    inputRef.current?.click()
  }

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Grab a stable ref to the input before awaiting (avoid React event re-use)
    const input = inputRef.current
    const file = e.target.files?.[0]
    if (!file) return
    await handleFile(file)
    if (input) input.value = ''
  }

  function uploadSample() {
    // Preview uses repo image; OCR mock keyed by filename "sample"
    const blob = new Blob([new Uint8Array([0])], { type: 'image/jpeg' })
    const f = new File([blob], 'sample-receipt.jpg', { type: 'image/jpeg' })
    const url = '/image/Gemini_Generated_Image_1.png'
    onSelected(f, url)
  }

  return (
    <div className="safe-area-padding px-3 pb-3">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={onChange}
      />
      <div className="mx-auto max-w-md">
        <div className="rounded-full bg-white/90 backdrop-blur shadow ring-1 ring-gray-200 flex items-center gap-3 px-3 h-14">
          {/* Camera icon */}
          <button aria-label="กล้อง" onClick={openPicker} className="h-10 w-10 flex items-center justify-center text-gray-600">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-current">
              <rect x="4" y="6.5" width="16" height="11" rx="3" strokeWidth="2"/>
              <circle cx="12" cy="12" r="3" strokeWidth="2"/>
              <path d="M9 6.5l1-2h4l1 2" strokeWidth="2"/>
            </svg>
          </button>
          {/* Eraser icon (used for sample upload) */}
          <button aria-label="อัปโหลดตัวอย่าง" onClick={uploadSample} className="h-10 w-10 flex items-center justify-center text-gray-400">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-current">
              <path d="M7 15l6-6 4 4-5 5H8l-1-1z" strokeWidth="2"/>
              <path d="M12 20h6" strokeWidth="2"/>
            </svg>
          </button>
          <div className="flex-1">
            <div className="h-9 rounded-full bg-gray-100 text-gray-400 text-sm flex items-center px-4">ข้อความ</div>
          </div>
          {/* I-beam caret icon */}
          <div className="h-10 w-10 flex items-center justify-center text-[#06c755]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-current">
              <path d="M8 5h8M12 5v14M8 19h8" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
      </div>
    </div>
  )
}
