import { Carousel } from "antd";
import style from "../Carousel/style.module.css";

import { dataref } from "../../../firebase";
import { useEffect, useState } from "react";
interface Datatype {
  image: string;
  imagfeId: string;
  active: boolean;
}
function Carousell() {
  const [imageArray, setimageArray] = useState([]);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carousel = await dataref.ref("Carousel").once("value");
        const data = carousel.val().image;
        const imageActive = data.filter((x: Datatype) => x.active == true);
        console.log(imageActive);
        if (imageActive.length > 0) {
          setimageArray(imageActive);
        }
        setIsloading(false);
      } catch (error) {
        console.log("Error fetching data from Firebase:", error);
      }
    };

    fetchData();
  }, []);
  let images = imageArray.map((src: Datatype) => {
    return (
      <div>
        <img src={src.image} className={style.Caro_img}></img>
      </div>
    );
  });
  if (images.length == 0 && isloading == false) {
    images = [
      <div>
        <h1 className={style.Caro_img}>No Data</h1>
      </div>,
    ];
  }
  console.log(images);

  return (
    <Carousel autoplay>
      {isloading && <h1 className={style.Caro_img}>Loading</h1>}
      {images}
    </Carousel>
  );
}

export default Carousell;
