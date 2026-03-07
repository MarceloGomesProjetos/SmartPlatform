
import React from 'react';
import { Icon } from '../atoms/Icon';
import { sidebarNavItems } from '../../data/mockData';
import { Bot } from 'lucide-react';

interface SidebarProps {
  open: boolean;
}

const NavLink: React.FC<{ href: string; icon: React.ElementType; label: string; isCollapsed: boolean }> = ({ href, icon, label, isCollapsed }) => (
    <a
      href={href}
      className="flex items-center rounded-lg px-3 py-2 text-slate-600 transition-all hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      <Icon as={icon} className="h-5 w-5" />
      <span className={`ml-3 transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>{label}</span>
    </a>
  );


export const Sidebar: React.FC<SidebarProps> = ({ open }) => {
    const isCollapsed = !open;

  return (
    <aside className={`transition-all duration-300 ease-in-out bg-white dark:bg-slate-900/70 border-r dark:border-slate-800 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-center h-16 border-b dark:border-slate-800">
            <Bot className={`h-8 w-8 text-slate-800 dark:text-slate-100 transition-transform duration-500 ${isCollapsed ? 'rotate-[360deg]' : 'rotate-0'}`} />
            <h1 className={`text-xl font-bold ml-2 text-slate-800 dark:text-slate-100 whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>SmartDash</h1>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {sidebarNavItems.map((item) => (
            <NavLink key={item.label} {...item} isCollapsed={isCollapsed} />
          ))}
        </nav>
      </div>
    </aside>
  );
};
