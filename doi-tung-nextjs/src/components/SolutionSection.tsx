import Link from 'next/link';

export default function SolutionSection() {
  return (
    <section id="solution">
      <div className="mb-10">
        <p className="uppercase tracking-[0.3em] text-sm text-[#009688] font-semibold">
          02 — โซลูชัน
        </p>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
          โซลูชันของเรา: กระบวนการอัตโนมัติ 3 ขั้นตอน
        </h3>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          โครงการออกแบบระบบส่งมอบพิมพ์เขียวแบบครบวงจรที่เข้าถึงพนักงานที่จุดใช้งาน
          ให้การควบคุมแบบโปร่งใสกับทีมการเงิน
          และปิดท้ายด้วยผลลัพธ์อัตโนมัติที่พร้อมบันทึกเข้า SAP
          สำรวจแต่ละขั้นตอนด้านล่าง
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article className="bg-white rounded-3xl border border-slate-100 p-8 card-shadow flex flex-col">
          <div className="text-sm uppercase tracking-[0.2em] text-[#006A4E] font-semibold">
            ขั้นตอนที่ 1
          </div>
          <h4 className="text-2xl font-bold text-slate-900 mt-3">
            การป้อนข้อมูลจากพนักงาน
          </h4>
          <p className="text-sm text-slate-600 mt-4 leading-relaxed flex-1">
            เราเข้าถึงพนักงานที่จุดใช้งานจริง แชทบอท LINE
            ช่วยให้พนักงานส่งใบเสร็จได้ทันทีด้วยการถ่ายภาพ—ไม่ต้องใช้ซองกระดาษหรือลายเซ็นอีกต่อไป
          </p>
          <Link
            href="/line-prototype"
            className="mt-6 inline-flex items-center justify-center bg-[#009688] text-white px-5 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide"
          >
            Demo: LINE Chatbot
          </Link>
        </article>
        <article className="bg-white rounded-3xl border border-slate-100 p-8 card-shadow flex flex-col">
          <div className="text-sm uppercase tracking-[0.2em] text-[#2563EB] font-semibold">
            ขั้นตอนที่ 2
          </div>
          <h4 className="text-2xl font-bold text-slate-900 mt-3">
            การควบคุมโดยการเงิน
          </h4>
          <p className="text-sm text-slate-600 mt-4 leading-relaxed flex-1">
            แดชบอร์ดความเชื่อมั่น AI
            ให้ทีมการเงินมีจุดควบคุมเพื่อตรวจสอบรายการที่ถูกตั้งค่าสถานะภายในไม่กี่วินาที
            กระบวนการ HITL แก้ปัญหา "ไม่ไว้วางใจ AI"
            ด้วยความโปร่งใสแบบเต็มรูปแบบ
          </p>
          <Link
            href="/dashboard-prototype"
            className="mt-6 inline-flex items-center justify-center bg-[#2563EB] text-white px-5 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide"
          >
            Demo: AI Dashboard
          </Link>
        </article>
        <article className="bg-white rounded-3xl border border-slate-100 p-8 card-shadow flex flex-col">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-700 font-semibold">
            ขั้นตอนที่ 3
          </div>
          <h4 className="text-2xl font-bold text-slate-900 mt-3">
            สถานะในอนาคต
          </h4>
          <p className="text-sm text-slate-600 mt-4 leading-relaxed flex-1">
            จุดหมายของเราคือโลกที่ไม่มีเงินสดย่อย แดชบอร์ดโปรแกรม P-Card
            ติดตามการนำไปใช้ และรายงานที่พร้อม SAP แสดง journal อัตโนมัติ 1
            รายการแทนเอกสารเบิกจ่าย 37 หน้า
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/pcard-program-prototype"
              className="inline-flex items-center justify-center bg-[#006A4E] text-white px-5 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide"
            >
              Demo: Program Dashboard
            </Link>
            <Link
              href="/pcard-report-prototype"
              className="inline-flex items-center justify-center bg-slate-800 text-white px-5 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide"
            >
              Demo: รายงานสรุป
            </Link>
            <Link
              href="/prompt-admin"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center bg-slate-900 text-white px-5 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide"
            >
              Admin: Prompt Console
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
