import { useState } from "react";
import "./NewCase.css";
import lawyers from "../../mock/lawyers";
import CaseTimeline from "../../components/CaseTimeline/CaseTimeline";

export default function NewCase() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    caseType: "",
    description: "",
  });

  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const findLawyers = () => {
    const result = lawyers.filter(
      (l) =>
        l.specialization === form.caseType &&
        l.location.toLowerCase() === form.location.toLowerCase()
    );
    setFilteredLawyers(result);
  };

  const sendMessage = () => {
    if (!text.trim()) return;
    setMessages([...messages, { from: "client", text }]);
    setText("");
  };

  return (
    <div className="new-case-page">
      <h1>Submit Your Case</h1>

      {/* CLIENT FORM */}
      <div className="case-form">
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="location"
          placeholder="Location (Patna / Delhi)"
          value={form.location}
          onChange={handleChange}
        />

        <select name="caseType" value={form.caseType} onChange={handleChange}>
          <option value="">Select Case Type</option>
          <option>Criminal & Legal Actions</option>
          <option>Family</option>
          <option>Corporate</option>
          <option>Labour</option>
          <option>Civil</option>
          <option>Environmental</option>
          <option>Business & Contacts</option>
          <option>Consumer & Digital</option>
        </select>

        <textarea
          name="description"
          placeholder="Describe your issue"
          value={form.description}
          onChange={handleChange}
        />

        <button onClick={findLawyers}>Find Lawyers</button>
      </div>

      {/* LAWYER SUGGESTIONS */}
      {filteredLawyers.length > 0 && (
        <div className="results">
          <h2>Recommended Lawyers</h2>

          {filteredLawyers.map((l) => (
            <div key={l.id} className="lawyer-card">
              <img src={l.image} alt={l.name} />
              <h3>{l.name}</h3>
              <p>{l.specialization}</p>
              <p>{l.location}</p>
              <button onClick={() => setSelectedLawyer(l)}>
                Contact Lawyer
              </button>
            </div>
          ))}
        </div>
      )}

      {/* AFTER LAWYER SELECTED */}
      {selectedLawyer && (
        <div className="after-contact">
          <h2>Case Progress</h2>
          <CaseTimeline isLawyer={false} />

          {/* CHAT */}
          <div className="chat-box">
            <h3>Chat with {selectedLawyer.name}</h3>

            <div className="messages">
              {messages.map((m, i) => (
                <div key={i} className="msg client">
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
        </div>
      )}
    </div>
  );
}
