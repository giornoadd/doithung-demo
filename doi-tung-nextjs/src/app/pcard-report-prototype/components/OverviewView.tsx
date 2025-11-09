'use client';

import { Bar } from 'react-chartjs-2';

const overviewChartData = {
  labels: [
    'ค่าเดินทาง (62503/ค่าน้ำมัน)',
    'ค่าขนส่ง / Courier',
    'อุปกรณ์สำนักงาน / เครื่องมือ',
    'ค่าเบี้ยเลี้ยง / ค่ารับรอง (61303)',
    'วัตถุดิบ / ค่าแรงโครงการ'
  ],
  datasets: [{
    label: 'ยอดใช้จ่าย',
    data: [6643.00, 7005.00, 6266.15, 29701.00, 10036.50],
    backgroundColor: '#006A4E',
    borderRadius: 8,
    borderSkipped: false
  }]
};

export default function OverviewView() {
  return (
    <section className="min-h-screen p-10 space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-[#009688] font-semibold">Executive Overview · SAP Ready</p>
        <h2 className="text-3xl font-semibold text-slate-900">ภาพรวมการใช้จ่าย (P-Card Program)</h2>
        <p className="text-sm text-slate-600 max-w-3xl">แทนที่แฟ้มรายงานแบบเดิม (เช่น PV-BK-6910124.pdf) ด้วยแดชบอร์ดสดที่รวมทุกหมวดค่าใช้จ่าย พร้อมสัญญาณเตือนอัจฉริยะจาก LLM.</p>
      </header>
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Spend by Category - Visual Breakdown</h3>
            <p className="text-xs text-slate-500">แยกตาม GL หมวดหลักจากชุด ADV/PV</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">Source · 62503 · 64802 · 63101 · 61303 · 61101</span>
        </header>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div style={{ maxHeight: '300px' }}><Bar data={overviewChartData} options={{ responsive: true, maintainAspectRatio: false }} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
