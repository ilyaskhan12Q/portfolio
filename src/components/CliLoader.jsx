import { useState, useEffect } from 'react';
import './CliLoader.css';

const SPINNER_CHARS = ['/', '-', '\\', '|'];

export default function CliLoader({ message = 'Loading Repository Assets...' }) {
  const [spinnerIdx, setSpinnerIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const spinnerTimer = setInterval(() => {
      setSpinnerIdx((prev) => (prev + 1) % SPINNER_CHARS.length);
    }, 150);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0; // Loop or stay at 100
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 250);

    return () => {
      clearInterval(spinnerTimer);
      clearInterval(progressTimer);
    };
  }, []);

  const cappedProgress = Math.min(progress, 100);
  const barLength = 20;
  const filledLength = Math.round((cappedProgress / 100) * barLength);
  const emptyLength = barLength - filledLength;
  const bar = '█'.repeat(filledLength) + '░'.repeat(emptyLength);

  return (
    <div className="cli-loader mono" role="progressbar" aria-valuenow={cappedProgress} aria-valuemin="0" aria-valuemax="100">
      <div className="cli-loader-text">
        <span className="cli-loader-prompt">[ {SPINNER_CHARS[spinnerIdx]} ]</span> {message}
      </div>
      <div className="cli-loader-bar-wrap">
        <span>[{bar}]</span>
        <span className="cli-loader-percent"> {cappedProgress}%</span>
      </div>
      <div className="cli-loader-details text-faint">
        <span>SYS_STATUS: FETCH_IN_PROGRESS</span>
        <span> | </span>
        <span>CONN: ESTABLISHED</span>
      </div>
    </div>
  );
}
