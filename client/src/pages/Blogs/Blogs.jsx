import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Reveal from "../../components/Reveal/Reveal";
import "./Blogs.css";
import blogs from "./blogsData";
import LegalStatsImg from "../../assets/images/legal-stats.png";

export default function Blogs() {
  const [openId, setOpenId] = useState(null);

  const scroll = (dir) => {
    const track = document.getElementById("blog-scroll");
    if (!track) return;
    track.scrollBy({ left: dir === "left" ? -380 : 380, behavior: "smooth" });
  };

  return (
    <div className="blog-page">
      <Navbar />

      <section className="dispatch" id="blog">
        <div className="container dispatch-head">
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              Legal dispatch
            </p>
            <h1>Legal Blogs & News</h1>
          </Reveal>

          <div className="dispatch-arrows" aria-label="Blog carousel controls">
            <button className="arrow" onClick={() => scroll("left")} aria-label="Scroll blogs left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="arrow" onClick={() => scroll("right")} aria-label="Scroll blogs right">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="dispatch-track" id="blog-scroll" tabIndex="0" aria-label="Legal news articles">
          <div className="dispatch-spacer" aria-hidden="true" />
          {blogs.map((blog, index) => {
            const isOpen = openId === blog.id;

            return (
              <Reveal as="article" delay={index * 45} className="blog-card" key={blog.id}>
                <div className="blog-media">
                  <img src={`${blog.image}?auto=format&fit=crop&w=760&q=80`} alt="" loading="lazy" />
                  <span className="blog-tag">Brief</span>
                </div>

                <div className="blog-body">
                  <h2>{blog.title}</h2>
                  <p className="blog-news">{blog.news}</p>

                  <button
                    className="read-btn"
                    onClick={() => setOpenId(isOpen ? null : blog.id)}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? "Hide brief" : "Read brief"}
                  </button>

                  <div className={`blog-expand-wrap ${isOpen ? "open" : ""}`}>
                    <div className="blog-expand-inner">
                      <p className="blog-content-text">{blog.content}</p>
                      <a className="blog-link" href={blog.link} target="_blank" rel="noreferrer">
                        Read full article
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
          <div className="dispatch-spacer" aria-hidden="true" />
        </div>

        <Reveal className="stats-band container">
          <p className="eyebrow">
            <span className="eyebrow-dot" />
            Judicial workload
          </p>
          <h2 className="stats-title">Real-Time Legal Landscape (India)</h2>
          <img src={LegalStatsImg} alt="Legal statistics dashboard" className="stats-img" loading="lazy" />
        </Reveal>
      </section>
    </div>
  );
}
