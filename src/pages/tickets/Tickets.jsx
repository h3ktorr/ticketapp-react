import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const list = await api.getTickets();
      setTickets(list);
    } catch (err) {
      setError("Failed to load tickets. Please retry.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this ticket?")) return;
    try {
      await api.deleteTicket(id);
      setTickets((s) => s.filter((t) => t.id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  }

  return (
    <main className="tickets-container">
      <div className="tickets-header">
        <h2>Tickets</h2>
        <button className="btn">
          <Link to="/tickets/new" className="btn">
            New Ticket
          </Link>
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="ticket-list">
        {tickets.map((t) => (
          <li key={t.id} className="ticket-card" data-testid={`ticket-${t.id}`}>
            <div className="single-ticket-header">
              <h3>{t.title}</h3>
              <div className={`status ${t.status}`}>{t.status}</div>
            </div>
            <p>{t.description}</p>
            <div className="ticket-meta">
              <div className="ticket-actions">
                <button className="btn">
                  <Link to={`/tickets/${t.id}`}>Edit</Link>
                </button>
                <button className="btn" onClick={() => handleDelete(t.id)}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
