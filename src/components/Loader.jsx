'use client';

export default function Loader({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]',
    md: 'w-12 h-12 border-3 shadow-[0_0_25px_rgba(245,158,11,0.3)]',
    lg: 'w-20 h-20 border-4 shadow-[0_0_40px_rgba(245,158,11,0.4)]',
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-3">
      <div className="relative">
        <div 
          className={`absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 blur-md opacity-20 animate-ping duration-[1500ms] ${
            size === 'sm' ? 'scale-125' : size === 'lg' ? 'scale-105' : 'scale-110'
          }`} 
        />

        <div
          className={`${
            sizeClasses[size] || sizeClasses.md
          } border-zinc-200/20 border-t-amber-500 border-r-orange-500 dark:border-zinc-900/40 dark:border-t-amber-400 dark:border-r-orange-500 rounded-full animate-spin [animation-duration:0.65s]`}
        />
        
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/10 to-orange-600/0 mix-blend-screen" />
      </div>

      {size !== 'sm' && (
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 animate-pulse duration-[800ms]">
          Syncing Data...
        </span>
      )}
    </div>
  );
}