import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    in_progress: 0,
    closed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const tickets = await api.getTickets();
        if (!mounted) return;
        const total = tickets.length;
        const open = tickets.filter((t) => t.status === "open").length;
        const in_progress = tickets.filter(
          (t) => t.status === "in_progress"
        ).length;
        const closed = tickets.filter((t) => t.status === "closed").length;
        setStats({ total, open, in_progress, closed });
      } catch (err) {
        setError("Failed to load tickets. Please retry.");
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <main className="container">Loading...</main>;
  if (error)
    return (
      <main className="container">
        <p className="error">{error}</p>
      </main>
    );

  return (
    <main className="container dashboard">
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          Total
          <br />
          <strong data-testid="stat-total">{stats.total}</strong>
        </div>
        <div className="stat-card">
          Open
          <br />
          <strong data-testid="stat-open">{stats.open}</strong>
        </div>
        <div className="stat-card">
          In Progress
          <br />
          <strong data-testid="stat-inprogress">{stats.in_progress}</strong>
        </div>
        <div className="stat-card">
          Closed
          <br />
          <strong data-testid="stat-closed">{stats.closed}</strong>
        </div>
      </div>
    </main>
  );
}
