'use client';

import PcardHeader from './components/PcardHeader';
import RoiSummary from './components/RoiSummary';
import RoiCalculator from './components/RoiCalculator';
import RoiTabs from './components/RoiTabs';

export default function PcardProgramPrototype() {
  return (
    <div className="min-h-screen">
      <PcardHeader />

      <main className="max-w-7xl mx-auto px-4 lg:px-10 py-10 space-y-12">
        <header className="bg-white card-shadow rounded-3xl border border-slate-100 p-8 lg:p-12 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-4">
              <p className="uppercase text-[0.6rem] tracking-[0.35em] text-[#009688] font-semibold">💰 Projected ROI · FY2026 Rollout</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">โครงการ P-Card แทนเงินสดย่อย</h1>
              <p className="text-base lg:text-lg text-slate-600 max-w-3xl leading-relaxed">เปลี่ยนจากการใช้เงินสดย่อยเป็น<strong className="text-[#006A4E]"> P-Card ดิจิทัล</strong> ลดงานเอกสาร ประหยัดเวลา และเพิ่มความปลอดภัย</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  ไม่ต้องเก็บเงินสดที่สาขา
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  ตรวจสอบรายจ่ายทันที
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  ลดเวลาทำเอกสาร 82%
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
                Dashboard สำหรับผู้บริหาร
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
                สำหรับ: CFO · การเงิน · ผู้จัดการสาขา
              </span>
            </div>
          </div>

          <RoiSummary />
          <RoiCalculator />
        </header>

        <RoiTabs />
      </main>
    </div>
  );
}