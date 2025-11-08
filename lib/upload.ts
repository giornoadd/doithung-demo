export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      const base64 = result.includes(',') ? result.split(',')[1]! : result
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export async function uploadToImgbb(file: File, key: string, expiration?: number) {
  const b64 = await fileToBase64(file)
  const fd = new FormData()
  fd.append('image', b64)

  const url = new URL('https://api.imgbb.com/1/upload')
  url.searchParams.set('key', key)
  if (expiration && Number.isFinite(expiration)) {
    url.searchParams.set('expiration', String(expiration))
  }

  // Debug: do not leak full key
  const maskedKey = key ? `${key.slice(0, 4)}…${key.slice(-3)}` : 'unset'
  const dbgUrl = new URL(url.toString())
  dbgUrl.searchParams.set('key', maskedKey)
  console.debug('[imgbb] Upload start', {
    name: file.name,
    type: file.type,
    sizeKB: Math.round(file.size / 1024),
    expiration,
    url: dbgUrl.toString(),
    payloadLength: b64.length,
  })

  const res = await fetch(url.toString(), { method: 'POST', body: fd })
  console.debug('[imgbb] Response status', res.status)

  if (!res.ok) {
    const text = await res.text().catch(() => '(no body)')
    console.error('[imgbb] Upload failed', res.status, text)
    throw new Error(`imgbb upload failed ${res.status}`)
  }

  const json = await res.json()
  console.debug('[imgbb] Response JSON', json)
  return json as any
}
