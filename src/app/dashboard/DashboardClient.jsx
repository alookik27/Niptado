'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Navbar from '@/components/Navbar';
import TaskColumn from '@/components/TaskColumn';
import TaskForm from '@/components/TaskForm';
import Loader from '@/components/Loader';
import { Search, Plus, AlertCircle, Kanban } from 'lucide-react';

export default function DashboardClient({ user }) {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStage, setFilterStage] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [initialStage, setInitialStage] = useState('Todo');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('/api/tasks');
        if (!res.ok) throw new Error('Failed to load tasks');
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setError('Error loading tasks. Please refresh the page.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStage = over.id;

    const originalTask = tasks.find((t) => t._id === taskId);
    if (!originalTask || originalTask.stage === newStage) return;

    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, stage: newStage } : t))
    );

    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage }),
      });

      if (!res.ok) throw new Error('Failed to update stage on database');
    } catch (err) {
      console.error(err);
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, stage: originalTask.stage } : t))
      );
      showNotification('error', 'Failed to move task. Reverting changes.');
    }
  };

  const handleOpenAddTask = (stage = 'Todo') => {
    setSelectedTask(null);
    setInitialStage(stage);
    setIsFormOpen(true);
  };

  const handleOpenEditTask = (task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (taskPayload) => {
    try {
      if (selectedTask) {
        const res = await fetch(`/api/tasks/${selectedTask._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskPayload),
        });

        if (!res.ok) throw new Error('Failed to update task');
        const updated = await res.json();
        setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
        showNotification('success', 'Task updated successfully!');
      } else {
        const res = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskPayload),
        });

        if (!res.ok) throw new Error('Failed to create task');
        const created = await res.json();
        setTasks((prev) => [created, ...prev]);
        showNotification('success', 'Task created successfully!');
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleDeleteTask = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete task');
      setTasks((prev) => prev.filter((t) => t._id !== id));
      showNotification('success', 'Task deleted successfully.');
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to delete task.');
    }
  };

  const showNotification = (type, message) => {
    if (type === 'success') {
      setSuccess(message);
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(message);
      setTimeout(() => setError(''), 4000);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const todoTasks = filteredTasks.filter((t) => t.stage === 'Todo');
  const inProgressTasks = filteredTasks.filter((t) => t.stage === 'In Progress');
  const doneTasks = filteredTasks.filter((t) => t.stage === 'Done');

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-800 dark:bg-black dark:text-zinc-200 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-fuchsia-500/10 dark:bg-fuchsia-500/5 rounded-full blur-[120px] pointer-events-none" />

      <Navbar user={user} />

      <main className="mx-auto max-w-full px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
              Hello,{' '}
              <span className='text-amber-600 capitalize'>
                {user.name}.
              </span>
            </h1>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              Manage, search, and organize your work using this responsive Kanban workspace.
            </p>
          </div>

          <button
            onClick={() => handleOpenAddTask('Todo')}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-amber-500 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] dark:shadow-[0_0_25px_rgba(245,158,11,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer self-start md:self-auto"
          >
            <Plus className="h-4.5 w-4.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
            <span>Create Task</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2.5 rounded-xl bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.05)] animate-in fade-in duration-200">
            <AlertCircle className="h-4.5 w-4.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center gap-2.5 rounded-xl bg-amber-500/10 p-4 text-sm text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)] animate-in fade-in duration-200">
            <AlertCircle className="h-4.5 w-4.5 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-white/70 dark:bg-zinc-950/40 backdrop-blur-md rounded-2xl border border-zinc-200/60 dark:border-zinc-900/80 p-4 mb-8 shadow-sm">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400 dark:text-zinc-500">
              <Search className="h-4.5 w-4.5" />
            </div>
            <input
              type="text"
              placeholder="Search tasks by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-900 focus:border-amber-500/50 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-white dark:focus:border-amber-400/40 dark:focus:bg-black/40 dark:focus:shadow-[0_0_15px_rgba(34,211,238,0.05)] transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 sm:hidden border-t border-zinc-100 dark:border-zinc-900 pt-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mr-1">View:</span>
            {['All', 'Todo', 'In Progress', 'Done'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStage(st)}
                className={`text-xs px-2.5 py-1.5 font-medium rounded-lg transition-all cursor-pointer ${
                  filterStage === st
                    ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-900 dark:text-amber-400 dark:shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-450 dark:hover:text-zinc-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader size="lg" />
          </div>
        ) : (
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {(filterStage === 'All' || filterStage === 'Todo') && (
                <TaskColumn
                  id="Todo"
                  title="Todo"
                  tasks={todoTasks}
                  onEdit={handleOpenEditTask}
                  onDelete={handleDeleteTask}
                  onAddTask={handleOpenAddTask}
                />
              )}

              {(filterStage === 'All' || filterStage === 'In Progress') && (
                <TaskColumn
                  id="In Progress"
                  title="In Progress"
                  tasks={inProgressTasks}
                  onEdit={handleOpenEditTask}
                  onDelete={handleDeleteTask}
                  onAddTask={handleOpenAddTask}
                />
              )}

              {(filterStage === 'All' || filterStage === 'Done') && (
                <TaskColumn
                  id="Done"
                  title="Done"
                  tasks={doneTasks}
                  onEdit={handleOpenEditTask}
                  onDelete={handleDeleteTask}
                  onAddTask={handleOpenAddTask}
                />
              )}
            </div>
          </DndContext>
        )}
      </main>

      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        task={selectedTask}
        initialStage={initialStage}
      />
    </div>
  );
}