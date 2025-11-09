'use client';

export default function RoiSummary() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <article className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border-2 border-emerald-200 p-6 space-y-3 card-shadow hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-700 font-semibold">💰 ประหยัดต่อไตรมาส</p>
          <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" /></svg>
        </div>
        <p className="text-4xl font-bold text-emerald-600">฿148,800</p>
        <p className="text-sm text-emerald-900 leading-relaxed">ลดค่าใช้จ่ายงานเอกสาร<br /><span className="text-xs text-emerald-700">(320 ชม. × ฿465/ชม.)</span></p>
      </article>
      <article className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border-2 border-blue-200 p-6 space-y-3 card-shadow hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-700 font-semibold">💵 เงินที่ปลดล็อก</p>
          <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
        </div>
        <p className="text-4xl font-bold text-blue-600">฿562,000</p>
        <p className="text-sm text-blue-900 leading-relaxed">เงินสดย่อยที่ไม่ต้องเก็บที่สาขาอีกต่อไป</p>
      </article>
      <article className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border-2 border-slate-200 p-6 space-y-3 card-shadow hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-700 font-semibold">📄 เอกสารที่ลดลง</p>
          <svg className="w-8 h-8 text-slate-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
        </div>
        <p className="text-4xl font-bold text-slate-900">42 <span className="text-xl">ชุด</span></p>
        <p className="text-sm text-slate-700 leading-relaxed">งานเอกสารต่อไตรมาสที่เปลี่ยนเป็นดิจิทัล</p>
      </article>
      <article className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl border-2 border-purple-200 p-6 space-y-3 card-shadow hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-purple-700 font-semibold">⏱️ คืนทุน</p>
          <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
        </div>
        <p className="text-4xl font-bold text-purple-600">2.7 <span className="text-xl">เดือน</span></p>
        <p className="text-sm text-purple-900 leading-relaxed">ระยะเวลาคืนทุนการลงทุนทั้งหมด</p>
      </article>
    </section>
  );
}
