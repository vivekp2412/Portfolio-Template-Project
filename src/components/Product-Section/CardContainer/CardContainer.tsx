import { Skeleton } from "antd";
import { useAppSelector } from "../../../Hooks/Hooks";
import Loader from "../../Comman/Loader/Loader";
import style from "../CardContainer/style.module.css";
import ProductCard from "../Cards/ProductCard";
function CardContainer() {
  const productList = useAppSelector((state) => state.product.productList);
  const searchQuery = useAppSelector((state) => state.product.searchQuery);
  const searchedProducts = useAppSelector(
    (state) => state.product.searchedProducts
  );
  let loading = useAppSelector((state) => state.product.pending);
  const filterCategory = useAppSelector(
    (state) => state.product.filteredCategory
  );

  let AllCards;
  let visibleProducts;
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
  if (searchQuery !== "") {
    AllCards = commonProduct.map((x) => {
      return <ProductCard data={x} />;
    });
  } else {
    AllCards = visibleProducts.map((x) => {
      return <ProductCard data={x} />;
    });
  }

  return (
    <div className={style.cardContainer}>
      {loading && <Loader />}
      {!loading && !AllCards.length ? (
        <h1 style={{ color: "white" }}>No Data Found</h1>
      ) : (
        AllCards
      )}
    </div>
  );
}

export default CardContainer;
