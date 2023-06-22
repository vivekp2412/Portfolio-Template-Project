import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../Hooks/Hooks";

function ProductDetail() {
  let { id } = useParams();
  const data = useAppSelector((state) => state.product.selectedProduct);
  useEffect(() => {}, []);

  return (
    <div>
      <h1>{data.productDescription}</h1>
    </div>
  );
}

export default ProductDetail;
