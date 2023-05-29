import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DesktopNavbar from "../../components/Navbar/Desktop-Navbar/Navbar";
import MobileNavbar from "../../components/Navbar/Mobile-Navbar/MobileNavbar";
import style from "../navbarContainer/style.module.css";

//Navbar Container
function navbarContainer() {
  const [width, setWidth] = useState<Number>(window.innerWidth);
  //Function hide/show Side Navbar
  function handleSidebar() {
    const classes = document.getElementById("mobileNavbar")?.classList;
    if (classes?.contains(style.hide)) {
      document.getElementById("mobileNavbar")?.classList.remove(style.hide);
      document.getElementById("mobileNavbar")?.classList.add(style.show);
    } else {
      document.getElementById("mobileNavbar")?.classList.add(style.hide);
      document.getElementById("mobileNavbar")?.classList.remove(style.show);
    }
  }
  //calculating the inner width
  const updateWidth = () => {
    let widthinner = window.innerWidth;
    setWidth(widthinner);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
  }, []);
  return (
    <div className={style.navbarContainer}>
      <DesktopNavbar />
      <div id="mobileNavbar" className={style.hide}>
        <MobileNavbar event={handleSidebar} />
      </div>
      {width! < 550 && (
        <div className={style.hamburger_logo}>
        <span className={style.brand}>PORTF<span style={{color:"#B88B05"}}>O</span>LIO</span>
        <div className={style.hamburger}>
          <FontAwesomeIcon
            icon={faBars}
            size="2xl"
            className={style.hamburgerIcon}
            onClick={handleSidebar}
          />
        </div>
        </div>
      )}
    </div>
  );
}

export default navbarContainer;
