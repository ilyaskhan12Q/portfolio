import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="container notfound-page">
      <p className="mono notfound-code">$ cd ./this-page</p>
      <h1 className="notfound-title mono">404: NO SUCH FILE OR DIRECTORY</h1>
      <p className="notfound-desc">The path you requested doesn&#x2019;t resolve to anything.</p>
      <Link to="/" className="btn btn-primary">cd ~ <span className="mono">→</span></Link>
    </div>
  );
}
