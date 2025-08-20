import "./Navbar.css";
import api from "../api/apiHandler";
import "../index.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  async function logout() {
    try {
      const { data } = await api.post("/user/logout");
      if (!data.success) throw new Error("Logout failed");
      navigate("/login");
      //console.log("Logout successful:", data);
    } catch (err) {
      //console.error("Logout error:", err);
      alert("Error in logging out !!");
    }
  }
  return (
    <div className="nav-outer">
      <div className="navbar">
        <h1>Keep Lite </h1>{" "}
        <span
          className="material-symbols-outlined"
          style={{
            marginLeft: "0.25em",
            fontSize: "2.75rem",
            position: "relative",
            top: "0.4rem",
          }}
        >
          edit_note
        </span>
      </div>
      <button className="btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
