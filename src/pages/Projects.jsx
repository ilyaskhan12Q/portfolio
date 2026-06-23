import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import StatusBadge from '../components/StatusBadge';
import './Projects.css';

const CATEGORIES = ['all', ...new Set(projects.map((p) => p.category))];

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <div className="container projects-page">
      <header className="projects-head">
        <h1 className="page-title mono">
          <span className="page-id">ls -la</span> ~/projects
        </h1>
        <p className="page-sub">{projects.length} entries — academic, hackathon, client, and self-directed work.</p>
      </header>

      <div className="filter-row mono">
        {CATEGORIES.map((c) => (
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
    </div>
  );
}
