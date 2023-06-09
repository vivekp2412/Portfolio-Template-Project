import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import style from "../Navbar/style.module.css";
import {
  changeFilterCategory,
  searchProduct,
} from "../../../slices/productSlice";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import { Fragment, useEffect, useState } from "react";
import useDebounce from "../../../Hooks/useDebounce";
import { ConfigProvider, Select } from "antd";
export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const dispatch = useAppDispatch();
  let categories = useAppSelector((state) => state.product.categories);
  const selectoptions = categories.map((category) => {
    return { value: category, label: category };
  });
  const handleChange = (value) => {
    dispatch(changeFilterCategory(value));
  };

  useEffect(() => {
    dispatch(
      searchProduct({
        searchquery: debouncedSearchQuery,
        searchBy: "productName",
      })
    );
  }, [debouncedSearchQuery]);
  return (
    <div className={style.Product_Navbar_container}>
      <div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#b88b05",
            },
          }}
        >
          <Select
            className={style.select}
            defaultValue="all"
            style={{ width: 200, padding: 10 }}
            dropdownStyle={{ backgroundColor: "white" }}
            onChange={handleChange}
            options={[{ value: "all", label: "All" }, ...selectoptions]}
          />
        </ConfigProvider>
      </div>
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
