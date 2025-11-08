export type OCRConfidence = {
  amount?: number
  merchant?: number
  date?: number
}

export type OCRResponse = {
  amount: number
  currency: 'THB'
  merchant: string | null
  date: string // ISO: YYYY-MM-DD
  confidence: OCRConfidence
  raw?: string
}

export type SubmissionRecord = {
  id: string // R-YYYYMMDD-XXXX
  fileUrl: string
  amount: number
  currency: 'THB'
  merchant: string | null
  date: string // ISO
  uploadTime: string // ISO
  userId: 'demo-user'
  confidence: OCRConfidence
  status: 'SUBMITTED'
}

