import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGitHubProjects } from '../hooks/useGitHubProjects';
import StatusBadge from '../components/StatusBadge';
import CliLoader from '../components/CliLoader';
import './Projects.css';

export default function Projects() {
  const { projects, loading, error } = useGitHubProjects();
  const [filter, setFilter] = useState('all');

  const categories = useMemo(() => {
    if (!projects) return ['all'];
    const cats = new Set(projects.map((p) => p.category));
    return ['all', ...cats];
  }, [projects]);

  const filtered = useMemo(() => {
    if (!projects) return [];
    return filter === 'all' ? projects : projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  return (
    <div className="container projects-page">
      <header className="projects-head">
        <h1 className="page-title mono">
          <span className="page-id">ls -la</span> ~/projects
        </h1>
        {loading ? (
          <p className="page-sub">scanning system nodes...</p>
        ) : (
          <p className="page-sub">{projects.length} entries — real-time GitHub repository telemetry.</p>
        )}
      </header>

      {loading ? (
        <CliLoader />
      ) : error ? (
        <div className="mono error-box" style={{ margin: '40px 0' }}>
          [ ! ] ERROR: Failed to retrieve repository assets.
          <br />
          System offline or API rate limit reached.
        </div>
      ) : (
        <>
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

          <div className="plist">
            <div className="plist-header mono">
              <span className="col-pid">PID</span>
              <span className="col-name">NAME</span>
              <span className="col-cat">CATEGORY</span>
              <span className="col-status">STATUS</span>
              <span className="col-year">YEAR</span>
            </div>

            {filtered.map((p) => (
              <Link to={`/projects/${p.slug}`} key={p.slug} className="plist-row">
                <span className="col-pid mono">{p.pid}</span>
                <span className="col-name">
                  <span className="plist-name">{p.name}</span>
                  <span className="plist-tagline">{p.tagline}</span>
                </span>
                <span className="col-cat mono">{p.category}</span>
                <span className="col-status"><StatusBadge status={p.status} /></span>
                <span className="col-year mono">{p.year}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
