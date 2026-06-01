'use client';

import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';

export default function TaskColumn({ id, title, tasks, onEdit, onDelete, onAddTask }) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-2xl border transition-all duration-200 dark:bg-zinc-950/20 backdrop-blur-sm ${
        isOver
          ? 'border-amber-500/50 bg-zinc-100/80 dark:bg-zinc-900/40 ring-4 ring-amber-500/5 scale-[1.01]'
          : 'border-zinc-200/60 bg-zinc-50/40 dark:border-zinc-900/60'
      }`}
    >
      <div className="flex items-center justify-between pb-4 p-4">
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full shadow-[0_0_8px_currentColor] ${
              id === 'Todo'
                ? 'text-zinc-400 bg-zinc-400 dark:text-zinc-600 dark:bg-zinc-600'
                : id === 'In Progress'
                ? 'text-amber-500 bg-amber-500'
                : 'text-orange-500 bg-orange-500'
            }`}
          />
          <h3 className="font-bold text-zinc-700 dark:text-zinc-200">{title}</h3>
          <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-zinc-200/80 text-xs font-semibold text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 dark:border dark:border-zinc-800/60">
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => onAddTask(id)}
          className="rounded-xl p-1.5 text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-amber-400 dark:hover:shadow-[0_0_10px_rgba(245,158,11,0.15)] transition-all"
          title={`Add task to ${title}`}
        >
          <Plus className="h-4.5 w-4.5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 min-h-[350px] p-4 pt-0">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-white/50 p-6 text-center dark:border-zinc-900 dark:bg-black/20">
            <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
              No tasks in this stage
            </p>
            <button
              onClick={() => onAddTask(id)}
              className="mt-2 text-xs font-semibold text-amber-600 hover:text-amber-500 dark:text-amber-400/90 dark:hover:text-amber-300 transition-colors"
            >
              Add a task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}