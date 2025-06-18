import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Header() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="nav-brand">
          <Link to="/" className="logo">PetZone</Link>
        </div>
        
        <button 
          className={`menu-toggle ${menuActive ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`nav ${menuActive ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuActive(false)}>Home</Link>
          <Link to="/about" className="nav-link" onClick={() => setMenuActive(false)}>About</Link>
          <Link to="/search" className="nav-link" onClick={() => setMenuActive(false)}>Find Pets</Link>
          <Link to="/process" className="nav-link" onClick={() => setMenuActive(false)}>Adoption Process</Link>
          <Link to="/contact" className="nav-link" onClick={() => setMenuActive(false)}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;