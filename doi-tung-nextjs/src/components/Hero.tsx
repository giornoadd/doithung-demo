import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 pb-14">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-[#009688] font-semibold mb-4">
            เรื่องราวโครงการ
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            ปฏิรูปเงินสดย่อย: จากงานด้วยมือสู่ระบบอัตโนมัติด้วย AI
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            โครงการออกแบบระบบโดยทีมการเงินดอยตุง เพื่อทำให้งานเงินสดย่อย 80%
            เป็นอัตโนมัติ พร้อมความแม่นยำ 100%—ปลดล็อคความเร็ว ความไว้วางใจ
            และความโปร่งใส
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="#solution"
              className="cta-button inline-flex items-center justify-center bg-[#009688] text-white px-6 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide shadow-lg"
            >
              สำรวจโซลูชัน
            </Link>
            <Link
              href="#impact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm text-[#006A4E] border border-[#006A4E]/30"
            >
              ดูผลลัพธ์
            </Link>
            <Link
              href="/prompt-admin"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm text-slate-200 bg-slate-800 border border-slate-900/40"
            >
              Prompt Console
            </Link>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/70">
          <Image
            src="/demo-image/demo_0001.png"
            alt="Doi Tung Finance Automation"
            width={1200}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
