import React from "react";
import style from "../Work-Card/style.module.css";
import img1 from "../../../assets/Home/Carousel-img/img1.jpg";
import { useAppSelector } from "../../../Hooks/Hooks";
function Card(props) {
  return (
    <div>
      {/* <div className={style.row}> */}
        <div className={style.card}>
          <img
            src={props.image}
            alt="work-Image"
            className={style.workImg}
          ></img>
          <div className={style.title}>
          {props.workTitle}

          </div>
          <div className={style.desc}>
          <p>{props.workDesc}</p>

          </div>

        </div>
      </div>
    // </div>
  );
}

export default Card;
