import style from "../ProductContainer/style.module.css";
import ProductTitle from "../../components/Product-Section/Section-Title/ProductTitle";
import Navbar from "../../components/Product-Section/Navbar/Navbar";
import CardContainer from "../../components/Product-Section/CardContainer/CardContainer";
export default function ProductContainer() {
  return (
    <div className={style.ProductContainer}>
      <ProductTitle />
      <Navbar />
      <CardContainer />
    </div>
  );
}
