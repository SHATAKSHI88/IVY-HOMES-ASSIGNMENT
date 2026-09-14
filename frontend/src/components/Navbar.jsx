import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getNavClass = ({ isActive }) =>
    isActive ? "navbar-link active" : "navbar-link";

  return (
    <header className="site-navbar">
      <div className="navbar-inner">

        <NavLink to="/listings" className="navbar-brand">
          <span className="navbar-brand-mark">I</span>

          <span className="navbar-brand-text">
            <strong>IVY</strong>
            <span>HOMES</span>
          </span>
        </NavLink>

        <nav className="navbar-navigation">
          <NavLink to="/listings" className={getNavClass}>
            Explore
          </NavLink>

          <NavLink to="/rentals" className={getNavClass}>
            Rentals
          </NavLink>

          <NavLink to="/projects" className={getNavClass}>
            Projects
          </NavLink>

          <NavLink to="/saved" className={getNavClass}>
            Saved
          </NavLink>

          <NavLink to="/insights" className={getNavClass}>
            Insights
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <NavLink to="/saved" className="navbar-shortlist">
            <span className="navbar-heart">♡</span>
            <span>Shortlist</span>
          </NavLink>

          <button
            type="button"
            className="navbar-logout"
            onClick={handleLogout}
          >
            Logout
            <span className="navbar-logout-arrow">↗</span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;