import { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useGitHubProjects } from '../hooks/useGitHubProjects';
import { stats, profile } from '../data/profile';
import StatusBadge from '../components/StatusBadge';
import Neofetch from '../components/Neofetch';
import BinaryClock from '../components/BinaryClock';
import CliLoader from '../components/CliLoader';
import './Home.css';

const BOOT_LINES = [
  { text: 'booting ilyaskhan.sys ...', delay: 0 },
  { text: 'loading modules: ai_ml, full-stack, automation, embedded', delay: 150 },
  { text: 'fetching real-time GitHub telemetry...', delay: 300 },
  { text: 'mounting /education ... AWKUM — BS CS (AI), CGPA 3.51', delay: 450 },
  { text: 'system check: OK', delay: 600 },
  { text: 'status: READY', delay: 700 },
];

function BootSequence({ onComplete, onSkip }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisible(i + 1);
        if (i === BOOT_LINES.length - 1) {
          setTimeout(onComplete, 300);
        }
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="boot mono" aria-hidden="true">
      {BOOT_LINES.slice(0, visible).map((line, i) => (
        <div key={i} className={`boot-line ${i === BOOT_LINES.length - 1 ? 'boot-ready' : ''}`}>
          <span className="boot-prompt">$</span> {line.text}
        </div>
      ))}
      <button className="boot-skip-btn mono" onClick={onSkip}>
        [ skip → ]
      </button>
    </div>
  );
}

/** Highlight badges for projects with notable achievements */
function getAchievementBadge(project) {
  const hl = (project.highlights || []).join(' ').toLowerCase();
  if (hl.includes('winner') || hl.includes('won')) return '🏆 Winner';
  if (hl.includes('real client') || hl.includes('deployed')) return '🚀 Deployed';
  if (hl.includes('final-year') || hl.includes('final year')) return '🎓 Capstone';
  return null;
}

export default function Home() {
  const { projects, loading, error } = useGitHubProjects();
  const [filter, setFilter] = useState('all');

  // Boot sequence: skip if already seen this session
  const alreadySeen = typeof window !== 'undefined' && sessionStorage.getItem('boot_seen') === '1';
  const [bootCompleted, setBootCompleted] = useState(alreadySeen);

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem('boot_seen', '1');
    setBootCompleted(true);
  }, []);

  // Featured projects for the card grid
  const featuredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.filter((p) => p.featured);
  }, [projects]);

  // Categories list derived dynamically from project categories
  const categories = useMemo(() => {
    if (!projects) return ['all'];
    const cats = new Set(projects.map((p) => p.category));
    return ['all', ...cats];
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    const projs = filter === 'all' ? projects : projects.filter((p) => p.category === filter);
    return projs;
  }, [projects, filter]);

  // Pad function for rendering the ASCII table columns
  const padRight = (str, len) => {
    const safeStr = String(str || '');
    if (safeStr.length >= len) {
      return safeStr.slice(0, len - 3) + '...';
    }
    return safeStr + ' '.repeat(len - safeStr.length);
  };

  // ASCII Table constants
  const borderLine = `+----------------------------------+--------------------------------------------+-----------------------+`;
  const headerLine = `| ${padRight('DIRECTORY NODE', 32)} | ${padRight('STACK CORE', 42)} | ${padRight('RECENT SYS STATUS', 21)} |`;

  if (!bootCompleted) {
    return (
      <div className="container boot-container">
        <div className="hero-terminal" style={{ marginTop: '80px' }}>
          <div className="hero-terminal-bar">
            <div className="hero-terminal-dots">
              <span className="nav-wb-dot nav-wb-dot--red" />
              <span className="nav-wb-dot nav-wb-dot--amber" />
              <span className="nav-wb-dot nav-wb-dot--green" />
            </div>
            <span className="mono hero-terminal-title">boot_sequence.log</span>
          </div>
          <div className="hero-terminal-body" style={{ minHeight: '260px' }}>
            <BootSequence onComplete={handleBootComplete} onSkip={handleBootComplete} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container home-page">
      {/* ── Hero: Profile Picture + Identity ── */}
      <section className="hero-split">
        <div className="hero-text">
          <div className="hero-eyebrow mono">
            <StatusBadge status="active" /> available for internships &amp; entry-level roles
          </div>
          <h1 className="hero-title">
            {profile.name}
            <span className="hero-cursor">_</span>
          </h1>
          <p className="hero-subtitle mono">
            {profile.role} · {profile.location} · Graduating 2027
          </p>
          <p className="hero-tagline">{profile.tagline}</p>
          <p className="hero-objective">{profile.objective}</p>
          <div className="hero-actions">
            <a href="/portfolio/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-primary mono">
              <span>↓</span> Download Resume
            </a>
            <Link to="/projects" className="btn btn-secondary mono">
              <span>→</span> View Projects
            </Link>
            <Link to="/contact" className="btn btn-ghost mono">
              <span>$</span> Contact Me
            </Link>
          </div>
        </div>

        <div className="hero-photo-wrapper">
          <div className="hero-photo-terminal">
            <div className="hero-photo-bar">
              <div className="hero-terminal-dots">
                <span className="nav-wb-dot nav-wb-dot--red" />
                <span className="nav-wb-dot nav-wb-dot--amber" />
                <span className="nav-wb-dot nav-wb-dot--green" />
              </div>
              <span className="mono hero-photo-title">profile_img.png — preview</span>
            </div>
            <div className="hero-photo-body">
              {/* Replace src with your actual photo path, e.g. "/profile.jpg" */}
              <img
                src="/portfolio/profile.jpg"
                alt="Ilyas Khan — AI/ML Engineer"
                className="hero-photo-img"
                onError={(e) => {
                  // Fallback: show a styled placeholder if image not found
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add('hero-photo-placeholder-active');
                }}
              />
              <div className="hero-photo-placeholder">
                <div className="placeholder-ascii mono">
                  <span className="placeholder-icon">👤</span>
                  <span className="placeholder-text">awaiting upload...</span>
                  <span className="placeholder-hint">place profile.jpg in /public</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-photo-meta mono">
            <span>loc: {profile.location}</span>
            <span>mail: {profile.email}</span>
          </div>
        </div>
      </section>

      {/* ── Stats Bar — Key Metrics First ── */}
      <section className="stats-bar">
        <div className="stats-bar-grid">
          {stats.map((s) => (
            <div className="stats-bar-card" key={s.label}>
              <div className="stats-bar-value mono">
                {s.label === 'public repos' ? `${projects.length}+` : s.value}
              </div>
              <div className="stats-bar-label mono">{s.displayLabel || s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Projects Cards ── */}
      <section className="featured-projects-section">
        <div className="section-head">
          <h2 className="section-title mono">
            <span className="section-id">featured</span> Projects
          </h2>
          <Link to="/projects" className="view-all-link mono">View All →</Link>
        </div>

        {loading ? (
          <CliLoader />
        ) : error ? (
          <div className="mono error-box">
            [ ! ] Failed to load projects. Please try refreshing.
          </div>
        ) : (
          <div className="project-cards-grid">
            {featuredProjects.map((p) => {
              const badge = getAchievementBadge(p);
              return (
                <Link to={`/projects/${p.slug}`} key={p.slug} className="project-card">
                  <div className="project-card-bar">
                    <div className="project-card-dots">
                      <span className="card-dot card-dot--red" />
                      <span className="card-dot card-dot--amber" />
                      <span className="card-dot card-dot--green" />
                    </div>
                    <span className="project-card-title mono">{p.name}</span>
                    <span className="project-card-year mono">{p.year}</span>
                  </div>
                  <div className="project-card-body">
                    {badge && <span className="project-badge mono">{badge}</span>}
                    <p className="project-card-tagline">{p.tagline}</p>
                    <div className="project-card-meta">
                      <StatusBadge status={p.status} />
                      <div className="project-card-stack">
                        {p.stack.slice(0, 3).map((t) => (
                          <span className="stack-pill mono" key={t}>{t}</span>
                        ))}
                        {p.stack.length > 3 && (
                          <span className="stack-pill stack-pill--more mono">+{p.stack.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Central Dashboard Section (Neofetch, Binary Clock) ── */}
      <section className="dashboard-grid">
        <div className="dashboard-col dashboard-col--wide">
          <Neofetch repoCount={projects.length} />
        </div>
        <div className="dashboard-col">
          <div className="dashboard-panel">
            <div className="panel-header mono">system_clock.exe</div>
            <div className="panel-body clock-panel-body">
              <BinaryClock />
            </div>
          </div>
        </div>
      </section>

      {/* ── Full Directory Grid (ASCII Table — for dev visitors) ── */}
      <section className="projects-terminal-section">
        <div className="section-head">
          <h2 className="section-title mono">
            <span className="section-id">ls -la</span> ~/projects
          </h2>
          <div className="mono text-dim font-sm">
            {projects.length} nodes registered. Click row to view details.
          </div>
        </div>

        {/* Filter buttons */}
        <div className="filter-row mono">
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-chip ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c === 'all' ? 'all' : c.toLowerCase()}
            </button>
          ))}
        </div>

        {loading ? (
          <CliLoader />
        ) : error ? (
          <div className="mono error-box">
            [ ! ] CONNECTION FAILURE: Failed to query github.com API.
            <br />
            Falling back to offline data register.
          </div>
        ) : (
          <div className="ansi-table-container">
            <div className="overflow-x-auto">
              <pre className="ansi-border">{borderLine}</pre>
              <pre className="ansi-header">{headerLine}</pre>
              <pre className="ansi-border">{borderLine}</pre>
              
              <div className="ansi-rows-wrapper">
                {filteredProjects.map((p) => (
                  <Link to={`/projects/${p.slug}`} key={p.slug} className="ansi-row">
                    <pre className="ansi-row-content">
                      {`| ${padRight('./' + p.name, 32)} | ${padRight(p.stack.join(', '), 42)} | ${padRight(p.status, 21)} |`}
                    </pre>
                  </Link>
                ))}
              </div>
              
              <pre className="ansi-border">{borderLine}</pre>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
