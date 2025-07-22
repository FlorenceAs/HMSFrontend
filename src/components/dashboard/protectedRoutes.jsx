import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated, devMode = false }) => {
  // In development mode, always allow access
  if (devMode) {
    return children;
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    // Check if there's a token in localStorage
    const token = localStorage.getItem("adminToken");
    
    if (!token) {
      // No token found, redirect to login
      return <Navigate to="/admin/login" replace />;
    }
    
    // Token exists but authentication state is false
    // This could happen on page refresh - you might want to validate the token here
    // For now, redirect to login to re-authenticate
    return <Navigate to="/admin/login" replace />;
  }

  // User is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;