import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginStyles } from "../Constants";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await axios.post("http://localhost:8080/api/v1/authenticate", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token); // Store JWT token
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={loginStyles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
          style={loginStyles.input} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={loginStyles.input} 
        />
        {error && <p style={loginStyles.error}>{error}</p>}
        <button type="submit" style={loginStyles.button}>Login</button>
      </form>
    </div>
  );
};



export default Login;