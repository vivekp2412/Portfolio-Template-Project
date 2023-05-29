import style from "../CardContainer/style.module.css";
import ProductCard from "../Cards/ProductCard";
function CardContainer() {
  return (
    <div className={style.cardContainer}>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
    </div>
  );
}

export default CardContainer;
