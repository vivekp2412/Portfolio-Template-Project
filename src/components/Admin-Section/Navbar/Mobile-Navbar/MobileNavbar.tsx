import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../Mobile-Navbar/style.module.css";
import brand from "../../../../assets/Navbar/Mobile-Navbar/logo.png";
import { Link } from "react-router-dom";
type Propstype = {
  event: () => void;
};
//Mobile Screen Side navbar
function MobileNavbar(props: Propstype) {
  const closeSideBar = props.event;
  return (
    <div id="" className={style.mobilenavbarContainer}>
      <div className={style.mobileNavbar}>
        <div className={style.logo_title}>
          <div className={style.logo}>
            <img className={style.logo_img} src={brand}></img>
          </div>
          <span className={style.title}>
            PORTF<span style={{ color: "#B88B05" }}>O</span>LIO
            <p>Admin</p>
          </span>
        </div>
        <div>
          <ul className={style.navoptions}>
            <li className={style.navoption}>
              <Link to="/admin/home">HOME</Link>
              <div className={style.navoption_hover}></div>
            </li>
            <li className={style.navoption}>
              <Link to="/admin/products">PRODUCTS</Link>
              <div className={style.navoption_hover}></div>
            </li>
            <li className={style.navoption}>
              <Link to="/admin/works">MY WORK</Link>
              <div className={style.navoption_hover}></div>
            </li>
            <li className={style.navoption}>
              <Link to="/admin/contact">CONTACT US</Link>
              <div className={style.navoption_hover}></div>
            </li>
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
