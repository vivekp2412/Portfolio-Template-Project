import { Carousel } from "antd";
import style from "../Carousel/style.module.css";

import { dataref } from "../../../firebase";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../Hooks/Hooks";
import Loader from "../../Comman/Loader/Loader";
interface Datatype {
  image: string;
  imagfeId: string;
  active: boolean;
}
function Carousell() {
  const [imageArray, setimageArray] = useState([]);
  // const [isloading, setIsloading] = useState(true);
 const pending =  useAppSelector((state)=>state.home.pending);
 const allimages=useAppSelector((state)=>state.home.allImages);
 const imageToShow = allimages.filter((x)=>x.active==true);
 
  let images = imageToShow.map((src: Datatype) => {
    return (
      <div>
        <img src={src.image} className={style.Caro_img}></img>
      </div>
    );
  });
  if (images.length == 0 && pending == false) {
    images = [
      <div>
        <h1 className={style.Caro_img} style={{color:"wheat"}}>No Data</h1>
      </div>,
    ];
  }
console.log(pending);
  return (
    <>
    {pending && <div className={style.loader}><Loader/></div>}
    <Carousel autoplay className={style.carousel}>
      {images}
    </Carousel>
    </>
  );
}

export default Carousell;
