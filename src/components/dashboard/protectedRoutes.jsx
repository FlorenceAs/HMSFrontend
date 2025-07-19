import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, isAuthenticated, devMode = false }) => {
  // In development mode, always allow access
  if (devMode) {
    return children
  }
  
  // In production mode, check authentication
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />
}

export default ProtectedRoute