import './CrtOverlay.css';

/**
 * Full-page CRT scanline + vignette overlay.
 * Rendered as aria-hidden so screen readers skip it entirely.
 */
export default function CrtOverlay() {
  return <div className="crt-overlay" aria-hidden="true" />;
}
