import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Hooks/Hooks";
import style from "../Desktop-Navbar/style.module.css";
//Desktop Navbar
function DesktopNavbar() {
  const data = useAppSelector((state)=>state.contact.contactDetails);
  // const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const logIn = () => {
    navigate("/admin/login");
  };
  return (
    <>
      <div className={style.navbarContainer}>
        <div className={style.navbar}>
          <span className={style.title}>
            {/* PORTF<span style={{ color: "#B88B05" }}>O</span>LIO */}
            {data["Portfolio Name"]}
          </span>
          <ul className={style.navoptions}>
            <li className={style.navoption}>
              <a href="#homeSection">HOME</a>
            </li>
            <li className={style.navoption}>
              <a href="#productSection">PRODUCTS</a>
            </li>
            <li className={style.navoption}>
              <a href="#workSection">MY WORK</a>
            </li>
            <li className={style.navoption}>
              <a href="#contactSection">CONTACT US</a>
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
