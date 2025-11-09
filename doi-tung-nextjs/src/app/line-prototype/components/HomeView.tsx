'use client';

type HomeViewProps = {
  startChatFlow: () => void;
};

export default function HomeView({ startChatFlow }: HomeViewProps) {
  return (
    <div id="line-oa-home-view" className="relative mx-auto h-screen w-full max-w-sm">
      <div className="fixed inset-x-0 top-0 flex justify-center z-30">
        <div className="w-full max-w-sm bg-[#06C755] text-white px-4 pt-5 pb-3">
          <div className="flex items-center justify-between text-xs font-medium tracking-wide opacity-90">
            <span>09:41</span>
            <div className="flex items-center gap-2">
              <span className="status-bar-dot bg-white/90"></span>
              <span className="status-bar-dot bg-white/90"></span>
              <span className="status-bar-dot bg-white/90"></span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center text-white/90">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold leading-none">Doi Tung Finance</h1>
                <p className="mt-1 text-xs text-white/80">LINE Official Account</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <div className="inline-flex h-10 w-10 items-center justify-center" aria-hidden="true">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.65" y1="16.65" x2="21" y2="21" />
                </svg>
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center" aria-hidden="true">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="relative h-full bg-[#F0F2F5]">
        <div className="chat-wallpaper absolute inset-0"></div>
        <div className="relative flex h-full flex-col px-4 pt-32 pb-56">
          <div className="flex items-start gap-3 animate-fade-in">
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#06C755] text-sm font-semibold text-white">DT</div>
            <div className="chat-bubble bubble-left bg-white text-sm leading-relaxed text-slate-800">
              สวัสดีครับ! 🙏 ยินดีต้อนรับสู่ระบบเบิกเงินสดย่อยอัตโนมัติ กรุณาเลือกเมนูจากด้านล่าง (Rich Menu) เพื่อเริ่มต้นใช้งาน ⬇️
            </div>
          </div>
          <span className="ml-16 mt-1 text-xs text-slate-500">อ่านแล้ว 09:40</span>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pb-5">
        <div className="w-full max-w-sm px-4">
          <div className="rounded-3xl shadow-soft">
            <div className="grid grid-cols-2 gap-px bg-gray-400">
              <button onClick={startChatFlow} className="aspect-square bg-white flex flex-col items-center justify-center gap-3 px-4 text-center transition-transform duration-200 ease-out hover:scale-[1.02]">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e7f7ec]">
                  <svg className="h-8 w-8 text-[#06C755]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="M21 15V8a2 2 0 0 0-2-2h-3.17a2 2 0 0 1-1.41-.59l-.83-.83A2 2 0 0 0 12.17 4H11a2 2 0 0 0-2 2v9" />
                    <rect x="3" y="12" width="18" height="8" rx="2" />
                    <path d="M9 16h6" />
                    <path d="M12 13v6" />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-slate-800">ส่งใบเสร็จ (เบิกเงิน)</span>
                <span className="text-xs font-medium uppercase tracking-wide text-[#06C755]">เริ่มใช้งาน</span>
              </button>
              <button onClick={() => {}} className="aspect-square bg-white flex flex-col items-center justify-center gap-3 px-4 text-center transition-transform duration-200 ease-out hover:scale-[1.02]">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef2f7]">
                  <svg className="h-8 w-8 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <path d="M11 8v3l2 2" />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-slate-700">ตรวจสอบสถานะ</span>
                <span className="text-xs font-medium uppercase tracking-wide text-slate-400">Demo</span>
              </button>
              <button onClick={() => {}} className="aspect-square bg-white flex flex-col items-center justify-center gap-3 px-4 text-center transition-transform duration-200 ease-out hover:scale-[1.02]">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef2f7]">
                  <svg className="h-8 w-8 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M20 14v7H6.5A2.5 2.5 0 0 1 4 18.5V5.5A2.5 2.5 0 0 1 6.5 3H12" />
                    <path d="M8 7h6" />
                    <path d="M8 11h8" />
                    <path d="M16 5l5 5" />
                    <path d="M21 3v5h-5" />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-slate-700">ประวัติการเบิก</span>
                <span className="text-xs font-medium uppercase tracking-wide text-slate-400">Demo</span>
              </button>
              <button onClick={() => {}} className="aspect-square bg-white flex flex-col items-center justify-center gap-3 px-4 text-center transition-transform duration-200 ease-out hover:scale-[1.02]">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef2f7]">
                  <svg className="h-8 w-8 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-slate-700">FAQ</span>
                <span className="text-xs font-medium uppercase tracking-wide text-slate-400">Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
