import Navbar from "../../components/Navbar/Navbar";
import Reveal from "../../components/Reveal/Reveal";
import "./About.css";

const principles = [
  {
    title: "Access",
    text: "Legal help should be understandable, reachable, and trackable for citizens before the process becomes overwhelming.",
  },
  {
    title: "Transparency",
    text: "Clients and advocates see the same case milestones, documents, messages, and next actions in one structured place.",
  },
  {
    title: "Trust",
    text: "Verified advocates, clear fees, and documented communication reduce uncertainty on both sides of the legal journey.",
  },
];

const team = [
  "Ishi Pandeya",
  "Mahira Srivastava",
  "Keshav Krishna",
  "Aarya Agarwal",
  "Divya Sai Reddy",
];

export default function About() {
  return (
    <div className="about-page">
      <Navbar />

      <main>
        <section className="about-hero">
          <div className="container about-hero-grid">
            <Reveal className="about-hero-copy">
              <p className="eyebrow">
                <span className="eyebrow-dot" />
                About Legist
              </p>
              <h1>Legal support that feels clear from the first step.</h1>
              <p>
                Legist is a legal-tech platform built to simplify how people interact
                with the justice system. It bridges citizens and legal professionals
                through structured intake, lawyer discovery, case tracking, and clear
                communication.
              </p>
            </Reveal>

            <Reveal delay={120} className="about-ledger">
              <span className="about-ledger-label">Platform brief</span>
              <dl>
                <div>
                  <dt>Users served</dt>
                  <dd>Clients, advocates, students</dd>
                </div>
                <div>
                  <dt>Core workflows</dt>
                  <dd>Filing, matching, updates</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Access to justice in India</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </section>

        <div className="seam container" />

        <section className="about-principles">
          <div className="container">
            <Reveal className="section-head">
              <p className="eyebrow">
                <span className="eyebrow-dot" />
                What guides us
              </p>
              <h2>Built around the moments where legal journeys usually break down.</h2>
            </Reveal>

            <div className="principle-grid">
              {principles.map((item, index) => (
                <Reveal as="article" delay={index * 80} className="principle-card" key={item.title}>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="about-team">
          <div className="container about-team-grid">
            <Reveal>
              <p className="eyebrow">
                <span className="eyebrow-dot" />
                The makers
              </p>
              <h2>Built by students, for citizens.</h2>
              <p className="about-team-copy">
                The team behind Legist shares a simple belief: legal technology
                should reduce confusion, not add another layer of complexity.
              </p>
            </Reveal>

            <div className="team-grid">
              {team.map((member, index) => (
                <Reveal delay={index * 60} className="team-card" key={member}>
                  <h3>{member}</h3>
                  <p>Developer</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
