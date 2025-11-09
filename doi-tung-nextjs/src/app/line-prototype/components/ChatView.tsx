'use client';

import Image from 'next/image';
import { Message, ChatState } from '../types';

type ChatViewProps = {
  state: ChatState;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  goBackToHome: () => void;
  handleVoucherSelect: (voucherId: string) => void;
  handleAccountCodeSelect: (accountCode: string, accountName: string) => void;
  handleConfirm: () => void;
  handleUserMessageSubmit: (e: React.FormEvent) => void;
  dispatch: React.Dispatch<any>;
};

export default function ChatView({
  state,
  chatContainerRef,
  goBackToHome,
  handleVoucherSelect,
  handleAccountCodeSelect,
  handleConfirm,
  handleUserMessageSubmit,
  dispatch,
}: ChatViewProps) {
  return (
    <div id="chat-flow-view" className="relative mx-auto h-screen w-full max-w-sm">
      <div className="fixed inset-x-0 top-0 flex justify-center z-40">
        <div className="w-full max-w-sm bg-[#06C755] text-white px-4 pt-5 pb-3">
          <div className="flex items-center justify-between text-xs font-medium tracking-wide opacity-90">
            <span>09:42</span>
            <div className="flex items-center gap-2">
              <span className="status-bar-dot bg-white/90"></span>
              <span className="status-bar-dot bg-white/90"></span>
              <span className="status-bar-dot bg-white/90"></span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button type="button" onClick={goBackToHome} className="inline-flex h-10 w-10 items-center justify-center text-white/90" aria-label="ย้อนกลับ">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-[#06C755] font-semibold text-sm">DT</div>
                <div>
                  <h2 className="text-lg font-semibold leading-none">Doi Tung Finance</h2>
                  <p className="mt-1 text-xs text-white/80">กำลังตอบกลับ</p>
                </div>
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
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.37 1.79.72 2.63a2 2 0 0 1-.45 2.11L8 9a16 16 0 0 0 7 7l.54-.38a2 2 0 0 1 2.11-.45 12.29 12.29 0 0 0 2.63.72A2 2 0 0 1 22 16.92Z" />
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

      <div className="relative flex h-full flex-col bg-[#F0F2F5]">
        <div className="chat-wallpaper absolute inset-0"></div>
        <div ref={chatContainerRef} className="relative flex h-full flex-col pt-32 pb-36 overflow-y-auto">
          <div id="chat-body-messages" className="flex-1 px-4">
            {state.messages.map((msg) => (
              <div key={msg.id} className={`mt-4 flex items-end gap-3 animate-fade-in ${msg.type === 'user' ? 'justify-end' : ''}`}>
                {msg.type === 'bot' && <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#06C755] text-xs font-semibold text-white">DT</div>}
                {msg.type === 'bot' && <div className="chat-bubble bubble-left bg-white text-sm leading-relaxed text-slate-800 whitespace-pre-line">{msg.text}</div>}
                {msg.type === 'user' && <div className="chat-bubble bubble-right text-sm leading-relaxed whitespace-pre-line">{msg.text}</div>}
                {msg.type === 'image' && <div className="chat-bubble bubble-right p-2"><Image src={msg.imageUrl!} alt="Receipt preview" width={220} height={300} className="max-w-[220px] rounded-xl shadow-md" /></div>}
                {msg.type === 'note' && <div className="max-w-[85%] rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs leading-relaxed text-amber-900 shadow-sm">{msg.text}</div>}
                {msg.type === 'processing' && <div className="mt-4 flex items-end gap-3 animate-fade-in">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#06C755] text-xs font-semibold text-white">DT</div>
                  <div className="chat-bubble bubble-left bg-white p-4 space-y-2">
                    <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">🔍 AI Processing</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-700">
                        <span className="text-emerald-600">✓</span>
                        <span>OCR Extraction</span>
                        <span className="ml-auto text-emerald-600 font-semibold">98%</span>
                      </div>
                      <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: "98%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-700">
                        <span className="text-blue-600">⟳</span>
                        <span>Policy Verification</span>
                        <span className="ml-auto text-blue-600 font-semibold">95%</span>
                      </div>
                      <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: "95%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>}
              </div>
            ))}
          </div>
          <div id="quick-reply-container" className="px-4 pb-4 pt-2">
            {state.showVoucherChoices && <div className="flex flex-col gap-2">
              <button type="button" onClick={() => handleVoucherSelect('ADV-BK-6910008')} className="rounded-2xl bg-white border border-slate-200 px-4 py-3 text-left shadow-sm transition-all duration-150 hover:scale-[1.02] hover:border-[#06C755]">
                <div className="text-sm font-semibold text-slate-800">ADV-BK-6910008</div>
                <div className="text-xs text-slate-500 mt-1">Clear Advance Voucher</div>
              </button>
              <button type="button" onClick={() => handleVoucherSelect('ADV-BK-6910009')} className="rounded-2xl bg-white border border-slate-200 px-4 py-3 text-left shadow-sm transition-all duration-150 hover:scale-[1.02] hover:border-[#06C755]">
                <div className="text-sm font-semibold text-slate-800">ADV-BK-6910009</div>
                <div className="text-xs text-slate-500 mt-1">Clear Advance Voucher</div>
              </button>
              <button type="button" onClick={() => handleVoucherSelect('PV-BK-6910296')} className="rounded-2xl bg-white border-2 border-[#06C755] px-4 py-3 text-left shadow-sm transition-all duration-150 hover:scale-[1.02]">
                <div className="text-sm font-semibold text-slate-800">PV-BK-6910296</div>
                <div className="text-xs text-emerald-600 mt-1">✓ Payment Voucher (แนะนำ)</div>
              </button>
            </div>}
            {state.showAccountCodeChoices && <div className="flex flex-col gap-2">
              <button type="button" onClick={() => handleAccountCodeSelect('11211', 'Saving Accounts')} className="rounded-2xl bg-white border border-slate-200 px-4 py-3 text-left shadow-sm transition-all duration-150 hover:scale-[1.02] hover:border-[#06C755]">
                <div className="text-sm font-semibold text-slate-800">11211</div>
                <div className="text-xs text-slate-500 mt-1">Saving Accounts (บัญชีเงินฝากออมทรัพย์)</div>
              </button>
              <button type="button" onClick={() => handleAccountCodeSelect('52101', 'Transportation Expense')} className="rounded-2xl bg-white border-2 border-[#06C755] px-4 py-3 text-left shadow-sm transition-all duration-150 hover:scale-[1.02]">
                <div className="text-sm font-semibold text-slate-800">52101</div>
                <div className="text-xs text-emerald-600 mt-1">✓ Transportation Expense (ค่าเดินทาง - แนะนำ)</div>
              </button>
              <button type="button" onClick={() => handleAccountCodeSelect('11902', 'Short-term advances to employees')} className="rounded-2xl bg-white border border-slate-200 px-4 py-3 text-left shadow-sm transition-all duration-150 hover:scale-[1.02] hover:border-[#06C755]">
                <div className="text-sm font-semibold text-slate-800">11902</div>
                <div className="text-xs text-slate-500 mt-1">Short-term advances to employees (เงินเบิกล่วงหน้า)</div>
              </button>
            </div>}
            {state.showConfirmation && <div className="flex items-center justify-center gap-3">
              <button id="btn-confirm" type="button" onClick={handleConfirm} className="rounded-full bg-[#06C755] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-transform duration-150 hover:scale-105">✅ ยืนยืน</button>
              <button id="btn-reject" type="button" onClick={(e) => alert('ฟังก์ชันนี้สำหรับตัวอย่างเท่านั้น')} className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-600 transition-transform duration-150 hover:scale-105">❌ แก้ไข</button>
            </div>}
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 flex justify-center pb-4 z-40">
        <div className="w-full max-w-sm px-4">
          <form onSubmit={handleUserMessageSubmit} className="flex items-end gap-2 rounded-3xl bg-white px-3 py-2 shadow-md">
            <button id="camera-trigger" type="button" className="inline-flex h-10 w-10 items-center justify-center text-slate-600 transition-colors duration-150">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M3 9a2 2 0 0 1 2-2h1l2-3h6l2 3h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </button>
            <button type="button" className="inline-flex h-10 w-10 items-center justify-center text-slate-400" aria-hidden="true">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M21.44 11.05l-9.19 9.19a2 2 0 0 1-2.83 0L4.34 15.16a2 2 0 0 1 0-2.83l9.19-9.19a2 2 0 0 1 2.83 0l5.08 5.08a2 2 0 0 1 0 2.83Z" />
                <path d="M7 7l10 10" />
              </svg>
            </button>
            <input
              type="text"
              value={state.inputValue}
              onChange={(e) => dispatch({ type: 'SET_INPUT_VALUE', payload: e.target.value })}
              placeholder="Type a message..."
              className="flex-1 rounded-full bg-slate-100 px-4 py-2 text-left text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#06C755]"
            />
            <button type="submit" className="inline-flex h-10 w-10 items-center justify-center text-[#06C755]" aria-hidden="true">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M3 3h18" />
                <path d="M8 21h8" />
                <path d="M12 3v18" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
