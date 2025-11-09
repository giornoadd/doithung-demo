'use client';

import DashboardHeader from './components/DashboardHeader';
import Stats from './components/Stats';
import PipelineOverview from './components/PipelineOverview';
import VoucherQueue from './components/VoucherQueue';

export default function DashboardPrototype() {
  return (
    <div className="min-h-screen pb-16">
      <DashboardHeader />

      <button className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2 rounded-full shadow-lg text-xs md:text-sm transition-base hover:bg-slate-700" onClick={() => window.location.reload()}>Restart Demo</button>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        <section className="space-y-8">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[#009688] font-semibold">Step 2 · Human-in-the-Loop Control Tower</p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Doi Tung - AI Petty Cash Processing Queue (ใบปะหน้า)</h1>
            <p className="text-sm md:text-base text-slate-600 max-w-3xl">ทุกใบสำคัญถูกจัดคิวตามความมั่นใจของ AI (OCR + LLM) เพื่อให้ทีมการเงินตรวจสอบได้ภายในไม่กี่คลิก พร้อม feed ข้อมูลไปยังมุมมอง <em>ROI Forecast</em> ที่หน้า <code>pcard-program-prototype.html</code> สำหรับประเมินความคุ้มค่า rollout.</p>
          </header>

          <Stats />
          <PipelineOverview />
          <VoucherQueue />
        </section>
      </main>
    </div>
  );
}