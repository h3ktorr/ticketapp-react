import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function TicketEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "open",
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const list = await api.getTickets();
        const t = list.find((x) => x.id === id);
        if (!t) throw new Error("Not found");
        setTicket(t);
        setForm({
          title: t.title,
          description: t.description || "",
          status: t.status,
        });
      } catch (err) {
        setError("Ticket not found");
      } finally {
        setLoading(false);
      }
    }
    if (id === "new") {
      setTicket(null);
      setForm({ title: "", description: "", status: "open" });
      setLoading(false);
    } else load();
  }, [id]);

  async function submit(e) {
    e.preventDefault();
    setError("");
    // validation
    if (!form.title || form.title.length < 3)
      return setError("Title is required (min 3 chars)");
    if (form.description && form.description.length < 6)
      return setError("Description must be at least 6 characters");
    if (!["open", "in_progress", "closed"].includes(form.status))
      return setError("Invalid status");

    try {
      if (id === "new") {
        await api.createTicket(form);
      } else {
        await api.updateTicket(id, form);
      }
      navigate("/tickets");
    } catch (err) {
      setError("Save failed. Try again.");
    }
  }

  if (loading) return <main className="container">Loading...</main>;

  return (
    <main className="container all-form">
      <h2>{id === "new" ? "Create Ticket" : "Edit Ticket"}</h2>
      <form onSubmit={submit}>
        <input
          id="title"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          data-testid="test-ticket-title"
        />
        {error && <p className="error">{error}</p>}

        <textarea
          id="description"
          placeholder="Description"
          className="description"
          rows="5"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          data-testid="test-ticket-description"
        />

        <label htmlFor="status">Status</label>
        <select
          id="status"
          className="ticket-status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          data-testid="test-ticket-status"
        >
          <option value="open">open</option>
          <option value="in_progress">in_progress</option>
          <option value="closed">closed</option>
        </select>

        <button className="btn" type="submit" data-testid="test-ticket-submit">
          Save
        </button>
      </form>
    </main>
  );
}
