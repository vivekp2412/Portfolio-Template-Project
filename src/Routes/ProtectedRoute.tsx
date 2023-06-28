import React, { useState, useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase"; // Replace with your authentication library

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const url = useLocation();

  useEffect(() => {
    const checkAuthStatus = (user) => {
      setIsInitialized(true);
      if (!user) {
        setIsAuth(false);
        <Navigate to="/admin/login" replace />;
      } else {
        setIsAuth(true);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      checkAuthStatus(user);
    });

    // resetLogoutTimer(); // Start the initial logout timer

    return () => {
      unsubscribe();
    };
  }, [url.pathname]);

  if (!isInitialized) {
    return null;
  }
  if (isAuth) {
    return children;
  } else {
    return <Navigate to="/admin/login"></Navigate>;
  }
};

export default ProtectedRoute;
