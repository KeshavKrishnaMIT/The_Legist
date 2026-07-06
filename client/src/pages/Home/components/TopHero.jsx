import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./TopHero.css";
import SupremeCourtImg from "../../../assets/images/SUPCOURT.png";
import Logo from "../../../assets/images/logo.png";

const TICKER_ITEMS = [
  "5.1 crore+ pending cases tracked nationwide",
  "Verified advocates across 28 states",
  "End-to-end digital case tracking",
  "Transparent fee structures, no hidden costs",
  "Bridging citizens and the judiciary, one case at a time",
];

export default function TopHero() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const roleRef = useRef(null);
  const navigate = useNavigate();

  const [docket] = useState(
    () => `LGT/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 8999)}`
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("legistUser");
    if (storedUser) setUser(storedUser);
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (roleRef.current && !roleRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("legistUser");
    setUser(null);
  };

  const goRole = (path) => {
    setOpen(false);
    setMobileOpen(false);
    navigate(path);
  };

  return (
    <>
      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-inner container">
          <Link to="/" className="brand" onClick={() => setMobileOpen(false)}>
            <span className="seal">
              <img src={Logo} alt="" className="brand-logo" />
            </span>
            <span className="wordmark">Legist</span>
          </Link>

          <nav className="nav-links">
            <a href="#blog" className="nav-link">Blog</a>
            <a href="#faqs" className="nav-link">FAQs</a>
            <a href="#about" className="nav-link">About</a>
          </nav>

          <div className="nav-actions">
            <div className="role-switch" ref={roleRef}>
              <button
                className="btn btn-outline role-trigger"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
              >
                Get Started
                <svg
                  className={`chev ${open ? "chev-open" : ""}`}
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                  fill="none"
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
                <div className="role-panel">
                  <button className="role-card" onClick={() => goRole("/client/new-case")}>
                    <span className="role-icon" aria-hidden="true">
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
                      <strong>I&rsquo;m a Client</strong>
                      <small>File &amp; track a case</small>
                    </span>
                  </button>

                  <button className="role-card" onClick={() => goRole("/lawyer/cases")}>
                    <span className="role-icon" aria-hidden="true">
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
                      <strong>I&rsquo;m a Lawyer</strong>
                      <small>Manage your docket</small>
                    </span>
                  </button>
                </div>
              )}
            </div>

            {user ? (
              <div className="user-pill">
                <span className="user-dot" />
                <span>{user}</span>
                <button className="logout-x" onClick={handleLogout} aria-label="Log out">
                  ×
                </button>
              </div>
            ) : (
              <button className="btn btn-brass" onClick={() => navigate("/sign-in")}>
                Sign In
              </button>
            )}
          </div>

          <button
            className={`burger ${mobileOpen ? "burger-open" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`mobile-menu ${mobileOpen ? "mobile-open" : ""}`}>
          <a href="#blog" onClick={() => setMobileOpen(false)}>Blog</a>
          <a href="#faqs" onClick={() => setMobileOpen(false)}>FAQs</a>
          <a href="#about" onClick={() => setMobileOpen(false)}>About</a>

          <div className="mobile-roles">
            <button className="btn btn-outline" onClick={() => goRole("/client/new-case")}>
              Continue as Client
            </button>
            <button className="btn btn-outline" onClick={() => goRole("/lawyer/cases")}>
              Continue as Lawyer
            </button>
          </div>

          {user ? (
            <button className="btn btn-ghost" onClick={handleLogout}>
              Logout ({user})
            </button>
          ) : (
            <button className="btn btn-brass" onClick={() => goRole("/sign-in")}>
              Sign In
            </button>
          )}
        </div>
      </header>

      <section className={`hero ${mounted ? "hero-in" : ""}`}>
        <div className="hero-media">
          <img src={SupremeCourtImg} alt="Supreme Court of India" />
          <div className="hero-scrim" />
        </div>

        <div className="hero-content container">
          <p className="eyebrow hero-eyebrow">
            <span className="eyebrow-dot" />
            Justice, made navigable
          </p>

          <h1 className="hero-title">
            <span className="title-line">Bridging the</span>
            <span className="title-line title-accent">
              Justice Gap
              <i className="stamp-ring" aria-hidden="true" />
            </span>
          </h1>

          <p className="hero-sub">
            Legist connects citizens with verified advocates, turning an
            intimidating legal process into a transparent, trackable one —
            from first filing to final hearing.
          </p>

          <div className="hero-cta">
            <button className="btn btn-brass btn-lg" onClick={() => navigate("/client/new-case")}>
              File a Case
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => navigate("/lawyer/cases")}>
              Practice on Legist
            </button>
          </div>
        </div>

        <div className="hero-docket">
          <span className="live-dot" />
          DOCKET&nbsp;NO.&nbsp;{docket} &nbsp;·&nbsp; STATUS: FILED TODAY
        </div>
      </section>

      <div className="ticker">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span className="ticker-item" key={i}>
              {item}
              <span className="ticker-sep">•</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}