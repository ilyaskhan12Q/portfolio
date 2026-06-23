import './TerminalFrame.css';

export default function TerminalFrame({ title = 'session', children, className = '' }) {
  return (
    <div className={`tframe ${className}`}>
      <div className="tframe-bar">
        <div className="tframe-dots">
          <span className="tframe-dot" />
          <span className="tframe-dot" />
          <span className="tframe-dot" />
        </div>
        <span className="tframe-title mono">{title}</span>
      </div>
      <div className="tframe-body">{children}</div>
    </div>
  );
}
