
import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../atoms/Button';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <Sun className="h-6 w-6 scale-100 dark:scale-0" />
            <Moon className="absolute h-6 w-6 scale-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-white/80 px-4 backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-800 sm:px-6">
       <div className="flex items-center">
        <Button variant="ghost" size="icon" className="mr-2 lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X/> : <Menu />}
            <span className="sr-only">Toggle sidebar</span>
        </Button>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
};
