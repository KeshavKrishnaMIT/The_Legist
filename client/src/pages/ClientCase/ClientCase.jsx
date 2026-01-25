import { useState } from "react";
import CaseTimeline from "../../components/CaseTimeline/CaseTimeline";

export default function ClientCase() {
  const [messages, setMessages] = useState([
    { sender: "lawyer", text: "Hello, I’ve reviewed your documents." },
    { sender: "client", text: "Thanks, what are the next steps?" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "client", text: input }]);
    setInput("");
  };

  return (
    <div
      style={{
        padding: "100px",
        color: "white",
        background: "black",
        minHeight: "100vh",
      }}
    >
      <h1>My Case</h1>

      {/* CASE SUMMARY */}
      <div
        style={{
          marginTop: "30px",
          padding: "24px",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "12px",
          maxWidth: "800px",
        }}
      >
        <h2>Property Dispute</h2>

        <p style={{ opacity: 0.9 }}>
          Ownership dispute related to ancestral land in Patna.
        </p>

        <div style={{ marginTop: "16px", lineHeight: "1.8" }}>
          <p><b>Lawyer:</b> Adv. Rohan Malhotra</p>
          <p><b>Graduation:</b> NLSIU Bangalore</p>
          <p><b>Consultation Fee:</b> ₹1,500</p>
          <p><b>Status:</b> In Progress</p>
          <p><b>Location:</b> Patna</p>
          <p>
            <b>Submitted Document:</b>{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer" }}>
              Property_Documents.pdf
            </span>
          </p>
        </div>
      </div>

      {/* CASE PROGRESS */}
      <div style={{ marginTop: "50px", maxWidth: "900px" }}>
        <h2>Case Progress</h2>
        <p style={{ opacity: 0.7, marginBottom: "20px" }}>
          Track legal milestones and hearing updates shared by your lawyer.
        </p>

        <CaseTimeline isLawyer={false} />
      </div>

      {/* CHAT SECTION */}
      <div style={{ marginTop: "50px", maxWidth: "900px" }}>
        <h2>Chat with Adv. Rohan Malhotra</h2>

        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "10px",
            minHeight: "150px",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                marginBottom: "10px",
                textAlign: msg.sender === "client" ? "right" : "left",
                opacity: 0.9,
              }}
            >
              <span>
                <b>{msg.sender === "client" ? "You" : "Lawyer"}:</b>{" "}
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", marginTop: "15px", gap: "10px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "none",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
