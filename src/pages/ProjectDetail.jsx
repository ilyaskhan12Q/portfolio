import { Link, useParams, Navigate } from 'react-router-dom';
import { useGitHubProjects } from '../hooks/useGitHubProjects';
import CliLoader from '../components/CliLoader';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { projects, loading, error } = useGitHubProjects();

  // Find project
  const project = projects.find((p) => p.slug === slug);

  if (loading) {
    return (
      <div className="container detail-page-loading">
        <CliLoader message={`Accessing database node: projects/${slug || 'sys'}...`} />
      </div>
    );
  }

  if (error || !project) {
    return <Navigate to="/" replace />;
  }

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
      {/* ── Mock OS Terminal Window Frame ── */}
      <div className="editor-window">
        {/* Title bar */}
        <div className="editor-titlebar">
          <div className="editor-dots">
            <span className="editor-dot editor-dot--red" />
            <span className="editor-dot editor-dot--amber" />
            <span className="editor-dot editor-dot--green" />
          </div>
          <span className="editor-title mono">
            file_view: ilyas@portfolio:~/projects/{project.name}/spec_sheet.log
          </span>
        </div>

        {/* Window Body */}
        <div className="editor-body">
          {/* Back button */}
          <div className="back-nav-block">
            <Link to="/" className="back-btn mono">
              [ ◄ ESCAPE: RETURN TO SYSTEM ROOT ]
            </Link>
          </div>

          {/* Primary Info Matrix Block */}
          <div className="info-matrix mono">
            <div className="matrix-row">
              <span className="matrix-label">NODE_NAME:</span>
              <span className="matrix-value text-accent">{project.name}</span>
            </div>
            <div className="matrix-row">
              <span className="matrix-label">SYS_STATUS:</span>
              <span className="matrix-value text-amber">{project.status}</span>
            </div>
            <div className="matrix-row">
              <span className="matrix-label">METRICS:</span>
              <span className="matrix-value text-accent">{project.metrics || 'STABLE'}</span>
            </div>
            <div className="matrix-row">
              <span className="matrix-label">STARS:</span>
              <span className="matrix-value">{project.stargazers_count} ★</span>
            </div>
            <div className="matrix-row">
              <span className="matrix-label">CORE_STACK:</span>
              <span className="matrix-value">{project.stack.join(', ')}</span>
            </div>
            <div className="matrix-row">
              <span className="matrix-label">LAST_UPDATE:</span>
              <span className="matrix-value">
                {project.updated_at ? new Date(project.updated_at).toISOString() : 'OFFLINE'}
              </span>
            </div>
          </div>

          {/* Architecture Section */}
          <div className="arch-section">
            <div className="arch-header mono">[ SYSTEM FLOW ARCHITECTURE ]</div>
            <div className="overflow-x-auto">
              <pre className="arch-ascii mono">{project.architecture}</pre>
            </div>
          </div>

          {/* System Documentation Content Block */}
          <div className="spec-sheet-content">
            {renderSpecSheetContent(project.longFormMarkdown)}
          </div>

          {/* Action Links Node */}
          <div className="action-links-box">
            <div className="action-header mono">EXECUTE EXTERNAL TRIGGERS:</div>
            <div className="action-buttons mono">
              {project.links.map((link) => {
                const labelText = link.label === 'live' 
                  ? 'RUN: LAUNCH_LIVE_DEMO_INSTANCE' 
                  : 'SUDO: INS_SOURCE_CODE_REPOS';
                return (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="action-trigger-btn"
                  >
                    [{labelText}] <span className="arrow">↗</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
