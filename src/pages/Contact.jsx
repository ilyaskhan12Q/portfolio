import { useState } from 'react';
import { profile } from '../data/profile';
import './Contact.css';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button className="copy-btn mono" onClick={handleCopy} title="Copy to clipboard">
      {copied ? '✓ Copied!' : '⧉ Copy'}
    </button>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact — ${form.name || 'no name'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="container contact-page">
      <header className="contact-head">
        <h1 className="page-title mono">
          <span className="page-id">ping</span> ilyaskhan
        </h1>
        <p className="page-sub">Open to internships and entry-level AI/ML &amp; full-stack roles.</p>
      </header>

      {/* Quick Connect Buttons */}
      <div className="quick-connect">
        <a href={`mailto:${profile.email}`} className="quick-connect-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          <span>Email Me</span>
          <span className="quick-connect-detail mono">{profile.email}</span>
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="quick-connect-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
          </svg>
          <span>LinkedIn</span>
          <span className="quick-connect-detail mono">ilyas-khan67</span>
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="quick-connect-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>GitHub</span>
          <span className="quick-connect-detail mono">ilyaskhan12Q</span>
        </a>
      </div>

      <div className="contact-grid">
        <div className="contact-direct">
          <div className="contact-row">
            <span className="contact-label mono">email</span>
            <div className="contact-value-group">
              <a href={`mailto:${profile.email}`} className="contact-value">{profile.email}</a>
              <CopyButton text={profile.email} />
            </div>
          </div>
          <div className="contact-row">
            <span className="contact-label mono">linkedin</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-value">
              linkedin.com/in/ilyas-khan67
            </a>
          </div>
          <div className="contact-row">
            <span className="contact-label mono">github</span>
            <a href={profile.github} target="_blank" rel="noreferrer" className="contact-value">
              github.com/ilyaskhan12Q
            </a>
          </div>
          <div className="contact-row">
            <span className="contact-label mono">location</span>
            <span className="contact-value contact-static">{profile.location}</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="mono" htmlFor="name">name</label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="your name"
            />
          </div>
          <div className="form-field">
            <label className="mono" htmlFor="email">email</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="form-field">
            <label className="mono" htmlFor="message">message</label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              placeholder="what are you building?"
            />
          </div>
          <button type="submit" className="btn btn-primary contact-submit">
            send message <span className="mono">→</span>
          </button>
          {sent && (
            <p className="contact-sent mono">opening mail client...</p>
          )}

          <p className="contact-fallback mono">
            Or email me directly at{' '}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </form>
      </div>
    </div>
  );
}
