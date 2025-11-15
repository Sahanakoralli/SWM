// src/components/ProtectedAdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const role = localStorage.getItem("role");
  console.log("userInfor ", user.role);
  // If no token or role is not admin → redirect to login
  if (user.role !== "admin") {
    console.log("inside protected");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
