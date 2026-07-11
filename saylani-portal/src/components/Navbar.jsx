 import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/dashboard">
          🛠 MaintainIQ
        </Link>

        <div className="d-flex flex-wrap gap-2">

          <Link className="btn btn-light" to="/dashboard">
            Dashboard
          </Link>

          <Link className="btn btn-light" to="/assets">
            Assets
          </Link>

          <Link className="btn btn-light" to="/complaints">
            Issues
          </Link>

          <Link className="btn btn-light" to="/maintenance">
            History
          </Link>

          <Link className="btn btn-danger" to="/">
            Logout
          </Link>

        </div>

      </div>
    </nav>
  );
}