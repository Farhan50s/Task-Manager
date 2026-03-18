// src/services/taskService.js
const STORAGE_KEY = 'studyhub_tasks';

export const taskService = {
  getAll() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  save(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  },

  add(tasks, task) {
    const newTask = {
      id: crypto.randomUUID(),
      title: task.title,
      description: task.description || '',
      priority: task.priority || 'medium',
      dueDate: task.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updated = [newTask, ...tasks];
    this.save(updated);
    return updated;
  },

  update(tasks, id, changes) {
    const updated = tasks.map(t => t.id === id ? { ...t, ...changes } : t);
    this.save(updated);
    return updated;
  },

  delete(tasks, id) {
    const updated = tasks.filter(t => t.id !== id);
    this.save(updated);
    return updated;
  },

  toggle(tasks, id) {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.save(updated);
    return updated;
  },
};