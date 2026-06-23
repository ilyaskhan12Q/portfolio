import { NavLink } from 'react-router-dom';
import BinaryClock from './BinaryClock';
import './Nav.css';

const links = [
  { to: '/', label: 'home', id: '~' },
  { to: '/projects', label: 'projects', id: 'ls' },
  { to: '/about', label: 'about', id: 'man' },
  { to: '/contact', label: 'contact', id: 'ping' },
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <NavLink to="/" className="nav-brand mono">
          <span className="nav-dot" aria-hidden="true" />
          ilyaskhan<span className="nav-cursor">_</span>
        </NavLink>

        <nav className="nav-links mono" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-link-id">{l.id}</span>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-clock">
          <BinaryClock compact />
        </div>
      </div>

      <nav className="nav-mobile mono" aria-label="Primary mobile">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => `nav-mobile-link ${isActive ? 'active' : ''}`}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
