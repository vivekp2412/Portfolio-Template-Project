import style from "../Desktop-Navbar/style.module.css";
//Desktop Navbar
function DesktopNavbar() {
  return (
    <>
      <div className={style.navbarContainer}>
        <div className={style.navbar}>
          <span className={style.brand}>PORTF<span style={{color:"#B88B05"}}>O</span>LIO</span>
          <ul className={style.navoptions}>
            <li className={style.navoption}>
              <a href="#homeSection">HOME</a>
            </li>
            <li className={style.navoption}>
              <a href="#productsSection">PRODUCTS</a>
            </li>
            <li className={style.navoption}>
              <a href="#myworkSection">MY WORK</a>
            </li>
            <li className={style.navoption}>
              <a href="#contactSection">CONTACT US</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default DesktopNavbar;
