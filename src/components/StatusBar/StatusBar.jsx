import { useTasks } from '../../context/TaskContext';
import './StatusBar.css';

const STATS_CONFIG = [
  { key: 'total',     label: 'Total',     accent: '#0ea5e9' },
  { key: 'completed', label: 'Completed', accent: '#10b981' },
  { key: 'pending',   label: 'Pending',   accent: '#f59e0b' },
];

export default function StatsBar() {
  const { stats } = useTasks();

  return (
    <div className="stats-bar">
      <div className="stats-bar__grid">
        {STATS_CONFIG.map(({ key, label, accent }) => (
          <div className="stats-bar__card" key={key}>
            <span className="stats-bar__accent" style={{ background: accent }} />
            <div className="stats-bar__value">{stats[key]}</div>
            <div className="stats-bar__label">{label}</div>
          </div>
        ))}
        <div className="stats-bar__card">
          <span className="stats-bar__accent" style={{ background: '#8b5cf6' }} />
          <div className="stats-bar__value">{stats.percent}%</div>
          <div className="stats-bar__label">Progress</div>
        </div>
      </div>
      <div className="stats-bar__progress">
        <div
          className="stats-bar__progress-bar"
          style={{ width: stats.percent + '%' }}
        />
      </div>
    </div>
  );
}