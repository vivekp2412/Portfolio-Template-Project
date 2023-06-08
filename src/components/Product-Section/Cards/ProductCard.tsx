import style from "../Cards/style.module.css";

function ProductCard(props) {
  const { data } = props;
  console.log(data);
  const imgSrc = data.Image[0].dataURL;
  return (
    <>
      <div className={style.card}>
        <img src={imgSrc} alt="" />
        <div className={style.cardContent}>
          <h2>{data.productName}</h2>
          <p>{data.productDescription}</p>
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
