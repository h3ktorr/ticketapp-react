import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useSession } from "../../store/session";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "", general: "" });
  const navigate = useNavigate();
  const { setSession } = useSession();

  async function submit(e) {
    e.preventDefault();
    setError({ email: "", password: "", general: "" });

    // Basic client-side validation
    let valid = true;
    if (!email) {
      setError((prev) => ({ ...prev, email: "Email is required" }));
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError((prev) => ({ ...prev, email: "Enter a valid email address" }));
      valid = false;
    }

    if (!password) {
      setError((prev) => ({ ...prev, password: "Password is required" }));
      valid = false;
    }

    if (!valid) return;

    try {
      const s = await api.login({ email, password });
      setSession(s);
      navigate("/dashboard");
    } catch (err) {
      const msg = err.message || "Invalid credentials, please try again";
      setError((prev) => ({ ...prev, general: msg }));
      toast.error(msg); // ✅ show toast here, not in JSX
    }
  }

  return (
    <main className="container all-form">
      <h2>Login</h2>
      <form onSubmit={submit} noValidate>
        <div className="form-group">
          <input
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="test-auth-email"
            className={error.email ? "invalid" : ""}
          />
          {error.email && (
            <p className="error" data-testid="test-auth-email-error">
              {error.email}
            </p>
          )}
        </div>

        <div className="form-group">
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="test-auth-password"
            className={error.password ? "invalid" : ""}
          />
          {error.password && (
            <p className="error" data-testid="test-auth-password-error">
              {error.password}
            </p>
          )}
        </div>

        <button className="btn" type="submit" data-testid="test-auth-submit">
          Login
        </button>
      </form>
    </main>
  );
}
