import { useState } from "react";
import "./Blogs.css";
import blogs from "./blogsData";
import LegalStats from "../../components/LegalStats/LegalStats";
import LegalStats from "../../../components/LegalStats/LegalStats";


export default function Blogs() {
  const [openId, setOpenId] = useState(null);

  const scroll = (dir) => {
    document
      .getElementById("blog-scroll")
      .scrollBy({ left: dir === "left" ? -380 : 380, behavior: "smooth" });
  };

  return (
    <>
      {/* BLOGS */}
      <section className="blogs-section" id="blog">
        <h2>Legal Blogs & News</h2>

        <button className="arrow left" onClick={() => scroll("left")}>
          ‹
        </button>

        <div className="blogs-container" id="blog-scroll">
          {blogs.map((b) => (
            <div className="blog-card" key={b.id}>
              <img src={b.image} alt={b.title} />

              <div className="blog-body">
                <h3>{b.title}</h3>
                <p className="news">{b.news}</p>

                <button
                  className="read-btn"
                  onClick={() =>
                    setOpenId(openId === b.id ? null : b.id)
                  }
                >
                  {openId === b.id ? "Hide" : "Read more"}
                </button>

                {openId === b.id && (
                  <div className="blog-expand">
                    <p>{b.content}</p>
                    <a href={b.link} target="_blank" rel="noreferrer">
                      Read full article ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="arrow right" onClick={() => scroll("right")}>
          ›
        </button>
      </section>

      {/* 🔥 REAL-TIME LEGAL STATS SECTION */}
      <LegalStats />
    </>
  );
}
<>
  <section className="blogs-section" id="blog">
    {/* existing blog code */}
  </section>

  <LegalStats />
</>
