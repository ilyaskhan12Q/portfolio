import './EngineeringApproach.css';

const STEPS = [
  {
    phase: '01_RESEARCH',
    name: 'Formulate & Deconstruct',
    desc: 'Audit mathematical foundations, inspect existing paper implementations, and isolate the exact performance or architectural bottleneck.',
  },
  {
    phase: '02_ARCHITECT',
    name: 'Decouple & Blueprint',
    desc: 'Design modular boundaries before touching code. Separate generation logic from rendering, storage from compute, and interface from orchestration.',
  },
  {
    phase: '03_BUILD',
    name: 'Type-Safe Execution',
    desc: 'Implement clean, verifiable pipelines in Python, C++, or TypeScript. Avoid bloated dependencies in favor of lean standard libraries and focused frameworks.',
  },
  {
    phase: '04_MEASURE',
    name: 'Empirical Verification',
    desc: 'Benchmark model ROC-AUC, API latencies, inference tokens/sec, and hardware telemetry. Optimize based on profile traces, not speculation.',
  },
  {
    phase: '05_DEPLOY',
    name: 'Edge & Cloud Stability',
    desc: 'Ship to real environments—whether client webhooks on n8n/Pinecone, headless Linux servers, or microcontrollers running ArduCopter.',
  },
];

export default function EngineeringApproach() {
  return (
    <section className="approach-section">
      <div className="section-header-row mono">
        <div className="section-title-wrap">
          <span className="section-number">03</span>
          <h2 className="section-heading">ENGINEERING METHODOLOGY</h2>
        </div>
        <span className="section-context">PIPELINE // HOW I SOLVE PROBLEMS</span>
      </div>

      <div className="approach-flow">
        {STEPS.map((step, idx) => (
          <div key={step.phase} className="approach-step">
            <div className="approach-step-top mono">
              <span className="step-phase">{step.phase}</span>
              <span className="step-index">STEP_{idx + 1}</span>
            </div>
            <h3 className="step-name mono">{step.name}</h3>
            <p className="step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
