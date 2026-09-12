import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import './SelectedWork.css';

const FLAGSHIP_SYSTEMS = [
  {
    slug: 'cancer-omics-classifier',
    name: 'Multi-Modal Cancer Omics Classifier',
    eyebrow: 'BIOINFORMATICS & PRECISION ONCOLOGY',
    status: 'active',
    statusLabel: '[NEOHACK \'25 WINNER · 1.00 AUC]',
    problem:
      'High-dimensional multi-omics datasets (genomics, transcriptomics, clinical) present extreme curse-of-dimensionality (20k+ features) and feature noise, obscuring patient outcome predictions.',
    solution:
      'Engineered an end-to-end multi-modal data fusion pipeline combining clinical tabular metadata with genomic expression matrices. Applied custom VarianceThreshold and SelectKBest reduction down to 150 high-signal markers.',
    results: [
      'Achieved 1.00 AUC on the evaluation benchmark using an ensemble of XGBoost and Random Forest classifiers.',
      'Awarded 1st Place at NeoHack 2025.',
      'Integrated SHAP (Shapley Additive Explanations) for clinical interpretability and biological feature validation.',
    ],
    stack: ['Python', 'scikit-learn', 'XGBoost', 'SHAP', 'Pandas', 'Jupyter'],
    architecture: `[Genomic Variants]    ──┐
[Transcriptomic Seq]  ─┼─► [Feature Reduction (150)] ──► [Multi-Modal Fusion] ──► [XGBoost/RF Ensemble] ──► [1.00 AUC Output]
[Clinical Tabular]    ──┘`,
    links: [
      { label: 'GitHub Repo', url: 'https://github.com/ilyaskhan12Q/cancer-omics-classifier' },
      { label: 'System Spec', url: '/projects/cancer-omics-classifier', internal: true },
    ],
  },
  {
    slug: 'apdd',
    name: 'Autonomous Parcel Delivery Drone (APDD)',
    eyebrow: 'ROBOTICS & EMBEDDED FLIGHT CONTROL',
    status: 'active',
    statusLabel: '[CAPSTONE PROJECT · HARDWARE]',
    problem:
      'Simulated drone delivery ignores physical edge challenges: real-time telemetry drops, GPS coordinate drift, and hardware-actuated payload release under strict battery load constraints.',
    solution:
      'Built and programmed a physical F450 quadcopter powered by a Pixhawk 2.4.8 flight controller running ArduCopter firmware. Implemented GPS waypoint mission plans and configured servo-driven release mechanics.',
    results: [
      'Engineered around real flight-controller hardware with fail-safe return-to-launch (RTL) telemetry.',
      'Servo-actuated parcel deployment mechanism (MG90S) wired to auxiliary flight controller channels.',
      'Authored comprehensive engineering research report and system architecture.',
    ],
    stack: ['Pixhawk 2.4.8', 'ArduCopter Firmware', 'C++', 'GPS Navigation', 'F450 Airframe', 'Servo Control'],
    architecture: `[Mission Planner GPS] ──► [Telemetry 433MHz] ──► [Pixhawk 2.4.8 Controller] ──► [Motor ESCs 920KV]
                                                   │
                                                   └──► [Servo Release (MG90S)] ──► [Drop Verified]`,
    links: [
      { label: 'Project Details', url: '/projects/apdd', internal: true },
    ],
  },
  {
    slug: 'aj-digital-support-agent',
    name: 'AJ Digital AI Customer Support & Lead Gen Agent',
    eyebrow: 'AGENTIC AI & RAG ORCHESTRATION',
    status: 'shipped',
    statusLabel: '[DEPLOYED CLIENT SYSTEM]',
    problem:
      'Inbound digital agency inquiries required manual triage, suffering delayed qualification and high human lead capture latency during off-hours.',
    solution:
      'Architected a production RAG-powered agent using n8n workflow orchestration, Pinecone vector database, and Gemini embeddings to autonomously qualify incoming leads and answer service questions.',
    results: [
      'Shipped and deployed for a live business client (AJ Digital Agency, Mardan).',
      'Engineered robust document ingestion pipelines with chunking and similarity threshold safeguards.',
      'Designed structured system prompt chains focused on conversion-driven qualification.',
    ],
    stack: ['n8n', 'Pinecone Vector DB', 'Gemini Embeddings', 'Prompt Engineering', 'Webhooks'],
    architecture: `[User Webhook Query] ──► [n8n Workflow Engine] ──► [Gemini Embeddings] ──► [Pinecone Vector Retrieval]
                                                          │
                                                          └──► [Structured Prompt Guardrails] ──► [Qualified Lead]`,
    links: [
      { label: 'System Spec', url: '/projects/aj-digital-support-agent', internal: true },
    ],
  },
];

export default function SelectedWork() {
  return (
    <section id="selected-work" className="selected-work-section">
      <div className="section-header-row mono">
        <div className="section-title-wrap">
          <span className="section-number">02</span>
          <h2 className="section-heading">SELECTED FLAGSHIP SYSTEMS</h2>
        </div>
        <Link to="/projects" className="section-link mono">
          Explore All 34+ Projects →
        </Link>
      </div>

      <div className="flagship-list">
        {FLAGSHIP_SYSTEMS.map((sys, idx) => (
          <article key={sys.slug} className="flagship-card">
            {/* Top Bar */}
            <div className="flagship-top">
              <div className="flagship-eyebrow-wrap mono">
                <span className="flagship-index">SYS_0{idx + 1}</span>
                <span className="flagship-eyebrow">{sys.eyebrow}</span>
              </div>
              <div className="flagship-badge-wrap">
                <StatusBadge status={sys.status} />
                <span className="flagship-status-label mono">{sys.statusLabel}</span>
              </div>
            </div>

            {/* Title & Core Grid */}
            <h3 className="flagship-title mono">{sys.name}</h3>

            <div className="flagship-grid">
              {/* Problem / Solution Column */}
              <div className="flagship-desc-col">
                <div className="flagship-block">
                  <span className="flagship-label mono">THE CHALLENGE:</span>
                  <p className="flagship-text">{sys.problem}</p>
                </div>

                <div className="flagship-block">
                  <span className="flagship-label mono">SYSTEM ARCHITECTURE:</span>
                  <p className="flagship-text">{sys.solution}</p>
                </div>

                <div className="flagship-block flagship-block--results">
                  <span className="flagship-label mono">EVALUATED RESULTS:</span>
                  <ul className="flagship-results-list">
                    {sys.results.map((res, rIdx) => (
                      <li key={rIdx}>{res}</li>
                    ))}
                  </ul>
                </div>

                <div className="flagship-tech-row">
                  <span className="flagship-label mono">STACK:</span>
                  <div className="flagship-pills">
                    {sys.stack.map((item) => (
                      <span key={item} className="flagship-pill mono">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flagship-actions">
                  {sys.links.map((link) =>
                    link.internal ? (
                      <Link key={link.label} to={link.url} className="btn btn-secondary mono btn-sm">
                        <span>→</span> {link.label}
                      </Link>
                    ) : (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary mono btn-sm"
                      >
                        <span>↗</span> {link.label}
                      </a>
                    )
                  )}
                </div>
              </div>

              {/* Architecture Blueprint Visualization */}
              <div className="flagship-diagram-col">
                <div className="diagram-card">
                  <div className="diagram-header mono">
                    <span className="diagram-dot" />
                    <span>system_topology.diag</span>
                  </div>
                  <div className="diagram-body">
                    <pre className="diagram-code mono">{sys.architecture}</pre>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="more-projects-callout mono">
        <span className="callout-prompt">$ find ~/projects -type f</span>
        <span className="callout-text">Looking for LLM tools, AutoInsight AI, PlanCraft 3D, or escrow systems?</span>
        <Link to="/projects" className="callout-btn">
          Open Projects Directory [34+] →
        </Link>
      </div>
    </section>
  );
}
