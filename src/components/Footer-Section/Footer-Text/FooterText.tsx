import React from "react";
import style from "../Footer-Text/style.module.css";
function FooterText() {
  return (
    <div className={style.footerContainer}>
      <span className={style.title}>
        PORTF<span style={{ color: "#B88B05" }}>O</span>LIO
      </span>
      <div className={style.subHead}>CopyRight | All Right Reserved</div>
    </div>
  );
}

export default FooterText;
