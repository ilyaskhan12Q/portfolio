import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profile, skillGroups } from '../data/profile';
import { projects } from '../data/projects';
import { useGitHubProjects } from '../hooks/useGitHubProjects';
import './TerminalShell.css';

const HOSTNAME = 'portfolio';
const USER = 'ilyaskhan';

const HELP_TEXT = [
  { text: 'Available commands:', type: 'dim' },
  { text: '  whoami         — print identity', type: 'normal' },
  { text: '  ls projects    — list all projects', type: 'normal' },
  { text: '  skills         — list tech stack', type: 'normal' },
  { text: '  status         — current availability', type: 'normal' },
  { text: '  open projects  — navigate to /projects', type: 'normal' },
  { text: '  open about     — navigate to /about', type: 'normal' },
  { text: '  open contact   — navigate to /contact', type: 'normal' },
  { text: '  clear          — clear terminal', type: 'normal' },
  { text: '  help           — show this message', type: 'normal' },
];

function buildOutput(cmd, navigate, projectsList = projects) {
  const c = cmd.trim().toLowerCase();

  if (c === 'clear') return '__CLEAR__';

  if (c === 'help') return HELP_TEXT;

  if (c === 'whoami') return [
    { text: `${profile.name}`, type: 'accent' },
    { text: `  role: ${profile.role}`, type: 'normal' },
    { text: `  location: ${profile.location}`, type: 'normal' },
    { text: `  tagline: ${profile.tagline}`, type: 'dim' },
  ];

  if (c === 'skills') {
    const lines = [{ text: 'Tech stack:', type: 'dim' }];
    skillGroups.forEach((g) => {
      lines.push({ text: `  --${g.label}`, type: 'accent-dim' });
      lines.push({ text: `    ${g.items.join('  ')}`, type: 'normal' });
    });
    return lines;
  }

  if (c === 'status') return [
    { text: '● AVAILABLE', type: 'accent' },
    { text: '  seeking internships & entry-level AI/ML + full-stack roles', type: 'normal' },
    { text: `  email: ${profile.email}`, type: 'dim' },
  ];

  if (c === 'ls projects' || c === 'ls') {
    const lines = [
      { text: 'total ' + projectsList.length, type: 'dim' },
    ];
    projectsList.slice(0, 8).forEach((p) => {
      lines.push({
        text: `  [${p.pid}] ${p.name.padEnd(28)} ${p.status.padEnd(8)} ${p.year}`,
        type: 'normal',
      });
    });
    if (projectsList.length > 8) {
      lines.push({ text: `  ... and ${projectsList.length - 8} more — open projects`, type: 'dim' });
    }
    return lines;
  }

  if (c === 'open projects') {
    navigate('/projects');
    return [{ text: 'navigating to /projects ...', type: 'accent' }];
  }
  if (c === 'open about') {
    navigate('/about');
    return [{ text: 'navigating to /about ...', type: 'accent' }];
  }
  if (c === 'open contact') {
    navigate('/contact');
    return [{ text: 'navigating to /contact ...', type: 'accent' }];
  }

  if (c === '') return [];

  return [{ text: `command not found: ${cmd}  (try 'help')`, type: 'error' }];
}

export default function TerminalShell() {
  const [history, setHistory] = useState([
    { prompt: null, lines: [{ text: "Type 'help' for available commands.", type: 'dim' }] },
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  const { projects: dynamicProjects } = useGitHubProjects();

  // Auto-scroll on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input when clicking anywhere in shell
  function focusInput() {
    inputRef.current?.focus();
  }

  function submit(e) {
    e.preventDefault();
    const cmd = input.trim();
    const output = buildOutput(cmd, navigate, dynamicProjects.length ? dynamicProjects : projects);

    if (output === '__CLEAR__') {
      setHistory([]);
    } else {
      setHistory((h) => [...h, { prompt: cmd, lines: output }]);
    }

    if (cmd) {
      setCmdHistory((h) => [cmd, ...h]);
    }
    setHistIdx(-1);
    setInput('');
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : cmdHistory[next] ?? '');
    }
  }

  const prompt = `${USER}@${HOSTNAME}:~$`;

  return (
    <div className="tshell" onClick={focusInput} role="region" aria-label="Interactive terminal">
      <div className="tshell-output">
        {history.map((entry, i) => (
          <div key={i} className="tshell-entry">
            {entry.prompt !== null && (
              <div className="tshell-cmd">
                <span className="tshell-prompt">{prompt}</span>
                <span className="tshell-input-echo"> {entry.prompt}</span>
              </div>
            )}
            {entry.lines.map((line, j) => (
              <div key={j} className={`tshell-line tshell-line--${line.type}`}>
                {line.text}
              </div>
            ))}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form className="tshell-form" onSubmit={submit}>
        <label htmlFor="tshell-input" className="tshell-prompt" aria-label="Terminal prompt">
          {prompt}
        </label>
        <input
          id="tshell-input"
          ref={inputRef}
          className="tshell-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal command input"
        />
      </form>
    </div>
  );
}
