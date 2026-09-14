import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import SpotlightCard from './ui/SpotlightCard';
import './SelectedWork.css';

const FLAGSHIP_SYSTEMS = [
  {
    slug: 'cancer-omics-classifier',
    name: 'Multi-Modal Cancer Omics Classifier',
    category: '// BIOINFORMATICS & ML',
    status: 'active',
    statusLabel: 'NEOHACK WINNER · 1.00 AUC',
    highlightMetric: '1.00 AUC',
    highlightDesc: 'Benchmarked on clinical cancer omics validation cohorts',
    problem:
      'High-dimensional biological data (over 20,000 genomic markers) creates severe curse-of-dimensionality and noise, making reliable cancer prognosis extremely difficult.',
    solution:
      'Engineered an end-to-end data pipeline fusing genomic expression with clinical records, using variance filtering and feature selection to isolate the top 150 biomarker signals.',
    keyOutcomes: [
      'Won 1st Place at NeoHack 2025.',
      'Achieved 1.00 AUC using an ensemble of XGBoost and Random Forest.',
      'Integrated SHAP values for direct clinical interpretability and feature importance.',
    ],
    stack: ['Python', 'scikit-learn', 'XGBoost', 'SHAP', 'Pandas', 'Jupyter'],
    topologySteps: [
      { label: 'Data Ingestion', text: 'Genomic & clinical cohorts' },
      { label: 'Feature Selection', text: 'Reduced to 150 top markers' },
      { label: 'Model Ensemble', text: 'XGBoost + Random Forest' },
      { label: 'Explainability', text: 'SHAP clinical plots' },
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/ilyaskhan12Q/cancer-omics-classifier', isExternal: true },
      { label: 'Full Case Study', url: '/projects/cancer-omics-classifier', isExternal: false },
    ],
  },
  {
    slug: 'apdd',
    name: 'Autonomous Parcel Delivery Drone (APDD)',
    category: '// ROBOTICS & EMBEDDED FLIGHT',
    status: 'active',
    statusLabel: 'CAPSTONE HARDWARE SYSTEM',
    highlightMetric: 'F450 UAV',
    highlightDesc: 'Pixhawk 2.4.8 autopilot with GPS autonomous waypoint navigation',
    problem:
      'Simulated drone delivery overlooks physical edge hazards: radio telemetry drops, wind drift during waypoint approach, and battery voltage sag under servo actuator loads.',
    solution:
      'Assembled and programmed a physical F450 quadcopter with Pixhawk 2.4.8 autopilot running ArduCopter firmware, incorporating waypoint missions and servo payload release mechanics.',
    keyOutcomes: [
      'Built and flight-tested on physical UAV hardware with telemetry fail-safes.',
      'Configured servo-actuated parcel release (MG90S) on aux flight channels.',
      'Authored engineering research paper for May 2026 capstone defense.',
    ],
    stack: ['Pixhawk 2.4.8', 'ArduCopter Firmware', 'C++', 'GPS Navigation', 'F450 Airframe', 'Servo Control'],
    topologySteps: [
      { label: 'Ground Station', text: 'Mission Planner waypoint plan' },
      { label: 'Telemetry Link', text: '433MHz fail-safe comms' },
      { label: 'Autopilot Control', text: 'Pixhawk 2.4.8 / ArduCopter' },
      { label: 'Payload Actuation', text: 'Servo release at target' },
    ],
    links: [
      { label: 'System Specifications', url: '/projects/apdd', isExternal: false },
    ],
  },
  {
    slug: 'aj-digital-support-agent',
    name: 'AI Customer Support & Lead Generation Agent',
    category: '// AGENTIC AI & AUTOMATION',
    status: 'shipped',
    statusLabel: 'DEPLOYED PRODUCTION AGENT',
    highlightMetric: 'Production RAG',
    highlightDesc: 'Deployed for AJ Digital Agency to handle client lead qualification',
    problem:
      'Inbound digital agency inquiries required manual triage, causing delayed responses during off-hours and lost potential client conversions.',
    solution:
      'Built a production RAG agent with n8n workflow orchestration, Pinecone vector database, and Gemini embeddings to autonomously qualify client leads and answer service questions 24/7.',
    keyOutcomes: [
      'Shipped and actively deployed for a real business client (AJ Digital Agency).',
      'Configured similarity threshold safeguards against hallucinations.',
      'Designed structured system prompt chains optimized for lead capture.',
    ],
    stack: ['n8n', 'Pinecone Vector DB', 'Gemini Embeddings', 'Prompt Engineering', 'Webhooks'],
    topologySteps: [
      { label: 'Client Inquiry', text: 'Chat message via webhook' },
      { label: 'Knowledge Lookup', text: 'Pinecone vector retrieval' },
      { label: 'Agent Reasoning', text: 'n8n workflow & guardrails' },
      { label: 'Lead Dispatch', text: 'Auto-routing qualified leads' },
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
          <h2 className="section-heading">FEATURED FLAGSHIP PROJECTS</h2>
        </div>
        <Link to="/projects" className="section-link mono">
          Explore All 34+ Projects →
        </Link>
      </div>

      {/* Flagship Cards Container */}
      <div className="flagship-list">
        {FLAGSHIP_SYSTEMS.map((sys, idx) => (
          <SpotlightCard key={sys.slug} className="flagship-card">
            {/* Top Metadata Bar */}
            <header className="flagship-header">
              <div className="flagship-header-left">
                <span className="flagship-idx mono">PROJECT_0{idx + 1}</span>
                <span className="flagship-category mono">{sys.category}</span>
              </div>
              <div className="flagship-header-right mono">
                <StatusBadge status={sys.status} />
                <span className="flagship-status-pill">{sys.statusLabel}</span>
              </div>
            </header>

            {/* Title & Lead Metric Row */}
            <div className="flagship-title-row">
              <h3 className="flagship-name mono">{sys.name}</h3>
              <div className="flagship-metric-badge mono">
                <span className="metric-val">{sys.highlightMetric}</span>
                <span className="metric-desc">{sys.highlightDesc}</span>
              </div>
            </div>

            {/* Core Overview: Challenge & Solution */}
            <div className="flagship-narrative">
              <div className="narrative-block">
                <span className="narrative-label mono">// THE CHALLENGE</span>
                <p className="narrative-text">{sys.problem}</p>
              </div>
              <div className="narrative-block">
                <span className="narrative-label mono">// SOLUTION &amp; ARCHITECTURE</span>
                <p className="narrative-text">{sys.solution}</p>
              </div>
            </div>

            {/* Horizontal Execution Pipeline Flow */}
            <div className="pipeline-flow-wrapper">
              <div className="pipeline-flow-title mono">
                <span className="pipeline-dot" />
                <span>EXECUTION PIPELINE:</span>
              </div>
              <div className="pipeline-steps-flow">
                {sys.topologySteps.map((step, sIdx) => (
                  <div key={sIdx} className="pipeline-step-item">
                    <div className="pipeline-step-node mono" tabIndex={0}>
                      <span className="step-num">0{sIdx + 1}</span>
                      <span className="step-title">{step.label}</span>
                    </div>
                    <span className="step-desc">{step.text}</span>
                    {sIdx < sys.topologySteps.length - 1 && (
                      <span className="step-arrow" aria-hidden="true">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Outcomes & Tech Stack Row */}
            <div className="flagship-bottom-grid">
              <div className="flagship-outcomes-box">
                <span className="bottom-label mono">// KEY OUTCOMES</span>
                <ul className="outcomes-list">
                  {sys.keyOutcomes.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="flagship-stack-box">
                <span className="bottom-label mono">// TECH STACK</span>
                <div className="stack-pills-wrap">
                  {sys.stack.map((tech) => (
                    <span key={tech} className="stack-pill-card mono">
                      {tech}
                    </span>
                  ))}
                </div>

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
          </SpotlightCard>
        ))}
      </div>

      {/* Directory Routing Footer */}
      <div className="more-projects-callout mono">
        <div className="callout-content">
          <span className="callout-prompt">$ find ~/projects -type f</span>
          <span className="callout-text">
            Explore 34+ additional repositories: AutoInsight AI, PlanCraft 3D, and Escrow infrastructure.
          </span>
        </div>
        <Link to="/projects" className="callout-btn">
          Open Projects Archive [34+] →
        </Link>
      </div>
    </section>
  );
}
