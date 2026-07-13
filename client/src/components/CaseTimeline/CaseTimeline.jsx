import { useState } from "react";
import "./CaseTimeline.css";

const STAGE_OPTIONS = [
  "Evidence Submission",
  "Arguments",
  "Judgement Reserved",
  "Case Closed",
];

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

    setStages((current) => [
      ...current,
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
      <div className="timeline-head">
        <p className="eyebrow">
          <span className="eyebrow-dot" />
          Docket trail
        </p>
        <h3>Case Progress Tracker</h3>
      </div>

      <div className="timeline">
        {stages.map((s, i) => (
          <div key={s.id} className="timeline-item">
            <span className="timeline-rail">
              <span className={`dot ${s.status}`} />
              {i < stages.length - 1 && <span className="timeline-connector" />}
            </span>
            <div className="timeline-content">
              <div className="timeline-content-head">
                <h4>{s.title}</h4>
                <span className={`status-chip ${s.status}`}>
                  {s.status === "done" ? "Completed" : "Upcoming"}
                </span>
              </div>
              <span className="date">{s.date}</span>
              {s.note && <p>{s.note}</p>}
            </div>
          </div>
        ))}
      </div>

      {isLawyer && (
        <div className="add-stage">
          <h4>Add Legal Milestone</h4>

          <div className="add-stage-grid">
            <select value={stage} onChange={(e) => setStage(e.target.value)}>
              <option value="">Select stage</option>
              {STAGE_OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <textarea
            placeholder="Notes (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button className="btn btn-outline add-stage-btn" onClick={addStage}>
            Add Stage
          </button>
        </div>
      )}
    </div>
  );
}