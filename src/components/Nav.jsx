import { NavLink, useLocation } from 'react-router-dom';
import BinaryClock from './BinaryClock';
import './Nav.css';

const links = [
  { to: '/',         label: 'home',     cmd: '~'    },
  { to: '/projects', label: 'projects', cmd: 'ls'   },
  { to: '/about',    label: 'about',    cmd: 'man'  },
  { to: '/contact',  label: 'contact',  cmd: 'ping' },
];

/** Maps route → shell path shown in the titlebar prompt */
function toShellPath(pathname) {
  if (pathname === '/')          return '~';
  if (pathname === '/projects')  return '~/projects';
  if (pathname.startsWith('/projects/')) return `~/projects/${pathname.split('/projects/')[1]}`;
  if (pathname === '/about')     return '~/about';
  if (pathname === '/contact')   return '~/contact';
  return pathname;
}

export default function Nav() {
  const location = useLocation();
  const shellPath = toShellPath(location.pathname);

  return (
    <header className="nav">
      {/* ── Titlebar row ── */}
      <div className="nav-titlebar">
        <div className="nav-wb-dots" aria-hidden="true">
          <span className="nav-wb-dot nav-wb-dot--red"   />
          <span className="nav-wb-dot nav-wb-dot--amber" />
          <span className="nav-wb-dot nav-wb-dot--green" />
        </div>

        <span className="nav-title-text mono">
          ilyaskhan@portfolio — bash
        </span>

        <div className="nav-clock-wrap">
          <BinaryClock compact />
        </div>
      </div>

      {/* ── Prompt path row ── */}
      <div className="nav-prompt-row">
        <div className="container nav-prompt-inner">
          <span className="nav-prompt mono">
            <span className="nav-prompt-user">ilyaskhan</span>
            <span className="nav-prompt-at">@</span>
            <span className="nav-prompt-host">portfolio</span>
            <span className="nav-prompt-colon">:</span>
            <span className="nav-prompt-path">{shellPath}</span>
            <span className="nav-prompt-dollar">$</span>
          </span>

          <nav className="nav-links mono" aria-label="Primary">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                <span className="nav-link-cmd">{l.cmd}</span>
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Mobile bottom nav ── */}
      <nav className="nav-mobile mono" aria-label="Mobile nav">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) => `nav-mobile-link${isActive ? ' active' : ''}`}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
