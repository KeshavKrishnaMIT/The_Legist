import { useState } from "react";
import "./CaseTimeline.css";

export default function CaseTimeline({ isLawyer }) {
  const [stages, setStages] = useState([
    {
      id: 1,
      title: "Case Filed",
      date: "2026-01-26",
      note: "Lawyer accepted the case.",
      status: "done",
    },
    {
      id: 2,
      title: "Next Hearing",
      date: "2026-02-12",
      note: "Initial hearing scheduled.",
      status: "upcoming",
    },
  ]);

  const [stage, setStage] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const addStage = () => {
    if (!stage || !date) return;

    setStages([
      ...stages,
      {
        id: Date.now(),
        title: stage,
        date,
        note,
        status: "upcoming",
      },
    ]);

    setStage("");
    setDate("");
    setNote("");
  };

  return (
    <div className="timeline-box">
      <h3>Case Progress Tracker</h3>

      <div className="timeline">
        {stages.map((s) => (
          <div key={s.id} className="timeline-item">
            <span className={`dot ${s.status}`} />
            <div>
              <h4>{s.title}</h4>
              <span className="date">{s.date}</span>
              <p>{s.note}</p>
            </div>
          </div>
        ))}
      </div>

      {isLawyer && (
        <div className="add-stage">
          <h4>Add Legal Milestone</h4>

          <select value={stage} onChange={(e) => setStage(e.target.value)}>
            <option value="">Select stage</option>
            <option>Evidence Submission</option>
            <option>Arguments</option>
            <option>Judgement Reserved</option>
            <option>Case Closed</option>
          </select>

          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <textarea
            placeholder="Notes (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button onClick={addStage}>Add Stage</button>
        </div>
      )}
    </div>
  );
}

