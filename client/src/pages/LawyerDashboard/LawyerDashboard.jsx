import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Reveal from "../../components/Reveal/Reveal";
import "./LawyerDashboard.css";

const CAPABILITIES = [
  {
    title: "View open cases",
    text: "See every new client filing as it comes in, sorted by category and urgency.",
  },
  {
    title: "Read client documents",
    text: "Review uploaded evidence, complaints, and supporting files before you commit.",
  },
  {
    title: "Accept a case",
    text: "Take on the cases that fit your practice — clients are notified instantly.",
  },
  {
    title: "Track case timeline",
    text: "Log hearings, milestones, and notes so clients always know where things stand.",
  },
];

const STATS = [
  { label: "Open requests", value: "3" },
  { label: "Active cases", value: "12" },
  { label: "Avg. response time", value: "6 hrs" },
];

export default function LawyerDashboard() {
  return (
    <div className="lawyer-dash-page">
      <Navbar />

      <main className="lawyer-dash-main">
        <section className="lawyer-dash-hero">
          <div className="container lawyer-dash-grid">
            <Reveal className="lawyer-dash-copy">
              <p className="eyebrow">
                <span className="eyebrow-dot" />
                Lawyer desk
              </p>
              <h1>Your practice, organised in one docket.</h1>
              <p>
                Everything you need to manage incoming client cases — review,
                accept, and track — without losing the thread across email
                and calls.
              </p>
              <Link to="/lawyer/cases" className="btn btn-brass btn-lg">
                View Case Requests
              </Link>
            </Reveal>

            <Reveal delay={120} className="lawyer-dash-stats">
              {STATS.map((s) => (
                <div className="stat-card" key={s.label}>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="lawyer-dash-capabilities">
          <div className="container">
            <Reveal className="section-head">
              <p className="eyebrow">
                <span className="eyebrow-dot" />
                What you can do here
              </p>
              <h2>Available on your dashboard</h2>
            </Reveal>

            <div className="capability-grid">
              {CAPABILITIES.map((item, i) => (
                <Reveal as="article" delay={i * 70} className="capability-card" key={item.title}>
                  <span className="capability-index">0{i + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}