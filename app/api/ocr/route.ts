import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const filename = (form.get('filename') as string) || ''
  const mime = (form.get('mime_type') as string) || ''

  // Minimal validation
  if (!mime) {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 })
  }

  const isSample = /sample/i.test(filename)
  const data = isSample ? {
    amount: 150.0,
    currency: 'THB',
    merchant: 'ร้านกาแฟดอยตุง',
    date: '2025-11-08',
    confidence: { amount: 0.98, merchant: 0.40, date: 0.90 },
    raw: 'sample mock'
  } : {
    amount: 120.00 + Math.round(Math.random() * 50),
    currency: 'THB',
    merchant: Math.random() < 0.5 ? 'ร้านค้าเดโม' : null,
    date: new Date().toISOString().slice(0, 10),
    confidence: { amount: 0.95, merchant: 0.4 + Math.random() * 0.6, date: 0.9 },
  }

  return NextResponse.json(data)
}

