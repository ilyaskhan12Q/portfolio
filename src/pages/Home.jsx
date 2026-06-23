import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../data/projects';
import { stats, profile } from '../data/profile';
import StatusBadge from '../components/StatusBadge';
import './Home.css';

const BOOT_LINES = [
  { text: 'booting ilyaskhan.sys ...', delay: 0 },
  { text: 'loading modules: ai/ml, full-stack, automation, embedded', delay: 350 },
  { text: 'mounting /education ... AWKUM — BS CS (AI), CGPA 3.51', delay: 650 },
  { text: 'mounting /projects ... 16 found, 1 hackathon win', delay: 950 },
  { text: 'status: READY', delay: 1300 },
];

function BootSequence() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => setVisible(i + 1), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="boot mono" aria-hidden="true">
      {BOOT_LINES.slice(0, visible).map((line, i) => (
        <div key={i} className={`boot-line ${i === BOOT_LINES.length - 1 ? 'boot-ready' : ''}`}>
          <span className="boot-prompt">$</span> {line.text}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-eyebrow mono">
              <StatusBadge status="active" /> available for internships &amp; entry-level roles
            </div>
            <h1 className="hero-title">
              {profile.name}
              <span className="hero-cursor">_</span>
            </h1>
            <p className="hero-role mono">{profile.role}</p>
            <p className="hero-tagline">{profile.tagline}</p>
            <p className="hero-desc">{profile.objective}</p>
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary">
                view projects <span className="mono">→</span>
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                get in touch
              </Link>
            </div>
          </div>

          <div className="hero-terminal">
            <div className="hero-terminal-bar">
              <div className="hero-terminal-dots">
                <span /><span /><span />
              </div>
              <span className="mono hero-terminal-title">boot.log</span>
            </div>
            <div className="hero-terminal-body">
              <BootSequence />
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stats-grid">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-value mono">{s.value}</div>
              <div className="stat-label mono">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="featured">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title mono">
              <span className="section-id">ls -la</span> ~/featured
            </h2>
            <Link to="/projects" className="section-link mono">
              all projects →
            </Link>
          </div>

          <div className="featured-grid">
            {featuredProjects.slice(0, 6).map((p) => (
              <Link to={`/projects/${p.slug}`} key={p.slug} className="pcard">
                <div className="pcard-top mono">
                  <span className="pcard-pid">PID {p.pid}</span>
                  <StatusBadge status={p.status} />
                </div>
                <h3 className="pcard-name">{p.name}</h3>
                <p className="pcard-tagline">{p.tagline}</p>
                <div className="pcard-stack mono">
                  {p.stack.slice(0, 3).map((s) => (
                    <span className="pcard-tag" key={s}>{s}</span>
                  ))}
                  {p.stack.length > 3 && <span className="pcard-tag pcard-more">+{p.stack.length - 3}</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
