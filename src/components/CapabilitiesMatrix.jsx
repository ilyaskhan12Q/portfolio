import './CapabilitiesMatrix.css';

const DOMAINS = [
  {
    domain: 'AI & Machine Learning',
    code: '// 01_AI_ML',
    summary: 'Building high-precision predictive models, multi-modal clinical ML, and explainable AI systems.',
    evidence: 'NeoHack 2025 1st Place Winner (1.00 AUC Cancer Omics Classifier); AutoInsight automated pipeline.',
    stack: ['Python', 'PyTorch', 'scikit-learn', 'XGBoost', 'SHAP', 'Pandas'],
  },
  {
    domain: 'Autonomous Agents & LLMs',
    code: '// 02_AGENTS_LLM',
    summary: 'Designing multi-agent workflows, vector retrieval (RAG), and real-world production automation.',
    evidence: 'Production support agent for AJ Digital Agency; LangChain clinical triage assistant.',
    stack: ['LangChain', 'Claude & Gemini API', 'Pinecone', 'n8n', 'Supabase'],
  },
  {
    domain: 'Autonomous Hardware & UAVs',
    code: '// 03_HARDWARE_SYS',
    summary: 'Hardware-in-the-loop autonomous aerial robotics, GPS navigation, and low-level embedded control.',
    evidence: 'Autonomous Parcel Delivery Drone (APDD) capstone with fail-safe servo payload mechanics.',
    stack: ['Pixhawk 2.4.8', 'ArduCopter', 'C++', 'Linux', 'GPS Waypoints'],
  },
  {
    domain: 'Full-Stack & Systems Engineering',
    code: '// 04_SYSTEMS',
    summary: 'Clean modern web applications, high-throughput APIs, and decoupled document processing engines.',
    evidence: 'DocSmith document engine, FlexStock inventory control, SpreadsheetAppBuilder core.',
    stack: ['TypeScript', 'React / Vite', 'FastAPI', 'PostgreSQL', 'Docker'],
  },
];

export default function CapabilitiesMatrix() {
  return (
    <section className="capabilities-section">
      <div className="section-header-row mono">
        <div className="section-title-wrap">
          <span className="section-number">01</span>
          <h2 className="section-heading">CAPABILITIES &amp; CORE FOCUS</h2>
        </div>
        <span className="section-context">// WHAT I BUILD</span>
      </div>

      <div className="capabilities-grid">
        {DOMAINS.map((item) => (
          <div key={item.code} className="capability-card">
            <div className="capability-top mono">
              <span className="capability-code">{item.code}</span>
              <h3 className="capability-domain">{item.domain}</h3>
            </div>

            <p className="capability-summary">{item.summary}</p>

            <div className="capability-highlight">
              <span className="capability-highlight-label mono">PROVEN WORK:</span>
              <p className="capability-highlight-text">{item.evidence}</p>
            </div>

            <div className="capability-tags">
              {item.stack.map((tech) => (
                <span key={tech} className="capability-tag mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
