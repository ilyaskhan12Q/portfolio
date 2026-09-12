import './CapabilitiesMatrix.css';

const DOMAINS = [
  {
    domain: 'AI / Machine Learning',
    code: '01_AI_ML',
    what: 'Predictive modeling, multi-omics biomarker classification, and model explainability.',
    how: 'PyTorch, scikit-learn, XGBoost, SHAP Values, Pandas, NumPy.',
    evidence: 'NeoHack 2025 Winner (1.00 AUC Cancer Omics Classifier); AutoInsight automated EDA pipeline.',
    tags: ['Supervised Learning', 'Multi-Modal Fusion', 'SHAP Explainability', 'Genomics Data'],
  },
  {
    domain: 'Agentic AI & Orchestration',
    code: '02_AGENTIC',
    what: 'Autonomous LLM agent workflows, RAG knowledge retrieval, and generative pipeline design.',
    how: 'LangChain, Gemini / Claude API, Pinecone Vector DB, n8n, Supabase.',
    evidence: 'Production support agent deployed for AJ Digital Agency; LangChain AI Doctor triage agent.',
    tags: ['Multi-Agent Loops', 'Vector Search / RAG', 'Prompt Engineering', 'n8n Workflows'],
  },
  {
    domain: 'Systems & Autonomous Hardware',
    code: '03_HARDWARE_SYS',
    what: 'Hardware-in-the-loop autonomous aerial flight control and systems-level programming.',
    how: 'C++ (OOP/DSA), Linux, Pixhawk 2.4.8, ArduCopter firmware, GPS waypoint navigation.',
    evidence: 'Autonomous Parcel Delivery Drone (APDD) capstone project with servo-actuated payload release.',
    tags: ['Pixhawk / ArduCopter', 'Autonomous Mission Planning', 'Embedded Control', 'Linux Systems'],
  },
  {
    domain: 'Engineering & Data Platforms',
    code: '04_ENGINEERING',
    what: 'Full-stack client applications, API services, decoupled document generation engines.',
    how: 'TypeScript, React, Node.js, FastAPI, SQL/PostgreSQL, Docker, Git.',
    evidence: 'DocSmith document engine, FlexStock inventory control, SpreadsheetAppBuilder decoupled engine.',
    tags: ['REST APIs', 'PostgreSQL / Supabase', 'Vite / React', 'Async Queues (Redis/Celery)'],
  },
];

export default function CapabilitiesMatrix() {
  return (
    <section className="capabilities-section">
      <div className="section-header-row mono">
        <div className="section-title-wrap">
          <span className="section-number">01</span>
          <h2 className="section-heading">CAPABILITIES &amp; ENGINEERING DOMAINS</h2>
        </div>
        <span className="section-context">DOMAIN_INVENTORY // VERIFIED SKILLS</span>
      </div>

      <div className="capabilities-grid">
        {DOMAINS.map((item) => (
          <div key={item.code} className="capability-card">
            <div className="capability-top mono">
              <span className="capability-code">{item.code}</span>
              <span className="capability-domain">{item.domain}</span>
            </div>

            <div className="capability-block">
              <span className="capability-label mono">WHAT:</span>
              <p className="capability-text">{item.what}</p>
            </div>

            <div className="capability-block">
              <span className="capability-label mono">HOW / STACK:</span>
              <p className="capability-text capability-stack mono">{item.how}</p>
            </div>

            <div className="capability-block capability-block--evidence">
              <span className="capability-label mono">EVIDENCE:</span>
              <p className="capability-text capability-evidence">{item.evidence}</p>
            </div>

            <div className="capability-tags">
              {item.tags.map((tag) => (
                <span key={tag} className="capability-tag mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
