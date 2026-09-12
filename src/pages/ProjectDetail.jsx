import { Link, useParams, Navigate } from 'react-router-dom';
import { useGitHubProjects } from '../hooks/useGitHubProjects';
import CliLoader from '../components/CliLoader';
import StatusBadge from '../components/StatusBadge';
import './ProjectDetail.css';

/** Extract notable achievement badges from highlights */
function getAchievementBadges(highlights) {
  if (!highlights || highlights.length === 0) return [];
  const badges = [];
  const joined = highlights.join(' ').toLowerCase();
  if (joined.includes('winner') || joined.includes('won')) badges.push({ icon: '🏆', text: 'Award Winner' });
  if (joined.includes('real client') || joined.includes('deployed for')) badges.push({ icon: '🚀', text: 'Deployed for Client' });
  if (joined.includes('final-year') || joined.includes('final year')) badges.push({ icon: '🎓', text: 'Capstone Project' });
  if (joined.includes('open-source') || joined.includes('open source')) badges.push({ icon: '📦', text: 'Open Source' });
  return badges;
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const { projects, loading, error } = useGitHubProjects();

  // Find project
  const project = projects.find((p) => p.slug === slug);

  if (loading) {
    return (
      <div className="container detail-page-loading">
        <CliLoader message={`Loading project: ${slug || '...'}...`} />
      </div>
    );
  }

  if (error || !project) {
    return <Navigate to="/" replace />;
  }

  const badges = getAchievementBadges(project.highlights);

  // Helper to parse markdown-like lines for terminal theme highlighting
  const renderSpecSheetContent = (text) => {
    if (!text) return null;
    const lines = text.split('\n');

    return lines.map((line, idx) => {
      // Header matching
      if (line.trim().startsWith('#')) {
        const depth = (line.match(/^#+/) || ['#'])[0].length;
        const cleanText = line.replace(/^#+\s*/, '');
        const sizeClass = depth === 1 ? 'spec-h1' : depth === 2 ? 'spec-h2' : 'spec-h3';
        return (
          <div key={idx} className={`${sizeClass} mono`} style={{ color: '#268bd2', fontWeight: 'bold', margin: '20px 0 8px 0' }}>
            {cleanText}
          </div>
        );
      }

      // Parse bold **text** and metrics: percentages (94.2%), AUC (1.00 AUC), durations (0.05s)
      const regex = /(\*\*.*?\*\*|\b\d+(?:\.\d+)?%|\b\d+(?:\.\d+)?\s*AUC|\b\d+(?:\.\d+)?s\b)/gi;
      const parts = line.split(regex);

      return (
        <div key={idx} className="spec-line mono" style={{ color: '#eee8d5', minHeight: '1.2em', lineSpacing: '1.4' }}>
          {parts.map((part, pidx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pidx} style={{ color: 'var(--text)', fontWeight: 'bold' }}>
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (regex.test(part)) {
              return (
                <span key={pidx} style={{ color: '#b58900', fontWeight: 'bold' }}>
                  {part}
                </span>
              );
            }
            return part;
          })}
        </div>
      );
    });
  };

  return (
    <div className="container detail-page">
      {/* ── Back navigation ── */}
      <div className="detail-back-nav">
        <Link to="/projects" className="back-btn mono">
          ← Back to Projects
        </Link>
      </div>

      {/* ── Project Header ── */}
      <header className="detail-header">
        <div className="detail-header-top">
          <h1 className="detail-title">{project.fullName || project.name}</h1>
          <div className="detail-header-meta">
            <StatusBadge status={project.status} />
            <span className="detail-year mono">{project.year}</span>
          </div>
        </div>
        {project.tagline && (
          <p className="detail-tagline">{project.tagline}</p>
        )}
        {badges.length > 0 && (
          <div className="detail-badges">
            {badges.map((b) => (
              <span className="detail-badge mono" key={b.text}>
                {b.icon} {b.text}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* ── Terminal Window Frame ── */}
      <div className="editor-window">
        {/* Title bar */}
        <div className="editor-titlebar">
          <div className="editor-dots">
            <span className="editor-dot editor-dot--red" />
            <span className="editor-dot editor-dot--amber" />
            <span className="editor-dot editor-dot--green" />
          </div>
          <span className="editor-title mono">
            ~/projects/{project.name}/spec_sheet.log
          </span>
        </div>

        {/* Window Body */}
        <div className="editor-body">
          {/* Info Grid */}
          <div className="info-matrix mono">
            <div className="matrix-row">
              <span className="matrix-label">Project:</span>
              <span className="matrix-value text-accent">{project.name}</span>
            </div>
            <div className="matrix-row">
              <span className="matrix-label">Status:</span>
              <span className="matrix-value text-amber">{project.status}</span>
            </div>
            <div className="matrix-row">
              <span className="matrix-label">Performance:</span>
              <span className="matrix-value text-accent">{project.metrics || 'Stable'}</span>
            </div>
            <div className="matrix-row">
              <span className="matrix-label">Stars:</span>
              <span className="matrix-value">{project.stargazers_count} ★</span>
            </div>
            <div className="matrix-row">
              <span className="matrix-label">Tech Stack:</span>
              <span className="matrix-value">{project.stack.join(', ')}</span>
            </div>
            <div className="matrix-row">
              <span className="matrix-label">Last Updated:</span>
              <span className="matrix-value">
                {project.updated_at ? new Date(project.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
              </span>
            </div>
          </div>

          {/* Architecture Section */}
          {project.architecture && (
            <div className="arch-section">
              <div className="arch-header mono">System Architecture</div>
              <div className="overflow-x-auto">
                <pre className="arch-ascii mono">{project.architecture}</pre>
              </div>
            </div>
          )}

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="highlights-section">
              <div className="highlights-header mono">Key Highlights</div>
              <ul className="highlights-list">
                {project.highlights.map((h, i) => (
                  <li key={i} className="highlight-item">{h}</li>
                ))}
              </ul>
            </div>
          )}

          {/* System Documentation Content Block */}
          {project.longFormMarkdown && (
            <div className="spec-sheet-content">
              {renderSpecSheetContent(project.longFormMarkdown)}
            </div>
          )}

          {/* Action Links */}
          {project.links && project.links.length > 0 && (
            <div className="action-links-box">
              <div className="action-header mono">Links</div>
              <div className="action-buttons mono">
                {project.links.map((link) => {
                  const labelText = link.label === 'live' 
                    ? 'View Live Demo' 
                    : 'View Source Code';
                  return (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="action-trigger-btn"
                    >
                      {labelText} <span className="arrow">↗</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
