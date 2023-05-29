import style from "../CardContainer/style.module.css";
import Carousell from "../Carousel/Carousell";
import Card from "../Work-Card/Card";
function CardContainer() {
  return (
    <div className={style.cardContainer}>
      <Carousell />
    </div>
  );
}

export default CardContainer;
