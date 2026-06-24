import { useState, useEffect } from 'react';
import './Neofetch.css';

export default function Neofetch({ repoCount = 0 }) {
  const [uptime, setUptime] = useState('0m 0s');

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const diffMs = Date.now() - startTime;
      const diffSecs = Math.floor(diffMs / 1000);
      const mins = Math.floor(diffSecs / 60);
      const secs = diffSecs % 60;
      setUptime(`${mins}m ${secs}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const asciiLogo = `
   ___ _
  |_ _| |  _  _
   | || |__| || |
  |___|____|\\_, |
            |__/
  `;

  return (
    <div className="neofetch mono" aria-label="System Info (neofetch)">
      <div className="neofetch-logo">
        <pre>{asciiLogo}</pre>
      </div>
      <div className="neofetch-info">
        <div className="neofetch-user-host">
          <span className="neofetch-user">ilyas</span>
          <span className="neofetch-at">@</span>
          <span className="neofetch-host">portfolio</span>
        </div>
        <div className="neofetch-separator">-----------------</div>
        <div className="neofetch-row">
          <span className="neofetch-label">OS:</span> PortfolioOS v2.6 (Web System)
        </div>
        <div className="neofetch-row">
          <span className="neofetch-label">Host:</span> ilyaskhan.dev
        </div>
        <div className="neofetch-row">
          <span className="neofetch-label">Kernel:</span> React 19.2.6 + Vite 8.0.12
        </div>
        <div className="neofetch-row">
          <span className="neofetch-label">Uptime:</span> {uptime}
        </div>
        <div className="neofetch-row">
          <span className="neofetch-label">Shell:</span> bash / react-router-dom
        </div>
        <div className="neofetch-row">
          <span className="neofetch-label">Terminal:</span> Antigravity CLI v1.0
        </div>
        <div className="neofetch-row">
          <span className="neofetch-label">Repos:</span> {repoCount} public sources
        </div>
        <div className="neofetch-row">
          <span className="neofetch-label">CGPA:</span> 3.51 / 4.00 (AWKUM BS CS)
        </div>
        <div className="neofetch-row">
          <span className="neofetch-label">Theme:</span> CRT / Phosphor Green
        </div>
      </div>
    </div>
  );
}
