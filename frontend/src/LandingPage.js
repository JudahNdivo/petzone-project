import React from "react"
import { Link } from "react-router-dom"
import "./App.css"

function LandingPage() {
  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="nav-brand">
            <span className="logo">PetZone</span>
          </div>
          <nav className="nav">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#pets" className="nav-link">Find Pets</a>
            <a href="#process" className="nav-link">Adoption Process</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Find Your Perfect Companion</h1>
            <p className="hero-subtitle">
              Connect with loving pets in need of forever homes through our ethical adoption marketplace.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary">Start Adopting</Link>
              <Link to="/login" className="btn btn-secondary">Login</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/placeholder.svg?height=400&width=500" alt="Happy family with adopted pets" />
          </div>
        </div>
      </section>

      {/* Newsletter Signup (optional functionality) */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Get notified about new pets, adoption events, and pet care tips.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>🐾 PetZone</h3>
              <p>Connecting loving pets with caring families through ethical adoption practices.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#pets">Find Pets</a></li>
                <li><a href="#process">Adoption Process</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#resources">Pet Care Resources</a></li>
                <li><a href="#volunteer">Volunteer</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="social-links">
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="Twitter">🐦</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 PetZone. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
