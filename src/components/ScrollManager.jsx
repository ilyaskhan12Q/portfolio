import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const scrollPositions = new Map();

export default function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();
  const prevKeyRef = useRef(location.key);

  useEffect(() => {
    // Save previous page's scroll position before unmount/change
    const handleScroll = () => {
      scrollPositions.set(location.key, window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.key]);

  useEffect(() => {
    // Check if user came via browser Back/Forward (POP)
    if (navType === 'POP') {
      const savedY = scrollPositions.get(location.key);
      if (typeof savedY === 'number') {
        window.scrollTo(0, savedY);
        return;
      }
    }

    // If navigating to a new route (PUSH) or initial load without hash, start at top (Hero)
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.key, navType, location.hash]);

  return null;
}
