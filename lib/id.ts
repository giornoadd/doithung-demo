function pad4(n: number) {
  return n.toString().padStart(4, '0')
}

export function generateReferenceId(date = new Date()): string {
  const y = date.getFullYear().toString()
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const d = date.getDate().toString().padStart(2, '0')
  const seq = Math.floor(Math.random() * 10000)
  return `R-${y}${m}${d}-${pad4(seq)}`
}

