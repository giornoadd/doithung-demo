import { NextRequest, NextResponse } from 'next/server'

function safeJsonParse(input: string): any | null {
  try { return JSON.parse(input) } catch {}
  // Try strip code fences
  const fenced = input.replace(/^```(json)?/i, '').replace(/```$/,'').trim()
  try { return JSON.parse(fenced) } catch {}
  // Fallback: naive braces extraction
  const m = input.match(/\{[\s\S]*\}/)
  if (m) { try { return JSON.parse(m[0]!) } catch {} }
  return null
}

function toISODate(input: string | undefined): string {
  if (!input) return new Date().toISOString().slice(0,10)
  const d = new Date(input)
  if (!isNaN(d.getTime())) return d.toISOString().slice(0,10)
  // Try dd/mm/yyyy
  const m = input.match(/(\d{2})\/(\d{2})\/(\d{4})/)
  if (m) {
    const [_, dd, mm, yyyy] = m
    const d2 = new Date(Number(yyyy), Number(mm)-1, Number(dd))
    if (!isNaN(d2.getTime())) return d2.toISOString().slice(0,10)
  }
  return new Date().toISOString().slice(0,10)
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY
  const model = process.env.OPENROUTER_MODEL || 'openrouter/polaris-alpha'
  if (!apiKey) {
    return NextResponse.json({ error: 'OPENROUTER_API_KEY not set' }, { status: 500 })
  }

  const { imageUrl, prompt } = await req.json().catch(() => ({}))
  if (!imageUrl) {
    return NextResponse.json({ error: 'imageUrl required' }, { status: 400 })
  }

  const body = {
    model,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt || 'extract receipt in json format with {total, store, date}. Return only JSON.' },
          { type: 'image_url', image_url: { url: imageUrl } },
        ],
      },
    ],
  }

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'X-Title': 'DoiTung Petty Cash Demo',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(()=>'')
    return NextResponse.json({ error: 'openrouter_failed', status: res.status, body: text }, { status: 502 })
  }

  const json = await res.json()
  const content: string | undefined = json?.choices?.[0]?.message?.content
  const parsed = content ? safeJsonParse(content) : null

  const total = Number(parsed?.total ?? parsed?.amount)
  const store = parsed?.store ?? parsed?.merchant ?? null
  const dateISO = toISODate(parsed?.date)

  const out = {
    amount: isFinite(total) ? total : 0,
    currency: 'THB' as const,
    merchant: store || null,
    date: dateISO,
    confidence: { amount: 0.9, merchant: 0.7, date: 0.9 },
    raw: typeof content === 'string' ? content : undefined,
  }
  return NextResponse.json(out)
}

