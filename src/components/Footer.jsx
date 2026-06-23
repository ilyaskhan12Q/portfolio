import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner mono">
        <span className="footer-line">
          <span className="footer-dot" /> system_status: online
        </span>
        <span className="footer-line footer-center">© {year} ilyas khan — swat, kp, pk</span>
        <span className="footer-line">
          <a href="https://github.com/ilyaskhan12Q" target="_blank" rel="noreferrer">github</a>
          <span className="footer-sep">/</span>
          <a href="https://www.linkedin.com/in/ilyas-khan67/" target="_blank" rel="noreferrer">linkedin</a>
        </span>
      </div>
    </footer>
  );
}
