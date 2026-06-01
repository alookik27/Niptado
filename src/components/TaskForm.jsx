'use client';

import { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

export default function TaskForm({ isOpen, onClose, onSubmit, task, initialStage = 'Todo' }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stage, setStage] = useState('Todo');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStage(task.stage || 'Todo');
    } else {
      setTitle('');
      setDescription('');
      setStage(initialStage || 'Todo');
    }
    setError('');
  }, [task, isOpen, initialStage]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        stage,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-2xl rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-2xl dark:border-zinc-900 dark:bg-zinc-950/90 dark:backdrop-blur-xl transition-all animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between pb-5 border-b border-zinc-100 dark:border-zinc-900/80">
          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              {task ? 'Edit Task Workspace' : 'Create New Task'}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 mt-1">
              Fill out the details below to organize your workflow item.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-amber-400 dark:hover:shadow-[0_0_10px_rgba(245,158,11,0.15)] transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mt-5 flex items-center gap-3 rounded-xl bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.05)]">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label
                htmlFor="task-title"
                className="block text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2"
              >
                Title *
              </label>
              <input
                id="task-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Set up database connection infrastructure"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-900 focus:border-amber-500/50 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-black/40 dark:text-white dark:focus:border-amber-400/40 dark:focus:bg-black/80 dark:focus:shadow-[0_0_15px_rgba(245,158,11,0.05)] transition-all"
                disabled={isSubmitting}
                autoFocus
              />
            </div>

            <div>
              <label
                htmlFor="task-stage"
                className="block text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2"
              >
                Stage Placement
              </label>
              <div className="relative">
                <select
                  id="task-stage"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-900 focus:border-amber-500/50 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-black/40 dark:text-white dark:focus:border-amber-400/40 dark:focus:bg-black/80 dark:focus:shadow-[0_0_15px_rgba(245,158,11,0.05)] transition-all appearance-none cursor-pointer"
                  disabled={isSubmitting}
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-zinc-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="task-desc"
              className="block text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2"
            >
              Detailed Description
            </label>
            <textarea
              id="task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide context, acceptance criteria, or deep specifications for this assignment..."
              rows={6}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-900 focus:border-amber-500/50 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-black/40 dark:text-white dark:focus:border-amber-400/40 dark:focus:bg-black/80 dark:focus:shadow-[0_0_15px_rgba(245,158,11,0.05)] transition-all resize-none"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center justify-end gap-4 pt-5 border-t border-zinc-100 dark:border-zinc-900/80">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center min-w-[140px] rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 px-6 py-3 text-sm font-bold text-white shadow-[0_0_15px_rgba(245,158,11,0.3)] dark:shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : task ? (
                'Save Changes'
              ) : (
                'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}