import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

function Navbar() {
  // State for toggling the hamburger menu on mobile view
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle hamburger menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
        {/* Smooth Scroll Link to Schedule */}
        <a className="nav-link" href="schedule">Schedule</a>
        <a className="nav-link" to="/signup">Sign Up / Login</a>

      </div>
    </nav>
  );
}

export default Navbar;
