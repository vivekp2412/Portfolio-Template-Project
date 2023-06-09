import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import style from "../Cards/style.module.css";
function ProductCard(props) {
  const { data } = props;
  const imgSrc = data.Image[0].dataURL;
  return (
    <>
      <Card className={style.productCard}>
        <CardHeader color="blue-gray" className={style.imageContainer}>
          <img className={style.image} src={imgSrc} alt="" />
        </CardHeader>
        <CardBody className={style.cardBody}>
          <Typography color="blue-gray" className={style.name}>
            {data.productName}
          </Typography>
          <Typography className={style.description}>
            {data.productDescription}
          </Typography>
          <Button className={style.button}>Read More</Button>
        </CardBody>
      </Card>
    </>
  );
}

export default ProductCard;
