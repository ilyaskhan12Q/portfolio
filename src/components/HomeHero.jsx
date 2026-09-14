import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import './HomeHero.css';

const CORE_STACK = [
  'Python / C++',
  'PyTorch',
  'LangChain / RAG',
  'Supabase / SQL',
  'Autonomous Systems',
];

export default function HomeHero() {
  return (
    <section className="home-hero">
      <div className="home-hero-content">
        {/* Availability Badge & Telemetry */}
        <div className="home-hero-status mono">
          <StatusBadge status="active" />
          <span className="home-hero-status-text">
            Seeking AI/ML Engineering &amp; Autonomous Systems Roles · 2026/2027
          </span>
        </div>

        {/* Identity & Technical Role */}
        <div className="home-hero-identity">
          <h1 className="home-hero-title mono">
            Ilyas Khan
            <span className="home-hero-cursor" aria-hidden="true">_</span>
          </h1>
          <p className="home-hero-role mono">
            AI/ML Engineer &amp; Autonomous Systems Builder
          </p>
        </div>

        {/* Value Proposition */}
        <p className="home-hero-bio">
          Final-year Computer Science (AI Specialization) student at AWKUM. 
          Engineering high-precision bioinformatics ML pipelines, multi-agent LLM systems, 
          and hardware-in-the-loop autonomous UAV flight controllers.
        </p>

        {/* Scannable Core Tech Stack */}
        <div className="home-hero-stack">
          <span className="home-hero-stack-label mono">core_stack:</span>
          <div className="home-hero-stack-pills">
            {CORE_STACK.map((tech) => (
              <span key={tech} className="hero-stack-pill mono">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Conversion & Exploration CTAs */}
        <div className="home-hero-actions">
          <a href="#selected-work" className="btn btn-primary mono">
            <span className="btn-icon">→</span> Inspect Selected Work
          </a>
          <a
            href="/portfolio/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary mono"
          >
            <span className="btn-icon">↓</span> Resume.pdf
          </a>
          <Link to="/contact" className="btn btn-ghost mono">
            <span className="btn-icon">$</span> ./contact.sh
          </Link>
        </div>
      </div>

      {/* Profile Frame with Terminal Scanline */}
      <div className="home-hero-frame">
        <div className="hero-terminal-card">
          <div className="hero-terminal-bar">
            <div className="hero-terminal-dots" aria-hidden="true">
              <span className="dot dot--red" />
              <span className="dot dot--amber" />
              <span className="dot dot--green" />
            </div>
            <span className="mono hero-terminal-title">ilyas_khan.sys — profile</span>
            <span className="mono hero-terminal-loc">SWAT, PK</span>
          </div>

          <div className="hero-terminal-canvas">
            <img
              src="/portfolio/profile.jpg"
              alt="Ilyas Khan — AI/ML Engineer"
              className="hero-terminal-img"
              onError={(e) => {
                e.target.style.display = 'none';
                const el = document.getElementById('hero-fallback-placeholder');
                if (el) el.style.display = 'flex';
              }}
            />
            <div
              id="hero-fallback-placeholder"
              className="hero-terminal-placeholder mono"
              style={{ display: 'none' }}
            >
              <span>[IK_CONSOLE_PHOTO]</span>
            </div>
            <div className="hero-terminal-scanline" aria-hidden="true" />
          </div>

          <div className="hero-terminal-footer mono">
            <div className="hero-footer-item">
              <span className="footer-label">INSTITUTION:</span> AWKUM
            </div>
            <div className="hero-footer-item">
              <span className="footer-label">DEGREE:</span> BS CS (AI)
            </div>
            <div className="hero-footer-item">
              <span className="footer-label">GPA:</span> 3.51 / 4.00
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
