'use client';

import Link from 'next/link';

export default function PcardHeader() {
  return (
    <header className="hero-gradient border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-5 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#006A4E] text-white flex items-center justify-center font-semibold text-lg">DT</div>
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-[#006A4E] font-semibold">Doi Tung Finance</p>
            <h1 className="text-lg font-semibold text-gray-700">P-Card Program ROI</h1>
          </div>
        </div>
        <Link href="/" className="text-sm font-medium text-[#006A4E] hover:text-[#009688] transition">← Back to Hub</Link>
      </div>
    </header>
  );
}
