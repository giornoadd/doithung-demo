import { ReactNode } from 'react'

export function ChatBubble({ side, children }: { side: 'left' | 'right'; children: ReactNode }) {
  const base = 'chat-bubble max-w-[80%] rounded-2xl px-3 py-2 shadow text-[13px] leading-relaxed'
  const cls = side === 'left'
    ? `${base} left bg-white border border-gray-200`
    : `${base} bg-emerald-600 text-white ml-auto`
  return <div className={cls}>{children}</div>
}
