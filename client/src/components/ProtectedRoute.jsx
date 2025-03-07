// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../App";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, setIsLoggedIn, setUsername, setAvailableMoney } = useContext(AuthContext);

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username")

    if (token && savedUsername) {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get("http://localhost:8080/auth/user/info")
          setIsLoggedIn(true);
          setUsername(savedUsername);
          setAvailableMoney(response.data.availableMoney)
        } catch (err) {
          console.error("Error fetching user info:", err);
          localStorage.removeItem("token");
        }
      }
      fetchUserInfo();
    }
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;  //The replace prop ensures the navigation replaces the current entry in the history stack (so the back button works properly)
  }

  // If logged in, show the protected component
  return children;
};

export default ProtectedRoute;