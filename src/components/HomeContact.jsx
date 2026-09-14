import { useState } from 'react';
import { profile } from '../data/profile';
import './HomeContact.css';

export default function HomeContact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="home-contact-section">
      <div className="section-header-row mono">
        <div className="section-title-wrap">
          <span className="section-number">06</span>
          <h2 className="section-heading">GET IN TOUCH &amp; CONTACT</h2>
        </div>
        <span className="section-context">// AVAILABLE FOR 2026/2027 ROLES</span>
      </div>

      <div className="contact-terminal-box">
        <div className="contact-terminal-bar mono">
          <div className="contact-terminal-dots">
            <span className="dot dot--red" />
            <span className="dot dot--amber" />
            <span className="dot dot--green" />
          </div>
          <span className="contact-bar-title">ilyas@workstation:~$ ./contact.sh --hire</span>
          <span className="contact-bar-status">STATUS: ONLINE</span>
        </div>

        <div className="contact-terminal-body">
          <div className="contact-left">
            <h3 className="contact-headline mono">
              Ready to engineer high-impact AI systems together?
            </h3>
            <p className="contact-subtext">
              Available for full-time AI/ML roles, autonomous systems engineering, 
              or applied research collaborations starting 2026/2027. Remote-friendly worldwide.
            </p>

            <div className="contact-channels">
              <div className="channel-row">
                <span className="channel-label mono">DIRECT_EMAIL:</span>
                <div className="channel-action">
                  <a href={`mailto:${profile.email}`} className="channel-link mono">
                    {profile.email}
                  </a>
                  <button
                    onClick={handleCopy}
                    className="copy-btn mono"
                    aria-label="Copy email address"
                  >
                    {copied ? '[COPIED!]' : '[COPY]'}
                  </button>
                </div>
              </div>

              <div className="channel-row">
                <span className="channel-label mono">CODE_PROFILES:</span>
                <div className="channel-links mono">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href="/portfolio/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn social-btn--highlight"
                  >
                    Resume.pdf ↓
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-right mono">
            <div className="terminal-summary-card">
              <div className="summary-title">[IK_SYSTEM_SPEC]</div>
              <div className="summary-row">
                <span className="summary-k">ROLE:</span>
                <span className="summary-v">AI/ML &amp; Systems Engineer</span>
              </div>
              <div className="summary-row">
                <span className="summary-k">LOCATION:</span>
                <span className="summary-v">Swat, KP, Pakistan (GMT+5)</span>
              </div>
              <div className="summary-row">
                <span className="summary-k">EDUCATION:</span>
                <span className="summary-v">BS CS (AI) · AWKUM '27</span>
              </div>
              <div className="summary-row">
                <span className="summary-k">ACHIEVEMENT:</span>
                <span className="summary-v">NeoHack 2025 1st Place</span>
              </div>
              <div className="summary-row">
                <span className="summary-k">AVAILABILITY:</span>
                <span className="summary-v summary-v--green">READY FOR DEPLOYMENT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
