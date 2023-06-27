import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase'; // Replace with your authentication library

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const url = useLocation();
  const logoutTimerRef = useRef(null);

  useEffect(() => {
    const checkAuthStatus = (user) => {
      setIsInitialized(true);
      if (!user) {
        setIsAuth(false);
        <Navigate to="/admin/login" replace />;
      } else {
        setIsAuth(true);
        resetLogoutTimer();
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      checkAuthStatus(user);
    });

    resetLogoutTimer(); // Start the initial logout timer

    const handleUserInteraction = () => {
      resetLogoutTimer(); // Reset the logout timer on user interaction
    };

    document.addEventListener('mousedown', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      unsubscribe();
      document.removeEventListener('mousedown', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [url.pathname]);

  const resetLogoutTimer = () => {
    clearTimeout(logoutTimerRef.current); // Clear the previous timer

    logoutTimerRef.current = setTimeout(() => {
      // Logout user after 15 minutes of inactivity
      setIsAuth(false);
      auth.signOut();
    }, 15 * 60 * 1000); // 15 minutes in milliseconds
  };
  if (!isInitialized) {
    return null;
  }
  if (isAuth) {
    return children;
  } else {
    return <Navigate to="/admin/login"></Navigate>;
  }
}

export default ProtectedRoute;
