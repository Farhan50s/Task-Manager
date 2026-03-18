import { useTasks } from '../../context/TaskContext';
import './Settings.css';

export default function Settings() {
  const { dispatch, stats } = useTasks();

  const clearCompleted = () => {
    if (window.confirm('Delete all completed tasks? This cannot be undone.')) {
      dispatch({ type: 'CLEAR_COMPLETED' });
    }
  };

  const clearAll = () => {
    if (window.confirm('Delete ALL tasks? This cannot be undone.')) {
      dispatch({ type: 'CLEAR_ALL' });
    }
  };

  return (
    <>
      <h5 className="settings__title">Settings</h5>

      <div className="settings__card">
        <p className="settings__card-title">Data management</p>

        <div className="settings__stats">
          <div className="settings__stat">
            <div className="settings__stat-value">{stats.total}</div>
            <div className="settings__stat-label">Total</div>
          </div>
          <div className="settings__stat">
            <div className="settings__stat-value" style={{ color: '#3B6D11' }}>
              {stats.completed}
            </div>
            <div className="settings__stat-label">Completed</div>
          </div>
          <div className="settings__stat">
            <div className="settings__stat-value" style={{ color: '#854F0B' }}>
              {stats.pending}
            </div>
            <div className="settings__stat-label">Pending</div>
          </div>
          <div className="settings__stat">
            <div className="settings__stat-value" style={{ color: '#534AB7' }}>
              {stats.percent}%
            </div>
            <div className="settings__stat-label">Progress</div>
          </div>
        </div>

        <div className="settings__divider" />

        <div className="settings__actions">
          <button
            className="btn-warn"
            onClick={clearCompleted}
            disabled={stats.completed === 0}
          >
            Clear completed ({stats.completed})
          </button>
          <button
            className="btn-danger"
            onClick={clearAll}
            disabled={stats.total === 0}
          >
            Clear all tasks ({stats.total})
          </button>
        </div>
      </div>

      <div className="settings__card">
        <p className="settings__card-title">Storage</p>
        <p className="settings__card-desc">
          All tasks are saved locally in your browser using localStorage under
          the key <code>studyhub_tasks</code>. No data is sent to any server.
          When you integrate this into StudyHub AI, swap <code>taskService.js</code> for
          a real API — no other files need to change.
        </p>
      </div>

      <div className="settings__card">
        <p className="settings__card-title">About</p>
        <p className="settings__about-text">
          StudyHub Tasks is a standalone productivity module built with React,
          Context API, and custom CSS. Designed to plug cleanly into StudyHub AI.
        </p>
        <span className="settings__version">v1.0.0</span>
      </div>
    </>
  );
}