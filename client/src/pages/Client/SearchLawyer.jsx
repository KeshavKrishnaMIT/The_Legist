import { useState } from "react";
import "./SearchLawyer.css";

export default function SearchLawyer() {
  const [caseType, setCaseType] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!caseType || !name || !phone || !location) {
      alert("Please fill all fields");
      return;
    }
    setSearched(true);
  };

  return (
    <div className="search-page">
      <h1>Find a Lawyer</h1>

      <div className="search-form">
        <label>Case Type</label>
        <select value={caseType} onChange={(e) => setCaseType(e.target.value)}>
          <option value="">Select case type</option>
          <option>Criminal</option>
          <option>Civil</option>
          <option>Family</option>
          <option>Corporate</option>
          <option>Property</option>
          <option>Cyber Crime</option>
          <option>Consumer</option>
          <option>Labour</option>
          <option>Tax</option>
          <option>Intellectual Property</option>
        </select>

        <label>Your Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Phone Number</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>Location</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} />

        <button onClick={handleSearch}>Search Lawyers</button>
      </div>

      {searched && <LawyerResults />}
    </div>
  );
}

function LawyerResults() {
  const lawyers = [
    {
      id: 1,
      name: "Adv. Ramesh Sharma",
      spec: "Criminal Law",
      fee: "₹5,000 / hearing",
      loc: "Delhi",
      phone: "9876543210",
    },
    {
      id: 2,
      name: "Adv. Neha Verma",
      spec: "Family Law",
      fee: "₹3,000 / consultation",
      loc: "Mumbai",
      phone: "9123456780",
    },
  ];

  return (
    <div className="results">
      <h2>Top Lawyers</h2>

      {lawyers.map((l) => (
        <div key={l.id} className="lawyer-card">
          <h3>{l.name}</h3>
          <p><b>Specialization:</b> {l.spec}</p>
          <p><b>Fees:</b> {l.fee}</p>
          <p><b>Location:</b> {l.loc}</p>
          <p><b>Contact:</b> {l.phone}</p>

          <button onClick={() => alert("Lawyer contacted successfully")}>
            Contact Lawyer
          </button>
        </div>
      ))}
    </div>
  );
}
