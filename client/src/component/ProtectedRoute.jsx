// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom'; // For navigation (if you're using react-router-dom v6+)

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); 
console.log("token in protector route:::",token)
 
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
