import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../Mobile-Navbar/style.module.css";
import brand from "../../../assets/Navbar/Mobile-Navbar/logo.png";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Hooks/Hooks";
type Propstype = {
  event: () => void;
};
//Mobile Screen Side navbar
function MobileNavbar(props: Propstype) {
  const closeSideBar = props.event;
  const data = useAppSelector((state) => state.contact.contactDetails);
  const navigate = useNavigate();
  const logIn = () => {
    navigate("/admin/login");
  };
  return (
    <div id="" className={style.mobilenavbarContainer}>
      <div className={style.mobileNavbar}>
        <div className={style.logo_title}>
          <div className={style.logo}>
            <img className={style.logo_img} src={brand}></img>
          </div>
          <span className={style.title}>
            {data["Portfolio Name"].slice(0, 3).toUpperCase()}
            {}
            <span style={{ color: "#B88b05" }}>
              {data["Portfolio Name"].slice(3, 4).toUpperCase()}
            </span>
            {data["Portfolio Name"].slice(4).toUpperCase()}
          </span>
        </div>
        <div>
          <ul className={style.navoptions}>
            <li className={style.navoption}>
              <a href="#homeSection">HOME</a>
              <div className={style.navoption_hover}></div>
            </li>
            <li className={style.navoption}>
              <a href="#productSection">PRODUCTS</a>
              <div className={style.navoption_hover}></div>
            </li>
            <li className={style.navoption}>
              <a href="#workSection">MY WORK</a>
              <div className={style.navoption_hover}></div>
            </li>
            <li className={style.navoption}>
              <a href="#contactSection">CONTACT US</a>
              <div className={style.navoption_hover}></div>
            </li>
            <button className={style.navBtn} onClick={() => logIn()}>
              LOG IN
            </button>
          </ul>
        </div>
        <div className={style.iconContainer}>
          <FontAwesomeIcon
            className={style.closeSliderIcon}
            icon={faAngleLeft}
            onClick={closeSideBar}
          />
        </div>
      </div>
    </div>
  );
}

export default MobileNavbar;
