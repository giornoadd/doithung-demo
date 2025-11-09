'use client';

import { useState, useEffect, useReducer, useRef } from 'react';
import Link from 'next/link';
import HomeView from './components/HomeView';
import ChatView from './components/ChatView';
import { Message, ChatState, ChatAction } from './types';

const initialState: ChatState = {
  messages: [],
  showVoucherChoices: false,
  showAccountCodeChoices: false,
  showConfirmation: false,
  inputValue: '',
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SHOW_VOUCHER_CHOICES':
      return { ...state, showVoucherChoices: true, showAccountCodeChoices: false, showConfirmation: false };
    case 'SHOW_ACCOUNT_CODE_CHOICES':
        return { ...state, showVoucherChoices: false, showAccountCodeChoices: true, showConfirmation: false };
    case 'SHOW_CONFIRMATION':
        return { ...state, showVoucherChoices: false, showAccountCodeChoices: false, showConfirmation: true };
    case 'SET_INPUT_VALUE':
        return { ...state, inputValue: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const chatScript = [
    { type: 'ADD_MESSAGE', payload: { id: 1, type: 'bot', text: 'สวัสดีครับ! กรุณาถ่ายรูปหรือส่งไฟล์ใบเสร็จ (PDF/JPG) ได้เลยครับ' } },
    { type: 'ADD_MESSAGE', payload: { id: 2, type: 'image', imageUrl: '/demo-image/demo_0001.png' } },
    { type: 'ADD_MESSAGE', payload: { id: 3, type: 'bot', text: 'ได้รับใบเสร็จครับ... 🤖 กำลังประมวลผลข้อมูลสักครู่...' } },
    { type: 'ADD_MESSAGE', payload: { id: 4, type: 'processing' } },
    { type: 'ADD_MESSAGE', payload: { id: 5, type: 'bot', text: 'กรุณาเลือก Voucher No. ที่ต้องการเชื่อมโยงกับใบเสร็จนี้:' } },
    { type: 'SHOW_VOUCHER_CHOICES' },
];

export default function LinePrototype() {
  const [view, setView] = useState('home'); // 'home' or 'chat'
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [state.messages]);

  const startChatFlow = () => {
    setView('chat');
    dispatch({ type: 'RESET' });
    let delay = 350;
    for (const action of chatScript) {
        setTimeout(() => {
            dispatch(action as ChatAction);
        }, delay);
        delay += 1000;
    }
  };

  const goBackToHome = () => {
    setView('home');
    dispatch({ type: 'RESET' });
  };

  const handleVoucherSelect = (voucherId: string) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { id: Date.now(), type: 'user', text: `📋 ${voucherId}` } });
    dispatch({ type: 'SHOW_VOUCHER_CHOICES'});

    setTimeout(() => {
        dispatch({ type: 'ADD_MESSAGE', payload: { id: Date.now(), type: 'bot', text: 'นี่คือรายละเอียดค่าใช้จ่ายจากรูปภาพที่คุณอัปโหลดครับ\n\n1) ใบเสร็จ GrabExpress (Car)\n   • วันที่: 07 ต.ค. 25\n   • วิธีชำระเงิน: CASHLESS\n   • ค่าบริการ (Item Carrying Fee) 340 บาท\n   • ส่วนลด (Rewards) -34 บาท\n   ⇒ ยอดรวมสุทธิ: 306 บาท\n\n2) ใบรับค่าผ่านทางพิเศษ (การทางพิเศษแห่งประเทศไทย)\n   • วันที่ (จากรอยเจาะ): 15 ก.ค. 25\n   • ประเภทรถ: 4 ล้อ\n   ⇒ ราคา: 50 บาท' } });
    }, 1000);

    setTimeout(() => {
        dispatch({ type: 'ADD_MESSAGE', payload: { id: Date.now(), type: 'bot', text: 'กรุณาเลือก Account Code (รหัสบัญชี) สำหรับรายการนี้:' } });
        dispatch({ type: 'SHOW_ACCOUNT_CODE_CHOICES' });
    }, 2500);
  }

  const handleAccountCodeSelect = (accountCode: string, accountName: string) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { id: Date.now(), type: 'user', text: `💰 ${accountCode} - ${accountName}` } });
    dispatch({ type: 'SHOW_ACCOUNT_CODE_CHOICES' });

    setTimeout(() => {
        dispatch({ type: 'ADD_MESSAGE', payload: { id: Date.now(), type: 'bot', text: `ข้อมูลครบถ้วนแล้วครับ ตรวจสอบความถูกต้องอีกครั้ง:\n\n📋 Voucher: PV-BK-6910296\n💰 Account: ${accountCode} - ${accountName}\n💵 ยอดรวม: 356 บาท` } });
    }, 1000);

    setTimeout(() => {
        dispatch({ type: 'ADD_MESSAGE', payload: { id: Date.now(), type: 'bot', text: 'กรุณาระบุรายละเอียดธุรกรรม (Transaction Text) เพื่อบันทึกเข้าระบบ:' } });
    }, 1800);
  }

  const handleUserMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.inputValue.trim() === '') return;

    dispatch({ type: 'ADD_MESSAGE', payload: { id: Date.now(), type: 'user', text: state.inputValue } });
    dispatch({ type: 'SET_INPUT_VALUE', payload: '' });

    setTimeout(() => {
        dispatch({ type: 'ADD_MESSAGE', payload: { id: Date.now(), type: 'bot', text: `✅ สรุปข้อมูลทั้งหมด:\n\n📋 Voucher: PV-BK-6910296\n💰 Account: 52101 - Transportation Expense\n💵 ยอดรวม: 356 บาท\n📝 Transaction: ${state.inputValue}\n\nยืนยันข้อมูลหรือไม่?` } });
    }, 1000);

    setTimeout(() => {
        dispatch({ type: 'ADD_MESSAGE', payload: { id: Date.now(), type: 'note', text: '📝 หมายเหตุ: กรุณาตรวจสอบความถูกต้องของข้อมูลก่อนยืนยัน หากพบข้อผิดพลาดสามารถกดปุ่ม "❌ แก้ไข" เพื่อทำการแก้ไขได้' } });
        dispatch({ type: 'SHOW_CONFIRMATION' });
    }, 2000);
  }

  const handleConfirm = () => {
    dispatch({ type: 'ADD_MESSAGE', payload: { id: Date.now(), type: 'user', text: '✅ ยืนยืน' } });
    dispatch({ type: 'SHOW_CONFIRMATION' });
    setTimeout(() => {
        dispatch({ type: 'ADD_MESSAGE', payload: { id: Date.now(), type: 'bot', text: 'ดำเนินการสำเร็จ! 🚀 รายการเบิกจ่ายถูกบันทึกภายใต้ voucher queue: PV-BK-6910296 แล้วครับ ขอบคุณที่ใช้บริการ' } });
    }, 1000);
  }

  return (
    <div className="font-sans antialiased text-slate-900 bg-gray-200 h-screen overflow-hidden">
      {view === 'home' ? (
        <HomeView startChatFlow={startChatFlow} />
      ) : (
        <ChatView
          state={state}
          chatContainerRef={chatContainerRef}
          goBackToHome={goBackToHome}
          handleVoucherSelect={handleVoucherSelect}
          handleAccountCodeSelect={handleAccountCodeSelect}
          handleConfirm={handleConfirm}
          handleUserMessageSubmit={handleUserMessageSubmit}
          dispatch={dispatch}
        />
      )}

      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Link href="/" className="rounded-full bg-[#006A4E] px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-[#009688] transition">← Hub</Link>
        <button type="button" onClick={() => window.location.reload()} className="rounded-full bg-slate-900/90 px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-slate-700 transition">🔄 Restart</button>
      </div>
    </div>
  );
}
