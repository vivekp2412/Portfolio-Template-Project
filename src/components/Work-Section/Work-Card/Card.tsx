import React from "react";
import style from "../Work-Card/style.module.css";
import img1 from "../../../assets/Home/Carousel-img/img1.jpg";
function Card() {
  return (
    <div>
      <div className={style.row}>
        <div className={style.card}>
          <img src={img1} alt="work-Image" className={style.workImg}></img>
          <h4>Work Title</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
            porro similique aliquid debitis ipsam soluta dolorum ipsa!
            Voluptate, suscipit iure.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
