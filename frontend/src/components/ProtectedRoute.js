import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />; // redirect to login if not logged in
  }

  return children; // allow access if token exists
};

export default ProtectedRoute;
