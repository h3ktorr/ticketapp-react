import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/tickets/Tickets";
import TicketEdit from "./pages/tickets/TicketEdit";
import { useSession } from "./store/session";
import SiteNav from "./components/siteNav";
import Footer from "./components/Footer";
import { AppContextProvider } from "./context/AppContext";
import Sidebar from "./components/Sidebar";

function Protected({ children }) {
  const { session } = useSession();
  if (!session) return <Navigate to="/auth/login" replace />;
  return children;
}

export default function App() {
  return (
    <AppContextProvider>
      <div className="app-root">
        <SiteNav />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/tickets"
            element={
              <Protected>
                <Tickets />
              </Protected>
            }
          />
          <Route
            path="/tickets/:id"
            element={
              <Protected>
                <TicketEdit />
              </Protected>
            }
          />
        </Routes>
        <Footer />
      </div>
    </AppContextProvider>
  );
}
