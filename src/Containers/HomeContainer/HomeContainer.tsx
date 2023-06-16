import style from "../HomeContainer/style.module.css";
import Carousell from "../../components/Home-Section/Carousel/Carousel";
import TitleName from "../../components/Home-Section/Title-Name/TitleName";
import { useEffect } from "react";
import { useAppDispatch } from "../../Hooks/Hooks";
import { fetchCarouselData } from "../../slices/homeSlice";
export default function HomeContainer() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCarouselData());
  }, []);
  return (
    <div className={style.homeContainer}>
      <Carousell />
      <div className={style.overlay}></div>
      <div className={style.Title}>
        <TitleName />
      </div>
    </div>
  );
}
