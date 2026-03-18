import { useTasks } from '../../context/TaskContext';
import './FilterBar.css';

export default function FilterBar() {
  const { state, dispatch } = useTasks();

  return (
    <div className="filter-bar">
      <input
        type="search"
        className="filter-bar__search"
        placeholder="Search tasks..."
        value={state.search}
        onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
      />
      <div className="filter-bar__group">
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            className={`filter-bar__btn ${state.filter === f ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_FILTER', payload: f })}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <select
        className="filter-bar__select"
        value={state.priorityFilter}
        onChange={(e) => dispatch({ type: 'SET_PRIORITY_FILTER', payload: e.target.value })}
      >
        <option value="all">All priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
}