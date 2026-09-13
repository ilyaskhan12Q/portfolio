import StatusBadge from './StatusBadge';
import './CurrentlyBuilding.css';

const ACTIVE_SYSTEMS = [
  {
    name: 'APDD Flight Hardware',
    category: '// ROBOTICS & DRONES',
    status: 'active',
    desc: 'Physical autonomous quadcopter flight testing and fail-safe servo payload integration for May 2026 capstone.',
    stack: 'Pixhawk 2.4.8 · ArduCopter · C++',
  },
  {
    name: 'SpreadsheetAppBuilder (SAB)',
    category: '// DEVELOPER TOOLS & AI',
    status: 'in-progress',
    desc: 'Decoupled engine turning natural language instructions into functional spreadsheet extensions for LibreOffice and Excel.',
    stack: 'Python · UNO API · Office.js',
  },
  {
    name: 'Clinical ML Research',
    category: '// BIOINFORMATICS & AI',
    status: 'active',
    desc: 'Validating our 1st-place cancer omics classification models against additional public clinical cohorts.',
    stack: 'PyTorch · SHAP · scikit-learn',
  },
];

export default function CurrentlyBuilding() {
  return (
    <section className="current-section">
      <div className="section-header-row mono">
        <div className="section-title-wrap">
          <span className="section-number">04</span>
          <h2 className="section-heading">CURRENTLY BUILDING &amp; RESEARCHING</h2>
        </div>
        <span className="section-context">// ACTIVE IN 2026</span>
      </div>

      <div className="current-grid">
        {ACTIVE_SYSTEMS.map((sys) => (
          <div key={sys.name} className="current-card">
            <div className="current-top mono">
              <span className="current-cat">{sys.category}</span>
              <StatusBadge status={sys.status} />
            </div>
            <h3 className="current-name">{sys.name}</h3>
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
