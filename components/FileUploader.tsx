import { useRef, useState } from 'react'
import { downscaleImage } from '@/lib/image'

type Props = {
  onSelected: (file: File, previewUrl: string, note?: string) => void
}

const ACCEPT = 'image/jpeg,image/png,application/pdf'
const MAX_MB = 10

export function FileUploader({ onSelected }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  function open() {
    inputRef.current?.click()
  }

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
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
    e.currentTarget.value = ''
  }

  function uploadSample() {
    // Preview uses an existing repo image; OCR mock key off filename "sample"
    const blob = new Blob([new Uint8Array([0])], { type: 'image/jpeg' })
    const f = new File([blob], 'sample-receipt.jpg', { type: 'image/jpeg' })
    const url = '/image/Gemini_Generated_Image_1.png'
    onSelected(f, url)
  }

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={onChange}
      />
      <button onClick={open} className="h-11 w-11 rounded-lg border flex items-center justify-center" aria-label="อัปโหลดไฟล์">
        📷
      </button>
      <button onClick={uploadSample} className="px-3 py-2 rounded-lg border" aria-label="อัปโหลดตัวอย่าง">
        อัปโหลดตัวอย่าง
      </button>
      {error && <div className="text-xs text-red-600">{error}</div>}
    </div>
  )
}
