// Simple localStorage-backed mock API for tickets and auth

const USERS_KEY = "ticketapp_users";
const TICKETS_KEY = "ticketapp_tickets";

function readUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}
function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readTickets() {
  return JSON.parse(localStorage.getItem(TICKETS_KEY) || "[]");
}
function writeTickets(list) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(list));
}

export const api = {
  async signup({ name, email, password }) {
    await new Promise((r) => setTimeout(r, 300));

    const users = readUsers();

    if (users.find((u) => u.email === email)) {
      const err = new Error("Email already registered");
      err.code = 409;
      throw err;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    users.push(newUser);
    writeUsers(users);

    const session = {
      token: `mock-token-${newUser.id}`,
      user: { id: newUser.id, name, email },
      expiresAt: Date.now() + 24 * 3600 * 1000,
    };

    localStorage.setItem("ticketapp_session", JSON.stringify(session));
    return session;
  },

  async login({ email, password }) {
    await new Promise((r) => setTimeout(r, 300));

    const users = readUsers();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      const err = new Error("Invalid credentials");
      err.code = 401;
      throw err;
    }

    const session = {
      token: `mock-token-${foundUser.id}`,
      user: { id: foundUser.id, name: foundUser.name, email },
      expiresAt: Date.now() + 24 * 3600 * 1000,
    };

    localStorage.setItem("ticketapp_session", JSON.stringify(session));
    return session;
  },

  async getTickets() {
    await new Promise((r) => setTimeout(r, 200));
    return readTickets();
  },

  async createTicket(payload) {
    await new Promise((r) => setTimeout(r, 200));
    const list = readTickets();
    const newTicket = {
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...payload,
    };
    list.unshift(newTicket);
    writeTickets(list);
    return newTicket;
  },

  async updateTicket(id, payload) {
    await new Promise((r) => setTimeout(r, 200));
    const list = readTickets();
    const idx = list.findIndex((t) => t.id === id);
    if (idx === -1) {
      const err = new Error("Not found");
      err.code = 404;
      throw err;
    }
    list[idx] = { ...list[idx], ...payload, updatedAt: Date.now() };
    writeTickets(list);
    return list[idx];
  },

  async deleteTicket(id) {
    await new Promise((r) => setTimeout(r, 200));
    let list = readTickets();
    list = list.filter((t) => t.id !== id);
    writeTickets(list);
    return true;
  },
};
