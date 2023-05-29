import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import style from "../Navbar/style.module.css";
export default function Navbar() {
  return (
    <div className={style.Product_Navbar_container}>
      <ul className={style.navoptions}>
        <li className={style.navoption}>
          <a href="#">All</a>
        </li>

        <li className={style.navoption}>
          <a href="#">Cate 1</a>
        </li>
        <li className={style.navoption}>
          <a href="#">Cate 2</a>
        </li>
        <li className={style.navoption}>
          <a href="#">Cate 3</a>
        </li>
        <li className={style.navoption}>
          <a href="#">Cate 4</a>
        </li>
      </ul>
      <div className={style.searchbar}>
        <input type="text" placeholder="Search Your Products"></input>
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
