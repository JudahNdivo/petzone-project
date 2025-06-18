import React, { useState, useRef } from "react";
import "./Dash.css";

function OwnerDash() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [pets, setPets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    type: "Dog",
    description: "",
    imageFile: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.match('image.*')) {
        alert("Please select an image file (jpg, png, gif)");
        return;
      }
      
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be less than 2MB");
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, imageFile: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPet = () => {
    if (!formData.name || !formData.breed) {
      alert("Please fill in all required fields");
      return;
    }
    
    const newPet = {
      id: Date.now().toString(),
      ...formData,
      owner: "Current User",
      status: "Available",
      addedDate: new Date().toISOString().split('T')[0],
      imageUrl: imagePreview // Using the preview as image URL
    };
    
    setPets([...pets, newPet]);
    setShowAddForm(false);
    
    // Reset form
    setFormData({
      name: "",
      breed: "",
      age: "",
      type: "Dog",
      description: "",
      imageFile: null
    });
    
    setImagePreview(null);
    
    alert("Pet added successfully!");
  };

  return (
    <div className="dashboard">
      <h2>Welcome, Pet Owner!</h2>
      
      <div className="dashboard-section">
        <div className="section-header">
          <h3>Your Listed Pets</h3>
          <button 
            className="btn btn-primary" 
            onClick={() => setShowAddForm(true)}
          >
            Add New Pet
          </button>
        </div>
        
        {pets.length === 0 ? (
          <div className="empty-state">
            <p>You haven't listed any pets yet.</p>
            <button 
              className="btn btn-outline"
              onClick={() => setShowAddForm(true)}
            >
              Add Your First Pet
            </button>
          </div>
        ) : (
          <div className="pets-grid">
            {pets.map(pet => (
              <div key={pet.id} className="pet-card">
                <div className="pet-image">
                  {pet.imageUrl ? (
                    <img src={pet.imageUrl} alt={pet.name} />
                  ) : (
                    <div className="image-placeholder">
                      <span>No Image</span>
                    </div>
                  )}
                </div>
                <div className="pet-info">
                  <h4>{pet.name}</h4>
                  <p className="pet-breed">{pet.breed}</p>
                  <p className="pet-meta">
                    <span>Age: {pet.age || 'N/A'}</span>
                    <span>Type: {pet.type}</span>
                  </p>
                  <div className="pet-status">
                    <span className={`status-badge ${pet.status.toLowerCase()}`}>
                      {pet.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="dashboard-section">
        <h3>Adoption Requests</h3>
        {requests.length === 0 ? (
          <div className="empty-state">
            <p>No adoption requests yet.</p>
          </div>
        ) : (
          <ul className="requests-list">
            {requests.map(request => (
              <li key={request.id}>
                <div className="request-info">
                  <strong>{request.petName}</strong> - {request.adopterName}
                </div>
                <div className="request-actions">
                  <button className="btn btn-sm btn-outline">View Details</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Add Pet Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Pet</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Pet Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Breed *</label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="e.g. 2 years"
                  />
                </div>
                
                <div className="form-group">
                  <label>Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Tell us about your pet..."
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>Pet Photo</label>
                <div className="image-upload-container">
                  <div className="image-preview">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" />
                    ) : (
                      <div className="upload-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span>Upload a photo</span>
                      </div>
                    )}
                  </div>
                  <div className="upload-controls">
                    <button 
                      type="button" 
                      className="btn btn-outline"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Choose File
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                    {imagePreview && (
                      <button 
                        type="button" 
                        className="btn btn-outline danger"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, imageFile: null }));
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="upload-note">JPG, PNG, or GIF (Max 2MB)</p>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleAddPet}
              >
                Add Pet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OwnerDash;