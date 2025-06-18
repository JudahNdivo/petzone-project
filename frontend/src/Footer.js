import React from "react";
import{ Link } from "react-router-dom";
import "./App.css";

function Footer() {
    return(
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
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/search">Find Pets</a></li>
                <li><a href="/process">Adoption Process</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#faq">FAQ</a></li>
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
    )
}

export default Footer;