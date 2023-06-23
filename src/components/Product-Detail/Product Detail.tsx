import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../Hooks/Hooks";
import style from "../Product-Detail/style.module.css";
function ProductDetail() {
  let { id } = useParams();
  const data = useAppSelector((state) => state.product.selectedProduct);

  return (
    <div className={style.Container}>
      <div className={style.imageContainer}>
        <img src={data.Image}></img>
        <h1>{data.productName}</h1>
      </div>
      <div className={style.detailsContainer}>
        <div className={style.id}>
          <p>Product ID</p>
          <h1>{data.productId}</h1>
        </div>
        <div className={style.category}>
          <p>Category</p>
          <p>{data.productCategory}</p>
        </div>
        <div className={style.description}>
          <p>Description</p>
          <p>{data.productDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
