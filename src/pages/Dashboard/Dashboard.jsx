import { useTasks } from '../../context/TaskContext';
import TaskForm from '../../TaskForm/TaskForm.jsx';
import TaskCard from '../../components/TaskCard/TaskCard';
import FilterBar from '../../FilterBar/FilterBar';
import StatsBar from '../../StatsBar/StatsBar';
import './Dashboard.css';

export default function Dashboard() {
  const { dispatch, filteredTasks, stats } = useTasks();

  const overdueTasks = filteredTasks.filter(t => {
    if (!t.dueDate || t.completed) return false;
    return new Date(t.dueDate) < new Date(new Date().toDateString());
  });

  return (
    <>
      <h5 className="dashboard__title">Dashboard</h5>

      <StatsBar />

      {overdueTasks.length > 0 && (
        <div className="dashboard__alert">
          <strong>{overdueTasks.length} overdue task{overdueTasks.length > 1 ? 's' : ''}</strong>
          {' '}— check your task list.
        </div>
      )}

      <div className="dashboard__add-card">
        <p className="dashboard__add-title">Add new task</p>
        <TaskForm
          onSave={(data) => dispatch({ type: 'ADD', payload: data })}
        />
      </div>

      <FilterBar />

      {filteredTasks.length === 0 ? (
        <p className="dashboard__empty">
          {stats.total === 0 ? 'No tasks yet. Add one above!' : 'No tasks match your filters.'}
        </p>
      ) : (
        filteredTasks.map(task => <TaskCard key={task.id} task={task} />)
      )}
    </>
  );
}