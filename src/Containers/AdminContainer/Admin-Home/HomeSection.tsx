import Modal from "antd/es/modal/Modal";
import { useEffect } from "react";
import FormModal from "../../../components/Admin-Section/Home-Section/Modal/FormModal";
import PreviewTable from "../../../components/Admin-Section/Home-Section/Preview-Table/PreviewTable";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import { fetchCarouselData } from "../../../slices/homeSlice";

import style from "../Admin-Home/style.module.css";
function HomeSection() {
  const dispatch = useAppDispatch();
  const allImages = useAppSelector((state) => state.home.allImages);
  // useEffect(() => {
  //   console.log("home rerendere");
  //   const fetchCarousel = async () => {
  //     await dispatch(fetchCarouselData());
  //   };
  //   fetchCarousel();
  // }, []);
  return (
    <div className={style.Container}>
      <div className={style.homeSection}>
        <FormModal />
        <PreviewTable />
      </div>
    </div>
  );
}

export default HomeSection;
