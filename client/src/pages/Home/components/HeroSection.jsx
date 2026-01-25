import "./HeroSection.css"

export default function HeroSection() {
  return (
    <section className="hero">
      <h1 className="hero-title">Supreme Court Platform</h1>

      <p className="hero-subtitle">
        A decentralized legal-aid ecosystem connecting lawyers, law
        students, and citizens through transparency, trust, and
        accessibility.
      </p>

      <div className="hero-actions">
        <button className="primary-btn">Get Started</button>
        <button className="secondary-btn">Explore</button>
      </div>
    </section>
  )
}
