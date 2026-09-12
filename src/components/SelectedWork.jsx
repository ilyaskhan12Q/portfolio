import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import './SelectedWork.css';

const FLAGSHIP_SYSTEMS = [
  {
    slug: 'cancer-omics-classifier',
    name: 'Multi-Modal Cancer Omics Classifier',
    category: 'BIOINFORMATICS · ONCOLOGY AI',
    status: 'active',
    statusLabel: 'NEOHACK \'25 WINNER · 1.00 AUC',
    highlightMetric: '1.00 AUC',
    highlightDesc: 'Benchmark evaluation on multi-modal clinical validation set',
    problem:
      'High-dimensional omics data (genomics, transcriptomics, clinical) present severe curse-of-dimensionality (20k+ features) and sensor noise, obscuring patient outcome predictions.',
    solution:
      'Engineered an end-to-end multi-modal data fusion pipeline combining clinical tabular metadata with genomic expression matrices. Applied custom VarianceThreshold and SelectKBest reduction down to 150 high-signal biological markers.',
    keyOutcomes: [
      'Awarded 1st Place at NeoHack 2025.',
      'Achieved 1.00 AUC using an ensemble of XGBoost and Random Forest.',
      'Integrated SHAP values for clinical interpretability and feature importance.',
    ],
    stack: ['Python', 'scikit-learn', 'XGBoost', 'SHAP', 'Pandas', 'Jupyter'],
    topologySteps: [
      { label: 'Ingestion', text: 'Genomic, transcriptomic, and clinical cohorts' },
      { label: 'Reduction', text: 'SelectKBest & VarianceThreshold down to 150 markers' },
      { label: 'Fusion & Model', text: 'Multi-modal feature fusion into XGBoost / RF ensemble' },
      { label: 'Explainability', text: 'SHAP summary plots for clinical verification' },
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/ilyaskhan12Q/cancer-omics-classifier', isExternal: true },
      { label: 'Full Case Study', url: '/projects/cancer-omics-classifier', isExternal: false },
    ],
  },
  {
    slug: 'apdd',
    name: 'Autonomous Parcel Delivery Drone (APDD)',
    category: 'ROBOTICS · EMBEDDED FLIGHT SYSTEMS',
    status: 'active',
    statusLabel: 'CAPSTONE PROJECT · HARDWARE',
    highlightMetric: 'F450 UAV',
    highlightDesc: 'Pixhawk 2.4.8 autopilot with GPS autonomous waypoint navigation',
    problem:
      'Simulated drone delivery ignores physical edge realities: RF telemetry dropouts, wind-induced GPS coordinate drift, and hardware-actuated payload release under strict battery draw.',
    solution:
      'Built and programmed a physical F450 quadcopter powered by a Pixhawk 2.4.8 flight controller running ArduCopter firmware. Configured autonomous waypoint mission plans and servo-driven release mechanics.',
    keyOutcomes: [
      'Built around real flight-controller hardware with fail-safe RTL telemetry.',
      'Servo-actuated parcel deployment mechanism (MG90S) on aux flight channels.',
      'Authored engineering research paper and flight architecture for May 2026 capstone.',
    ],
    stack: ['Pixhawk 2.4.8', 'ArduCopter Firmware', 'C++', 'GPS Navigation', 'F450 Airframe', 'Servo Control'],
    topologySteps: [
      { label: 'Ground Station', text: 'Mission Planner GPS coordinate waypoint mapping' },
      { label: 'Telemetry Link', text: '433MHz full-duplex telemetry with fail-safe return' },
      { label: 'Autopilot Control', text: 'Pixhawk 2.4.8 running ArduCopter firmware' },
      { label: 'Edge Actuation', text: 'MG90S servo release trigger upon waypoint lock' },
    ],
    links: [
      { label: 'System Specifications', url: '/projects/apdd', isExternal: false },
    ],
  },
  {
    slug: 'aj-digital-support-agent',
    name: 'AI Customer Support & Lead Generation Agent',
    category: 'AGENTIC AI · RAG ORCHESTRATION',
    status: 'shipped',
    statusLabel: 'SHIPPED CLIENT SYSTEM',
    highlightMetric: 'Production RAG',
    highlightDesc: 'Orchestrated for AJ Digital Agency (Mardan, Pakistan)',
    problem:
      'Inbound digital agency inquiries required manual triage, resulting in high lead capture latency during off-hours and missed sales conversion opportunities.',
    solution:
      'Architected a production RAG agent using n8n workflow orchestration, Pinecone vector database, and Gemini embeddings to autonomously qualify incoming client leads and answer service inquiries 24/7.',
    keyOutcomes: [
      'Shipped and deployed for a real business client (AJ Digital Agency).',
      'Engineered chunking and similarity threshold safeguards against hallucinations.',
      'Designed structured system prompt chains focused on lead capture outcomes.',
    ],
    stack: ['n8n', 'Pinecone Vector DB', 'Gemini Embeddings', 'Prompt Engineering', 'Webhooks'],
    topologySteps: [
      { label: 'Webhook Ingestion', text: 'Client chat inquiry received via secure HTTP endpoint' },
      { label: 'Vector Retrieval', text: 'Gemini embedding lookup against Pinecone knowledge index' },
      { label: 'Prompt Orchestration', text: 'n8n workflow executing role guardrails and intent triage' },
      { label: 'Lead Dispatch', text: 'Structured qualification payload forwarded to CRM' },
    ],
    links: [
      { label: 'Architecture Breakdown', url: '/projects/aj-digital-support-agent', isExternal: false },
    ],
  },
];

export default function SelectedWork() {
  return (
    <section id="selected-work" className="selected-work-section">
      {/* Section Header */}
      <div className="section-header-row mono">
        <div className="section-title-wrap">
          <span className="section-number">02</span>
          <h2 className="section-heading">SELECTED FLAGSHIP SYSTEMS</h2>
        </div>
        <Link to="/projects" className="section-link mono">
          Explore All 34+ Projects →
        </Link>
      </div>

      {/* Flagship Cards Container */}
      <div className="flagship-list">
        {FLAGSHIP_SYSTEMS.map((sys, idx) => (
          <article key={sys.slug} className="flagship-card">
            {/* ── Top Metadata Bar ── */}
            <header className="flagship-header">
              <div className="flagship-header-left">
                <span className="flagship-idx mono">SYSTEM_0{idx + 1}</span>
                <span className="flagship-category mono">{sys.category}</span>
              </div>
              <div className="flagship-header-right mono">
                <StatusBadge status={sys.status} />
                <span className="flagship-status-pill">{sys.statusLabel}</span>
              </div>
            </header>

            {/* ── Title & Lead Metric Row ── */}
            <div className="flagship-title-row">
              <h3 className="flagship-name mono">{sys.name}</h3>
              <div className="flagship-metric-badge mono">
                <span className="metric-val">{sys.highlightMetric}</span>
                <span className="metric-desc">{sys.highlightDesc}</span>
              </div>
            </div>

            {/* ── 2-Column Balanced Grid ── */}
            <div className="flagship-content-grid">
              {/* Left Column: Problem, Architecture, Results */}
              <div className="flagship-core-col">
                <div className="flagship-field">
                  <span className="field-label mono">THE ENGINEERING CHALLENGE:</span>
                  <p className="field-text">{sys.problem}</p>
                </div>

                <div className="flagship-field">
                  <span className="field-label mono">SYSTEM ARCHITECTURE:</span>
                  <p className="field-text">{sys.solution}</p>
                </div>

                <div className="flagship-field flagship-field--outcomes">
                  <span className="field-label mono">KEY OUTCOMES &amp; BENCHMARKS:</span>
                  <ul className="outcomes-list">
                    {sys.keyOutcomes.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Execution Topology & Stack */}
              <div className="flagship-side-col">
                {/* Pipeline Steps */}
                <div className="topology-box">
                  <div className="topology-header mono">
                    <span className="topology-dot" />
                    <span>SYSTEM EXECUTION TOPOLOGY</span>
                  </div>
                  <div className="topology-body">
                    {sys.topologySteps.map((step, sIdx) => (
                      <div key={sIdx} className="topology-step">
                        <div className="topology-step-header mono">
                          <span className="step-num">0{sIdx + 1}</span>
                          <span className="step-label">{step.label}</span>
                        </div>
                        <p className="step-text">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flagship-stack-block">
                  <span className="field-label mono">PRODUCTION STACK:</span>
                  <div className="stack-pills-wrap">
                    {sys.stack.map((tech) => (
                      <span key={tech} className="stack-pill-card mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="flagship-cta-row">
                  {sys.links.map((link) =>
                    link.isExternal ? (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary mono btn-sm"
                      >
                        <span>↗</span> {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        to={link.url}
                        className="btn btn-secondary mono btn-sm"
                      >
                        <span>→</span> {link.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Directory Routing Footer */}
      <div className="more-projects-callout mono">
        <div className="callout-content">
          <span className="callout-prompt">$ find ~/projects -type f</span>
          <span className="callout-text">
            Explore 34+ additional repositories: LLM tools, AutoInsight AI, PlanCraft 3D, and Escrow infrastructure.
          </span>
        </div>
        <Link to="/projects" className="callout-btn">
          Open Projects Archive [34+] →
        </Link>
      </div>
    </section>
  );
}
