import "./App.css";
import HomeContainer from "./Containers/HomeContainer/HomeContainer";
import ProductContainer from "../src/Containers/ProductContainer/ProductContainer";
import NavbarContainer from "./Containers/navbarContainer/NavbarContainer";
import WorkContainer from "./Containers/WorkContainer/WorkContainer";
function App() {
  return (
    <>
      <NavbarContainer />
      <HomeContainer />
      <ProductContainer />
      <WorkContainer />
    </>
  );
}

export default App;
