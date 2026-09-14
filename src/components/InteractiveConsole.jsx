import { useState } from 'react';
import { motion } from 'framer-motion';
import TerminalShell from './TerminalShell';
import Neofetch from './Neofetch';
import './InteractiveConsole.css';

const QUICK_COMMANDS = [
  { label: 'whoami', cmd: 'whoami', desc: 'Bio & Role' },
  { label: 'skills', cmd: 'skills', desc: 'Tech Stack' },
  { label: 'projects', cmd: 'ls projects', desc: 'Flagship Repos' },
  { label: 'status', cmd: 'status', desc: 'Availability' },
  { label: 'help', cmd: 'help', desc: 'All Commands' },
];

export default function InteractiveConsole({ repoCount = 34 }) {
  const [activeTab, setActiveTab] = useState('shell'); // 'shell' or 'neofetch'
  const [activeCmd, setActiveCmd] = useState(null);

  const handleQuickCmd = (cmd) => {
    setActiveTab('shell');
    // Generate a unique command string or refresh trigger
    setActiveCmd({ text: cmd, timestamp: Date.now() });
  };

  return (
    <section className="interactive-console-section">
      <div className="section-header-row mono">
        <div className="section-title-wrap">
          <span className="section-number">05</span>
          <h2 className="section-heading">INTERACTIVE WORKSTATION &amp; TELEMETRY</h2>
        </div>
        <div className="console-tab-buttons mono">
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            className={`console-tab-btn ${activeTab === 'shell' ? 'active' : ''}`}
            onClick={() => setActiveTab('shell')}
          >
            [cli_terminal]
          </motion.button>
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            className={`console-tab-btn ${activeTab === 'neofetch' ? 'active' : ''}`}
            onClick={() => setActiveTab('neofetch')}
          >
            [system_neofetch]
          </motion.button>
        </div>
      </div>

      <div className="console-wrapper">
        {/* Quick-action interactive chips bar */}
        <div className="console-quick-bar mono">
          <span className="quick-bar-label">QUICK_ACTIONS:</span>
          <div className="quick-chips">
            {QUICK_COMMANDS.map((qc) => (
              <motion.button
                key={qc.label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="quick-chip-btn"
                onClick={() => handleQuickCmd(qc.cmd)}
                title={qc.desc}
              >
                <span className="quick-chip-cmd">$ {qc.label}</span>
                <span className="quick-chip-desc">({qc.desc})</span>
              </motion.button>
            ))}
          </div>
        </div>

        {activeTab === 'shell' ? (
          <div className="console-shell-container">
            <TerminalShell externalCommand={activeCmd?.text} />
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
