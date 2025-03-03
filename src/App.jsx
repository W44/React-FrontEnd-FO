import './App.css';
import { AuthContextProvider } from './Components/Contexts/AuthContext.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './Components/Body/Login.jsx';
import PrivateRoute from './Routes/PrivateRoutes.jsx';
import Dashboard from './Components/Body/Dashboard.jsx';


const App = () => {
  return (
      <Router>
        <AuthContextProvider>
        <Routes>
          {/* Public Route (Anyone can access) */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Route (Only logged-in users can access) */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Redirect all unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        </AuthContextProvider>
      </Router>
  );
};


export default App;
