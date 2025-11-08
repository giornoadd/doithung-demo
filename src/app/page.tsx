"use client"

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChatBubble } from '@/components/ChatBubble'
import { RichMenu } from '@/components/RichMenu'
// import { FileUploader } from '@/components/FileUploader'
import { BottomInputBar } from '@/components/BottomInputBar'
import { AISummary } from '@/components/AISummary'
import dynamic from 'next/dynamic'
const EditForm = dynamic(() => import('@/components/EditForm').then(m => m.EditForm))
import { callOCR } from '@/lib/ocr'
import { addSubmission } from '@/lib/storage'
import { generateReferenceId } from '@/lib/id'
import type { OCRResponse, SubmissionRecord } from '@/types/ocr'
import { useToast } from '@/components/Toast'
import { formatTime12hWithSeconds } from '@/lib/format'
import { uploadToImgbb } from '@/lib/upload'

type Msg = { id: string; side: 'left' | 'right'; type: 'text' | 'image' | 'summary' | 'controls' | 'confirm' | 'form'; data?: any; ts?: string }

export default function Page() {
  const router = useRouter()
  const [mode, setMode] = useState<'idle' | 'submit'>('idle')
  const [messages, setMessages] = useState<Msg[]>(() => [
    { id: 'greet', side: 'left', type: 'text', data: 'สวัสดีครับ! 🙏 ยินดีต้อนรับสู่ระบบเบิกเงินสดย่อยอัตโนมัติ กรุณาเริ่มต้นจากด้านล่าง (Rich Menu) เพื่อเริ่มใช้งาน ⬇️', ts: formatTime12hWithSeconds() },
  ])
  const [summary, setSummary] = useState<OCRResponse | null>(null)
  const [headerTime] = useState<string>(formatTime12hWithSeconds())
  const [locked, setLocked] = useState(false) // lock actions after final confirm
  const [isEditing, setIsEditing] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const { show, Toast } = useToast()

  // header time is stamped once at mount via state initializer

  function push(m: Msg) {
    const ts = m.ts ?? formatTime12hWithSeconds()
    setMessages(prev => [...prev, { ...m, ts, id: `${Date.now()}-${Math.random()}` }])
  }

  async function onSelected(file: File, previewUrl: string, note?: string) {
    console.debug('[upload] Selected', { name: file.name, type: file.type, size: file.size })
    // Reset per-submission state so a new invoice can be confirmed
    setLocked(false)
    setIsEditing(false)
    setIsConfirming(false)
    setSummary(null)
    push({ side: 'right', type: 'image', id: 'img', data: { url: previewUrl, file } })
    if (note) push({ side: 'left', type: 'text', id: 'note', data: note })

    // Auto-upload image selection to imgbb (images only)
    try {
      const key = process.env.NEXT_PUBLIC_IMGBB_KEY as string | undefined
      const expRaw = process.env.NEXT_PUBLIC_IMGBB_EXPIRATION as string | undefined
      const expiration = expRaw ? parseInt(expRaw, 10) : undefined
      if (!file.type.startsWith('image/')) {
        push({ side: 'left', type: 'text', id: 'up-skip-nonimg', data: 'ไฟล์ไม่ใช่รูปภาพ จึงไม่อัปโหลดอัตโนมัติ' })
      } else if (!key) {
        push({ side: 'left', type: 'text', id: 'up-missing-key', data: 'ยังไม่ตั้งค่า IMGBB KEY ใน .env.local (NEXT_PUBLIC_IMGBB_KEY)' })
      } else {
        console.debug('[upload] Auto to imgbb start')
        uploadToImgbb(file, key, expiration)
          .then(async (json) => {
            console.debug('[upload] Auto to imgbb done', json)
            const url = json?.data?.url || json?.data?.display_url || json?.data?.url_viewer
            // Removed chat message for upload success to keep chat clean
            if (!url) show('อัปโหลดรูปสำเร็จ')
            const useOpenRouter = (process.env.NEXT_PUBLIC_USE_OPENROUTER ?? 'false').toString().toLowerCase() === 'true'
            if (useOpenRouter && url) {
              try {
                push({ side: 'left', type: 'text', id: 'or-start', data: 'กำลังอ่านข้อมูลจากรูปภาพ…' })
                const res = await fetch('/api/ocr/openrouter', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ imageUrl: url })
                })
                if (res.ok) {
                  const data = await res.json()
                  setSummary(data)
                  push({ side: 'left', type: 'summary', id: 'sum-or', data })
                  push({ side: 'left', type: 'controls', id: 'ctrl-or' })
                } else {
                  const t = await res.text()
                  console.error('[openrouter] server route failed', res.status, t)
                  push({ side: 'left', type: 'text', id: 'or-fail', data: 'อ่านข้อมูลไม่สำเร็จ ลองแก้ไขหรือกรอกเอง' })
                }
              } catch (e) {
                console.error('[openrouter] error', e)
                push({ side: 'left', type: 'text', id: 'or-err', data: 'ไม่สามารถเรียก OCR จาก OpenRouter ได้' })
              }
            }
          })
          .catch((err) => {
            console.error('[upload] Auto to imgbb error', err)
            push({ side: 'left', type: 'text', id: 'up-fail', data: 'อัปโหลดรูปไม่สำเร็จ' })
          })
      }
    } catch {}
    const useOpenRouter = (process.env.NEXT_PUBLIC_USE_OPENROUTER ?? 'false').toString().toLowerCase() === 'true'
    if (!useOpenRouter) {
      console.time('ocr')
      try {
        const res = await callOCR(file)
        console.timeEnd('ocr')
        setSummary(res)
        push({ side: 'left', type: 'summary', id: 'sum', data: res })
        push({ side: 'left', type: 'controls', id: 'ctrl' })
      } catch (e) {
        push({ side: 'left', type: 'text', id: 'err', data: 'ขออภัยครับ อ่านใบเสร็จไม่ชัดเจน กรุณาลองอัปโหลดใหม่ หรือกรอกข้อมูลด้วยตัวเอง' })
        push({ side: 'left', type: 'controls', id: 'err-ctrl' })
      }
    }
  }

  function onConfirm() {
    if (!summary || locked) return
    setIsConfirming(true)
    const rec: SubmissionRecord = {
      id: generateReferenceId(),
      fileUrl: '',
      amount: summary.amount,
      currency: summary.currency,
      merchant: summary.merchant,
      date: summary.date,
      uploadTime: new Date().toISOString(),
      userId: 'demo-user',
      confidence: summary.confidence,
      status: 'SUBMITTED',
    }
    addSubmission(rec)
    push({ side: 'left', type: 'confirm', id: 'conf', data: `รับใบเสร็จเรียบร้อยครับ หมายเลขอ้างอิง: ${rec.id}` })
    show('บันทึกเรียบร้อย')
    setLocked(true)
    setIsConfirming(false)
  }

  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr,auto]">
      <header className="safe-area-padding sticky top-0 z-10 bg-[#06c755] text-white shadow">
        {/* Status row */}
        <div className="px-4 pt-2 text-[11px] opacity-90 flex items-center justify-between">
          <div>{headerTime}</div>
          <div className="flex items-center gap-1" aria-hidden>
            <span className="inline-block h-1 w-1 rounded-full bg-white/90"></span>
            <span className="inline-block h-1 w-1 rounded-full bg-white/90"></span>
            <span className="inline-block h-1 w-1 rounded-full bg-white/90"></span>
          </div>
        </div>
        {/* Main header row */}
        <div className="flex items-center gap-3 px-4 pb-2">
          <button aria-label="ย้อนกลับ" className="h-8 w-8 flex items-center justify-center text-xl">‹</button>
          <div className="h-9 w-9 rounded-full bg-white text-[#06c755] flex items-center justify-center text-xs font-bold">DT</div>
          <div className="leading-tight">
            <div className="text-base font-semibold">Doi Tung Finance</div>
            <div className="text-[11px] opacity-90">กำลังตอบกลับ</div>
          </div>
          <div className="ml-auto flex items-center gap-4">
            {/* Search icon */}
            <button aria-label="ค้นหา" className="h-8 w-8 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-white"><circle cx="11" cy="11" r="6" strokeWidth="2"/><path d="M21 21l-4.2-4.2" strokeWidth="2"/></svg>
            </button>
            {/* Phone icon */}
            <button aria-label="โทร" className="h-8 w-8 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-white"><path d="M5 4l3 2-2 3c1.5 3 4 5.5 7 7l3-2 2 3-2 3c-.7.4-1.5.6-2.4.6C9.4 21 3 14.6 3 6.4 3 5.5 3.2 4.7 3.6 4l1.4 0z" strokeWidth="2"/></svg>
            </button>
            {/* Menu icon */}
            <button aria-label="เมนู" className="h-8 w-8 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-white"><path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2"/></svg>
            </button>
          </div>
        </div>
      </header>

      <main className="page-bg">
        <div className="p-3 space-y-3">
          {/* When in submit mode, bottom input bar will appear; keep top area clean */}

          {messages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.side === 'right' ? 'items-end' : 'items-start'}`}>
              <div className="flex items-start gap-2">
                {m.side === 'left' && (
                  <div className="h-8 w-8 rounded-full bg-[#06c755] text-white flex items-center justify-center text-sm font-bold">DT</div>
                )}
                <ChatBubble side={m.side}>
                  {m.type === 'text' && <span className="block">{m.data}</span>}
                  {m.type === 'image' && (
                    <img
                      src={(m.data as any).url}
                      alt="preview"
                      width={240}
                      height={240}
                      className="rounded-lg cursor-pointer"
                      loading="lazy"
                      decoding="async"
                      onClick={async () => {
                        try {
                          const key = process.env.NEXT_PUBLIC_IMGBB_KEY as string | undefined
                          const expRaw = process.env.NEXT_PUBLIC_IMGBB_EXPIRATION as string | undefined
                          const expiration = expRaw ? parseInt(expRaw, 10) : undefined
                          const file: File | undefined = (m.data as any).file
                          if (!file) return show('ไม่พบไฟล์สำหรับอัปโหลด')
                          if (!key) return show('ยังไม่ตั้งค่า IMGBB KEY')
                          show('กำลังอัปโหลดรูป…')
                          console.debug('[upload] Manual to imgbb start')
                          const json = await uploadToImgbb(file, key, expiration)
                          console.debug('[upload] Manual to imgbb done', json)
                          const url = json?.data?.url || json?.data?.display_url || json?.data?.url_viewer
                          // Removed chat message for upload success; use toast if needed
                          if (!url) show('อัปโหลดรูปสำเร็จ')
                        } catch (e) {
                          console.error('[upload] Manual to imgbb error', e)
                          show('อัปโหลดรูปไม่สำเร็จ')
                        }
                      }}
                    />
                  )}
                  {m.type === 'summary' && <AISummary data={m.data as OCRResponse} />}
                  {m.type === 'controls' && (
                  <div className="flex gap-2">
                    <button
                      className={`px-3 py-1.5 rounded-lg text-white ${locked ? 'bg-green-600/60 cursor-not-allowed' : 'bg-green-600'}`}
                      onClick={onConfirm}
                      disabled={locked || isConfirming}
                    >
                      {isConfirming ? 'กำลังบันทึก…' : '✅ ยืนยัน'}
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded-lg border ${locked || isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => {
                        if (summary && !locked && !isEditing) {
                          setIsEditing(true)
                          push({ side: 'left', type: 'form', id: 'form', data: summary })
                        }
                      }}
                      disabled={locked || isEditing}
                    >
                      ❌ แก้ไข
                    </button>
                    {!summary && (
                      <button
                        className={`px-3 py-1.5 rounded-lg border ${locked || isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => {
                          if (locked || isEditing) return
                          const today = new Date().toISOString().slice(0,10)
                          const empty = { amount: 0, currency: 'THB', merchant: null, date: today, confidence: {} }
                          setIsEditing(true)
                          push({ side: 'left', type: 'form', id: 'form-empty', data: empty })
                        }}
                        disabled={locked || isEditing}
                      >
                        กรอกด้วยตัวเอง
                      </button>
                    )}
                  </div>
                )}
                {m.type === 'form' && (
                  <EditForm
                    initial={m.data}
                    onCancel={() => { setIsEditing(false) }}
                    onSubmit={({ amount, merchant, dateISO }) => {
                      const updated = { ...(summary as any), amount, merchant, date: dateISO }
                      setSummary(updated)
                      push({ side: 'left', type: 'summary', id: 'sum2', data: updated })
                      push({ side: 'left', type: 'controls', id: 'ctrl2' })
                      setIsEditing(false)
                    }}
                  />
                )}
                  {m.type === 'confirm' && <span>{m.data}</span>}
                </ChatBubble>
              </div>
              {m.side === 'left' && m.type === 'text' && (
                <div className="text-[11px] text-gray-400 mt-1 ml-12">{m.ts}</div>
              )}
              {m.type === 'image' && (
                <div className={`text-[11px] text-gray-400 mt-1 ${m.side === 'left' ? 'ml-12' : ''}`}>{m.ts}</div>
              )}
            </div>
          ))}
        </div>
      </main>
      <div className="safe-area-padding-bottom pb-2">
        {mode === 'idle' ? (
          <RichMenu
            active="submit"
            variant="panel"
            onSelect={(k) => {
              if (k === 'history') router.push('/status')
              if (k === 'submit') {
                setMode('submit')
                push({ side: 'left', type: 'text', id: 'greet2', data: 'กรุณาถ่ายรูปหรือส่งไฟล์ใบเสร็จ (JPG/PNG) ได้เลยครับ' })
              }
            }}
          />
        ) : (
          <BottomInputBar onSelected={onSelected} />
        )}
      </div>
      <Toast />
    </div>
  )
}
