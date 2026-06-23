import './StatusBadge.css';

const STATUS_MAP = {
  active: { label: 'active', cls: 'status-active' },
  shipped: { label: 'shipped', cls: 'status-shipped' },
  'in-progress': { label: 'in_progress', cls: 'status-progress' },
};

export default function StatusBadge({ status }) {
  const cfg = STATUS_MAP[status] || STATUS_MAP.shipped;
  return (
    <span className={`status-badge mono ${cfg.cls}`}>
      <span className="status-dot" />
      {cfg.label}
    </span>
  );
}
