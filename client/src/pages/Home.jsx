import { useNavigate } from "react-router-dom";
import "./Home.css";
import api from "../api/apiHandler";
import "../index.css"

const LandingPage = () => {
  const navigate = useNavigate();

  async function login(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const res = await api.post("/user/login", { email, password });
      //console.log(res);
      navigate("/");
    } catch (err) {
      //console.log(err);
      alert("login failed");
    }
  }

  return (
    <div className="box-outer">
      <div className="box-inner">
        <div className="info">
          <h1>Welcome to Keep-Lite</h1>
          <p>
            A lightweight and efficient note-taking app that offers database
            storage, customizable color notes, and a simple yet effective
            interface. Keep-Lite is designed for users who need a minimal, fast,
            and distraction-free note-taking experience.
          </p>
        </div>
        <div className="form-container">
          <form className="form" action={login} >
            <label htmlFor="email">Email :</label>
            <input type="email" name="email" placeholder="example@gmail.com" />
            <label htmlFor="password">Password :</label>
            <input type="password" name="password" />
            <button className="btn">Login</button>
          </form>
          <button className="btn" onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
