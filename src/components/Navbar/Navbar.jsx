import { NavLink } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext';
import './Navbar.css';

export default function Navbar() {
  const { stats } = useTasks();

  return (
    <nav className="navbar-custom">
      <NavLink
        to="/"
        className="navbar-custom__brand"
        end
      >
        <span className="navbar-custom__brand-dot" />
        Task Manager
      </NavLink>
      <ul className="navbar-custom__links">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              'navbar-custom__link' + (isActive ? ' active' : '')
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              'navbar-custom__link' + (isActive ? ' active' : '')
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}