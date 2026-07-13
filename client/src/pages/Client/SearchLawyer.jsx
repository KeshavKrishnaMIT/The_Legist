import { useMemo, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Reveal from "../../components/Reveal/Reveal";
import lawyers from "../../mock/lawyers";
import "./NewCase.css";
import "./SearchLawyer.css";

const CASE_TYPES = ["Criminal", "Civil", "Family", "Corporate"];

export default function SearchLawyer() {
  const [form, setForm] = useState({
    caseType: "",
    name: "",
    phone: "",
    location: "",
  });
  const [searched, setSearched] = useState(false);
  const [contactedId, setContactedId] = useState(null);
  const [error, setError] = useState("");

  const results = useMemo(() => {
    if (!searched) return lawyers.slice(0, 6);

    return lawyers.filter((lawyer) => {
      const caseMatch = form.caseType ? lawyer.specialization === form.caseType : true;
      const locationMatch = form.location
        ? lawyer.location.toLowerCase().includes(form.location.trim().toLowerCase())
        : true;
      return caseMatch && locationMatch;
    });
  }, [form.caseType, form.location, searched]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: name === "phone" ? value.replace(/\D/g, "") : value }));
    setError("");
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (!form.caseType || !form.name.trim() || !form.phone.trim() || !form.location.trim()) {
      setError("Please fill all fields to search with confidence.");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    setSearched(true);
    setContactedId(null);
  };

  return (
    <div className="search-page">
      <Navbar />

      <main className="search-main">
        <section className="search-hero">
          <div className="container search-grid">
            <Reveal className="search-copy">
              <p className="eyebrow">
                <span className="eyebrow-dot" />
                Find counsel
              </p>
              <h1>Search verified lawyers by practice area and city.</h1>
              <p>
                Use Legist's advocate directory when you want to compare fit
                before filing a full case intake.
              </p>
            </Reveal>

            <Reveal delay={120} className="search-panel">
              <form className="search-form" onSubmit={handleSearch} noValidate>
                <div className="form-row">
                  <label htmlFor="caseType">Case type</label>
                  <select id="caseType" name="caseType" value={form.caseType} onChange={updateField}>
                    <option value="">Select case type</option>
                    {CASE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row two-col">
                  <div>
                    <label htmlFor="name">Your name</label>
                    <input id="name" name="name" value={form.name} onChange={updateField} placeholder="Full name" />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone number</label>
                    <input
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={updateField}
                      placeholder="10-digit number"
                      maxLength={10}
                      inputMode="numeric"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="location">Location</label>
                  <input
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={updateField}
                    placeholder="Patna, Delhi, Mumbai"
                  />
                </div>

                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="btn btn-brass btn-lg case-submit">
                  Search Lawyers
                </button>
              </form>
            </Reveal>
          </div>
        </section>

        <section className="search-results">
          <div className="container">
            <Reveal className="case-section-head">
              <p className="eyebrow">
                <span className="eyebrow-dot" />
                {searched ? "Search results" : "Featured lawyers"}
              </p>
              <h2>{results.length ? "Advocates available on Legist" : "No lawyers found"}</h2>
              <p>
                {results.length
                  ? "Compare fee, location, and practice area before requesting a consultation."
                  : "Try a different city or practice area to broaden the directory search."}
              </p>
            </Reveal>

            {results.length ? (
              <div className="search-results-grid">
                {results.map((lawyer, index) => (
                  <Reveal as="article" delay={index * 55} className="search-result-card" key={lawyer.id}>
                    <div className="search-result-head">
                      <img src={lawyer.image} alt="" loading="lazy" />
                      <div>
                        <h3>{lawyer.name}</h3>
                        <p>{lawyer.specialization} law</p>
                      </div>
                    </div>
                    <dl>
                      <div>
                        <dt>Fees</dt>
                        <dd>{lawyer.fees}</dd>
                      </div>
                      <div>
                        <dt>Location</dt>
                        <dd>{lawyer.location}</dd>
                      </div>
                      <div>
                        <dt>Phone</dt>
                        <dd>{lawyer.phone}</dd>
                      </div>
                    </dl>
                    <button className="btn btn-outline" onClick={() => setContactedId(lawyer.id)}>
                      {contactedId === lawyer.id ? "Request Sent" : "Contact Lawyer"}
                    </button>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal className="case-empty-state">
                <h3>No exact match</h3>
                <p>Current demo data covers Patna, Delhi, and Mumbai across four core practice areas.</p>
              </Reveal>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
