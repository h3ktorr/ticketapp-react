import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../store/session";
import { FaBars } from "react-icons/fa6";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function SiteNav() {
  const { session, clearSession } = useSession();
  const navigate = useNavigate();

  function handleLogout() {
    clearSession();
    navigate("/");
  }

  const { toggleSidebar } = useContext(AppContext);

  return (
    <nav className="site-nav">
      <div className="nav-left">
        <Link to="/" className="brand">
          TicketApp
        </Link>
      </div>
      <div className="nav-right">
        <div className="big-screen">
          <Link to="/">Home</Link>
          {session ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/tickets">Tickets</Link>
              <button className="btn-link" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth/login">Login</Link>
          )}
        </div>
        <div className="small-screen">
          <FaBars onClick={toggleSidebar} />
        </div>
      </div>
    </nav>
  );
}
