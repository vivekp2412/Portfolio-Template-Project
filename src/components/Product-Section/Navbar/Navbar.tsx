import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import style from "../Navbar/style.module.css";
import {
  changeFilterCategory,
  searchProduct,
} from "../../../slices/productSlice";

import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import { useEffect, useState } from "react";
import useDebounce from "../../../Hooks/useDebounce";
import { ConfigProvider, Select } from "antd";
import SelectMenu from "../../Comman/Select-Menu/SelectMenu";
const { Option } = Select;
export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState();
  const [filterBy, setFilterBy] = useState("All");
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const dispatch = useAppDispatch();
  let categories = useAppSelector((state) => state.product.categories);

  function getSearchBy(value) {
    setSearchBy(value);
    dispatch(
      searchProduct({
        searchquery: debouncedSearchQuery,
        searchBy: value,
      })
    );
  }
  function getFilterBy(value) {
    dispatch(changeFilterCategory(value));
    setFilterBy(value);
  }

  // function getFilterCategory(value) {
  // }

  useEffect(() => {
    dispatch(
      searchProduct({
        searchquery: debouncedSearchQuery,
        searchBy: searchBy,
      })
    );
  }, [debouncedSearchQuery]);
  return (
    <div className={style.Product_Navbar_container}>
      <SelectMenu
        searchQuery={searchQuery}
        options={["productName", "productId"]}
        searchBy={getSearchBy}
        initialValue="Search By"
      />
      <div className={style.searchSection}>
        {/* <div className={style.category_label}>Search By:</div> */}
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
      <div className={style.category_selectMenu}>
        <SelectMenu
          options={["All", ...categories]}
          filterBy={getFilterBy}
          initialValue="All"
        />
      </div>
    </div>
  );
}
