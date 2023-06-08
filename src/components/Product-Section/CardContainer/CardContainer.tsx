import { useAppSelector } from "../../../Hooks/Hooks";
import style from "../CardContainer/style.module.css";
import ProductCard from "../Cards/ProductCard";
function CardContainer() {
  const productList = useAppSelector((state) => state.product.productList);
  const searchedProducts = useAppSelector(
    (state) => state.product.searchedProducts
  );

  const filterCategory = useAppSelector(
    (state) => state.product.filteredCategory
  );
  let AllCards;
  let visibleProducts;
  console.log(productList);
  if (filterCategory == "all") {
    visibleProducts = productList;
  } else {
    visibleProducts = productList.filter(
      (product) => product.productCategory == filterCategory
    );
  }
  let commonProduct = visibleProducts.filter(function (element) {
    return searchedProducts.includes(element);
  });
  AllCards = commonProduct.map((x) => {
    return <ProductCard data={x} />;
  });

  return <div className={style.cardContainer}>{AllCards}</div>;
}

export default CardContainer;
