import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "120px", color: "white", background: "black", minHeight: "100vh" }}>
      <h1>Select Your Role</h1>

      <button onClick={() => navigate("/client")}>
        I am a Client
      </button>

      <br /><br />

      <button onClick={() => navigate("/lawyer")}>
        I am a Lawyer
      </button>
    </div>
  );
}
