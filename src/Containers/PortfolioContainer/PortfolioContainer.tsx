import { useEffect, useState } from "react";
import ContactContainer from "../ContactContainer/ContactContainer";
import FooterContainer from "../FooterContainer/FooterContainer";
import HomeContainer from "../HomeContainer/HomeContainer";
import NavbarContainer from "../navbarContainer/NavbarContainer";
import ProductContainer from "../ProductContainer/ProductContainer";
import WorkContainer from "../WorkContainer/WorkContainer";
import { useAppDispatch, useAppSelector } from "../../Hooks/Hooks";
import Loader from "../../components/Comman/Loader/Loader";
import { fetchCategories, fetchProductsData } from "../../slices/productSlice";

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
      document.documentElement.setAttribute("data-theme", "Pure Pitch");
    } else {
      document.documentElement.setAttribute("data-theme", themeValue);
    }
    const fetch = async () => {
      try {
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
  }, []);
  setTimeout(() => {
    setLoading(false);
  }, 0);
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
  }
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
