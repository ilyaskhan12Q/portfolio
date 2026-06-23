import { education, skillGroups, certifications, profile } from '../data/profile';
import TerminalFrame from '../components/TerminalFrame';
import './About.css';

export default function About() {
  return (
    <div className="container about-page">
      <header className="about-head">
        <h1 className="page-title mono">
          <span className="page-id">man</span> ilyaskhan
        </h1>
        <p className="page-sub">NAME, EDUCATION, SKILLS, CERTIFICATIONS — section 1</p>
      </header>

      <TerminalFrame title="man ilyaskhan(1)" className="about-frame">
        <div className="man-section">
          <h2 className="man-h2">NAME</h2>
          <p className="man-body">{profile.name} — {profile.role}</p>
        </div>

        <div className="man-section">
          <h2 className="man-h2">DESCRIPTION</h2>
          <p className="man-body">{profile.objective}</p>
        </div>

        <div className="man-section">
          <h2 className="man-h2">EDUCATION</h2>
          <div className="edu-list">
            {education.map((e) => (
              <div className="edu-row" key={e.school}>
                <div className="edu-main">
                  <span className="edu-degree">{e.degree}</span>
                  <span className="edu-school">{e.school}</span>
                </div>
                <div className="edu-meta mono">
                  <span>{e.period}</span>
                  <span className="edu-detail">{e.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="man-section">
          <h2 className="man-h2">SKILLS</h2>
          <div className="skills-grid">
            {skillGroups.map((g) => (
              <div className="skill-group" key={g.label}>
                <div className="skill-label mono">--{g.label}</div>
                <div className="skill-items">
                  {g.items.map((item) => (
                    <span className="skill-chip mono" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="man-section">
          <h2 className="man-h2">CERTIFICATIONS</h2>
          <ul className="cert-list">
            {certifications.map((c) => (
              <li key={c.name}>
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noreferrer" className="cert-link">{c.name}</a>
                ) : (
                  c.name
                )}
                <span className="cert-issuer mono"> — {c.issuer}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="man-section man-section-last">
          <h2 className="man-h2">SEE ALSO</h2>
          <p className="man-body">
            <a href="/projects" className="man-link">projects(1)</a>, <a href="/contact" className="man-link">contact(1)</a>
          </p>
        </div>
      </TerminalFrame>
    </div>
  );
}
