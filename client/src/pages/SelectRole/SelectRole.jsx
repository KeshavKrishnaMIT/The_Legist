import { useNavigate } from "react-router-dom";
import "./SelectRole.css";

export default function SelectRole() {
  const navigate = useNavigate();

  return (
    <div className="role-page">
      <h1>Choose your role</h1>

      <div className="role-buttons">
        <button onClick={() => navigate("/client/new-case")}>
          I am a Client
        </button>

        <button onClick={() => navigate("/lawyer/cases")}>
          I am a Lawyer
        </button>
      </div>
    </div>
  );
}
