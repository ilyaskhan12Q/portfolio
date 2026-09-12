import { useState } from 'react';
import TerminalShell from './TerminalShell';
import Neofetch from './Neofetch';
import './InteractiveConsole.css';

export default function InteractiveConsole({ repoCount = 34 }) {
  const [activeTab, setActiveTab] = useState('shell'); // 'shell' or 'neofetch'

  return (
    <section className="interactive-console-section">
      <div className="section-header-row mono">
        <div className="section-title-wrap">
          <span className="section-number">06</span>
          <h2 className="section-heading">INTERACTIVE TELEMETRY &amp; CLI</h2>
        </div>
        <div className="console-tab-buttons mono">
          <button
            className={`console-tab-btn ${activeTab === 'shell' ? 'active' : ''}`}
            onClick={() => setActiveTab('shell')}
          >
            [interactive_shell]
          </button>
          <button
            className={`console-tab-btn ${activeTab === 'neofetch' ? 'active' : ''}`}
            onClick={() => setActiveTab('neofetch')}
          >
            [system_neofetch]
          </button>
        </div>
      </div>

      <div className="console-wrapper">
        {activeTab === 'shell' ? (
          <div className="console-shell-container">
            <div className="console-intro-bar mono">
              <span className="intro-prompt">$ ./interactive_cli</span>
              <span className="intro-help">
                Try running: <span className="cmd-tag">whoami</span> ·{' '}
                <span className="cmd-tag">skills</span> ·{' '}
                <span className="cmd-tag">ls projects</span> ·{' '}
                <span className="cmd-tag">status</span> ·{' '}
                <span className="cmd-tag">help</span>
              </span>
            </div>
            <TerminalShell />
          </div>
        ) : (
          <div className="console-neofetch-container">
            <Neofetch repoCount={repoCount} />
          </div>
        )}
      </div>
    </section>
  );
}
