import "./AboutPreview.css";
import Reveal from "../../../components/Reveal/Reveal";

export default function AboutPreview() {
  return (
    <section id="about" className="about-preview">
      <div className="container about-grid">
        <Reveal className="about-copy">
          <p className="eyebrow">
            <span className="eyebrow-dot" />
            Who we are
          </p>
          <h2>About Legist</h2>
          <p className="about-text">
            Legist is a legal-tech platform built to improve access to justice,
            transparency, and lawyer–client collaboration across India.
          </p>
          <p className="about-text">
            Developed by a small team of students who believe the legal system
            should feel navigable, not intimidating — for everyone, not just
            those who already speak its language.
          </p>
        </Reveal>

        <Reveal delay={150} className="about-seal-card">
          <div className="about-seal-ring">
            <span>Est.</span>
            <strong>Legist</strong>
            <span>India</span>
          </div>
          <p className="about-colophon">Built by students, for citizens.</p>
        </Reveal>
      </div>
    </section>
  );
}