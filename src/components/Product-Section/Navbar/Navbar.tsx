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
import { ConfigProvider, Select} from "antd";
import SelectMenu from "../../Comman/Select-Menu/SelectMenu";
const { Option } = Select;
export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy,setSearchBy]=useState();
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const dispatch = useAppDispatch();
  let categories = useAppSelector((state) => state.product.categories);
  const selectoptions = categories.map((category) => {
    return { value: category, label: category };
  });
  const handleFilter = (value) => {
    dispatch(changeFilterCategory(value));
  };
const handleSearchBy=(value)=>{
setSearchBy(value);
}
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
      <div className={style.category_selectMenu}>
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
            dropdownStyle={{ backgroundColor: "white" }}
            onChange={handleFilter}
            options={[{ value: "all", label: "All" }, ...selectoptions]}
          />
        </ConfigProvider>
      </div>
      <div className={style.searchSection}>
      <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#b88b05",
            },
          }}
        >
          <Select
            className={style.select}
            defaultValue="Search By"
            // style={{ width: 150, padding: 10 }}
            // dropdownStyle={{ backgroundColor: "black" }}
            onChange={handleSearchBy}
            // options={[{ value: "productName", label: "Product Name" },{value:"productId",label:"ProductId"}]}
          >
           <Option value="productName" label="Product Name" className={style.selectOptions}>
        Product Name
      </Option>
      <Option value="productId" label="Product Id" className={style.selectOptions}>
        Product Id
      </Option>
      </Select>
      
        </ConfigProvider>
        {/* <SelectMenu/> */}
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
    </div>
  );
}
