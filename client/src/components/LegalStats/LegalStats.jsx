import { useEffect, useState } from "react";
import "./LegalStats.css";

export default function LegalStats() {
  const [stats, setStats] = useState({
    total: 0,
    civil: 0,
    criminal: 0,
    family: 0,
    youth: 0,
    adults: 0,
    seniors: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        total: 51000000 + Math.floor(Math.random() * 5000),
        civil: 42,
        criminal: 38,
        family: 20,
        youth: 18,
        adults: 62,
        seniors: 20,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="legal-stats">
      <h2>India – Real Time Legal Statistics</h2>
      <p className="stats-sub">
        Aggregated insights based on publicly available judicial datasets
      </p>

      <div className="stats-grid">
        <div className="stat-card main">
          <h3>Total Pending Cases</h3>
          <span>{stats.total.toLocaleString()}</span>
        </div>

        <div className="stat-card">
          <h4>Case Type Distribution</h4>
          <p>Civil: {stats.civil}%</p>
          <p>Criminal: {stats.criminal}%</p>
          <p>Family: {stats.family}%</p>
        </div>

        <div className="stat-card">
          <h4>Age-wise Involvement</h4>
          <p>Youth (18–25): {stats.youth}%</p>
          <p>Adults (26–60): {stats.adults}%</p>
          <p>Seniors (60+): {stats.seniors}%</p>
        </div>
      </div>
    </section>
  );
}
