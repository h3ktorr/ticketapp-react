🎟️ TicketApp – React Frontend

A simple, clean, and responsive ticket management application built with React, React Router, and Zustand for state management.
TicketApp allows users to sign up, log in, create, edit, view, and delete support tickets, all stored locally using localStorage.

🚀 Features:

🔐 Authentication System — Signup and login with basic client-side validation.

🧾 Ticket CRUD — Create, view, update, and delete tickets

📊 Dashboard — View live ticket statistics (Open, In Progress, Closed)

🧭 Navigation & Sidebar — Responsive top navigation and collapsible sidebar

💾 LocalStorage Mock API — All user and ticket data stored locally

💬 React Toastify Integration — Smooth user feedback on login or errors

🎨 Responsive Design — Styled with vanilla CSS and media queries

## 🚀 Live Demo

[View Live Project](https://ticketapp-react.vercel.app/)

## 💻 Repository

[GitHub Repo](https://github.com/h3ktorr/ticketapp-react)

🧱 Tech Stack
Category Tools / Libraries
Framework - React (via Vite)
Routing - React Router v7
State Management - Zustand
UI Components - React Icons, Custom CSS
Notifications - React Toastify
Build Tool - Vite
Language - JavaScript (ES Modules)

📂 Folder Structure
src/
├── assets/
│ └── wave.svg
├── components/
│ ├── Footer.jsx
│ ├── Sidebar.jsx
│ └── SiteNav.jsx
├── context/
│ └── AppContext.jsx
├── pages/
│ ├── Landing.jsx
│ ├── Dashboard.jsx
│ ├── auth/
│ │ ├── Login.jsx
│ │ └── Signup.jsx
│ └── tickets/
│ ├── Tickets.jsx
│ └── TicketEdit.jsx
├── services/
│ └── api.js
├── store/
│ └── session.js
├── App.jsx
├── main.jsx
└── index.css

⚙️ Installation & Setup
1️⃣ Clone the Repository:

git clone https://github.com/yourusername/ticketapp.git

cd ticketapp

npm install

npm run dev

The app will start on http://localhost:5173

🧠 Core Logic Overview

🔸 Authentication

Stored in localStorage under key ticketapp_session

Managed globally using Zustand (store/session.js)

Handles:

Signup → api.signup()

Login → api.login()

Logout → useSession().clearSession()

🔸 Tickets Management

CRUD functions defined in services/api.js

All ticket data persisted in localStorage under ticketapp_tickets

Pages:

Tickets.jsx → List all tickets + Delete

TicketEdit.jsx → Create or edit tickets

Dashboard.jsx → Displays ticket stats

🔸 Protected Routes

Protected wrapper in App.jsx redirects unauthenticated users to /auth/login.

🔸 Toast Notifications

Integrated via react-toastify in Login.jsx for better UX feedback.

🧰 Dependencies
"dependencies": {
"react": "^19.1.1",
"react-dom": "^19.1.1",
"react-icons": "^5.5.0",
"react-router-dom": "^7.9.4",
"react-toastify": "^11.0.5",
"zustand": "^5.0.8"
}

🧑‍💻 How It Works

1. Users sign up or log in — their session is stored in localStorage.

2. Once authenticated, they can:

3. View dashboard stats

4. Manage tickets (create, edit, delete)

5. Tickets are managed via a mock API in services/api.js.

6. Zustand syncs the session state across all components.

🧪 Testing Notes

Each form input and button has data-testid attributes for integration testing.

You can write tests using Jest or Vitest (optional).
