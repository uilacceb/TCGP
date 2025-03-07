// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../App";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, setIsLoggedIn, setUsername } = useContext(AuthContext);

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username")

    if (token && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
  }, [setIsLoggedIn, setUsername]);

  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" replace />;  //The replace prop ensures the navigation replaces the current entry in the history stack (so the back button works properly)
  }

  // If logged in, show the protected component
  return children;
};

export default ProtectedRoute;