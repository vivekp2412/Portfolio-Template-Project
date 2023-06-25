import React from "react";
import ContactContainer from "../ContactContainer/ContactContainer";
import FooterContainer from "../FooterContainer/FooterContainer";
import HomeContainer from "../HomeContainer/HomeContainer";
import NavbarContainer from "../navbarContainer/NavbarContainer";
import ProductContainer from "../ProductContainer/ProductContainer";
import WorkContainer from "../WorkContainer/WorkContainer";
import { useAppSelector } from "../../Hooks/Hooks";

function PortfolioContainer() {
  const showProductSection = useAppSelector((state)=>state.product.showProductSection);
  const showWorkSection = useAppSelector((state)=>state.work.showWorkSection);
 console.log(showWorkSection);
 
 
  return (
    <div>
      <NavbarContainer />
      <div id="homeSection">
        <HomeContainer />
      </div>
      {showProductSection && 
      <div id="productSection">
        <ProductContainer />
      </div>}
      {showWorkSection && 
      <div id="workSection">
        <WorkContainer />
      </div>
      }
      <div id="contactSection">
        <ContactContainer />
      </div>
      <FooterContainer />
    </div>
  );
}

export default PortfolioContainer;
