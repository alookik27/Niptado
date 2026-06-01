'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit2, Trash2, Calendar } from 'lucide-react';

export default function TaskCard({ task, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (e) {
      return '';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex items-start gap-3 rounded-2xl border bg-white p-5 shadow-sm transition-all dark:bg-zinc-950/40 dark:backdrop-blur-md ${
        isDragging
          ? 'border-amber-500/80 ring-4 ring-amber-500/15 shadow-[0_0_25px_rgba(245,158,11,0.25)] cursor-grabbing dark:bg-zinc-900/90'
          : 'border-zinc-200/80 hover:border-zinc-350 dark:border-zinc-900 dark:hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.06)]'
      }`}
    >
      {/* Expanded Drag Handle for better control in large layout */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="mt-0.5 -ml-1 flex h-7 w-5 items-center justify-center rounded-lg cursor-grab text-zinc-400 hover:bg-zinc-100 hover:text-amber-500 active:cursor-grabbing dark:text-zinc-600 dark:hover:bg-zinc-900 dark:hover:text-amber-400 transition-all"
        aria-label="Drag task grip"
      >
        <GripVertical className="h-4.5 w-4.5" />
      </button>

      <div className="flex-1 min-w-0">
        <h4 className="font-black tracking-tight text-zinc-800 dark:text-zinc-100 break-words text-base sm:text-lg leading-snug group-hover:text-zinc-950 dark:group-hover:text-amber-400/90 transition-colors">
          {task.title}
        </h4>
        
        {task.description && (
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 break-words line-clamp-3 leading-relaxed">
            {task.description}
          </p>
        )}
        
        <div className="mt-4.5 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900/60 pt-3">
          <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 text-xs font-medium">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(task.createdAt)}</span>
          </div>

          {/* Action buttons polished to match the updated UI scheme */}
          <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200">
            <button
              onClick={() => onEdit(task)}
              className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-900 dark:text-zinc-500 dark:hover:text-amber-400 dark:hover:shadow-[0_0_10px_rgba(245,158,11,0.1)] transition-all"
              title="Edit Task"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="rounded-xl p-2 text-zinc-400 hover:bg-red-500/10 hover:text-red-600 dark:hover:bg-red-950/40 dark:text-zinc-500 dark:hover:text-red-400 border border-transparent hover:border-red-500/20 dark:hover:border-red-500/30 transition-all"
              title="Delete Task"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}