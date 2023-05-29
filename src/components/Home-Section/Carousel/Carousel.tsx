
import { Carousel } from 'antd';
import style from "../Carousel/style.module.css"
import img1  from "../../../assets/Home/Carousel-img/img1.jpg"
import img2  from "../../../assets/Home/Carousel-img/img2.jpg"

function Carousell(){
return(
    <Carousel autoplay>
    <div>
      <img src={img1} className={style.Caro_img}></img>
    </div>
    <div>
      <img src={img2} className={style.Caro_img}></img>
    </div>
    <div>
      <img src={img1} className={style.Caro_img}></img>
    </div>
  </Carousel>)
}

export default Carousell;