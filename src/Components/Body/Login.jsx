import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import { URL } from "../../Constants"; 
import "./Login.css";

const Login = () => {
  const { token, login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Show loader

    try {
      const response = await fetch(URL + "/api/v1/authenticate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      login(data.token, { username });
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false); // Hide loader after response
    }
  };

  return (
    <div className="login-container">
      {/* Rotating Heading */}
      <h1 className="rotating-heading">FS</h1>

      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        {error && <p className="login-error">{error}</p>}

        {/* Loader when waiting for response */}
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <button type="submit" className="login-button" disabled={loading}>
            Login
          </button>
        )}
      </form>

      <div className="info-box">
        <p><strong>Hello, This is developed by Arslaan.</strong></p>
        <p>Please use <strong>username: root</strong> and <strong>password: 1234</strong> to enter the site.</p>
        <p>The server shuts down every 15 minutes, so it will take 2-4 minutes to login.</p>
        <p>This application is still under development, so I'll be adding more features soon! :)</p>
        <p>This is a concept application to add, remove, and edit simple objects while enforcing authentication.</p>
      </div>

      <div className="button-container">
        <button onClick={() => window.open("https://github.com/W44/React-FrontEnd-FO", "_blank")} className="github-button">
          Check Application Frontend Code
        </button>
        <button onClick={() => window.open("https://github.com/W44/Java_BackEnd-FO", "_blank")} className="github-button">
          Check Application Backend Code
        </button>
      </div>
    </div>
  );
};

export default Login;
