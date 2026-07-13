import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Reveal from "../../components/Reveal/Reveal";
import CaseTimeline from "../../components/CaseTimeline/CaseTimeline";
import lawyers from "../../mock/lawyers";
import "./NewCase.css";

const CASE_TYPES = ["Criminal", "Civil", "Family", "Corporate"];

const INITIAL_FORM = {
  name: "",
  phone: "",
  location: "",
  caseType: "",
  description: "",
};

export default function NewCase() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [searched, setSearched] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [messages, setMessages] = useState([
    { from: "system", text: "Share a concise summary and attach documents before the first hearing." },
  ]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const filteredLawyers = useMemo(() => {
    if (!searched) return [];

    return lawyers.filter((lawyer) => {
      const caseMatch = lawyer.specialization === form.caseType;
      const locationMatch = lawyer.location.toLowerCase().includes(form.location.trim().toLowerCase());
      return caseMatch && locationMatch;
    });
  }, [form.caseType, form.location, searched]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: name === "phone" ? value.replace(/\D/g, "") : value }));
    setError("");
  };

  const validate = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.location.trim() || !form.caseType || !form.description.trim()) {
      return "Please complete every field before searching for lawyers.";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      return "Enter a valid 10-digit phone number.";
    }

    if (form.description.trim().length < 24) {
      return "Add a little more detail so lawyers can assess the matter properly.";
    }

    return "";
  };

  const findLawyers = (event) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setSearched(false);
      return;
    }

    setSelectedLawyer(null);
    setSearched(true);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages((current) => [...current, { from: "client", text: message.trim() }]);
    setMessage("");
  };

  return (
    <div className="new-case-page">
      <Navbar />

      <main className="case-intake">
        <section className="case-intake-hero">
          <div className="container case-intake-grid">
            <Reveal className="case-intake-copy">
              <p className="eyebrow">
                <span className="eyebrow-dot" />
                Client intake
              </p>
              <h1>File your case and match with a verified advocate.</h1>
              <p>
                Share the essentials once. Legist uses your case type and location
                to surface relevant advocates, then keeps every update in one
                clear timeline.
              </p>
            </Reveal>

            <Reveal delay={120} className="case-intake-card">
              <form className="case-form" onSubmit={findLawyers} noValidate>
                <div className="form-row">
                  <label htmlFor="name">Full name</label>
                  <input
                    id="name"
                    name="name"
                    placeholder="e.g. Ananya Rao"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                </div>

                <div className="form-row two-col">
                  <div>
                    <label htmlFor="phone">Phone number</label>
                    <input
                      id="phone"
                      name="phone"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit number"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label htmlFor="location">Location</label>
                    <input
                      id="location"
                      name="location"
                      placeholder="Patna, Delhi, Mumbai"
                      value={form.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="caseType">Case type</label>
                  <select id="caseType" name="caseType" value={form.caseType} onChange={handleChange}>
                    <option value="">Select case type</option>
                    {CASE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <label htmlFor="description">Case summary</label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Briefly describe what happened, dates involved, and what help you need."
                    value={form.description}
                    onChange={handleChange}
                    rows="5"
                  />
                </div>

                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="btn btn-brass btn-lg case-submit">
                  Find Lawyers
                </button>
              </form>
            </Reveal>
          </div>
        </section>

        {searched && (
          <section className="case-results">
            <div className="container">
              <Reveal className="case-section-head">
                <p className="eyebrow">
                  <span className="eyebrow-dot" />
                  Recommended advocates
                </p>
                <h2>{filteredLawyers.length ? "Lawyers matching your case" : "No exact match yet"}</h2>
                <p>
                  {filteredLawyers.length
                    ? "Review fee, location, and specialization before opening a conversation."
                    : "Try a broader city search, or choose a nearby metro to see more advocates."}
                </p>
              </Reveal>

              {filteredLawyers.length ? (
                <div className="lawyer-results-grid">
                  {filteredLawyers.map((lawyer, index) => (
                    <Reveal as="article" delay={index * 70} className="lawyer-result-card" key={lawyer.id}>
                      <div className="lawyer-result-head">
                        <img src={lawyer.image} alt="" loading="lazy" />
                        <div>
                          <h3>{lawyer.name}</h3>
                          <p>{lawyer.specialization} law</p>
                        </div>
                      </div>
                      <dl>
                        <div>
                          <dt>Location</dt>
                          <dd>{lawyer.location}</dd>
                        </div>
                        <div>
                          <dt>Fee</dt>
                          <dd>{lawyer.fees}</dd>
                        </div>
                        <div>
                          <dt>Contact</dt>
                          <dd>{lawyer.phone}</dd>
                        </div>
                      </dl>
                      <button className="btn btn-outline" onClick={() => setSelectedLawyer(lawyer)}>
                        Contact Lawyer
                      </button>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <Reveal className="case-empty-state">
                  <h3>Broaden the search</h3>
                  <p>
                    Current demo data includes Criminal, Civil, Family, and Corporate
                    advocates in Patna, Delhi, and Mumbai.
                  </p>
                </Reveal>
              )}
            </div>
          </section>
        )}

        {selectedLawyer && (
          <section className="case-workspace">
            <div className="container case-workspace-grid">
              <Reveal className="case-progress-panel">
                <div className="workspace-head">
                  <p className="eyebrow">
                    <span className="eyebrow-dot" />
                    Case opened
                  </p>
                  <h2>Progress with {selectedLawyer.name}</h2>
                </div>
                <CaseTimeline isLawyer={false} />
                <Link to="/client/case" className="btn btn-ghost case-link">
                  Open full case room
                </Link>
              </Reveal>

              <Reveal delay={120} className="case-chat-panel">
                <h2>Message advocate</h2>
                <p className="chat-sub">
                  Keep requests specific. Your messages will stay attached to this case.
                </p>

                <div className="messages" aria-live="polite">
                  {messages.map((item, index) => (
                    <div className={`msg ${item.from}`} key={`${item.from}-${index}`}>
                      {item.text}
                    </div>
                  ))}
                </div>

                <div className="chat-input">
                  <input
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") sendMessage();
                    }}
                    placeholder="Type a message..."
                  />
                  <button className="btn btn-brass" onClick={sendMessage}>
                    Send
                  </button>
                </div>
              </Reveal>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
