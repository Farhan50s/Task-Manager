import { useState } from 'react';
import './TaskForm.css';

export default function TaskForm({ initial = {}, onSave, onCancel }) {
  const [form, setForm] = useState({
    title:       initial.title       || '',
    description: initial.description || '',
    priority:    initial.priority    || 'medium',
    dueDate:     initial.dueDate     || '',
  });

  const set = (field) => (e) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(form);
    if (!initial.id) {
      setForm({ title: '', description: '', priority: 'medium', dueDate: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="task-form__row">
        <input
          className="task-form__input"
          placeholder="Task title *"
          value={form.title}
          onChange={set('title')}
          required
        />
      </div>
      <div className="task-form__row">
        <textarea
          className="task-form__textarea"
          placeholder="Description (optional)"
          rows={2}
          value={form.description}
          onChange={set('description')}
        />
      </div>
      <div className="task-form__row--split">
        <select
          className="task-form__select"
          value={form.priority}
          onChange={set('priority')}
        >
          <option value="high">High priority</option>
          <option value="medium">Medium priority</option>
          <option value="low">Low priority</option>
        </select>
        <input
          type="date"
          className="task-form__input"
          value={form.dueDate}
          onChange={set('dueDate')}
        />
      </div>
      <div className="task-form__actions">
        <button type="submit" className="btn-submit">
          {initial.id ? 'Save changes' : 'Add task'}
        </button>
        {onCancel && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}