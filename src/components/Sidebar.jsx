import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { IoCloseSharp } from "react-icons/io5";
import { useSession } from "../store/session";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(AppContext);
  const { session, clearSession } = useSession();
  const navigate = useNavigate();

  function handleLogout() {
    clearSession();
    navigate("/");
  }

  const sidebarRef = useRef(null);

  const handleSidebarClose = (e) => {
    if (e.target === sidebarRef.current) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  return (
    <div
      ref={sidebarRef}
      onClick={handleSidebarClose}
      className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}
    >
      <div className="sidebar-body">
        <IoCloseSharp className="close-sidebar" onClick={toggleSidebar} />
        <div className="nav-icons">
          <a href="/">Home</a>
          {session && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/tickets">Tickets</Link>
            </>
          )}
          {session ? (
            <p onClick={handleLogout}>Logout</p>
          ) : (
            <Link to="/auth/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
