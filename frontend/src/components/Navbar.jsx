import { NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../api/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <NavLink to="/listings" className="navbar-brand">
          <span className="navbar-logo">I</span>

          <span>
            <strong>Ivy Homes</strong>
            <small>Property Intelligence</small>
          </span>
        </NavLink>

        <div className="navbar-links">

          <NavLink
            to="/listings"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Listings
          </NavLink>

          <NavLink
            to="/rentals"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Rentals
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Projects
          </NavLink>

          <NavLink
            to="/saved"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Saved
          </NavLink>

          <NavLink
            to="/insights"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Insights
          </NavLink>

        </div>

        <div className="navbar-user">

          <span className="user-email">
            {user?.email || "User"}
          </span>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;