import './EngineeringApproach.css';

const STEPS = [
  {
    stepNumber: '01',
    phase: 'RESEARCH',
    name: 'Understand & Deconstruct',
    desc: 'Audit real problems, research papers and benchmarks, and isolate exact performance bottlenecks before writing code.',
  },
  {
    stepNumber: '02',
    phase: 'ARCHITECT',
    name: 'Design Clean Boundaries',
    desc: 'Plan modular architectures. Keep data separate from compute, business logic decoupled from UI, and interfaces clearly typed.',
  },
  {
    stepNumber: '03',
    phase: 'BUILD',
    name: 'Focused Implementation',
    desc: 'Build clean, maintainable systems using Python, C++, or TypeScript. Prefer lean standard tooling over bloated dependencies.',
  },
  {
    stepNumber: '04',
    phase: 'BENCHMARK',
    name: 'Verify & Benchmark',
    desc: 'Measure performance with hard metrics—ROC-AUC, API latency, tokens/sec, and hardware telemetry. Optimize from real traces.',
  },
  {
    stepNumber: '05',
    phase: 'DEPLOY',
    name: 'Ship to Real Worlds',
    desc: 'Deliver robust solutions—from automated client workflows in production to headless Linux servers and physical UAV flight controllers.',
  },
];

export default function EngineeringApproach() {
  return (
    <section className="approach-section">
      <div className="section-header-row mono">
        <div className="section-title-wrap">
          <span className="section-number">03</span>
          <h2 className="section-heading">HOW I BUILD &amp; SOLVE PROBLEMS</h2>
        </div>
        <span className="section-context">// PROCESS &amp; METHODOLOGY</span>
      </div>

      <div className="approach-flow">
        {STEPS.map((step) => (
          <div key={step.stepNumber} className="approach-step">
            <div className="approach-step-top mono">
              <span className="step-index">STEP_{step.stepNumber}</span>
              <span className="step-phase">[{step.phase}]</span>
            </div>
            <h3 className="step-name mono">{step.name}</h3>
            <p className="step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
