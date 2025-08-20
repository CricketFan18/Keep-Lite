import { useNavigate } from "react-router-dom";
import "./Home.css";
import api from "../api/apiHandler";
import "../index.css";

const Register = () => {
  const navigate = useNavigate();

  async function register(formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const res = await api.post("/user/register", { name, email, password });
      //console.log(res);
    } catch (err) {
      //console.log(err);
      alert("registration failed");
    } finally {
      navigate("/login");
    }
  }

  return (
    <div className="outer-register">
      <div className="form-container register">
        <form className="form" action={register}>
          <label htmlFor="name">Name :</label>
          <input type="text" name="name" placeholder="John Doe" />
          <label htmlFor="email">Email :</label>
          <input type="email" name="email" placeholder="example@gmail.com" />
          <label htmlFor="password">Password :</label>
          <input type="password" name="password" />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
