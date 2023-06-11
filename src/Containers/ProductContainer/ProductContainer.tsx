import style from "../ProductContainer/style.module.css";
import ProductTitle from "../../components/Product-Section/Section-Title/ProductTitle";
import Navbar from "../../components/Product-Section/Navbar/Navbar";
import CardContainer from "../../components/Product-Section/CardContainer/CardContainer";
import { fetchCategories, fetchProductsData } from "../../slices/productSlice";
import { useAppDispatch, useAppSelector } from "../../Hooks/Hooks";
import { useEffect } from "react";
import Paginate from "../../components/Comman/Paginate/Paginate";

export default function ProductContainer() {


  return (
    <div className={style.ProductContainer}>
      <ProductTitle />
      <Navbar />
      <CardContainer  />
    </div>
  );
}
