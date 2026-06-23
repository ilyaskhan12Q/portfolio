import { Link, useParams, Navigate } from 'react-router-dom';
import { projects } from '../data/projects';
import StatusBadge from '../components/StatusBadge';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div className="container detail-page">
      <Link to="/projects" className="back-link mono">← ~/projects</Link>

      <header className="detail-head">
        <div className="detail-meta mono">
          <span>PID {project.pid}</span>
          <span className="dot-sep">·</span>
          <StatusBadge status={project.status} />
          <span className="dot-sep">·</span>
          <span>{project.year}</span>
        </div>
        <h1 className="detail-title">{project.fullName}</h1>
        <p className="detail-tagline">{project.tagline}</p>
        <p className="detail-category mono">{project.category}</p>
      </header>

      <section className="detail-section">
        <h2 className="detail-h2 mono"><span className="h2-id">$</span> cat description.txt</h2>
        <p className="detail-desc">{project.description}</p>
      </section>

      {project.highlights.length > 0 && (
        <section className="detail-section">
          <h2 className="detail-h2 mono"><span className="h2-id">$</span> grep highlights</h2>
          <ul className="detail-list">
            {project.highlights.map((h) => (
              <li key={h}><span className="list-marker mono">›</span> {h}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="detail-section">
        <h2 className="detail-h2 mono"><span className="h2-id">$</span> cat stack.json</h2>
        <div className="detail-stack">
          {project.stack.map((s) => (
            <span className="stack-chip mono" key={s}>{s}</span>
          ))}
        </div>
      </section>

      {project.links.length > 0 && (
        <section className="detail-section">
          <div className="detail-links">
            {project.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="btn btn-ghost">
                {l.label} <span className="mono">↗</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
