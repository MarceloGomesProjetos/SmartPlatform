
import React, { useState } from 'react';
import { Sidebar } from '../organisms/Sidebar';
import { Header } from '../organisms/Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      <div className="hidden lg:block">
        <Sidebar open={sidebarOpen} />
      </div>
      
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar open={sidebarOpen} />
      </div>
       {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}


      <div className="flex flex-1 flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto">
            {children}
        </main>
      </div>
    </div>
  );
};
