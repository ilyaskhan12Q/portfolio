import StatusBadge from './StatusBadge';
import './CurrentlyBuilding.css';

const ACTIVE_SYSTEMS = [
  {
    name: 'APDD Flight Hardware',
    category: 'Robotics / UAV',
    status: 'active',
    desc: 'Autonomous quadcopter mission testing and fail-safe servo payload integration for May 2026 capstone.',
    stack: 'Pixhawk 2.4.8 · ArduCopter · C++',
  },
  {
    name: 'SpreadsheetAppBuilder (SAB)',
    category: 'Developer Tooling / AI',
    status: 'in-progress',
    desc: 'Decoupled engine converting natural language into production spreadsheet tools via dual LibreOffice/Excel adapters.',
    stack: 'Python · UNO API · Office.js',
  },
  {
    name: 'Clinical ML Research',
    category: 'Bioinformatics / AI',
    status: 'active',
    desc: 'Extending multi-modal omics classification pipeline with cross-cohort validation datasets.',
    stack: 'PyTorch · SHAP · scikit-learn',
  },
];

export default function CurrentlyBuilding() {
  return (
    <section className="current-section">
      <div className="section-header-row mono">
        <div className="section-title-wrap">
          <span className="section-number">04</span>
          <h2 className="section-heading">CURRENTLY BUILDING &amp; SYSTEM STATUS</h2>
        </div>
        <span className="section-context">ACTIVE_PROCESSES // Q1-Q2 2026</span>
      </div>

      <div className="current-grid">
        {ACTIVE_SYSTEMS.map((sys) => (
          <div key={sys.name} className="current-card">
            <div className="current-top mono">
              <span className="current-cat">{sys.category}</span>
              <StatusBadge status={sys.status} />
            </div>
            <h3 className="current-name mono">{sys.name}</h3>
            <p className="current-desc">{sys.desc}</p>
            <div className="current-stack mono">
              <span className="stack-label">STACK:</span> {sys.stack}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
