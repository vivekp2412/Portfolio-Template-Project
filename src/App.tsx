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
      <div id="homeSection">
        <HomeContainer />
      </div>
      <div id="productSection">
        <ProductContainer />
      </div>
      <div id="workSection">
        <WorkContainer />
      </div>
      <div id="contactSection">
        <ContactContainer />
      </div>
      <FooterContainer />
    </>
  );
}

export default App;
