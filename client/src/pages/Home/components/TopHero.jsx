import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TopHero.css";
import SupremeCourtImg from "../../../assets/images/SUPCOURT.png";
import Logo from "../../../assets/images/logo.png";

export default function TopHero() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("legistUser");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("legistUser");
    alert("Logged out successfully");
    setUser(null);
  };

  return (
    <section className="top-hero">

      {/* BRAND */}
      <div className="brand">
        <img src={Logo} alt="Legist Logo" className="brand-logo" />
        <h1 className="logo">Legist</h1>
      </div>

      <div className="divider" />

      <div className="top-nav">
        <div className="top-nav-left">
          <button
            className="select-btn"
            onClick={() => setOpen(!open)}
          >
            Select
          </button>

          {open && (
            <div className="select-menu">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/client/new-case");
                }}
              >
                Continue as Client
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/lawyer/cases");
                }}
              >
                Continue as Lawyer
              </button>
            </div>
          )}
        </div>

        <div className="top-nav-right">
          <a href="#blog" className="nav-link">Blog</a>
          <a href="#faqs" className="nav-link">FAQs</a>
          <a href="#about" className="nav-link">About</a>

          {user ? (
            <>
              <span className="nav-link">Hi, {user}</span>
              <span
                className="nav-link"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                Logout
              </span>
            </>
          ) : (
            <span
              className="nav-link"
              onClick={() => navigate("/sign-in")}
              style={{ cursor: "pointer" }}
            >
              Sign In
            </span>
          )}
        </div>
      </div>

      <div className="divider" />

      <div className="supreme-img">
        <img src={SupremeCourtImg} alt="Supreme Court of India" />
      </div>
    </section>
  );
}

