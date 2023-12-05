import React from "react";
import { Navigate, Outlet } from "react-router-dom";

 const ProtectedRoute = ({
  isAllowed,
  redirectTo = "/auth/login",
  children
}) => {
  if (!isAllowed) {
    return React.createElement(Navigate, { to: redirectTo, replace: true });
  }

  return children ? children : React.createElement(Outlet, null);
};

export default ProtectedRoute;