import { useEffect, useState } from 'react';
import './BinaryClock.css';

function toBinaryDigits(num, bits) {
  return num.toString(2).padStart(bits, '0').split('');
}

function Column({ value, bits, label }) {
  const digits = toBinaryDigits(value, bits);
  return (
    <div className="bclock-col">
      <div className="bclock-digits">
        {digits.map((d, i) => (
          <span key={i} className={`bclock-bit ${d === '1' ? 'on' : ''}`} />
        ))}
      </div>
      <div className="bclock-label">{label}</div>
    </div>
  );
}

export default function BinaryClock({ compact = false }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();

  if (compact) {
    return (
      <div className="bclock bclock-compact mono" aria-label="live clock">
        <span>{String(h).padStart(2, '0')}</span>
        <span className="bclock-colon">:</span>
        <span>{String(m).padStart(2, '0')}</span>
        <span className="bclock-colon">:</span>
        <span className="bclock-sec">{String(s).padStart(2, '0')}</span>
      </div>
    );
  }

  return (
    <div className="bclock" aria-label="live binary clock">
      <Column value={h} bits={5} label="HH" />
      <Column value={m} bits={6} label="MM" />
      <Column value={s} bits={6} label="SS" />
    </div>
  );
}
