// src/Login.js
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from './firebase'
import { useNavigate } from "react-router-dom"
import "./Auth.css"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      alert("Login successful!")
      navigate("/") // redirect to homepage
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="auth-link">
        Don't have an account? <a href="/signup">Sign up</a>
      </div>
    </div>
  )
}

export default Login
