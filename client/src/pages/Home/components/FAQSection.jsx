import "./FAQSection.css";

export default function FAQSection() {
  return (
    <section id="faqs" className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-item">
        <h4>What is Legist?</h4>
        <p>Legist connects clients with verified lawyers and legal resources.</p>
      </div>

      <div className="faq-item">
        <h4>Is this platform free?</h4>
        <p>Basic access is free. Premium legal services may charge fees.</p>
      </div>

      <div className="faq-item">
        <h4>Can lawyers directly contact clients?</h4>
        <p>Only after a client consents and accepts communication.</p>
      </div>

            <div className="faq-item">
        <h4>Who can use Legist?</h4>
        <p>Legist is open to students, citizens, legal professionals, and anyone seeking structured legal information or awareness about the Indian legal system</p>
      </div>

            <div className="faq-item">
        <h4>Can I track the progress of my case?</h4>
        <p>Yes, our platform provides real-time case tracking. You can view all updates, hearing dates, document submissions, and timeline events. Both clients and lawyers have full visibility into case progress</p>
      </div>
    </section>
  );
}
