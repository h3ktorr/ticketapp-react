import { Link } from "react-router-dom";
import waveUrl from "../assets/wave.svg";

export default function Landing() {
  return (
    <main className="container hero">
      <section className="hero-left">
        <h1>TicketApp</h1>
        <p className="lead">
          Manage support tickets smoothly across teams — built with love.
        </p>
        <div className="cta">
          <Link to="/auth/signup" className="btn primary">
            Get Started
          </Link>
          <Link to="/auth/login" className="btn primary">
            Login
          </Link>
        </div>
      </section>
      <aside className="hero-right">
        <div className="decor-circle circle1" aria-hidden></div>
        <div className="decor-circle circle2" aria-hidden></div>
      </aside>
      <img src={waveUrl} alt="" className="hero-wave" />
    </main>
  );
}
