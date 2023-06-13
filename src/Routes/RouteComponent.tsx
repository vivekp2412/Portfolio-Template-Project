import { Routes, Route, Navigate } from "react-router-dom";
import ContactSection from "../components/Admin-Section/Contact-Section/ConatactSection";
import HomeSection from "../Containers/AdminContainer/Admin-Home/HomeSection";
import ProductSection from "../components/Admin-Section/Product-Section/ProductSection";
import WorkSection from "../components/Admin-Section/Work-Section/WorkSection";
import AdminContainer from "../Containers/AdminContainer/AdminContainer/AdminContainer";
import HomeContainer from "../Containers/HomeContainer/HomeContainer";
import PortfolioContainer from "../Containers/PortfolioContainer/PortfolioContainer";
import AdminProduct from "../Containers/AdminContainer/Admin-Product/AdminProduct";
import Login from "../components/Admin-Section/Login-Page/Login";
import Signup from "../components/Admin-Section/Sign-up/Signup";
import ProtectedRoute from "./ProtectedRoute";
import { useAppSelector } from "../Hooks/Hooks";
import LoginContainer from "../Containers/Login-Container/LoginContainer";

function RouteComponent() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
      <Routes>
        <Route path="/" element={<PortfolioContainer />}></Route>
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
            element={<ProtectedRoute component={WorkSection} />}
          />
          <Route
            path="contact"
            element={<ProtectedRoute component={ContactSection} />}
          />
        </Route>
        <Route path="/admin/login" element={<LoginContainer />} />
        <Route path="/admin/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default RouteComponent;
