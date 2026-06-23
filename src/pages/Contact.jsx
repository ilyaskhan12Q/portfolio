import { useState } from 'react';
import { profile } from '../data/profile';
import './Contact.css';

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

      <div className="contact-grid">
        <div className="contact-direct">
          <div className="contact-row">
            <span className="contact-label mono">email</span>
            <a href={`mailto:${profile.email}`} className="contact-value">{profile.email}</a>
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
        </form>
      </div>
    </div>
  );
}
