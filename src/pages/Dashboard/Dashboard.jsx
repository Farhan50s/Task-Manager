import { useTasks } from '../../context/TaskContext';
import { AnimatePresence, motion } from 'framer-motion';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskCard from '../../components/TaskCard/TaskCard';
import FilterBar from '../../components/FilterBar/FilterBar';
import StatsBar from '../../components/StatusBar/StatusBar';
import './Dashboard.css';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.4, 0, 0.2, 1] }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] }
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 14 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.05,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
  exit: {
    opacity: 0,
    x: -24,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
};

export default function Dashboard() {
  const { dispatch, filteredTasks, stats } = useTasks();

  const overdueTasks = filteredTasks.filter(t => {
    if (!t.dueDate || t.completed) return false;
    return new Date(t.dueDate) < new Date(new Date().toDateString());
  });

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h5 className="dashboard__title">Dashboard</h5>

      <StatsBar />

      {overdueTasks.length > 0 && (
        <motion.div
          className="dashboard__alert"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          <strong>{overdueTasks.length} overdue task{overdueTasks.length > 1 ? 's' : ''}</strong>
          {' '}— check your task list.
        </motion.div>
      )}

      <div className="dashboard__add-card">
        <p className="dashboard__add-title">Add new task</p>
        <TaskForm
          onSave={(data) => dispatch({ type: 'ADD', payload: data })}
        />
      </div>

      <FilterBar />

      {filteredTasks.length === 0 ? (
        <motion.p
          className="dashboard__empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {stats.total === 0 ? 'No tasks yet. Add one above!' : 'No tasks match your filters.'}
        </motion.p>
      ) : (
        <AnimatePresence mode="popLayout">
          {filteredTasks.map((task, i) => (
            <motion.div
              key={task.id}
              custom={i}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              layout
            >
              <TaskCard task={task} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  );
}