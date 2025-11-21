import { useAuth } from "../auth/AuthContext";
import { NavLink, useNavigate } from "react-router";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <NavLink to="/">Activities</NavLink>
        <NavLink to="/routines">Routines</NavLink>
        <NavLink to="/logout">Logout</NavLink>
        {!token && <NavLink to="/register">Register</NavLink>}
        {!token && <NavLink to="/login">Login</NavLink>}
        {token && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}
