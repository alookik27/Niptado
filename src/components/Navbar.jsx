'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sun, Moon, LogOut, User as UserIcon, ListTodo } from 'lucide-react';

export default function Navbar({ user }) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const isDark =
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      if (res.ok) {
        router.push('/login');
        router.refresh();
      } else {
        console.error('Failed to log out');
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl dark:border-zinc-800/40 dark:bg-black/60 transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-orange-500 opacity-70 dark:opacity-100" />
      
      <div className="mx-auto flex h-16 max-w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)] dark:shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-transform duration-300 group-hover:scale-105">
            <ListTodo className="h-5 w-5 drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]" />
          </div>
          <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-xl font-black tracking-wider text-transparent drop-shadow-[0_0_12px_rgba(245,158,11,0.15)]">
            Niptado
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="rounded-xl p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-amber-400 dark:hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {user && (
            <>
              <div className="hidden md:flex items-center gap-3 border-l border-zinc-200 pl-4 dark:border-zinc-800">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-xs font-bold text-white uppercase p-[1px]">
                  <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200">
                    {user.name ? user.name.charAt(0) : <UserIcon className="h-4 w-4" />}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 line-clamp-1 max-w-[150px]">
                    {user.name}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 line-clamp-1 max-w-[150px]">
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-zinc-800/80 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-red-500/40 dark:hover:bg-red-950/20 dark:hover:text-red-400 dark:hover:shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all duration-200 disabled:opacity-50"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}