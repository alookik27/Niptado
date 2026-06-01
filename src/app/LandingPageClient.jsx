'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckSquare,
  ArrowRight,
  Sun,
  Moon,
  Kanban,
  Zap,
  Lock,
  Layers,
  Sparkles,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';

export default function LandingPageClient() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('todo');

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

  // Mock tasks for the interactive preview board
  const mockTasks = [
    { id: 1, title: '🎨 Design brand guidelines', category: 'Design', priority: 'High', stage: 'todo' },
    { id: 2, title: '🔒 Integrate JWT Auth cookies', category: 'Security', priority: 'High', stage: 'in-progress' },
    { id: 3, title: '🚀 Launch Kanban v1.0', category: 'Release', priority: 'Medium', stage: 'done' },
    { id: 4, title: '⚡ Optimize image LCP priority', category: 'Performance', priority: 'Low', stage: 'todo' }
  ];

  const [previewTasks, setPreviewTasks] = useState(mockTasks);

  const moveTask = (taskId, newStage) => {
    setPreviewTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, stage: newStage } : t))
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100 transition-colors duration-300 relative overflow-hidden font-sans">
      {/* Decorative ambient color blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] bg-fuchsia-500/10 dark:bg-fuchsia-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl dark:border-zinc-800/40 dark:bg-black/60 transition-all duration-300">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-orange-500 opacity-70 dark:opacity-100" />
        
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)] dark:shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-transform duration-300 group-hover:scale-105">
              <CheckSquare className="h-5 w-5 drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]" />
            </div>
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-xl font-black tracking-wider text-transparent drop-shadow-[0_0_12px_rgba(245,158,11,0.15)]">
              Niptado
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-amber-400 transition-colors">
              Features
            </a>
            <a href="#preview" className="text-sm font-medium text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-amber-400 transition-colors">
              Interactive Demo
            </a>
            <a href="#about" className="text-sm font-medium text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-amber-400 transition-colors">
              Security
            </a>
          </nav>

          {/* Action Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="rounded-xl p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-amber-400 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <Link
              href="/login"
              className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white px-3 py-2 transition-colors"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-amber-500/10 dark:shadow-none hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile menu buttons */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="rounded-xl p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900/60 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5.5 w-5.5" /> : <Moon className="h-5.5 w-5.5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900/60 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200/60 bg-white/95 dark:border-zinc-900/80 dark:bg-black/95 px-4 py-4 space-y-3 shadow-lg">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-700 dark:text-zinc-350 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Features
            </a>
            <a
              href="#preview"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-700 dark:text-zinc-350 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Interactive Demo
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-700 dark:text-zinc-350 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Security
            </a>
            <hr className="border-zinc-200 dark:border-zinc-800 my-2" />
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full rounded-xl border border-zinc-200 dark:border-zinc-800 py-3 text-base font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 py-3 text-base font-semibold text-white shadow-md shadow-amber-500/10"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Visual Pill Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 dark:border-amber-500/20 dark:bg-amber-500/5 px-3.5 py-1 text-xs font-semibold tracking-wide text-amber-700 dark:text-amber-400 animate-pulse">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Next-Gen Task Board</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1] sm:leading-none">
              Streamline Your Projects,{' '}
              <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                One Task
              </span>{' '}
              at a Time
            </h1>

            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
              Experience the visual elegance of a premium Kanban task board. Organise workflows, track tasks with tags, and drag-and-drop your way to productivity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/register"
                className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-amber-500 to-fuchsia-600 px-8 py-4 text-base font-bold text-white shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer"
              >
                <span>Get Started For Free</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#preview"
                className="flex w-full sm:w-auto items-center justify-center rounded-2xl border border-zinc-200 bg-white/80 dark:border-zinc-800 dark:bg-zinc-950/80 px-8 py-4 text-base font-bold text-zinc-700 dark:text-zinc-350 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-white transition-all cursor-pointer backdrop-blur-md"
              >
                Live Demo
              </a>
            </div>
          </div>

          {/* Interactive preview board section */}
          <div id="preview" className="mt-16 sm:mt-24 relative">
            <div className="absolute inset-0 flex items-center justify-center blur-3xl opacity-50 dark:opacity-20 pointer-events-none">
              <div className="w-[80%] h-[70%] bg-gradient-to-r from-amber-500 to-fuchsia-600 rounded-full" />
            </div>

            <div className="relative rounded-2xl border border-zinc-200/60 bg-white/70 p-4 sm:p-6 shadow-2xl backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/45 max-w-5xl mx-auto">
              {/* Fake Window Controls */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-200/50 dark:border-zinc-800/40">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-550 select-none flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900/60 px-3 py-1 rounded-lg">
                  <Kanban className="w-3.5 h-3.5 text-amber-500" />
                  <span>Niptado Sandbox Preview</span>
                </div>
                <div className="w-12" /> {/* Spacer */}
              </div>

              {/* Sandbox Board columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Column: To Do */}
                <div className="rounded-xl bg-zinc-100/75 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-850/50 p-4">
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-sm font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                      To Do
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-400">
                      {previewTasks.filter(t => t.stage === 'todo').length}
                    </span>
                  </div>

                  <div className="space-y-3 min-h-[160px]">
                    {previewTasks
                      .filter(t => t.stage === 'todo')
                      .map(task => (
                        <div
                          key={task.id}
                          className="group relative rounded-xl border border-zinc-200/60 bg-white p-3.5 shadow-sm hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-900/90 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400">
                              {task.category}
                            </span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              task.priority === 'High' 
                                ? 'bg-red-500/10 text-red-650 dark:text-red-400' 
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                            }`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-3">{task.title}</p>
                          <button
                            onClick={() => moveTask(task.id, 'in-progress')}
                            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Move to Progress</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Column: In Progress */}
                <div className="rounded-xl bg-zinc-100/75 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-850/50 p-4">
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-sm font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      In Progress
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-400">
                      {previewTasks.filter(t => t.stage === 'in-progress').length}
                    </span>
                  </div>

                  <div className="space-y-3 min-h-[160px]">
                    {previewTasks
                      .filter(t => t.stage === 'in-progress')
                      .map(task => (
                        <div
                          key={task.id}
                          className="group relative rounded-xl border border-zinc-200/60 bg-white p-3.5 shadow-sm hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-900/90 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-400">
                              {task.category}
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/10 text-red-650 dark:text-red-400">
                              {task.priority}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-3">{task.title}</p>
                          <button
                            onClick={() => moveTask(task.id, 'done')}
                            className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Move to Done</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Column: Done */}
                <div className="rounded-xl bg-zinc-100/75 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-850/50 p-4">
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-sm font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Done
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-400">
                      {previewTasks.filter(t => t.stage === 'done').length}
                    </span>
                  </div>

                  <div className="space-y-3 min-h-[160px]">
                    {previewTasks
                      .filter(t => t.stage === 'done')
                      .map(task => (
                        <div
                          key={task.id}
                          className="group relative rounded-xl border border-zinc-200/60 bg-white p-3.5 shadow-sm hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-900/90 opacity-90 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                              {task.category}
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
                              Completed
                            </span>
                          </div>
                          <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 line-through mb-3">{task.title}</p>
                          <button
                            onClick={() => moveTask(task.id, 'todo')}
                            className="text-xs font-semibold text-zinc-500 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Reset to Todo</span>
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 bg-zinc-100/50 dark:bg-zinc-900/25 border-y border-zinc-200/40 dark:border-zinc-900/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
              Supercharged Workspace
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-medium">
              Everything you need to organize your team or individual tasks in a single dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group rounded-2xl border border-zinc-200/60 bg-white p-8 shadow-sm hover:shadow-xl dark:border-zinc-800/80 dark:bg-zinc-950/40 hover:-translate-y-1 transition-all duration-300">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 dark:bg-amber-500/5 text-amber-500 group-hover:scale-110 transition-transform">
                <Kanban className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Drag & Drop Simplicity</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-450 leading-relaxed font-medium">
                Move tasks seamlessly between columns. The visual state updates immediately while maintaining solid persistence behind the scenes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border border-zinc-200/60 bg-white p-8 shadow-sm hover:shadow-xl dark:border-zinc-800/80 dark:bg-zinc-950/40 hover:-translate-y-1 transition-all duration-300">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 dark:bg-orange-500/5 text-orange-500 group-hover:scale-110 transition-transform">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Tailored Priority & Badges</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-450 leading-relaxed font-medium">
                Categorise tasks with descriptive titles, write markdown notes, and label priorities (High, Medium, Low) to keep critical tasks in clear view.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border border-zinc-200/60 bg-white p-8 shadow-sm hover:shadow-xl dark:border-zinc-800/80 dark:bg-zinc-950/40 hover:-translate-y-1 transition-all duration-300">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-fuchsia-500/10 dark:bg-fuchsia-500/5 text-fuchsia-500 group-hover:scale-110 transition-transform">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Secure & Private Auth</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-450 leading-relaxed font-medium">
                Authentication is backed by JWT credentials stored in secure `httpOnly` browser cookies, keeping your data shielded and accessible only to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Reliability Section */}
      <section id="about" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 dark:border-indigo-500/20 dark:bg-indigo-500/5 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-400">
                <Zap className="h-3 w-3" />
                <span>Modern Engineering</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white leading-tight">
                Designed for speed, built for reliability.
              </h2>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                Niptado leverages Next.js App Router API endpoints and a robust MongoDB/Mongoose database system. Experience rapid-fire client-side state responsiveness paired with server-side validations.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm font-semibold text-zinc-700 dark:text-zinc-350">
                  <CheckCircle className="h-5 w-5 text-amber-500 shrink-0" />
                  <span>Secure JWT verification via custom middleware</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-zinc-700 dark:text-zinc-350">
                  <CheckCircle className="h-5 w-5 text-amber-500 shrink-0" />
                  <span>Strict schema validation on client and API layers</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-zinc-700 dark:text-zinc-350">
                  <CheckCircle className="h-5 w-5 text-amber-500 shrink-0" />
                  <span>Smooth transitions and full dark-mode optimization</span>
                </li>
              </ul>
            </div>

            <div className="relative">
              {/* Glow box behind the UI cards */}
              <div className="absolute inset-[-10%] rounded-[30px] bg-gradient-to-tr from-amber-500/10 to-orange-500/10 dark:from-amber-500/5 dark:to-orange-550/5 blur-2xl pointer-events-none" />

              <div className="relative rounded-2xl border border-zinc-200/60 bg-white/70 p-8 shadow-xl dark:border-zinc-800/80 dark:bg-zinc-950/40 backdrop-blur-md space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-4">
                  <span className="font-extrabold text-zinc-900 dark:text-white">Workspace Health Checklist</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">Secure</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-zinc-500 dark:text-zinc-450">JWT Auth Cookies</span>
                    <span className="text-zinc-800 dark:text-zinc-200">HTTPOnly & Signed</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-zinc-500 dark:text-zinc-450">Database Connector</span>
                    <span className="text-zinc-800 dark:text-zinc-200">Mongoose Connection Pool</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-zinc-500 dark:text-zinc-450">Sanitization API</span>
                    <span className="text-zinc-800 dark:text-zinc-200">Bcrypt Hashing Enabled</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-zinc-500 dark:text-zinc-450">Interactive Controls</span>
                    <span className="text-zinc-800 dark:text-zinc-200">HTML5 Drag and Drop API</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-24 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-fuchsia-600/5 border-t border-zinc-200/40 dark:border-zinc-900/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white leading-tight">
            Ready to streamline your workflow?
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto font-medium">
            Join Niptado today. Build custom columns, arrange tasks, and boost your daily execution.
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 text-white px-8 py-4 text-base font-bold dark:bg-white dark:text-black hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer shadow-lg"
            >
              <span>Create Free Account</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200/50 dark:border-zinc-900/60 py-12 bg-white dark:bg-black transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-sm">
              <CheckSquare className="h-4.5 w-4.5" />
            </div>
            <span className="text-base font-black text-zinc-900 dark:text-white tracking-wide">
              Niptado
            </span>
          </div>

          <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-550">
            &copy; {new Date().getFullYear()} Niptado. All rights reserved. Made with love and style.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-550 dark:hover:text-zinc-350 transition-colors"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
