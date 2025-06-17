import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./App.css"
import apiService from './services/api'

function LandingPage() {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('testing');
  const [stats, setStats] = useState({
    totalPets: 0,
    totalAdoptions: 0,
    activeUsers: 0
  });

  useEffect(() => {
    testApiConnection();
    loadFeaturedPets();
  }, []);

  const testApiConnection = async () => {
    try {
      await apiService.testConnection();
      setConnectionStatus('connected');
      console.log('🎉 Frontend successfully connected to Django backend!');
    } catch (error) {
      setConnectionStatus('failed');
      console.error('💥 Connection to backend failed:', error);
    }
  };

  const loadFeaturedPets = async () => {
    try {
      setLoading(true);
      const response = await apiService.getPets();
      const pets = response.results || response || [];
      setFeaturedPets(pets.slice(0, 6)); // Take first 6 pets
      setStats({
        totalPets: pets.length,
        totalAdoptions: 150, // You can calculate this from your backend later
        activeUsers: 500 // You can calculate this from your backend later
      });
    } catch (error) {
      console.error('Failed to load featured pets:', error);
      setFeaturedPets([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="nav-brand">
            <span className="logo">🐾 PetZone</span>
            {/* Connection status indicator */}
            <span style={{
              marginLeft: '10px',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              backgroundColor: connectionStatus === 'connected' ? '#22c55e' : 
                             connectionStatus === 'failed' ? '#ef4444' : '#f59e0b',
              color: 'white'
            }}>
              {connectionStatus === 'connected' ? '✅ API Connected' :
               connectionStatus === 'failed' ? '❌ API Failed' : '⏳ Connecting...'}
            </span>
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
            
            {/* Live Stats */}
            <div className="hero-stats">
              <div className="stat">
                <h3>{stats.totalPets}</h3>
                <p>Pets Available</p>
              </div>
              <div className="stat">
                <h3>{stats.totalAdoptions}</h3>
                <p>Successful Adoptions</p>
              </div>
              <div className="stat">
                <h3>{stats.activeUsers}</h3>
                <p>Active Users</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section id="pets" className="featured-pets">
        <div className="container">
          <h2>Featured Pets Looking for Homes</h2>
          <p>Meet some of our adorable pets waiting for their forever families</p>
          
          {loading ? (
            <div className="loading">
              <p>🔄 Loading amazing pets from Django backend...</p>
            </div>
          ) : featuredPets.length > 0 ? (
            <div className="pets-grid">
              {featuredPets.map(pet => (
                <div key={pet.id} className="pet-card">
                  <div className="pet-image">
                    {pet.image_url ? (
                      <img src={pet.image_url} alt={pet.name} />
                    ) : (
                      <div className="pet-placeholder">
                        <span className="pet-emoji">
                          {pet.pet_type === 'dog' ? '🐕' : 
                           pet.pet_type === 'cat' ? '🐱' : 
                           pet.pet_type === 'bird' ? '🐦' : '🐾'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="pet-info">
                    <h3>{pet.name}</h3>
                    <p className="pet-breed">{pet.breed} • {pet.age} months old</p>
                    <p className="pet-description">{pet.description?.slice(0, 100)}...</p>
                    <div className="pet-footer">
                      <span className="pet-location">By {pet.owner_name}</span>
                      <Link to={`/pet/${pet.id}`} className="btn btn-small">View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-pets">
              <h3>🎉 Backend Connected Successfully!</h3>
              <p>No pets available yet. Add some pets through the Django admin to see them here.</p>
              <a 
                href="http://127.0.0.1:8000/admin/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Go to Django Admin
              </a>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="process" className="how-it-works">
        <div className="container">
          <h2>How Pet Adoption Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-icon">🔍</div>
              <h3>Browse Pets</h3>
              <p>Search through our database of loving pets looking for homes</p>
            </div>
            <div className="step">
              <div className="step-icon">📝</div>
              <h3>Apply</h3>
              <p>Fill out an application form for the pet you'd like to adopt</p>
            </div>
            <div className="step">
              <div className="step-icon">🤝</div>
              <h3>Connect</h3>
              <p>Meet with the current owner and get to know your potential new friend</p>
            </div>
            <div className="step">
              <div className="step-icon">🏠</div>
              <h3>Adopt</h3>
              <p>Complete the adoption process and welcome your new family member</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
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
                <a href="https://facebook.com" aria-label="Facebook">📘</a>
                <a href="https://instagram.com" aria-label="Instagram">📷</a>
                <a href="https://twitter.com" aria-label="Twitter">🐦</a>
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