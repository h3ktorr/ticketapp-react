import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useSession } from "../../store/session";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    general: "",
  });

  const navigate = useNavigate();
  const { setSession } = useSession();

  async function submit(e) {
    e.preventDefault();
    setError({ name: "", email: "", password: "", general: "" });

    // Basic client-side validation
    let valid = true;

    if (!name.trim()) {
      setError((prev) => ({ ...prev, name: "Full name is required" }));
      valid = false;
    }

    if (!email.trim()) {
      setError((prev) => ({ ...prev, email: "Email is required" }));
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError((prev) => ({ ...prev, email: "Enter a valid email address" }));
      valid = false;
    }

    if (!password.trim()) {
      setError((prev) => ({ ...prev, password: "Password is required" }));
      valid = false;
    } else if (password.length < 6) {
      setError((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
      valid = false;
    }

    if (!valid) return;

    try {
      const s = await api.signup({ name, email, password });
      setSession(s);
      navigate("/dashboard");
    } catch (err) {
      setError((prev) => ({
        ...prev,
        general: err.message || "Signup failed. Try again.",
      }));
    }
  }

  return (
    <main className="container all-form">
      <h2>Sign up</h2>
      <form onSubmit={submit} noValidate>
        {/* Name field */}
        <div className="form-group">
          <input
            id="name"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={error.name ? "invalid" : ""}
          />
          {error.name && <p className="error">{error.name}</p>}
        </div>

        {/* Email field */}
        <div className="form-group">
          <input
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error.email ? "invalid" : ""}
          />
          {error.email && <p className="error">{error.email}</p>}
        </div>

        {/* Password field */}
        <div className="form-group">
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error.password ? "invalid" : ""}
          />
          {error.password && <p className="error">{error.password}</p>}
        </div>

        {/* General error (e.g. API failure) */}
        {error.general && (
          <p className="error" role="alert">
            {error.general}
          </p>
        )}

        <button className="btn" type="submit">
          Create account
        </button>
      </form>
    </main>
  );
}
