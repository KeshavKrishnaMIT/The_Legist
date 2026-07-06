import { useState } from "react";
import "./FAQSection.css";
import Reveal from "../../../components/Reveal/Reveal";

const FAQS = [
  {
    q: "What is Legist?",
    a: "Legist connects clients with verified lawyers and structured legal resources, making the path from filing to resolution transparent and easy to follow.",
  },
  {
    q: "Is this platform free?",
    a: "Basic access — browsing lawyers, filing initial case details, and tracking status — is free. Premium legal services are billed directly by your advocate.",
  },
  {
    q: "Can lawyers directly contact clients?",
    a: "Only after a client consents and accepts communication. Every interaction is logged for transparency on both sides.",
  },
  {
    q: "Who can use Legist?",
    a: "Legist is open to students, citizens, legal professionals, and anyone seeking structured information or awareness about the Indian legal system.",
  },
  {
    q: "Can I track the progress of my case?",
    a: "Yes — real-time case tracking shows hearing dates, document submissions, and timeline events, with full visibility for both clients and lawyers.",
  },
];

export default function FAQSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="faqs" className="faq-section">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="eyebrow-dot" />
            Common questions
          </p>
          <h2>Frequently Asked Questions</h2>
        </Reveal>

        <div className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = active === i;
            return (
              <Reveal key={item.q} delay={i * 60} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setActive(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{item.q}</span>
                  <span className={`faq-toggle ${isOpen ? "faq-toggle-open" : ""}`}>
                    <span />
                    <span />
                  </span>
                </button>

                <div className={`faq-answer-wrap ${isOpen ? "open" : ""}`}>
                  <div className="faq-answer-inner">
                    <p className="faq-answer">{item.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}