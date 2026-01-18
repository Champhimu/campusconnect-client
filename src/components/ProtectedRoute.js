import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but role not allowed
    return <Navigate to="/" replace />;
  }

  // User allowed
  return children;
};

export default ProtectedRoute;
