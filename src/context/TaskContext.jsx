// src/context/TaskContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';
import { taskService } from '../services/taskService';

const TaskContext = createContext(null);

/**
 * Reducer for the task context.
 * Handles the following actions:
 *  - LOAD: sets the tasks to the provided array.
 *  - ADD: adds a new task to the list.
 *  - UPDATE: updates a task with the provided id and payload.
 *  - DELETE: removes a task with the provided id.
 *  - TOGGLE: toggles the completion status of a task with the provided id.
 *  - CLEAR_COMPLETED: removes all completed tasks from the list.
 *  - CLEAR_ALL: clears the task list.
 *  - SET_FILTER: sets the filter for the task list.
 *  - SET_SEARCH: sets the search query for the task list.
 *  - SET_PRIORITY_FILTER: sets the priority filter for the task list.
 * @param {Object} state the current state of the task context.
 * @param {Object} action the action to be handled.
 * @returns {Object} the new state of the task context.
 */
function taskReducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return { ...state, tasks: action.payload };

    case 'ADD':
      return { ...state, tasks: taskService.add(state.tasks, action.payload) };

    case 'UPDATE':
      return { ...state, tasks: taskService.update(state.tasks, action.id, action.payload) };

    case 'DELETE':
      return { ...state, tasks: taskService.delete(state.tasks, action.id) };

    case 'TOGGLE':
      return { ...state, tasks: taskService.toggle(state.tasks, action.id) };

    case 'CLEAR_COMPLETED': {
      const updated = state.tasks.filter(t => !t.completed);
      taskService.save(updated);
      return { ...state, tasks: updated };
    }

    case 'CLEAR_ALL':
      taskService.save([]);
      return { ...state, tasks: [] };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'SET_SEARCH':
      return { ...state, search: action.payload };

    case 'SET_PRIORITY_FILTER':
      return { ...state, priorityFilter: action.payload };

    default:
      return state;
  }
}

const initialState = {
  tasks: [],
  filter: 'all',
  search: '',
  priorityFilter: 'all',
};

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const tasks = taskService.getAll();
    dispatch({ type: 'LOAD', payload: tasks });
  }, []);

  const filteredTasks = state.tasks
    .filter(t => {
      if (state.filter === 'active') return !t.completed;
      if (state.filter === 'completed') return t.completed;
      return true;
    })
    .filter(t => {
      if (state.priorityFilter !== 'all') return t.priority === state.priorityFilter;
      return true;
    })
    .filter(t =>
      t.title.toLowerCase().includes(state.search.toLowerCase())
    );

  const stats = {
    total: state.tasks.length,
    completed: state.tasks.filter(t => t.completed).length,
    pending: state.tasks.filter(t => !t.completed).length,
    percent: state.tasks.length
      ? Math.round((state.tasks.filter(t => t.completed).length / state.tasks.length) * 100)
      : 0,
  };

  return (
    <TaskContext.Provider value={{ state, dispatch, filteredTasks, stats }}>
      {children}
    </TaskContext.Provider>
  );
}

/**
 * Hook to access the task state, dispatch function, filtered tasks, and statistics.
 * Must be used within the TaskProvider component.
 * Returns an object with the following properties:
 * - state: the current task state
 * - dispatch: the dispatch function to update the task state
 * - filteredTasks: the tasks that match the current filter and search criteria
 * - stats: the statistics of the tasks, including the total number of tasks, the number of completed tasks, the number of pending tasks, and the percentage of completed tasks
 * @throws {Error} if not used within TaskProvider
 */
export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
}