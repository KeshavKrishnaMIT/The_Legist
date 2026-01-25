import { useState } from "react";
import "./Cases.css";
import CaseTimeline from "../../components/CaseTimeline/CaseTimeline";

const mockCases = [
  {
    id: 1,
    title: "Property Dispute",
    description: "Ownership dispute related to ancestral land in Patna.",
    clientName: "Keshav Singh",
    phone: "9201413554",
    location: "Patna",
    document: "Property_Documents.pdf",
  },
  {
    id: 2,
    title: "Domestic Violence Case",
    description:
      "Urgent legal help required. FIR already registered.",
    clientName: "Anjali Verma",
    phone: "9876543211",
    location: "Delhi",
    document: "DV_Complaint.pdf",
  },
];

export default function LawyerCases() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;
    setMessages([...messages, { from: "lawyer", text }]);
    setText("");
  };

  return (
    <div className="lawyer-page">
      <h1>Case Requests</h1>

      <div className="lawyer-layout">
        {/* LEFT PANEL */}
        <div className="case-list">
          {mockCases.map((c) => (
            <div
              key={c.id}
              className={`case-card ${
                selectedCase?.id === c.id ? "active" : ""
              }`}
              onClick={() => {
                setSelectedCase(c);
                setAccepted(false);
                setMessages([]);
              }}
            >
              <h3>{c.title}</h3>
              <p>{c.location}</p>
              <span className="status">Request Sent</span>
            </div>
          ))}
        </div>

        {/* RIGHT PANEL */}
        <div className="case-details">
          {!selectedCase && (
            <div className="empty">
              Select a case to view details
            </div>
          )}

          {selectedCase && (
            <>
              <h2>{selectedCase.title}</h2>
              <p className="desc">{selectedCase.description}</p>

              <div className="client-info">
                <p><b>Client:</b> {selectedCase.clientName}</p>
                <p><b>Phone:</b> {selectedCase.phone}</p>
                <p><b>Location:</b> {selectedCase.location}</p>
                <p>
                  <b>Document:</b>{" "}
                  <span className="doc">{selectedCase.document}</span>
                </p>
              </div>

              {!accepted && (
                <button
                  className="accept-btn"
                  onClick={() => setAccepted(true)}
                >
                  Accept Case
                </button>
              )}

              {accepted && (
                <>
                  {/* TIMELINE */}
                  <CaseTimeline isLawyer={true} />

                  {/* CHAT */}
                  <div className="chat-box">
                    <h3>Client Chat</h3>

                    <div className="messages">
                      {messages.length === 0 && (
                        <p className="hint">
                          Start conversation with the client
                        </p>
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
                        placeholder="Type a message..."
                      />
                      <button onClick={sendMessage}>Send</button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
