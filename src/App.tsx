import "./App.css";

import PortfolioContainer from "./Containers/PortfolioContainer/PortfolioContainer";
import AdminContainer from "./Containers/AdminContainer/AdminContainer/AdminContainer";
import HomeSection from "./components/Admin-Section/Home-Section/HomeSection";
import ProductSection from "./components/Admin-Section/Product-Section/ProductSection";
import WorkSection from "./components/Admin-Section/Work-Section/WorkSection";
import ContactSection from "./components/Admin-Section/Contact-Section/ConatactSection";
import Routes from "./Routes/RouteComponent";
import RouteComponent from "./Routes/RouteComponent";

function App() {
  return (
    <>
      <RouteComponent />
    </>
  );
}

export default App;
