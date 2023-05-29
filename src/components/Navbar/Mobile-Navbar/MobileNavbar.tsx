import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../Mobile-Navbar/style.module.css";
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
            <img className={style.logo_img} src=""></img>
          </div>
          <div className={style.title}>BRAND NAME</div>
        </div>
        <div>
          <ul className={style.navoptions}>
            <li className={style.navoption}>
              <a href="#homeSection">HOME</a>
              <div className={style.navoption_hover}></div>
            </li>
            <li className={style.navoption}>
              <a href="#productsSection">PRODUCTS</a>
              <div className={style.navoption_hover}></div>
            </li>
            <li className={style.navoption}>
              <a href="#myworkSection">MY WORK</a>
              <div className={style.navoption_hover}></div>
            </li>
            <li className={style.navoption}>
              <a href="#contactSection">CONTACT US</a>
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
