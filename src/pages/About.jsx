import { useState } from 'react';
import { Link } from 'react-router-dom';
import { education, skillGroups, certifications, profile } from '../data/profile';
import TerminalFrame from '../components/TerminalFrame';
import './About.css';

export default function About() {
  const [activeTab, setActiveTab] = useState('bio');
  const [currentCommand, setCurrentCommand] = useState('cat bio.md');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const TABS = [
    { id: 'bio', command: 'cat bio.md', label: 'Biography' },
    { id: 'skills', command: 'ls -l skills/', label: 'Skills & Stack' },
    { id: 'education', command: 'cat education.log', label: 'Education' },
    { id: 'certs', command: 'cat certs.json', label: 'Certifications' }
  ];

  const handleTabChange = (tabId, commandText) => {
    if (tabId === activeTab || isTransitioning) return;
    setIsTransitioning(true);
    
    // Simulate terminal typing
    let currentText = '';
    let charIndex = 0;
    setCurrentCommand('');
    
    const interval = setInterval(() => {
      if (charIndex < commandText.length) {
        currentText += commandText[charIndex];
        setCurrentCommand(currentText);
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setActiveTab(tabId);
          setIsTransitioning(false);
        }, 120);
      }
    }, 25);
  };

  const renderBio = () => (
    <div className="tab-pane-content">
      <div className="bio-layout">
        <div className="bio-main">
          <div className="bio-header">
            <span className="bio-tag mono">[STATUS: READY]</span>
            <h3 className="bio-title mono">Objective &amp; Philosophy</h3>
          </div>
          <p className="bio-text">
            I am a final-year Computer Science student specializing in Artificial Intelligence. My focus lies at the intersection of AI/ML engineering, full-stack systems, and automation.
          </p>
          <p className="bio-text">
            {profile.objective}
          </p>
          <p className="bio-text">
            I focus on building actual working systems rather than theoretical presentations. My experience ranges from training and deploying deep learning models to configuring autopilot hardware (Pixhawk) for physical drone navigation.
          </p>
        </div>

        <div className="bio-meta-box">
          <div className="meta-box-header mono">system_info.log</div>
          <div className="meta-box-body mono">
            <div className="meta-item">
              <span className="meta-key">NAME:</span>
              <span className="meta-val">{profile.name}</span>
            </div>
            <div className="meta-item">
              <span className="meta-key">ROLE:</span>
              <span className="meta-val">{profile.role}</span>
            </div>
            <div className="meta-item">
              <span className="meta-key">LOCATION:</span>
              <span className="meta-val">{profile.location}</span>
            </div>
            <div className="meta-item">
              <span className="meta-key">GRADUATION:</span>
              <span className="meta-val">2027</span>
            </div>
            <div className="meta-item">
              <span className="meta-key">EMAIL:</span>
              <span className="meta-val">
                <a href={`mailto:${profile.email}`} className="meta-link">{profile.email}</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="tab-pane-content">
      <div className="skills-intro mono">
        Total categories: {skillGroups.length}<br />
        Permissions: drwxr-xr-x (read-only reference)
      </div>
      <div className="skills-folders">
        {skillGroups.map((g) => (
          <div className="skill-folder-card" key={g.label}>
            <div className="skill-folder-header mono">
              <span className="folder-icon">📁</span>
              <span className="folder-name">{g.label}/</span>
            </div>
            <div className="skill-folder-body">
              {g.items.map((item) => (
                <span className="skill-badge mono" key={item}>
                  <span className="badge-dot" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="tab-pane-content">
      <div className="timeline">
        {education.map((e, index) => (
          <div className="timeline-item" key={e.school}>
            <div className="timeline-marker">
              <div className="timeline-dot" />
              {index < education.length - 1 && <div className="timeline-line" />}
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h4 className="timeline-degree">{e.degree}</h4>
                <span className="timeline-period mono">{e.period}</span>
              </div>
              <div className="timeline-school mono">{e.school}</div>
              <div className="timeline-detail mono">{e.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCerts = () => (
    <div className="tab-pane-content">
      <div className="certs-grid">
        {certifications.map((c) => (
          <div className="cert-card" key={c.name}>
            <div className="cert-card-main">
              <div className="cert-card-issuer mono">[{c.issuer}]</div>
              <h4 className="cert-card-name">{c.name}</h4>
            </div>
            {c.url && (
              <a 
                href={c.url} 
                target="_blank" 
                rel="noreferrer" 
                className="cert-verify-btn mono"
              >
                [ VERIFY ]
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container about-page">
      <header className="about-head">
        <h1 className="page-title mono">
          <span className="page-id">man</span> ilyaskhan
        </h1>
        <p className="page-sub">NAME, EDUCATION, SKILLS, CERTIFICATIONS — section 1</p>
      </header>

      <TerminalFrame title="man ilyaskhan(1)" className="about-frame">
        <div className="terminal-tabs-row">
          {TABS.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                className={`terminal-tab-btn mono ${isActive ? 'active' : ''}`}
                onClick={() => handleTabChange(t.id, t.command)}
                disabled={isTransitioning}
              >
                <span className="tab-command-prefix">$</span> {t.label}
              </button>
            );
          })}
        </div>

        <div className="terminal-active-prompt mono">
          <span className="prompt-user">ilyas@portfolio</span>
          <span className="prompt-colon">:</span>
          <span className="prompt-path">~</span>
          <span className="prompt-dollar">$</span>
          <span className="prompt-command"> {currentCommand}</span>
          <span className="prompt-cursor" />
        </div>

        <div className="about-content-area">
          {activeTab === 'bio' && renderBio()}
          {activeTab === 'skills' && renderSkills()}
          {activeTab === 'education' && renderEducation()}
          {activeTab === 'certs' && renderCerts()}
        </div>

        <div className="see-also-footer mono">
          <h4>SEE ALSO</h4>
          <p className="see-also-links">
            <Link to="/projects" className="see-also-link">projects(1)</Link>,{' '}
            <Link to="/contact" className="see-also-link">contact(1)</Link>
          </p>
        </div>
      </TerminalFrame>
    </div>
  );
}
