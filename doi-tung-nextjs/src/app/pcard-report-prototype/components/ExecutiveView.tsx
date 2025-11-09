'use client';

import { useState } from 'react';
import { Line } from 'react-chartjs-2';

const savingsChartData = {
  labels: ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026'],
  datasets: [{
    label: 'Projected Savings (฿)',
    data: [148800, 162500, 178200, 195000],
    borderColor: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 3,
    fill: true,
    tension: 0.4,
    pointRadius: 6,
    pointHoverRadius: 8,
    pointBackgroundColor: '#10b981',
    pointBorderColor: '#ffffff',
    pointBorderWidth: 2
  }, {
    label: 'Labor Hours Saved',
    data: [320, 350, 384, 420],
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderWidth: 3,
    fill: true,
    tension: 0.4,
    pointRadius: 6,
    pointHoverRadius: 8,
    pointBackgroundColor: '#3b82f6',
    pointBorderColor: '#ffffff',
    pointBorderWidth: 2,
    yAxisID: 'y1'
  }]
};

export default function ExecutiveView() {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <section className="min-h-screen p-10 space-y-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-[#009688] font-semibold">Strategic Outlook · FY2026</p>
          <h2 className="text-3xl font-semibold text-slate-900">Doi Tung - P-Card Program ROI Forecast | Executive Report</h2>
          <p className="text-sm text-slate-600">Projected FY2026 benefits from scaling the SCB P-Card model across petty cash cost centres, extrapolatedจากแฟ้มจริง (<code>PCV-BK-6910020/21/28</code>, <code>PV-BK-1910310</code>) และ AI-assisted SAP postings.</p>
        </header>

        <nav className="flex flex-wrap gap-3">
          <button onClick={() => setActiveTab('feed')} className={`px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 bg-white transition ${activeTab === 'feed' ? 'active-tab' : 'text-slate-600 hover:border-[#009688]'}`}>Value Model</button>
          <button onClick={() => setActiveTab('policy')} className={`px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 bg-white transition ${activeTab === 'policy' ? 'active-tab' : 'text-slate-600 hover:border-[#009688]'}`}>Policy &amp; Rollout</button>
          <button onClick={() => setActiveTab('journal')} className={`px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 bg-white transition ${activeTab === 'journal' ? 'active-tab' : 'text-slate-600 hover:border-[#009688]'}`}>SAP Templates</button>
        </nav>

        {activeTab === 'feed' && <section className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <article className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl border border-emerald-400 p-5 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-100">Projected Quarterly Saving</p>
                <span className="text-3xl">💰</span>
              </div>
              <p className="mt-3 text-4xl font-bold">฿148,800</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-emerald-100">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/20">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" /></svg>
                  320 ชั่วโมง/ไตรมาส
                </span>
              </div>
              <p className="mt-2 text-xs text-emerald-100">ลดภาระงานการเงิน ด้วยการแปลงแฟ้ม PV/ADV เป็น card feed (อ้างอิง <code className="bg-white/20 px-1 rounded">PCV-BK-6910020/21/28</code>).</p>
            </article>
          </div>
          <div className="bg-white rounded-2xl card-shadow border border-slate-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Quarterly Savings Projection</h3>
                  <p className="text-sm text-slate-500">คาดการณ์การประหยัดต้นทุนต่อไตรมาส FY2026</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 uppercase tracking-wide">เป้าหมาย +85% efficiency</span>
              </div>
            </div>
            <div className="p-6">
              <div style={{ maxHeight: '300px' }}><Line data={savingsChartData} options={{ responsive: true, maintainAspectRatio: false }} /></div>
            </div>
          </div>
        </section>}
      </div>
    </section>
  );
}
