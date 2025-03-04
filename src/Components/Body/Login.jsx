import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginStyles } from "../../Constants";
import AuthContext from "../Contexts/AuthContext";
import { URL } from "../../Constants";

const Login = () => {
  const { token, login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);



  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const response = await fetch(URL+'/api/v1/authenticate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
            })
        });
      const data = await response.json();
      login(data.token, { username });
      navigate("/dashboard"); 
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