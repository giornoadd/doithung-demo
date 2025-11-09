'use client';

import Link from 'next/link';

export default function Stats() {
  return (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <article className="bg-white card-shadow rounded-2xl border border-slate-100 p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase">Total Vouchers in Queue</p>
        <div className="mt-3 flex items-end justify-between">
          <span className="text-4xl md:text-5xl font-bold text-slate-900">20</span>
          <span className="text-[0.65rem] md:text-xs text-slate-500">Source: ใบปะหน้ารวมประจำวัน</span>
        </div>
        <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000" style={{ width: "90%" }}></div>
        </div>
      </article>
      <article className="glass panel-shadow rounded-2xl card-border p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase">Auto-Approved (AI &gt; 95%)</p>
        <div className="mt-3 flex items-end justify-between">
          <span className="text-4xl md:text-5xl font-bold text-emerald-600">18</span>
          <span className="px-3 py-1 rounded-full text-[0.65rem] md:text-xs bg-emerald-50 text-emerald-600 font-semibold">+2 vs. yesterday</span>
        </div>
        <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-1000" style={{ width: "90%" }}></div>
        </div>
      </article>
      <article className="bg-white card-shadow rounded-2xl border border-red-200 p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase">Needs Manual Review</p>
        <div className="mt-3 flex items-end justify-between">
          <span className="text-4xl md:text-5xl font-bold text-rose-500">2</span>
          <span className="px-3 py-1 rounded-full text-[0.65rem] md:text-xs bg-rose-50 text-rose-500 font-semibold">LLM flagged anomalies</span>
        </div>
        <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-1000" style={{ width: "10%" }}></div>
        </div>
      </article>
      <article className="glass panel-shadow rounded-2xl card-border p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase">Projected Quarterly Saving</p>
        <div className="mt-3 flex items-end justify-between">
          <span className="text-4xl md:text-5xl font-bold text-emerald-600">฿148k</span>
          <Link href="/pcard-program-prototype" className="text-[0.65rem] md:text-xs font-semibold text-blue-600 hover:text-blue-500 transition-base">Open ROI</Link>
        </div>
        <p className="mt-3 text-[0.65rem] md:text-xs text-slate-500">Base case จากข้อมูล <code>PCV-BK-6910020/21/28</code> + <code>PV-BK-1910310</code></p>
      </article>
    </div>
  );
}
