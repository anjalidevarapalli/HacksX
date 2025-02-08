import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";  // Import the hook
import './Navbar.css';

function Navbar() {
  // State for toggling the hamburger menu on mobile view
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle hamburger menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Get Auth0 states
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  return (
    <nav className="navbar">
      <h1 className="logo"></h1>

      {/* Hamburger Icon */}
      <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Navbar Links */}
      <div className={`menu ${isOpen ? "active" : ""}`}>
        <Link className="nav-link" to="/">Home</Link>
        <a className="nav-link" href="schedule">Schedule</a>

        {/* Conditionally render based on authentication */}
        {isAuthenticated ? (
          <span className="nav-link">Welcome, {user.name}</span>  /* Show username */
        ) : (
          <a className="nav-link" onClick={() => loginWithRedirect()}>Sign Up / Login</a>  /* Show Login if not authenticated */
        )}

        {/* Optional: Logout button */}
        {isAuthenticated && (
          <button className="nav-link" onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
