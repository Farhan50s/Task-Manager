// src/services/taskService.js
const STORAGE_KEY = 'studyhub_tasks';

export const taskService = {
  /**
   * Retrieves all tasks from local storage.
   * @returns {Array} An array of tasks
   */
  getAll() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

/**
 * Saves the given tasks to local storage.
 * @param {Array} tasks An array of tasks
 */
  save(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  },


/**
 * Adds a new task to the tasks array.
 * @param {Array} tasks The existing tasks array
 * @param {Object} task The new task to add
 * @returns {Array} The updated tasks array
 */
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

/**
 * Updates a task with the given id and changes.
 * @param {Array} tasks The existing tasks array
 * @param {string} id The id of the task to update
 * @param {Object} changes The changes to apply to the task
 * @returns {Array} The updated tasks array
 */
  update(tasks, id, changes) {
    const updated = tasks.map(t => t.id === id ? { ...t, ...changes } : t);
    this.save(updated);
    return updated;
  },

    
/**
 * Deletes a task with the given id.
 * @param {Array} tasks The existing tasks array
 * @param {string} id The id of the task to delete
 * @returns {Array} The updated tasks array
 */
  delete(tasks, id) {
    const updated = tasks.filter(t => t.id !== id);
    this.save(updated);
    return updated;
  },


/**
 * Toggles the completion status of a task with the given id.
 * @param {Array} tasks The existing tasks array
 * @param {string} id The id of the task to toggle
 * @returns {Array} The updated tasks array
 */
  toggle(tasks, id) {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.save(updated);
    return updated;
  },
};