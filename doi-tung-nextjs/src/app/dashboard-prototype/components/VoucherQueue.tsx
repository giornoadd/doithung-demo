'use client';

import Link from 'next/link';

const vouchers = [
  { type: 'Clear Advance Voucher', id: 'ADV-BK-6910008', date: '07/10/2025', confidence: 99, status: 'Auto-Approved' },
  { type: 'Clear Advance Voucher', id: 'ADV-BK-6910009', date: '06/10/2025', confidence: 98, status: 'Auto-Approved' },
  { type: 'Clear Advance Voucher', id: 'ADV-BK-6910035', date: '31/10/2025', confidence: 97, status: 'Auto-Approved' },
  { type: 'Clear Advance Voucher', id: 'ADV-BK-6910037', date: '21/10/2025', confidence: 85, status: 'Needs Review' },
  { type: 'Clear Advance Voucher', id: 'ADV-BK-6910038', date: '24/10/2025', confidence: 99, status: 'Auto-Approved' },
  { type: 'Payment Voucher', id: 'PV-BK-1910310', date: '31/10/2025', confidence: 99, status: 'Awaiting PDF Attach' },
  { type: 'Payment Voucher', id: 'PV-BK-6910124', date: '16/10/2025', confidence: 98, status: 'Auto-Approved' },
  { type: 'Payment Voucher', id: 'PV-BK-6910176', date: '24/10/2025', confidence: 99, status: 'Auto-Approved' },
  { type: 'Payment Voucher', id: 'PV-BK-6910296', date: '28/10/2025', confidence: 72, status: 'Needs Review' },
  { type: 'Payment Voucher', id: 'PV-BK-6910301', date: '28/10/2025', confidence: 99, status: 'Auto-Approved' },
  { type: 'Payment Voucher', id: 'PV-BK-6910305', date: '28/10/2025', confidence: 99, status: 'Auto-Approved' },
  { type: 'ใบสำคัญประกอบรายการจ่ายเงินสดย่อย (PCV)', id: 'PCV-BK-6809043', date: '30/09/2025', confidence: 99, status: 'Auto-Approved' },
  { type: 'ใบสำคัญประกอบรายการจ่ายเงินสดย่อย (PCV)', id: 'PCV-BK-6809046', date: '23/09/2025', confidence: 99, status: 'Auto-Approved' },
  { type: 'ใบสำคัญประกอบรายการจ่ายเงินสดย่อย (PCV)', id: 'PCV-BK-6910004', date: '15/10/2025', confidence: 98, status: 'Auto-Approved' },
  { type: 'ใบสำคัญประกอบรายการจ่ายเงินสดย่อย (PCV)', id: 'PCV-BK-6910009', date: '20/10/2025', confidence: 99, status: 'Auto-Approved' },
  { type: 'ใบสำคัญประกอบรายการจ่ายเงินสดย่อย (PCV)', id: 'PCV-BK-6910010', date: '20/10/2025', confidence: 99, status: 'Auto-Approved' },
  { type: 'ใบสำคัญประกอบรายการจ่ายเงินสดย่อย (PCV)', id: 'PCV-BK-6910020', date: '27/10/2025', confidence: 98, status: 'Auto-Approved' },
  { type: 'ใบสำคัญประกอบรายการจ่ายเงินสดย่อย (PCV)', id: 'PCV-BK-6910021', date: '27/10/2025', confidence: 98, status: 'Auto-Approved' },
  { type: 'ใบสำคัญประกอบรายการจ่ายเงินสดย่อย (PCV)', id: 'PCV-BK-6910028', date: '28/10/2025', confidence: 99, status: 'Auto-Approved' },
  { type: 'ใบสำคัญประกอบรายการจ่ายเงินสดย่อย (PCV)', id: 'PCV-BK-6910032', date: '28/10/2025', confidence: 99, status: 'Auto-Approved' },
];

export default function VoucherQueue() {
  return (
    <section className="bg-white card-shadow rounded-3xl border border-slate-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200/70 bg-white/70 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-slate-900">Voucher Processing Queue</h2>
          <p className="text-sm text-slate-600">จัดเรียงตามประเภทเอกสารและเลขที่ใบสำคัญจากใบปะหน้า 20 รายการที่การเงินส่งเข้าคิววันนี้</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1 text-xs text-slate-600">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>AI ≥ 95% (Auto)
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1 text-xs text-amber-700">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>Flagged for review
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm md:text-base">
          <thead className="bg-slate-50/80 text-slate-600 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-6 py-3 text-left">ประเภทเอกสาร</th>
              <th className="px-6 py-3 text-left">เลขที่ใบสำคัญ</th>
              <th className="px-6 py-3 text-left">วันที่รายการ</th>
              <th className="px-6 py-3 text-left">AI Confidence</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white/75">
            {vouchers.map((voucher) => (
              <tr key={voucher.id} className={`${voucher.status === 'Needs Review' ? 'bg-amber-50/70 hover:bg-amber-50' : 'hover:bg-slate-50'} transition-base`}>
                <td className="px-6 py-4 font-medium text-slate-800">{voucher.type}</td>
                <td className="px-6 py-4 font-semibold text-slate-900">
                  <Link href={`/details/${voucher.id}`} className="text-blue-600 hover:text-blue-500 transition-base">{voucher.id}</Link>
                </td>
                <td className="px-6 py-4 text-slate-600">{voucher.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-2 font-semibold ${voucher.confidence >= 95 ? 'text-emerald-600' : voucher.confidence >= 85 ? 'text-amber-600' : 'text-rose-600'}`}>
                    {voucher.confidence}%
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${voucher.confidence >= 95 ? 'bg-emerald-50 text-emerald-600' : voucher.confidence >= 85 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                      {voucher.confidence >= 95 ? 'High' : voucher.confidence >= 85 ? 'Medium' : 'Low'}
                    </span>
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`${voucher.status === 'Auto-Approved' ? 'text-green-600' : voucher.status === 'Awaiting PDF Attach' ? 'text-amber-600' : 'text-rose-600'}`}>
                    {voucher.status === 'Auto-Approved' ? '✅ Auto-Approved' : voucher.status === 'Awaiting PDF Attach' ? '🗂️ Awaiting PDF Attach' : '⚠️ Needs Review'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {voucher.status === 'Auto-Approved' ? (
                    <button className="px-3 py-1 rounded-lg bg-slate-100 text-slate-400 cursor-not-allowed" disabled>Done</button>
                  ) : (
                    <Link href={`/details/${voucher.id}`} className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold transition-base hover:bg-blue-500">
                      {voucher.status === 'Needs Review' ? 'Review' : 'Open'}
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
