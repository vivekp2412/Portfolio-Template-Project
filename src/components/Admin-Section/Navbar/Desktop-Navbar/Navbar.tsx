import { Link, NavLink, useLocation } from "react-router-dom";
import style from "../Desktop-Navbar/style.module.css";
//Desktop Navbar
function DesktopNavbar() {
  const location = useLocation();
  return (
    <>
      <div className={style.navbarContainer}>
        <div className={style.navbar}>
          <span className={style.title}>
            PORTF<span style={{ color: "#B88B05" }}>O</span>LIO-ADMIN
          </span>
          <ul className={style.navoptions}>
            <li className={style.navoption}>
              <NavLink to={`/admin/home`}>HOME</NavLink>
            </li>
            <li className={style.navoption}>
              <NavLink to={`/admin/products`}>PRODUCTS</NavLink>
            </li>
            <li className={style.navoption}>
              <NavLink to={`/admin/works`}>WORK</NavLink>
            </li>
            <li className={style.navoption}>
              <NavLink to={`/admin/contact`}>CONTACT US</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default DesktopNavbar;
