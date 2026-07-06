import { useNavigate, Link } from "react-router-dom";
import "./SelectRole.css";

const ROLES = [
  {
    id: "client",
    title: "I'm a Client",
    desc: "File a case, search for verified lawyers, and track every hearing and document in one place.",
    path: "/client/new-case",
    points: ["File a new case in minutes", "Browse & shortlist advocates", "Real-time status tracking"],
  },
  {
    id: "lawyer",
    title: "I'm a Lawyer",
    desc: "Manage your docket, take on new clients, and keep every case update transparent and organised.",
    path: "/lawyer/cases",
    points: ["Manage your active docket", "Accept new client cases", "Structured case timelines"],
  },
];

export default function SelectRole() {
  const navigate = useNavigate();

  return (
    <div className="role-page">
      <div className="role-backdrop" />

      <div className="role-inner container">
        <Link to="/" className="role-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to home
        </Link>

        <p className="eyebrow role-eyebrow">
          <span className="eyebrow-dot" />
          One step away
        </p>
        <h1 className="role-title">How will you use Legist?</h1>
        <p className="role-sub">
          Choose the path that fits you — you can always switch later from
          the navigation bar.
        </p>

        <div className="role-cards">
          {ROLES.map((role, i) => (
            <button
              key={role.id}
              className="role-card-lg"
              style={{ animationDelay: `${i * 0.12}s` }}
              onClick={() => navigate(role.path)}
            >
              <span className="role-card-index">0{i + 1}</span>
              <h2>{role.title}</h2>
              <p className="role-card-desc">{role.desc}</p>

              <ul className="role-card-points">
                {role.points.map((p) => (
                  <li key={p}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>

              <span className="role-card-cta">
                Continue
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}