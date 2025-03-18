import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(
    {
        token : [],
        user : [],
        userId: [], 
        login : () => {},
        logout: () => {}
    }
);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [userId, setUserID] = useState(null);
  const navigate = useNavigate();
  const IDLE_TIMEOUT = 30 * 60 * 1000; 
  let logoutTimer;

  const resetLogoutTimer = () => {
    if (logoutTimer) clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      logout();
    }, IDLE_TIMEOUT);
  };


  const login = (token, userData) => {
    setToken(token);
    setUser(userData.userName);
    setUserID(userData.userId)
    localStorage.setItem("token", token);
    localStorage.setItem("user", userData.userName);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setUserID(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {

    resetLogoutTimer();

    const activityHandler = () => resetLogoutTimer();
    
    window.addEventListener("mousemove", activityHandler);
    window.addEventListener("keydown", activityHandler);
    
    return () => {
      window.removeEventListener("mousemove", activityHandler);
      window.removeEventListener("keydown", activityHandler);
      clearTimeout(logoutTimer);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
