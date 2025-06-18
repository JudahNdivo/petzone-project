// Updated PetSearch.js
import { useState } from "react"
import { mockPetsData as petsData } from './mockPetsData';
import "./App.css"

function PetSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [ageFilter, setAgeFilter] = useState("All")

  const filteredPets = petsData.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "All" || pet.type === typeFilter
    const matchesAge = ageFilter === "All" || pet.age === ageFilter
    return matchesSearch && matchesType && matchesAge
  })

  const resetFilters = () => {
    setSearchTerm("")
    setTypeFilter("All")
    setAgeFilter("All")
  }

  return (
    <div className="search-container">
      <div className="container">
        <div className="section-header">
          <h2>Find Your Perfect Pet</h2>
          <p>Search and filter through our available pets to find your ideal companion.</p>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or breed"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)} 
            className="filter-select"
          >
            <option value="All">All Types</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
          </select>

          <select 
            value={ageFilter} 
            onChange={(e) => setAgeFilter(e.target.value)} 
            className="filter-select"
          >
            <option value="All">All Ages</option>
            <option value="Puppy">Puppy/Kitten</option>
            <option value="Adult">Adult</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div className="pet-results pets-grid">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <div key={pet.id} className="pet-card">
                <div className="pet-image">
                  {pet.image ? (
                    <img src={pet.image} alt={pet.name} />
                  ) : (
                    <span>No Image Available</span>
                  )}
                </div>
                <div className="pet-info">
                  <h3>{pet.name}</h3>
                  <p className="pet-breed">{pet.breed}</p>
                  <div className="pet-meta">
                    <span>
                      <svg viewBox="0 0 24 24">
                        <path d="M12 3c4.97 0 9 4.03 9 9 0 4.97-4.03 9-9 9-4.97 0-9-4.03-9-9 0-4.97 4.03-9 9-9zm0 16c3.87 0 7-3.13 7-7s-3.13-7-7-7-7 3.13-7 7 3.13 7 7 7zm-1-4h2v2h-2v-2zm0-8h2v6h-2V7z"/>
                      </svg>
                      {pet.type}
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24">
                        <path d="M8 14c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zM14 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm-2 14c0-2.21 1.79-4 4-4 1.2 0 2.27.53 3 1.36V12h4v10h-4v-3.5c0-1.1-.9-2-2-2-1.1 0-2 .9-2 2V22H8v-4z"/>
                      </svg>
                      {pet.age}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No pets match your search criteria</p>
              <button onClick={resetFilters}>Reset Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PetSearch