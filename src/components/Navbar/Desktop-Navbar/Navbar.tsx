import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Hooks/Hooks";
import style from "../Desktop-Navbar/style.module.css";
//Desktop Navbar
function DesktopNavbar() {
  const data = useAppSelector((state) => state.contact.contactDetails);

  // const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const logIn = () => {
    navigate("/admin/login");
  };
  const [activelink, setActiveLink] = useState();
  return (
    <>
      <div className={style.navbarContainer}>
        <div className={style.navbar}>
          <span className={style.title}>
            {/* PORTF<span style={{ color: "#B88B05" }}>O</span>LIO */}
            {data["Portfolio Name"].slice(0, 3).toUpperCase()}
            {}
            <span style={{ color: "#B88b05" }}>
              {data["Portfolio Name"].slice(3, 4).toUpperCase()}
            </span>
            {data["Portfolio Name"].slice(4).toUpperCase()}
          </span>
          <ul className={style.navoptions}>
            <li className={style.navoption}>
              <a href="#homeSection" onClick={setActiveLink("Home")}>
                HOME
              </a>
            </li>
            <li className={style.navoption}>
              <a href="#productSection" onClick={setActiveLink("Products")}>
                PRODUCTS
              </a>
            </li>
            <li className={style.navoption}>
              <a href="#workSection" onClick={setActiveLink("Work")}>
                MY WORK
              </a>
            </li>
            <li className={style.navoption}>
              <a href="#contactSection" onClick={setActiveLink("Contact")}>
                CONTACT US
              </a>
            </li>

            <button className={style.navBtn} onClick={() => logIn()}>
              LOG IN
            </button>
          </ul>
        </div>
      </div>
    </>
  );
}

export default DesktopNavbar;
