import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, token } = useSelector((state) => state.auth);
  const location = useLocation();
  
  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Logged in but role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />; // or unauthorized
  }

  // Allowed
  return children;
};

export default ProtectedRoute;
