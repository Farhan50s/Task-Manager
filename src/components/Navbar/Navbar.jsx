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
        <img
          src="/favicon2.png"
          alt="Logo"
          className="navbar-custom__favicon "
          style={{ width: 24, height: 24, marginRight: 8 }}
        />
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