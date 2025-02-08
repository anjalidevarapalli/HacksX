import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">🎵 Calendar Playlist Generator</h1>
      <div className="nav-links">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/schedule">Schedule</Link>
      </div>
    </nav>
  );
}

export default Navbar;
