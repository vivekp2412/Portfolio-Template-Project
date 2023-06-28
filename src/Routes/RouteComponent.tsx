import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import HomeSection from "../Containers/AdminContainer/Admin-Home/HomeSection";

import AdminContainer from "../Containers/AdminContainer/AdminContainer/AdminContainer";
import PortfolioContainer from "../Containers/PortfolioContainer/PortfolioContainer";
import AdminProduct from "../Containers/AdminContainer/Admin-Product/AdminProduct";
import ProtectedRoute from "./ProtectedRoute";
import LoginContainer from "../Containers/Login-Container/LoginContainer";
import AdminOurWorkContainer from "../Containers/AdminContainer/Admin-OurWork/AdminOurWorkContainer";
import AdminContact from "../Containers/AdminContainer/Admin-Contact/AdminContact";
import ProductDetail from "../components/Product-Detail/Product Detail";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import ErrorPage from "../components/Comman/Error_Page/ErrorPage";

function RouteComponent() {
  const [isAuth, setIsAuth] = useState(false);
  const url = useLocation();

  useEffect(() => {
    const checkAuthStatus = (user) => {
      if (!user) {
        setIsAuth(false);
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
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<PortfolioContainer />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route
          path="/admin"
          element={
            isAuth ? (
              <Navigate to="/admin/home"></Navigate>
            ) : (
              <ProtectedRoute>
                <AdminContainer />
              </ProtectedRoute>
            )
          }
        />
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute>
              <HomeSection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/works"
          element={
            <ProtectedRoute>
              <AdminOurWorkContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contact"
          element={
            <ProtectedRoute>
              <AdminContact />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/login" element={<LoginContainer />} />
        <Route
          path="*"
          element={
            <ErrorPage errorCode={"404"} errorMessage={"Page Not Found"} />
          }
        />
      </Routes>
    </div>
  );
}

export default RouteComponent;
