import './StatusBadge.css';

const STATUS_MAP = {
  active: { label: 'active', cls: 'status-active' },
  shipped: { label: 'shipped', cls: 'status-shipped' },
  'in-progress': { label: 'in_progress', cls: 'status-progress' },
  'live inference': { label: 'live_inference', cls: 'status-active' },
  'active running': { label: 'active', cls: 'status-active' },
  'standby render': { label: 'standby', cls: 'status-progress' },
  'stable pipeline': { label: 'stable', cls: 'status-shipped' },
  'live instance': { label: 'live', cls: 'status-active' },
  'secure escrow': { label: 'secure', cls: 'status-shipped' },
};

export default function StatusBadge({ status }) {
  const normalized = String(status || '')
    .toLowerCase()
    .replace(/[[\]]/g, '')
    .trim();
  const cfg = STATUS_MAP[normalized] || STATUS_MAP.shipped;
  return (
    <span className={`status-badge mono ${cfg.cls}`}>
      <span className="status-dot" />
      {cfg.label}
    </span>
  );
}
