'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ReportHeader from './components/ReportHeader';
import ExecutiveView from './components/ExecutiveView';
import OverviewView from './components/OverviewView';

export default function PcardReportPrototype() {
  const [activeView, setActiveView] = useState('view-executive');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        sidebarOpen={sidebarOpen}
      />

      <main className={`main-content flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-72' : 'ml-0'}`}>
        <ReportHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {activeView === 'view-executive' && <ExecutiveView />}
        {activeView === 'view-overview' && <OverviewView />}
      </main>
    </div>
  );
}