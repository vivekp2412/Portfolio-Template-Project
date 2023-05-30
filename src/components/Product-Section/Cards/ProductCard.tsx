import React from "react";
import style from "../Cards/style.module.css";

function ProductCard() {
  return (
    <>
      <div className={style.card}>
        <img
          src="https://jubilantconsumer.com/wp-content/themes/jubilant/assets/img/product.png"
          alt=""
        />
        <div className={style.cardContent}>
          <h2>Card Heading</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            exercitationem iste, voluptatum, quia explicabo laboriosam rem
            adipisci voluptates cumque, veritatis atque nostrum corrupti ipsa
            asperiores harum? Dicta odio aut hic.
          </p>
          <a href="#" className={style.button}>
            Find out more
            <span className={style.material_symbol_outlined}>
              arrow_right_alt
            </span>
          </a>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
