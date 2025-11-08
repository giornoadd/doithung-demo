import { format } from 'date-fns'

export const CONFIDENCE_THRESHOLD = 0.7

export function formatTHCurrency(amount: number): string {
  try {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount)
  } catch {
    return `${amount.toFixed(2)} THB`
  }
}

export function toThaiDateDisplay(iso: string): string {
  // Use Gregorian year explicitly; avoid Buddhist-year gotcha by using date-fns
  const d = new Date(iso)
  return format(d, 'dd/MM/yyyy')
}

export function formatThaiTimeHHmm(date: Date = new Date()): string {
  try {
    // Force Bangkok timezone for consistent demo output
    return new Intl.DateTimeFormat('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Bangkok',
    }).format(date)
  } catch {
    const h = String(date.getHours()).padStart(2, '0')
    const m = String(date.getMinutes()).padStart(2, '0')
    return `${h}:${m}`
  }
}

export function formatTime12hWithSeconds(date: Date = new Date()): string {
  try {
    // Use en-US to ensure Latin digits and AM/PM, with Bangkok timezone
    const s = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Bangkok',
    }).format(date)
    // Some browsers insert narrow no-break space before AM/PM
    return s.replace(/\u202f|\u00a0/g, ' ')
  } catch {
    let h = date.getHours()
    const m = String(date.getMinutes()).padStart(2, '0')
    const sec = String(date.getSeconds()).padStart(2, '0')
    const ampm = h >= 12 ? 'PM' : 'AM'
    h = h % 12
    if (h === 0) h = 12
    const hh = String(h).padStart(2, '0')
    return `${hh}:${m}:${sec} ${ampm}`
  }
}
