import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const location = useLocation();

  return isLoggedIn ? children : <Navigate to="/" state={{ from: location }} />;
};

export default PrivateRoute;
