import './ProofBar.css';

export default function ProofBar({ repoCount = 34 }) {
  const proofItems = [
    {
      badge: 'COMPETITION / 1ST PLACE',
      value: 'NeoHack 2025 Winner',
      detail: 'Multi-Modal Cancer Omics Classifier · 1.00 AUC',
      highlight: true,
    },
    {
      badge: 'CODEBASE TELEMETRY',
      value: `${repoCount}+ Repositories`,
      detail: 'Machine Learning, Autonomous Systems, Full-Stack',
      highlight: false,
    },
    {
      badge: 'ACADEMIC RIGOR',
      value: '3.51 / 4.00 CGPA',
      detail: 'BS Computer Science (AI Specialization) · AWKUM',
      highlight: false,
    },
    {
      badge: 'HARDWARE & EDGE',
      value: 'Autonomous UAV',
      detail: 'Pixhawk 2.4.8 + ArduCopter GPS Waypoint Flight',
      highlight: false,
    },
  ];

  return (
    <section className="proof-bar">
      <div className="proof-bar-header mono">
        <span className="proof-header-tag">// HIGHLIGHTS</span>
        <span className="proof-header-title">Key Achievements &amp; Verified Work</span>
      </div>

      <div className="proof-bar-grid">
        {proofItems.map((item, idx) => (
          <div
            key={idx}
            className={`proof-item ${item.highlight ? 'proof-item--highlight' : ''}`}
          >
            <span className="proof-item-badge mono">{item.badge}</span>
            <div className="proof-item-value mono">{item.value}</div>
            <p className="proof-item-detail">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
