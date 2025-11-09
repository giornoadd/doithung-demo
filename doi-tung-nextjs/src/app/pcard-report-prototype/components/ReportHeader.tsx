'use client';

import Link from 'next/link';

type ReportHeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export default function ReportHeader({ sidebarOpen, setSidebarOpen }: ReportHeaderProps) {
  return (
    <header className="hero-gradient border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="w-12 h-12 rounded-xl bg-[#006A4E] text-white flex items-center justify-center font-semibold text-lg">DT</div>
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-[#006A4E] font-semibold">Doi Tung Finance</p>
            <h1 className="text-lg font-semibold text-gray-700">P-Card Analytics</h1>
          </div>
        </div>
        <Link href="/" className="text-sm font-medium text-[#006A4E] hover:text-[#009688] transition">← Back to Hub</Link>
      </div>
    </header>
  );
}
