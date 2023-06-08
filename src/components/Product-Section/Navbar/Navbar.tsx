import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import style from "../Navbar/style.module.css";
import { Select } from "antd";
import {
  changeFilterCategory,
  searchProduct,
} from "../../../slices/productSlice";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import { useEffect, useState } from "react";
import useDebounce from "../../../Hooks/useDebounce";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 2000);
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.product.categories);

  const handleChange = (e) => {
    dispatch(changeFilterCategory(e.target.value));
    console.log(e.target.value);
  };

  useEffect(() => {
    dispatch(
      searchProduct({
        searchquery: debouncedSearchQuery,
        searchBy: "productName",
      })
    );
  }, [debouncedSearchQuery]);
  const options = categories.map((x) => (
    <option className={style.selectOption} value={x}>
      {x}
    </option>
  ));
  return (
    <div className={style.Product_Navbar_container}>
      <select className={style.selectMenu} onChange={handleChange}>
        {options}
      </select>
      <div className={style.searchbar}>
        <input
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          placeholder="Search Your Products"
        ></input>
        <button className={style.searchButton}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={style.searchIcon}
          />
        </button>
      </div>
    </div>
  );
}
