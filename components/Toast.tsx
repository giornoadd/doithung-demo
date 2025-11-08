import { useEffect, useState } from 'react'

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null)
  function show(m: string, ms = 2000) {
    setMsg(m)
    setTimeout(() => setMsg(null), ms)
  }
  const el = msg ? (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 px-3 py-2 rounded bg-black/80 text-white text-sm">
      {msg}
    </div>
  ) : null
  return { show, Toast: () => el }
}

