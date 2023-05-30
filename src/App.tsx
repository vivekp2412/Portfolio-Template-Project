import "./App.css";
import HomeContainer from "./Containers/HomeContainer/HomeContainer";
import ProductContainer from "../src/Containers/ProductContainer/ProductContainer";
import NavbarContainer from "./Containers/navbarContainer/NavbarContainer";
import WorkContainer from "./Containers/WorkContainer/WorkContainer";
import ContactContainer from "./Containers/ContactContainer/ContactContainer";
import FooterContainer from "./Containers/FooterContainer/FooterContainer";
function App() {
  return (
    <>
      <NavbarContainer />
      <HomeContainer />
      <ProductContainer />
      <WorkContainer />
      <ContactContainer />
      <FooterContainer />
    </>
  );
}

export default App;
