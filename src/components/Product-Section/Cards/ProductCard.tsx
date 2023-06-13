import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import style from "../Cards/style.module.css";
function ProductCard(props) {
  const { data } = props;
  const imgSrc = data.Image[0].dataURL;
  return (
    <>
      <div
        className={style.container}
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className={style.overlay}>
          <div className={style.items}></div>
          <div className={style.head}>
            <p>
              Product Name : <br />
              {data.productName}
            </p>
          </div>

          <div className={`${style.items} ${style.cart}`}>
            <span>
              <hr />
              <a href="">Read More</a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
