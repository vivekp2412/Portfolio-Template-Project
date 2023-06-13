import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { useAppSelector } from "../Hooks/Hooks";

function ProtectedRoute({ children }) {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  console.log(isAuth);

  if (isAuth) {
    // console.log("hi");

    return children;
  }
  return <Navigate to="/admin/login" replace />;
}

export default ProtectedRoute;
