// src/App.js
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./Layout"
import LandingPage from "./LandingPage"
import "./App.css"
import Login from "./Login"
import Signup from "./Signup"
import PetSearch from "./PetSearch"
import OwnerDash from "./OwnerDash"
import SeekerDash from "./SeekerDash"
import AdoptionProcess from "./AdoptionProcess"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<PetSearch />} />
          <Route path="/owner" element={<OwnerDash />} />
          <Route path="/seeker" element={<SeekerDash />} />
          <Route path="/process" element={<AdoptionProcess />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
