'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, AlertCircle, ArrowRight, CheckSquare, Sparkles } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black text-zinc-800 dark:text-zinc-200 transition-colors duration-300">
      
      {/* LEFT HALF: Aesthetic Brand Showcase */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-zinc-900 p-12 dark:bg-zinc-950 lg:flex border-r border-zinc-200/10 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[60%] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none animate-pulse duration-[6000ms]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Branding Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-[0_0_20px_rgba(245,158,11,0.35)]">
            <CheckSquare className="h-5.5 w-5.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
          </div>
          <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-xl font-black tracking-wider text-transparent">
            Niptado
          </span>
        </div>

        {/* Feature Copy / Showcase */}
        <div className="relative z-10 my-auto max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Next-Gen Workspace Management</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white xl:text-5xl leading-[1.15]">
            Simplify your stack.{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-fuchsia-500 bg-clip-text text-transparent">
              Amplify your output.
            </span>
          </h1>
          <p className="text-base leading-relaxed text-zinc-400">
            Join thousands of developers using our ultra-responsive Kanban boards to optimize workflows, track assignments, and finalize projects ahead of schedule.
          </p>
        </div>

        {/* Legal Footer / Microtext */}
        <div className="relative z-10 text-xs text-zinc-500">
          © 2026 Niptado Inc. All rights reserved. Built with precision layout grids.
        </div>
      </div>

      {/* RIGHT HALF: Interactive Register Form Container */}
      <div className="relative flex w-full flex-col justify-center px-4 sm:px-6 lg:w-1/2 lg:px-16 xl:px-24">
        
        {/* Mobile Logo View Header (Hidden on Large Screen) */}
        <div className="absolute top-8 left-8 z-20 flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <CheckSquare className="h-4 w-4" />
          </div>
          <span className="text-lg font-black tracking-wider text-zinc-900 dark:text-white">
            Niptado
          </span>
        </div>

        <div className="mx-auto w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Sign up to start organizing your interactive boards.
            </p>
          </div>

          {/* Alert System Notifications */}
          {error && (
            <div className="flex items-center gap-2.5 rounded-xl bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.05)] animate-in fade-in duration-200">
              <AlertCircle className="h-4.5 w-4.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2.5 rounded-xl bg-amber-500/10 p-4 text-sm text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)] animate-in fade-in duration-200">
              <div className="h-4 w-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
              <span>{success}</span>
            </div>
          )}

          {/* Interactive Form Controls */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1.5"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400 dark:text-zinc-500">
                    <User className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-900 focus:border-amber-500/50 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-white dark:focus:border-amber-400/40 dark:focus:bg-black/40 transition-all"
                    disabled={isLoading || success !== ''}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email-address"
                  className="block text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400 dark:text-zinc-500">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-900 focus:border-amber-500/50 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-white dark:focus:border-amber-400/40 dark:focus:bg-black/40 transition-all"
                    disabled={isLoading || success !== ''}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400 dark:text-zinc-500">
                    <Lock className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="•••••••• (min 6 chars)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-900 focus:border-amber-500/50 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-white dark:focus:border-amber-400/40 dark:focus:bg-black/40 transition-all"
                    disabled={isLoading || success !== ''}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || success !== ''}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 px-5 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:scale-100 cursor-pointer"
            >
              {isLoading && !success ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign up</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-bold text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}