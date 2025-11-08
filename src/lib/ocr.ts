import type { OCRResponse } from '@/types/ocr'

export async function callOCR(file: File): Promise<OCRResponse> {
  // Use static env references so Next can inline them in the client bundle
  const useMockEnv = (process.env.NEXT_PUBLIC_USE_MOCK ?? process.env.USE_MOCK ?? 'true') as string
  const useMock = useMockEnv.toLowerCase() === 'true'
  const apiUrl = (process.env.NEXT_PUBLIC_OCR_API_URL ?? process.env.OCR_API_URL) as string | undefined

  // If an explicit API is provided and not using mock, try it first
  if (apiUrl && !useMock) {
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('filename', file.name)
      fd.append('mime_type', file.type)
      const res = await fetch(apiUrl, { method: 'POST', body: fd })
      if (!res.ok) throw new Error(`OCR error ${res.status}`)
      return await res.json()
    } catch (e) {
      if (!useMock) throw e
    }
  }

  // Fallback to local mock
  const fd = new FormData()
  fd.append('file', file)
  fd.append('filename', file.name)
  fd.append('mime_type', file.type)
  const res = await fetch('/api/ocr', { method: 'POST', body: fd })
  if (!res.ok) throw new Error(`Mock OCR error ${res.status}`)
  return await res.json()
}
