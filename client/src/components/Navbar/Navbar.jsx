import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState("");
  const roleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(localStorage.getItem("legistUser") || "");
  }, []);

  useEffect(() => {
    const onClick = (event) => {
      if (roleRef.current && !roleRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const goTo = (path) => {
    setOpen(false);
    setMobileOpen(false);
    navigate(path);
  };

  const logout = () => {
    localStorage.removeItem("legistUser");
    setUser("");
    setMobileOpen(false);
  };

  return (
    <header className="site-nav">
      <div className="site-nav-inner container">
        <Link to="/" className="site-brand" onClick={() => setMobileOpen(false)}>
          <span className="site-seal">
            <img src={Logo} alt="" className="site-brand-logo" />
          </span>
          <span className="site-wordmark">Legist</span>
        </Link>

        <nav className="site-links" aria-label="Primary navigation">
          <NavLink to="/blog" className="site-link">
            Blog
          </NavLink>
          <NavLink to="/about" className="site-link">
            About
          </NavLink>
          <NavLink to="/client/new-case" className="site-link">
            File Case
          </NavLink>
          <NavLink to="/lawyer/dashboard" className="site-link">
            Lawyer Desk
          </NavLink>
        </nav>

        <div className="site-actions">
          <div className="site-role-switch" ref={roleRef}>
            <button
              className="btn btn-outline site-role-trigger"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-haspopup="menu"
            >
              Get Started
              <svg
                className={`site-chev ${open ? "site-chev-open" : ""}`}
                width="11"
                height="7"
                viewBox="0 0 11 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 1L5.5 5.5L10 1"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {open && (
              <div className="site-role-panel" role="menu">
                <button className="site-role-card" onClick={() => goTo("/client/new-case")}>
                  <span className="site-role-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span>
                    <strong>Client</strong>
                    <small>File or track a case</small>
                  </span>
                </button>

                <button className="site-role-card" onClick={() => goTo("/lawyer/dashboard")}>
                  <span className="site-role-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 4h16M6 4v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4M9 9h6M9 13h4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span>
                    <strong>Lawyer</strong>
                    <small>Manage case requests</small>
                  </span>
                </button>
              </div>
            )}
          </div>

          {user ? (
            <div className="site-user-pill">
              <span className="site-user-dot" />
              <span>{user}</span>
              <button onClick={logout} aria-label="Log out">
                x
              </button>
            </div>
          ) : (
            <button className="btn btn-brass" onClick={() => goTo("/sign-in")}>
              Sign In
            </button>
          )}
        </div>

        <button
          className={`site-burger ${mobileOpen ? "site-burger-open" : ""}`}
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`site-mobile-menu ${mobileOpen ? "site-mobile-open" : ""}`}>
        <NavLink to="/blog" onClick={() => setMobileOpen(false)}>
          Blog
        </NavLink>
        <NavLink to="/about" onClick={() => setMobileOpen(false)}>
          About
        </NavLink>
        <button className="btn btn-outline" onClick={() => goTo("/client/new-case")}>
          Continue as Client
        </button>
        <button className="btn btn-outline" onClick={() => goTo("/lawyer/dashboard")}>
          Continue as Lawyer
        </button>
        {user ? (
          <button className="btn btn-ghost" onClick={logout}>
            Logout ({user})
          </button>
        ) : (
          <button className="btn btn-brass" onClick={() => goTo("/sign-in")}>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
