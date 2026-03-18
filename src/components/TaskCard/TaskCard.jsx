import { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskForm from '../TaskForm/TaskForm';
import './TaskCard.css';

const PRIORITY_BADGE = {
  high:   { className: 'priority-high',   label: 'High'   },
  medium: { className: 'priority-medium', label: 'Medium' },
  low:    { className: 'priority-low',    label: 'Low'    },
};

function isOverdue(dueDate, completed) {
  if (!dueDate || completed) return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}

export default function TaskCard({ task }) {
  const { dispatch } = useTasks();
  const [editing, setEditing] = useState(false);
  const badge = PRIORITY_BADGE[task.priority] || PRIORITY_BADGE.medium;
  const overdue = isOverdue(task.dueDate, task.completed);

  return (
    <div className={`task-card ${overdue ? 'overdue' : ''} ${task.completed ? 'completed' : ''}`}>
      <div className="task-card__body">
        {editing ? (
          <TaskForm
            initial={task}
            onSave={(data) => {
              dispatch({ type: 'UPDATE', id: task.id, payload: data });
              setEditing(false);
            }}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <>
            <input
              type="checkbox"
              className="task-card__checkbox"
              checked={task.completed}
              onChange={() => dispatch({ type: 'TOGGLE', id: task.id })}
            />
            <div className="task-card__content">
              <h6 className={`task-card__title ${task.completed ? 'completed' : ''}`}>
                {task.title}
              </h6>
              {task.description && (
                <p className="task-card__desc">{task.description}</p>
              )}
              <div className="task-card__meta">
                <span className={badge.className}>{badge.label}</span>
                {task.dueDate && (
                  <span className={`task-card__due ${overdue ? 'overdue' : ''}`}>
                    {overdue ? 'Overdue: ' : 'Due: '}{task.dueDate}
                  </span>
                )}
                {task.completed && (
                  <span className="task-card__completed-label">Completed</span>
                )}
              </div>
            </div>
            <div className="task-card__actions">
              <button className="btn-edit" onClick={() => setEditing(true)}>Edit</button>
              <button className="btn-delete" onClick={() => dispatch({ type: 'DELETE', id: task.id })}>Delete</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}