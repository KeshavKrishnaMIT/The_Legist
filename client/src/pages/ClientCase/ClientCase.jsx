import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Reveal from "../../components/Reveal/Reveal";
import CaseTimeline from "../../components/CaseTimeline/CaseTimeline";
import { mockCase } from "../../data/mockCase";
import "../Client/NewCase.css";

const caseDetails = {
  ...mockCase,
  type: "Civil",
  status: "In Progress",
  fee: "Rs. 1,500 consultation",
  nextHearing: "12 Feb 2026",
  court: "Patna District Court",
  lawyerGraduation: "NLSIU Bangalore",
};

export default function ClientCase() {
  const [messages, setMessages] = useState([
    { sender: "advocate", text: "Hello, I have reviewed your documents and prepared the first hearing note." },
    { sender: "client", text: "Thank you. Please let me know if any additional records are needed." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((current) => [...current, { sender: "client", text: input.trim() }]);
    setInput("");
  };

  return (
    <div className="client-case-page">
      <Navbar />

      <main className="client-case-main">
        <section className="client-case-hero">
          <div className="container client-case-grid">
            <Reveal className="client-case-copy">
              <p className="eyebrow">
                <span className="eyebrow-dot" />
                Client case room
              </p>
              <h1>{caseDetails.title}</h1>
              <p>{caseDetails.description}</p>
            </Reveal>

            <Reveal delay={120} className="case-summary-card">
              <dl className="case-summary-list">
                <div>
                  <dt>Status</dt>
                  <dd>{caseDetails.status}</dd>
                </div>
                <div>
                  <dt>Lawyer</dt>
                  <dd>{caseDetails.lawyer}</dd>
                </div>
                <div>
                  <dt>Court</dt>
                  <dd>{caseDetails.court}</dd>
                </div>
                <div>
                  <dt>Next hearing</dt>
                  <dd>{caseDetails.nextHearing}</dd>
                </div>
                <div>
                  <dt>Fee</dt>
                  <dd>{caseDetails.fee}</dd>
                </div>
              </dl>
              <button className="btn btn-outline">View submitted document</button>
            </Reveal>
          </div>
        </section>

        <section className="client-case-body">
          <div className="container client-case-body-grid">
            <Reveal className="case-progress-panel">
              <div className="workspace-head">
                <p className="eyebrow">
                  <span className="eyebrow-dot" />
                  Case progress
                </p>
                <h2>Timeline and hearing updates</h2>
              </div>
              <CaseTimeline isLawyer={false} />
            </Reveal>

            <Reveal delay={120} className="case-chat-panel">
              <h2>Chat with {caseDetails.lawyer}</h2>
              <p className="chat-sub">
                Messages stay attached to the case for transparent coordination.
              </p>

              <div className="messages" aria-live="polite">
                {messages.map((msg, index) => (
                  <div className={`msg ${msg.sender}`} key={`${msg.sender}-${index}`}>
                    {msg.text}
                  </div>
                ))}
              </div>

              <div className="chat-input">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
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
      </main>
    </div>
  );
}
