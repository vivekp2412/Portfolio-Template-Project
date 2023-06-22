import { Routes, Route, Navigate } from "react-router-dom";
import ContactSection from "../components/Admin-Section/Contact-Section/ConatactSection";
import HomeSection from "../Containers/AdminContainer/Admin-Home/HomeSection";
import ProductSection from "../components/Admin-Section/Product-Section/ProductSection";

import AdminContainer from "../Containers/AdminContainer/AdminContainer/AdminContainer";
import HomeContainer from "../Containers/HomeContainer/HomeContainer";
import PortfolioContainer from "../Containers/PortfolioContainer/PortfolioContainer";
import AdminProduct from "../Containers/AdminContainer/Admin-Product/AdminProduct";
import Login from "../components/Admin-Section/Login-Page/Login";
import Signup from "../components/Admin-Section/Sign-up/Signup";
import ProtectedRoute from "./ProtectedRoute";
import { useAppSelector } from "../Hooks/Hooks";
import LoginContainer from "../Containers/Login-Container/LoginContainer";
import AdminOurWorkContainer from "../Containers/AdminContainer/Admin-OurWork/AdminOurWorkContainer";
import AdminContact from "../Containers/AdminContainer/Admin-Contact/AdminContact";
import ProductDetail from "../components/Product-Detail/Product Detail";

function RouteComponent() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
      <Routes>
        <Route path="/" element={<PortfolioContainer />}></Route>
        <Route path="/products/:id" element={<ProductDetail />}></Route>
        <Route path="/admin" element={<AdminContainer />}>
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <HomeSection />
              </ProtectedRoute>
            }
          />
          <Route
            path="products"
            element={
              <ProtectedRoute>
                <AdminProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="works"
            element={
              <ProtectedRoute>
                <AdminOurWorkContainer />
              </ProtectedRoute>
            }
          />
          <Route
            path="contact"
            element={
              <ProtectedRoute>
                <AdminContact />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/admin/login" element={<LoginContainer />} />
      </Routes>
    </div>
  );
}

export default RouteComponent;
