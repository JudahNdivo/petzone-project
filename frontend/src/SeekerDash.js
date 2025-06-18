import React, { useState } from "react";
import "./Dash.css";

// SVG icons as React components
const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const OutlineHeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const TimesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);

function SeekerDash() {
  // Mock data for saved pets
  const [savedPets, setSavedPets] = useState([
    {
      id: 1,
      name: "Buddy",
      breed: "Golden Retriever",
      age: "2 years",
      type: "Dog",
      lastSeen: "2 days ago"
    },
    {
      id: 2,
      name: "Whiskers",
      breed: "Siamese Cat",
      age: "1 year",
      type: "Cat",
      lastSeen: "1 week ago"
    }
  ]);

  // Mock data for applications
  const [applications, setApplications] = useState([
    {
      id: 1,
      petName: "Max",
      petType: "Labrador",
      date: "2023-06-15",
      status: "pending",
      statusText: "Under Review"
    },
    {
      id: 2,
      petName: "Luna",
      petType: "Persian Cat",
      date: "2023-06-10",
      status: "approved",
      statusText: "Approved! Schedule a visit"
    },
    {
      id: 3,
      petName: "Rocky",
      petType: "Terrier Mix",
      date: "2023-06-05",
      status: "rejected",
      statusText: "Not Selected"
    }
  ]);

  // Mock data for recommendations
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      name: "Daisy",
      breed: "Beagle",
      age: "3 years",
      type: "Dog",
      distance: "2 miles away"
    },
    {
      id: 2,
      name: "Oreo",
      breed: "Domestic Shorthair",
      age: "6 months",
      type: "Cat",
      distance: "5 miles away"
    }
  ]);

  const removeSavedPet = (id) => {
    setSavedPets(savedPets.filter(pet => pet.id !== id));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome, Pet Seeker!</h2>
        <p className="subtitle">Your journey to finding the perfect companion starts here</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon saved">
            <HeartIcon />
          </div>
          <div className="stat-content">
            <h3>{savedPets.length}</h3>
            <p>Saved Pets</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">
            <ClockIcon />
          </div>
          <div className="stat-content">
            <h3>{applications.filter(app => app.status === "pending").length}</h3>
            <p>Pending Applications</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon approved">
            <CheckIcon />
          </div>
          <div className="stat-content">
            <h3>{applications.filter(app => app.status === "approved").length}</h3>
            <p>Approved Applications</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h3>Recommended for You</h3>
          <a href="/search" className="btn btn-outline">View All</a>
        </div>
        
        {recommendations.length === 0 ? (
          <div className="empty-state">
            <p>No recommendations yet. Complete your profile to get personalized matches.</p>
            <button className="btn btn-outline">Complete Profile</button>
          </div>
        ) : (
          <div className="pets-grid">
            {recommendations.map(pet => (
              <div key={pet.id} className="pet-card">
                <div className="pet-image">
                  <div className="image-placeholder">
                    <span>Pet Image</span>
                  </div>
                  <div className="pet-distance">
                    <span>{pet.distance}</span>
                  </div>
                </div>
                <div className="pet-info">
                  <div className="pet-header">
                    <h4>{pet.name}</h4>
                    <button className="save-btn">
                      <OutlineHeartIcon />
                    </button>
                  </div>
                  <p className="pet-breed">{pet.breed}</p>
                  <p className="pet-meta">
                    <span>Age: {pet.age}</span>
                    <span>Type: {pet.type}</span>
                  </p>
                  <button className="btn btn-primary">Apply to Adopt</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-columns">
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Saved Pets</h3>
            <button className="btn btn-outline">Search Pets</button>
          </div>
          
          {savedPets.length === 0 ? (
            <div className="empty-state">
              <p>You haven't saved any pets yet.</p>
              <button className="btn btn-outline">Browse Pets</button>
            </div>
          ) : (
            <div className="pets-list">
              {savedPets.map(pet => (
                <div key={pet.id} className="saved-pet-item">
                  <div className="pet-image small">
                    <div className="image-placeholder">
                      <span>Pet Image</span>
                    </div>
                  </div>
                  <div className="pet-details">
                    <h4>{pet.name}</h4>
                    <p className="pet-breed">{pet.breed}</p>
                    <p className="pet-meta">
                      <span>Age: {pet.age}</span>
                      <span>Type: {pet.type}</span>
                    </p>
                    <p className="last-seen">Last viewed: {pet.lastSeen}</p>
                  </div>
                  <div className="pet-actions">
                    <button 
                      className="btn btn-outline danger"
                      onClick={() => removeSavedPet(pet.id)}
                    >
                      Remove
                    </button>
                    <button className="btn btn-primary">Apply Now</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h3>Application Status</h3>
            <button className="btn btn-outline">View History</button>
          </div>
          
          {applications.length === 0 ? (
            <div className="empty-state">
              <p>No active applications.</p>
              <button className="btn btn-outline">Find Pets to Adopt</button>
            </div>
          ) : (
            <div className="applications-list">
              {applications.map(app => (
                <div key={app.id} className={`application-item ${app.status}`}>
                  <div className="app-status-icon">
                    {app.status === "pending" && <ClockIcon />}
                    {app.status === "approved" && <CheckIcon />}
                    {app.status === "rejected" && <TimesIcon />}
                  </div>
                  <div className="app-details">
                    <h4>{app.petName} <span className="pet-type">({app.petType})</span></h4>
                    <p className="app-date">Applied on: {app.date}</p>
                    <p className="app-status">{app.statusText}</p>
                  </div>
                  <div className="app-actions">
                    <button className="btn btn-outline">
                      <InfoIcon /> Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SeekerDash;