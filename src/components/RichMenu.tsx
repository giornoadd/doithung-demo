type Key = 'submit' | 'status' | 'history' | 'faq'
type Props = {
  active?: Key
  onSelect?: (key: Key) => void
  variant?: 'sticky' | 'panel'
}

export function RichMenu({ active = 'submit', onSelect, variant = 'panel' }: Props) {
  const IconSubmit = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-current">
      <rect x="4" y="4" width="16" height="12" rx="2" className="fill-transparent" strokeWidth="2"/>
      <path d="M8 9h8M8 12h5" strokeWidth="2"/>
      <path d="M6 20h12" strokeWidth="2"/>
    </svg>
  )
  const IconSearch = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-current">
      <circle cx="11" cy="11" r="6" strokeWidth="2"/>
      <path d="M21 21l-4.2-4.2" strokeWidth="2"/>
    </svg>
  )
  const IconHistory = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-current">
      <path d="M8 7h8M8 11h8M8 15h5" strokeWidth="2"/>
      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2"/>
    </svg>
  )
  const IconFAQ = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-current">
      <path d="M9 9a3 3 0 1 1 5.2 2.1C13.5 12 13 12.6 13 14" strokeWidth="2"/>
      <circle cx="12" cy="18" r="1" className="fill-current"/>
      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2"/>
    </svg>
  )

  const Item = ({ k, label, sub, demo, highlight, icon }: { k: Key, label: string, sub?: string, demo?: boolean, highlight?: boolean, icon: 'submit'|'search'|'history'|'faq' }) => {
    const Icon = icon === 'submit' ? IconSubmit : icon === 'search' ? IconSearch : icon === 'history' ? IconHistory : IconFAQ
    return (
      <button
        aria-label={label}
        onClick={() => onSelect?.(k)}
        className={`h-36 w-full p-5 focus-visible:outline-offset-4 ${highlight ? 'bg-emerald-50' : 'bg-white'}`}
      >
        <div className="h-full w-full flex flex-col items-center justify-center gap-3 text-center">
          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${highlight ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
            <Icon />
          </div>
          <div>
            <div className={`font-semibold text-sm ${highlight ? 'text-emerald-700' : 'text-gray-800'}`}>{label}</div>
            <div className={`text-[12px] mt-1 ${highlight ? 'text-emerald-600' : 'text-gray-400'}`}>{demo ? 'DEMO' : (sub ?? '')}</div>
          </div>
        </div>
      </button>
    )
  }

  const content = (
    <div className="grid grid-cols-2 divide-x divide-y divide-gray-100 bg-white">
      <Item k="submit" label="ส่งใบเสร็จ (เบิกเงิน)" sub="เริ่มใช้งาน" icon="submit" highlight={active==='submit'} />
      <Item k="status" label="ตรวจสอบสถานะ" demo icon="search" />
      <Item k="history" label="ประวัติการเบิก" demo icon="history" />
      <Item k="faq" label="FAQ" demo icon="faq" />
    </div>
  )

  if (variant === 'sticky') {
    return (
      <div className="safe-area-padding safe-area-padding-bottom sticky bottom-0 bg-white/90 backdrop-blur border-t border-gray-200">
        <div className="p-3 grid grid-cols-2 gap-3">{content}</div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md mt-12 px-2">
      <div className="rounded-2xl shadow-[0_12px_28px_-14px_rgba(0,0,0,0.3)] overflow-hidden bg-white border border-gray-100">
        {content}
      </div>
    </div>
  )
}
