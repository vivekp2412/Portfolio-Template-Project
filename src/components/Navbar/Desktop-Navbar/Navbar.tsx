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
  const [activeSection, setActiveSection] = useState("homeSection");

  const handleSetActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };
  return (
    <>
      <div className={style.navbarContainer}>
        <div className={style.navbar}>
          <span className={style.title}>
            {data["Portfolio Name"].slice(0, 3).toUpperCase()}
            {}
            <span style={{ color: "#B88b05" }}>
              {data["Portfolio Name"].slice(3, 4).toUpperCase()}
            </span>
            {data["Portfolio Name"].slice(4).toUpperCase()}
          </span>
          <ul className={style.navoptions}>
            <li
              className={`${style.navoption} ${
                activeSection === "homeSection" ? style.activeLink : ""
              }`}
            >
              <a
                href="#homeSection"
                onClick={() => handleSetActiveSection("homeSection")}
              >
                HOME
              </a>
            </li>
            <li
              className={`${style.navoption} ${
                activeSection === "productSection" ? style.activeLink : ""
              }`}
            >
              <a
                href="#productSection"
                onClick={() => handleSetActiveSection("productSection")}
              >
                PRODUCTS
              </a>
            </li>
            <li
              className={`${style.navoption} ${
                activeSection === "workSection" ? style.activeLink : ""
              }`}
            >
              <a
                href="#workSection"
                onClick={() => handleSetActiveSection("workSection")}
              >
                MY WORK
              </a>
            </li>
            <li
              className={`${style.navoption} ${
                activeSection === "contactSection" ? style.activeLink : ""
              }`}
            >
              <a
                href="#contactSection"
                onClick={() => handleSetActiveSection("contactSection")}
              >
                CONTACT US
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default DesktopNavbar;
