import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <Navbar />
      <main className="not-found-main container">
        <p className="eyebrow">
          <span className="eyebrow-dot" />
          404
        </p>
        <h1>Page not found</h1>
        <p>
          The page you are looking for may have moved, or the case file may have
          been archived under a different route.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-brass btn-lg">
            Return home
          </Link>
          <Link to="/client/new-case" className="btn btn-outline btn-lg">
            File a case
          </Link>
        </div>
      </main>
    </div>
  );
}
