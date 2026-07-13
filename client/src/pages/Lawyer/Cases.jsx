import { useMemo, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Reveal from "../../components/Reveal/Reveal";
import CaseTimeline from "../../components/CaseTimeline/CaseTimeline";
import allCases from "../../data/cases";
import "./Cases.css";

const STATUS_FILTERS = [
  "All",
  "Request Sent",
  "Under Review",
  "Accepted",
  "Evidence Submission",
  "Arguments",
  "Awaiting Hearing",
  "Judgement Reserved",
  "Closed",
];

const PAGE_SIZE = 30;

export default function LawyerCases() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedCase, setSelectedCase] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allCases.filter((c) => {
      const matchesStatus = statusFilter === "All" ? true : c.status === statusFilter;
      const matchesQuery = q
        ? c.title.toLowerCase().includes(q) ||
          c.clientName.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.caseType.toLowerCase().includes(q)
        : true;
      return matchesStatus && matchesQuery;
    });
  }, [query, statusFilter]);

  const visible = filtered.slice(0, visibleCount);

  const selectCase = (c) => {
    setSelectedCase(c);
    setAccepted(c.status !== "Request Sent" && c.status !== "Under Review");
    setMessages([]);
  };

  const sendMessage = () => {
    if (!text.trim()) return;
    setMessages((current) => [...current, { from: "lawyer", text: text.trim() }]);
    setText("");
  };

  const resetFilters = (updates) => {
    setVisibleCount(PAGE_SIZE);
    setSelectedCase(null);
    if (updates) updates();
  };

  return (
    <div className="lawyer-cases-page">
      <Navbar />

      <main className="lawyer-cases-main">
        <div className="container">
          <Reveal className="case-section-head">
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              {filtered.length.toLocaleString("en-IN")} matters on file
            </p>
            <h1>Case Requests</h1>
            <p>Search across every filing on Legist, filter by status, and coordinate directly once you accept a case.</p>
          </Reveal>

          <Reveal delay={40} className="case-toolbar">
            <div className="case-search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                value={query}
                onChange={(e) => resetFilters(() => setQuery(e.target.value))}
                placeholder="Search by client, city, or case type..."
              />
            </div>

            <div className="case-status-filters">
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s}
                  className={`status-filter-chip ${statusFilter === s ? "active" : ""}`}
                  onClick={() => resetFilters(() => setStatusFilter(s))}
                >
                  {s}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="lawyer-layout">
            {/* LEFT PANEL */}
            <Reveal delay={80} className="case-list-wrap">
              <div className="case-list">
                {visible.length === 0 && (
                  <p className="case-list-empty">No cases match your search.</p>
                )}
                {visible.map((c) => (
                  <button
                    key={c.id}
                    className={`case-card ${selectedCase?.id === c.id ? "active" : ""}`}
                    onClick={() => selectCase(c)}
                  >
                    <h3>{c.title}</h3>
                    <p className="case-card-loc">
                      {c.clientName} &middot; {c.location}
                    </p>
                    <span className={`status-pill status-${c.status.replace(/\s+/g, "-").toLowerCase()}`}>
                      {c.status}
                    </span>
                  </button>
                ))}
              </div>

              {visibleCount < filtered.length && (
                <button
                  className="btn btn-outline load-more-btn"
                  onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                >
                  Load more ({filtered.length - visibleCount} remaining)
                </button>
              )}
            </Reveal>

            {/* RIGHT PANEL */}
            <Reveal delay={140} className="case-details">
              {!selectedCase && (
                <div className="empty">
                  <span className="empty-icon" aria-hidden="true">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4h16M6 4v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4M9 9h6M9 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  Select a case on the left to view its details
                </div>
              )}

              {selectedCase && (
                <>
                  <div className="case-details-head">
                    <h2>{selectedCase.title}</h2>
                    <span className={`status-pill status-${selectedCase.status.replace(/\s+/g, "-").toLowerCase()}`}>
                      {selectedCase.status}
                    </span>
                  </div>
                  <p className="desc">{selectedCase.description}</p>

                  <dl className="client-info">
                    <div>
                      <dt>Client</dt>
                      <dd>{selectedCase.clientName}</dd>
                    </div>
                    <div>
                      <dt>Phone</dt>
                      <dd>{selectedCase.clientPhone}</dd>
                    </div>
                    <div>
                      <dt>Location</dt>
                      <dd>{selectedCase.location}</dd>
                    </div>
                    <div>
                      <dt>Case type</dt>
                      <dd>{selectedCase.caseType}</dd>
                    </div>
                    <div>
                      <dt>Filed on</dt>
                      <dd>{selectedCase.filedOn}</dd>
                    </div>
                    <div>
                      <dt>Next hearing</dt>
                      <dd>{selectedCase.nextHearing || "Not scheduled"}</dd>
                    </div>
                    <div className="client-info-doc">
                      <dt>Document</dt>
                      <dd className="doc">{selectedCase.document}</dd>
                    </div>
                  </dl>

                  {!accepted && (
                    <button className="btn btn-brass accept-btn" onClick={() => setAccepted(true)}>
                      Accept Case
                    </button>
                  )}

                  {accepted && (
                    <>
                      <CaseTimeline isLawyer={true} />

                      <div className="chat-box">
                        <h3>Client Chat</h3>

                        <div className="messages">
                          {messages.length === 0 && (
                            <p className="hint">Start the conversation with your client.</p>
                          )}
                          {messages.map((m, i) => (
                            <div key={i} className="msg lawyer">
                              {m.text}
                            </div>
                          ))}
                        </div>

                        <div className="chat-input">
                          <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Type a message..."
                          />
                          <button className="btn btn-brass" onClick={sendMessage}>
                            Send
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </Reveal>
          </div>
        </div>
      </main>
    </div>
  );
}