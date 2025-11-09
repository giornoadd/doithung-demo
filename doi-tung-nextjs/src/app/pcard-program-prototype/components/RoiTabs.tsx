'use client';

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const roiChartData = {
  labels: ['Conservative', 'Base Case', 'Stretch'],
  datasets: [{
    label: 'Quarterly Cost Saving (THB)',
    data: [111600, 148800, 186900],
    backgroundColor: [
      'rgba(59, 130, 246, 0.2)',
      'rgba(37, 99, 235, 0.5)',
      'rgba(29, 78, 216, 0.8)'
    ],
    borderColor: [
      'rgba(59, 130, 246, 1)',
      'rgba(37, 99, 235, 1)',
      'rgba(29, 78, 216, 1)'
    ],
    borderWidth: 2,
    borderRadius: 8,
  }]
};

const roiChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1200,
    easing: 'easeOutCubic'
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value: any) {
          return '฿' + (value / 1000) + 'k';
        }
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true,
      backgroundColor: '#0f172a',
      titleFont: { weight: 'bold' as const },
      bodyFont: { weight: 'normal' as const },
      callbacks: {
        label: function (context: any) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(context.parsed.y);
          }
          return label;
        }
      }
    }
  }
};

export default function RoiTabs() {
  const [activeTab, setActiveTab] = useState('value');

  return (
    <section className="space-y-6">
      <nav className="flex flex-wrap gap-3" role="tablist" aria-label="P-Card ROI Tabs">
        <button type="button" className={`tab-button inline-flex items-center gap-2 rounded-full border-2 px-5 py-3 text-sm font-semibold transition hover:scale-105 ${activeTab === 'value' ? 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 text-[#006A4E] border-[#006A4E]/35' : 'text-slate-600'}`} onClick={() => setActiveTab('value')}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
          มูลค่าที่ได้รับ
        </button>
        <button type="button" className={`tab-button inline-flex items-center gap-2 rounded-full border-2 px-5 py-3 text-sm font-semibold transition hover:scale-105 ${activeTab === 'roadmap' ? 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 text-[#006A4E] border-[#006A4E]/35' : 'text-slate-600'}`} onClick={() => setActiveTab('roadmap')}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
          แผนการทำงาน 2026
        </button>
        <button type="button" className={`tab-button inline-flex items-center gap-2 rounded-full border-2 px-5 py-3 text-sm font-semibold transition hover:scale-105 ${activeTab === 'sap' ? 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 text-[#006A4E] border-[#006A4E]/35' : 'text-slate-600'}`} onClick={() => setActiveTab('sap')}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" /></svg>
          ตัวอย่างรายการบัญชี
        </button>
      </nav>

      <section className="space-y-6">
        {activeTab === 'value' && <div className="tab-panel glass panel-shadow rounded-3xl border border-slate-200/60 p-8 space-y-9">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#006A4E] to-[#009688] flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">ผลประโยชน์ที่ได้รับ</h2>
                <p className="text-sm text-slate-600">เปรียบเทียบ 3 สถานการณ์การประหยัดต่อไตรมาส</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-emerald-100/50 px-5 py-4 hover:shadow-lg transition">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                  <p className="text-xs uppercase font-bold text-emerald-700 tracking-wider">⏰ เวลาที่ประหยัดได้</p>
                </div>
                <p className="text-2xl font-bold text-emerald-600">320 ชั่วโมง</p>
                <p className="text-xs text-emerald-700 mt-1">ต่อไตรมาส (≈ 40 วันทำงาน)</p>
              </div>
              <div className="rounded-2xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100/50 px-5 py-4 hover:shadow-lg transition">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <p className="text-xs uppercase font-bold text-blue-700 tracking-wider">✅ ระบบอัตโนมัติ 100%</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">0 เอกสารกระดาษ</p>
                <p className="text-xs text-blue-700 mt-1">ทุกอย่างเป็นดิจิทัล</p>
              </div>
            </div>
          </header>

          <section className="bg-white rounded-2xl border-2 border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-[#009688]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
              การคาดการณ์ประหยัดต้นทุน (ต่อไตรมาส)
            </h3>
            <div className="relative h-80 w-full">
              <Bar data={roiChartData} options={roiChartOptions} />
            </div>
            <div className="mt-4 flex flex-wrap gap-4 justify-center text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-blue-200 border-2 border-blue-400"></div>
                <span className="text-slate-700"><strong>Conservative:</strong> สถานการณ์ระมัดระวัง</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-blue-500"></div>
                <span className="text-slate-700"><strong>Base Case:</strong> สถานการณ์ปกติ (แนะนำ)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-blue-800"></div>
                <span className="text-slate-700"><strong>Stretch:</strong> สถานการณ์ดีที่สุด</span>
              </div>
            </div>
          </section>
        </div>}
        {activeTab === 'roadmap' && <div className="tab-panel glass panel-shadow rounded-3xl border border-slate-200/60 p-8 space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">แผนการทำงานปี 2026</h2>
                <p className="text-sm text-slate-600">ขั้นตอนการนำ P-Card มาใช้ทั้งองค์กร แบ่งเป็น 4 ไตรมาส</p>
              </div>
            </div>
          </header>

          <section className="space-y-6">
            {/* Q1 */}
            <article className="relative rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6 space-y-4 hover:shadow-xl transition">
              <div className="absolute -left-3 top-6 w-10 h-10 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">Q1</span>
              </div>
              <div className="ml-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-blue-900">🔧 เตรียมความพร้อม</h3>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                    ม.ค. - มี.ค. 2026
                  </span>
                </div>
                <p className="text-sm text-blue-900 mb-3 leading-relaxed">ปรับระบบบัญชีและสร้างคู่มือการใช้งาน</p>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    <span>จัดทำรหัสบัญชีที่ถูกต้อง (GL Codes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    <span>สร้างคู่มือการอนุมัติ (2 ขั้นตอน)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    <span>ทดสอบระบบกับ 5 สาขานำร่อง</span>
                  </li>
                </ul>
              </div>
            </article>
          </section>
        </div>}
        {activeTab === 'sap' && <div className="tab-panel glass panel-shadow rounded-3xl border border-slate-200/60 p-8 space-y-10">
          <header className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-900">SAP Journal Templates</h2>
            <p className="text-sm text-slate-500">โครงรายการที่จะใช้ซ้ำในการโพสต์หลัง rollout · ดัดแปลงจาก <code>PV-BK-6910296.md</code>, <code>PV-BK-6910301.md</code>, <code>PV-BK-1910310.md</code></p>
          </header>

          <article className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600 font-semibold">PV</span>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Template #1 · ช่องทาง Central Admin</h3>
                <p className="text-xs text-slate-500">อิงชุดงาน <code>PV-BK-6910296</code> สำหรับการรวบรวม PCV หลายหน่วย</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[0.65rem] tracking-[0.2em]">
                  <tr>
                    <th className="px-5 py-3 text-left">GL</th>
                    <th className="px-5 py-3 text-left">คำอธิบาย</th>
                    <th className="px-5 py-3 text-right">เดบิต (THB)</th>
                    <th className="px-5 py-3 text-right">เครดิต (THB)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td className="px-5 py-3 font-medium text-slate-900">61101</td>
                    <td className="px-5 py-3 text-slate-700">Raw materials used · วัตถุดิบ BU FOOD</td>
                    <td className="px-5 py-3 text-right text-slate-900">4,056.00</td>
                    <td className="px-5 py-3 text-right text-slate-400">0.00</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 font-medium text-slate-900">64802</td>
                    <td className="px-5 py-3 text-slate-700">Delivery cost (Domestic) · Grab/Skootar</td>
                    <td className="px-5 py-3 text-right text-slate-900">3,240.00</td>
                    <td className="px-5 py-3 text-right text-slate-400">0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        </div>}
      </section>
    </section>
  );
}
