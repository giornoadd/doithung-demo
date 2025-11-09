export default function ImpactSection() {
  return (
    <section id="impact">
      <div className="mb-10">
        <p className="uppercase tracking-[0.3em] text-sm text-[#009688] font-semibold">
          03 — ผลลัพธ์
        </p>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
          ผลกระทบที่คาดการณ์ (บรรลุเป้าหมาย)
        </h3>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          ยึดตามตัวชี้วัด "North Star" ของโครงการ
          โซลูชันนี้ผลักดันการปรับปรุงที่วัดผลได้ในด้านระบบอัตโนมัติ
          ความแม่นยำ และปริมาณงาน
          สอดคล้องกับเป้าหมายในแผนยุทธศาสตร์การเงิน
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <article className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg transition">
          <div className="text-3xl">✅</div>
          <h4 className="text-xl font-semibold text-slate-900 mt-4">
            ทำงานอัตโนมัติ 80%
          </h4>
          <p className="text-sm text-slate-600 mt-3">
            การรับข้อมูลรายวันจาก LINE
            และธนาคารช่วยลดการป้อนข้อมูลด้วยมือสำหรับธุรกรรมส่วนใหญ่
          </p>
        </article>
        <article className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg transition">
          <div className="text-3xl">✅</div>
          <h4 className="text-xl font-semibold text-slate-900 mt-4">
            ความแม่นยำ 100%
          </h4>
          <p className="text-sm text-slate-600 mt-3">
            AI +
            จุดตรวจสอบโดยมนุษย์รับประกันว่าการบันทึกเข้า SAP
            ตรงตามมาตรฐานการเงินทุกครั้ง
          </p>
        </article>
        <article className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg transition">
          <div className="text-3xl">✅</div>
          <h4 className="text-xl font-semibold text-slate-900 mt-4">
            ลดภาระงานและต้นทุน
          </h4>
          <p className="text-sm text-slate-600 mt-3">
            กำลังการทำงานของทีมการเงินเปลี่ยนจากการป้อนข้อมูลไปสู่การวิเคราะห์
            ความเสี่ยงจากเงินสดในมือถูกขจัดออกจาก 25 สาขา
          </p>
        </article>
      </div>
    </section>
  );
}
