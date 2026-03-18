import { useTasks } from '../../context/TaskContext';
import './StatsBar.css';

const STATS_CONFIG = [
  { key: 'total',     label: 'Total tasks', color: '#185FA5' },
  { key: 'completed', label: 'Completed',   color: '#3B6D11' },
  { key: 'pending',   label: 'Pending',     color: '#854F0B' },
];

export default function StatsBar() {
  const { stats } = useTasks();

  return (
    <div className="stats-bar">
      <div className="stats-bar__grid">
        {STATS_CONFIG.map(({ key, label, color }) => (
          <div className="stats-bar__card" key={key}>
            <div className="stats-bar__value" style={{ color }}>
              {stats[key]}
            </div>
            <div className="stats-bar__label">{label}</div>
          </div>
        ))}
        <div className="stats-bar__card">
          <div className="stats-bar__value" style={{ color: '#534AB7' }}>
            {stats.percent}%
          </div>
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