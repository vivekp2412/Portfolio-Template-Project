import React, { useEffect, useState } from "react";
import ContactContainer from "../ContactContainer/ContactContainer";
import FooterContainer from "../FooterContainer/FooterContainer";
import HomeContainer from "../HomeContainer/HomeContainer";
import NavbarContainer from "../navbarContainer/NavbarContainer";
import ProductContainer from "../ProductContainer/ProductContainer";
import WorkContainer from "../WorkContainer/WorkContainer";
import { useAppDispatch, useAppSelector } from "../../Hooks/Hooks";
import Loader from "../../components/Comman/Loader/Loader";
import { fetchCategories, fetchProductsData } from "../../slices/productSlice";
import { auth } from "../../firebase";
import { loginUser } from "../../slices/authSlice";
import { fetchContactData } from "../../slices/contactSlice";
import { fetchCarouselData } from "../../slices/homeSlice";
import { fetchWorkData } from "../../slices/workSlice";

function PortfolioContainer() {
  const showProductSection = useAppSelector(
    (state) => state.product.showProductSection
  );
  const dispatch = useAppDispatch();
  const showWorkSection = useAppSelector((state) => state.work.showWorkSection);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let themeValue = localStorage.getItem("theme");
    if (!themeValue) {
      document.documentElement.setAttribute("data-theme", "pink");
    } else {
      document.documentElement.setAttribute("data-theme", themeValue);
    }
    // setLoading(true);
    const fetch = async () => {
      try {
        // setLoading(true);
        await dispatch(fetchProductsData());
        await dispatch(fetchCategories());
        await dispatch(fetchCarouselData());
        await dispatch(fetchContactData());
        await dispatch(fetchWorkData());
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
    // setLoading(false);
    // console.log("hi");
  }, []);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Loader />
      </div>
    );

    // return "Zilen";
  }
  // else {
  return (
    <div>
      <NavbarContainer />
      <div id="homeSection">
        <HomeContainer />
      </div>
      {showProductSection && (
        <div id="productSection">
          <ProductContainer />
        </div>
      )}
      {showWorkSection && (
        <div id="workSection">
          <WorkContainer />
        </div>
      )}
      <div id="contactSection">
        <ContactContainer />
      </div>
      <FooterContainer />
    </div>
  );
}
// }

export default PortfolioContainer;
