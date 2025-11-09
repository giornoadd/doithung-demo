'use client';

type SidebarProps = {
  activeView: string;
  setActiveView: (view: string) => void;
  sidebarOpen: boolean;
};

export default function Sidebar({ activeView, setActiveView, sidebarOpen }: SidebarProps) {
  return (
    <aside className={`sidebar w-72 bg-[#006A4E] text-white flex flex-col p-6 space-y-10 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-white/70">P-Card Initiative</p>
        <h1 className="text-2xl font-semibold text-white">Doi Tung P-Card Analytics</h1>
        <p className="text-xs text-white/80">Ultimate success view · ฟีดข้อมูลจาก PV/ADV/PCV และสรุป insight สำหรับ Finance · HR · Operations</p>
      </header>
      <nav className="space-y-2">
        <button onClick={() => setActiveView('view-executive')} className={`group w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition focus:outline-none ${activeView === 'view-executive' ? 'bg-white text-slate-900 shadow-lg' : 'bg-transparent text-slate-200/80 hover:bg-white/10 hover:text-white'}`}>
          <span className="text-lg">📈</span>
          <span>ROI Executive Report</span>
        </button>
        <button onClick={() => setActiveView('view-overview')} className={`group w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition focus:outline-none ${activeView === 'view-overview' ? 'bg-white text-slate-900 shadow-lg' : 'bg-transparent text-slate-200/80 hover:bg-white/10 hover:text-white'}`}>
          <span className="text-lg">🏠</span>
          <span>ภาพรวมโครงการ</span>
        </button>
      </nav>
    </aside>
  );
}
