import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "./firebase"
import "./App.css"
import apiService from './services/api'

function LandingPage() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      alert("Logged out successfully!")
      navigate("/")
    } catch (error) {
      alert("Logout failed: " + error.message)
    }
  }

  // Featured pets data
  const featuredPets = [
    { id: 1, name: "Max", breed: "Golden Retriever", age: "2 years" },
    { id: 2, name: "Luna", breed: "Siamese Cat", age: "1 year" },
    { id: 3, name: "Rocky", breed: "Labrador Mix", age: "3 years" }
  ]

  // Adoption process steps
  const adoptionSteps = [
    { id: 1, title: "Browse Pets", description: "Explore our loving animals waiting for homes" },
    { id: 2, title: "Meet & Greet", description: "Schedule a visit to meet your potential pet" },
    { id: 3, title: "Adoption Process", description: "Complete our simple adoption application" },
    { id: 4, title: "Bring Home", description: "Welcome your new family member home!" }
  ]

  return (
    <div className="App">
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Find Your Perfect Companion</h1>
            <p className="hero-subtitle">
              Connect with loving pets in need of forever homes through our ethical adoption marketplace.
            </p>
            <div className="hero-buttons">
              <Link to="/search" className="btn btn-primary">Start Adopting</Link>
              {!user ? (
                <Link to="/login" className="btn btn-secondary">Login</Link>
              ) : (
                <>
                  <Link to="/owner" className="btn btn-secondary">Dashboard</Link>
                  <button onClick={handleLogout} className="btn btn-outline">Logout</button>
                </>
              )}
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-container">

            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Us?</h2>
            <p>We're dedicated to making pet adoption a joyful and ethical experience</p>
          </div>
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">🐾</div>
              <h3>Ethical Adoption</h3>
              <p>We prioritize the well-being of pets and ensure responsible adoptions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Community Focused</h3>
              <p>Join a community of pet lovers dedicated to making a difference.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Supportive Network</h3>
              <p>Access resources, advice, and support from fellow pet owners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="featured-pets">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Friends</h2>
            <p>These adorable companions are waiting for their forever homes</p>
          </div>
          <div className="pets-grid">
            {featuredPets.map(pet => (
              <div className="pet-card" key={pet.id}>
                <div className="pet-avatar"></div>
                <h3>{pet.name}</h3>
                <p className="pet-breed">{pet.breed}</p>
                <p className="pet-age">{pet.age}</p>
                <button className="btn btn-outline">Meet {pet.name}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adoption Process */}
      <section className="process">
        <div className="container">
          <div className="section-header">
            <h2>Simple Adoption Process</h2>
            <p>Your journey to finding a new family member in four easy steps</p>
          </div>
          <div className="process-steps">
            {adoptionSteps.map(step => (
              <div className="step" key={step.id}>
                <div className="step-number">{step.id}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Get notified about new pets, adoption events, and pet care tips.</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="email-input"
              />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage