import { useEffect } from "react";
import { useAppSelector } from "../../../Hooks/Hooks";
import style from "../CardContainer/style.module.css";
import Carousell from "../Carousel/Carousell";
import Card from "../Work-Card/Card";
import { SwiperSlide } from "swiper/react";
function CardContainer() {
  const allWorks = useAppSelector((state) => state.work.allWorks);
  const works = allWorks.map((work,index) => {
    console.log(work);
    
    return (
      <SwiperSlide key={index} style={{width:"100%"}}>
        <Card
          workTitle={work.workTitle}
          workDesc={work.workDesc}
          image={work.Image}
        />
      </SwiperSlide>
    );
  });
  useEffect(()=>{
    console.log("hi");
    
   },[allWorks])
  return (
    <div className={style.cardContainer}>
      <Carousell works={works} />
    </div>
  );
}

export default CardContainer;
