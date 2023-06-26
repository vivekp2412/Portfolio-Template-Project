import React, { useEffect, useState } from "react";
import {
  Navigate,
  Outlet,
  Route,
  useLocation,
  useParams,
} from "react-router-dom";
import { auth } from "../firebase";
import { useAppSelector } from "../Hooks/Hooks";
import Loader from "../components/Comman/Loader/Loader";

function ProtectedRoute({ children }) {
  // let isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  //  const [loading,setLoading]=useState();\
  const [isAuth, setIsAuth] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const url = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsInitialized(true);
      if (!user) {
        setIsAuth(false);
        <Navigate to="/admin/login" replace />;
      } else {
        setIsAuth(true);
      }
    });

    return () => unsubscribe();
  }, [url.pathname]);
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
