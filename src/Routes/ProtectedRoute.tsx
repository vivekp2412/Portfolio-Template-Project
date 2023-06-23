import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { auth } from "../firebase";
import { useAppSelector } from "../Hooks/Hooks";

function ProtectedRoute({ children }) {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  // auth.onAuthStateChanged((user) => {
  //   if (!user) {
  //     return <Navigate to="/admin/login" replace />;
  //   } else {
  //     return children;
  //   }
  // });
  if (isAuth) {
    return children;
  } else {
    return <Navigate to="/admin/login" replace />;
  }
}

export default ProtectedRoute;
