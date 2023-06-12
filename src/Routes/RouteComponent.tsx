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

function RouteComponent() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PortfolioContainer />}></Route>
        <Route path="/admin" element={<AdminContainer />}>
          <Route
            path="home"
            element={<ProtectedRoute component={HomeSection} />}
          />
          <Route
            path="products"
            element={<ProtectedRoute component={ProductSection} />}
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
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default RouteComponent;
