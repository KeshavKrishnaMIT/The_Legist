import "./AboutSection.css";

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <h2>About Legist</h2>

      <p className="about-intro">
        Legist is a modern legal-tech platform built to simplify the way people
        interact with the legal system. It bridges the gap between citizens and
        legal professionals by providing transparency, accessibility, and
        structured case management in one unified space.
        <br /><br />
        From filing cases to tracking progress and connecting with advocates,
        Legist ensures that legal processes are no longer intimidating or
        confusing. The platform focuses on clarity, efficiency, and trust—so
        users can focus on justice, not complexity.
      </p>

      <div className="dev-grid">
        <div className="dev-card"><h3>Ishi Pandeya</h3><p>Developer</p></div>
        <div className="dev-card"><h3>Mahira Srivastava</h3><p>Developer</p></div>
        <div className="dev-card"><h3>Keshav Krishna</h3><p>Developer</p></div>
        <div className="dev-card"><h3>Aarya Agarwal</h3><p>Developer</p></div>
        <div className="dev-card"><h3>Divya Sai Reddy</h3><p>Developer</p></div>
      </div>
    </section>
  );
}
