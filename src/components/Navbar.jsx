import { NavLink } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export default function Navbar() {
  const { stats } = useTasks();

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary px-4">
      <span className="navbar-brand fw-semibold">StudyHub Tasks</span>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav ms-auto gap-1">
          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' active fw-semibold' : '')
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' active fw-semibold' : '')
              }
            >
              Tasks
              {stats.pending > 0 && (
                <span className="badge bg-warning text-dark ms-1">
                  {stats.pending}
                </span>
              )}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' active fw-semibold' : '')
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}