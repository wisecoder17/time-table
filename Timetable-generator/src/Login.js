import { useState } from "react";
import { useAuth } from "./Authenticate";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { login } = useAuth(); // already imported from context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        toast.error("❌ Invalid username or password");
        return;
      }

      const user = await res.json(); // user object from backend

      // save to context + localStorage
      login(user);
      navigate("/Dashboard");
      localStorage.setItem("username", user.username);
      localStorage.setItem("deptId", user.departmentId);

      toast.success("✅ Login successful!");
     
    } catch (err) {
      console.error("Login error:", err);
      toast.error("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">🔐 Timetable Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="👤 Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔑 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-text">{error}</p>}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
