// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./LandingPage"
import Login from "./Login"
import Signup from "./Signup"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
