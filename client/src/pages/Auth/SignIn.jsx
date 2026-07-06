import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignIn.css";

export default function SignIn() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !mobile || !password) {
      setError("Please fill all fields to continue.");
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setSubmitting(true);
    localStorage.setItem("legistUser", name);

    setTimeout(() => {
      navigate("/");
    }, 550);
  };

  return (
    <div className="signin-page">
      <div className="signin-backdrop" />

      <div className="signin-card">
        <Link to="/" className="signin-seal">
          <span>Legist</span>
        </Link>

        <p className="eyebrow signin-eyebrow">
          <span className="eyebrow-dot" />
          Member sign-in
        </p>
        <h1 className="signin-title">Welcome back</h1>
        <p className="signin-sub">
          Sign in to track filings, manage your cases, and stay in step with
          your advocate.
        </p>

        <form className="signin-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Ananya Rao"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="field">
            <label htmlFor="mobile">Mobile number</label>
            <input
              id="mobile"
              type="tel"
              inputMode="numeric"
              placeholder="10-digit number"
              value={mobile}
              maxLength={10}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              autoComplete="tel"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="password-wrap">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.5 5.3A9.6 9.6 0 0112 5c5 0 9 4 10 7-.4 1.2-1.2 2.6-2.3 3.9M6.2 6.6C4 8.1 2.6 10 2 12c1 3 5 7 10 7 1.3 0 2.6-.3 3.7-.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && <p className="signin-error">{error}</p>}

          <button type="submit" className="btn btn-brass btn-lg signin-submit" disabled={submitting}>
            {submitting ? (
              <span className="spinner" aria-hidden="true" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="signin-footnote">
          New to Legist?{" "}
          <Link to="/select-role" className="signin-link">
            Choose your role
          </Link>{" "}
          to get started.
        </p>
      </div>
    </div>
  );
}