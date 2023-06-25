import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { auth } from "../firebase";
import { useAppSelector } from "../Hooks/Hooks";
import Loader from "../components/Comman/Loader/Loader";

function ProtectedRoute({ children }) {
  // let isAuth = useAppSelector((state) => state.auth.isAuthenticated);
//  const [loading,setLoading]=useState();\
const [isAuth,setIsAuth]=useState(true);
const [isInitialized, setIsInitialized] = useState(false);
console.log(isAuth);

  useEffect(() => {
    // setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsInitialized(true)
      if (!user) {
        setIsAuth(false);
        <Navigate to="/admin/login" replace/>  
      }else{
        setIsAuth(true);
             
      }
    });

    return () => unsubscribe(); // Cleanup the event listener when the component unmounts
  }, []);
  console.log(isAuth);
  if(!isInitialized){
    return null
  }
  if (isAuth) {
    return children;
  } else {
    return <Navigate to="/admin/login"></Navigate>;
  }
}

export default ProtectedRoute;
