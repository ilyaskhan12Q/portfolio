import { useRef, useState } from 'react';
import './SpotlightCard.css';

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 255, 102, 0.12)',
  size = 350,
  ...props
}) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`spotlight-card-wrapper ${className}`}
      {...props}
    >
      {isHovered && (
        <div
          className="spotlight-layer"
          style={{
            background: `radial-gradient(${size}px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
