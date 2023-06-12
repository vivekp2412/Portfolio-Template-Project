import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { useAppSelector } from "../Hooks/Hooks";

function ProtectedRoute(props) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const Component = props.component;
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }
  return <Component />;
}

export default ProtectedRoute;
