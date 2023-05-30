import { Routes, Route } from "react-router-dom";
import ContactSection from "../components/Admin-Section/Contact-Section/ConatactSection";
import HomeSection from "../components/Admin-Section/Home-Section/HomeSection";
import ProductSection from "../components/Admin-Section/Product-Section/ProductSection";
import WorkSection from "../components/Admin-Section/Work-Section/WorkSection";
import AdminContainer from "../Containers/AdminContainer/AdminContainer/AdminContainer";
import HomeContainer from "../Containers/HomeContainer/HomeContainer";
import PortfolioContainer from "../Containers/PortfolioContainer/PortfolioContainer";

function RouteComponent() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PortfolioContainer />}></Route>
        <Route path="/admin" element={<AdminContainer />}>
          <Route path="home" element={<HomeSection />} />
          <Route path="products" element={<ProductSection />} />
          <Route path="works" element={<WorkSection />} />
          <Route path="contact" element={<ContactSection />} />
        </Route>
      </Routes>
    </div>
  );
}

export default RouteComponent;
