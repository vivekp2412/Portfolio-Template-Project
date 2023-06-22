import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../Hooks/Hooks";
import { selectProduct } from "../../../slices/productSlice";
import style from "../Cards/style.module.css";
function ProductCard(props) {
  const { data } = props;
  const dispatch = useAppDispatch();
  const imgSrc = data.Image;
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
          <div className={style.head}>
            <p className={style.productName}>{data.productName}</p>
          </div>

          <div className={`${style.items} ${style.cart}`}>
            <span>
              <hr />
              <NavLink
                className={style.readMore}
                to={`/products/${data.productId}`}
                onClick={() => dispatch(selectProduct(data.productId))}
              >
                Read More
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
