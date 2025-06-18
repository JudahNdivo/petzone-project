import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"
import { useNavigate } from "react-router-dom"
import "./Auth.css"

function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("Pet Owner")
  const [showRoles, setShowRoles] = useState(false)
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

        <div className="role-toggle">
          <button
            type="button"
            onClick={() => setShowRoles(!showRoles)}
            className="toggle-button"
          >
            {showRoles ? "Hide Role Options ▲" : "Choose a Role ▼"}
          </button>
          {showRoles && (
            <div className="role-selection">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Pet Owner"
                  checked={role === "Pet Owner"}
                  onChange={() => setRole("Pet Owner")}
                />
                Pet Owner
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Pet Seeker"
                  checked={role === "Pet Seeker"}
                  onChange={() => setRole("Pet Seeker")}
                />
                Pet Seeker
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Admin"
                  checked={role === "Admin"}
                  onChange={() => setRole("Admin")}
                />
                Admin
              </label>
            </div>
          )}
        </div>

        <button type="submit">Sign Up</button>
      </form>
      <div className="auth-link">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  )
}

export default Signup
