// src/Signup.js
import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"
import { useNavigate } from "react-router-dom"
import "./Auth.css"

function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      alert("Signup successful!")
      navigate("/login")
    } catch (error) {
      alert(error.message)
    }
  }

  const [phone, setPhone] = useState("")

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <div className="auth-link">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  )
}

export default Signup
