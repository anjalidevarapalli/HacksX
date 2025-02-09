import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";  // Import the hook
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  // Function to toggle hamburger menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <h1 className="logo">MyApp</h1>

      {/* Hamburger Icon */}
      <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Navbar Links */}
      <div className={`menu ${isOpen ? "active" : ""}`}>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/schedule">Schedule</Link>
        <Link className="nav-link" onClick={()=>loginWithRedirect()}>Sign Up/Log In</Link>

        {/* Conditionally render based on authentication */}
        {isAuthenticated ? (
          <>
            <span className="nav-link">Welcome, {user.name}</span>  {/* Show username */}
            <button
              className="nav-link"
              onClick={() => logout({ returnTo: window.location.origin })}  // Log out user and redirect to home
            >
              Log Out
            </button>
          </>
        ) : (
          <button className="nav-link" onClick={() => loginWithRedirect()}>Sign Up / Login</button>  /* Show Login if not authenticated */
        )}
      </div>
    </nav>
  );
}

export default Navbar;
