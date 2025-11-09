import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div className="max-w-6xl mx-auto px-5 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#006A4E] text-white flex items-center justify-center font-semibold text-lg">
            DT
          </div>
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-[#006A4E] font-semibold">
              Doi Tung Finance
            </p>
            <h1 className="text-lg font-semibold text-gray-700">
              Petty Cash Automation Project Hub
            </h1>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <Link
            href="#problem"
            className="border-b-2 border-transparent hover:text-[#006A4E] hover:border-[#009688]"
          >
            ปัญหา
          </Link>
          <Link
            href="#solution"
            className="border-b-2 border-transparent hover:text-[#006A4E] hover:border-[#009688]"
          >
            โซลูชัน
          </Link>
          <Link
            href="#impact"
            className="border-b-2 border-transparent hover:text-[#006A4E] hover:border-[#009688]"
          >
            ผลลัพธ์
          </Link>
          <Link
            href="/prompt-admin"
            className="border-b-2 border-transparent hover:text-[#006A4E] hover:border-[#009688]"
            target="_blank"
            rel="noopener"
          >
            Prompt Console
          </Link>
        </nav>
      </div>
    </header>
  );
}
