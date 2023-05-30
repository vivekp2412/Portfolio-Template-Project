import React from "react";
import ContactContainer from "../ContactContainer/ContactContainer";
import FooterContainer from "../FooterContainer/FooterContainer";
import HomeContainer from "../HomeContainer/HomeContainer";
import NavbarContainer from "../navbarContainer/NavbarContainer";
import ProductContainer from "../ProductContainer/ProductContainer";
import WorkContainer from "../WorkContainer/WorkContainer";

function PortfolioContainer() {
  return (
    <div>
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
    </div>
  );
}

export default PortfolioContainer;
