import { useEffect, useState, useMemo } from 'react';
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
  { text: 'loading modules: ai_ml, full-stack, automation, embedded', delay: 300 },
  { text: 'fetching real-time GitHub telemetry mapping payload...', delay: 600 },
  { text: 'mounting /education ... AWKUM — BS CS (AI), CGPA 3.51', delay: 900 },
  { text: 'system check: OK', delay: 1200 },
  { text: 'status: READY', delay: 1400 },
];

function BootSequence({ onComplete }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisible(i + 1);
        if (i === BOOT_LINES.length - 1) {
          setTimeout(onComplete, 500); // Trigger complete 500ms after last line
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
    </div>
  );
}

export default function Home() {
  const { projects, loading, error } = useGitHubProjects();
  const [bootCompleted, setBootCompleted] = useState(false);
  const [filter, setFilter] = useState('all');

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
            <BootSequence onComplete={() => setBootCompleted(true)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container home-page">
      {/* ── Welcome and Status Banner ── */}
      <section className="dashboard-hero">
        <div className="hero-eyebrow mono">
          <StatusBadge status="active" /> available for internships &amp; entry-level roles
        </div>
        <h1 className="hero-title">
          {profile.name}
          <span className="hero-cursor">_</span>
        </h1>
        <p className="hero-role mono">{profile.role}</p>
        <p className="hero-tagline">{profile.tagline}</p>
      </section>

      {/* ── Central Dashboard Section (Neofetch, Binary Clock, Metrics) ── */}
      <section className="dashboard-grid">
        <div className="dashboard-left">
          <Neofetch repoCount={projects.length} />
        </div>
        <div className="dashboard-right">
          <div className="dashboard-panel">
            <div className="panel-header mono">system_clock.exe</div>
            <div className="panel-body clock-panel-body">
              <BinaryClock />
            </div>
          </div>
          <div className="dashboard-panel">
            <div className="panel-header mono">metrics_telemetry.log</div>
            <div className="panel-body metrics-panel-body">
              <div className="stats-inner-grid">
                {stats.map((s) => (
                  <div className="stat-card" key={s.label}>
                    <div className="stat-card-value mono">
                      {s.label === 'public repos' ? `${projects.length}+` : s.value}
                    </div>
                    <div className="stat-card-label mono">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive ANSI Directory Grid (Dynamic Projects List) ── */}
      <section className="projects-terminal-section">
        <div className="section-head">
          <h2 className="section-title mono">
            <span className="section-id">ls -la</span> ~/projects
          </h2>
          <div className="mono text-dim font-sm">
            {projects.length} nodes registered. Click row to run cat command.
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
