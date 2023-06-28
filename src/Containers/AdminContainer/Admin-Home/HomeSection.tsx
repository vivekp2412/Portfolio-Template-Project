import Modal from "antd/es/modal/Modal";
import { useEffect } from "react";
import FormModal from "../../../components/Admin-Section/Home-Section/Modal/FormModal";
import PreviewTable from "../../../components/Admin-Section/Home-Section/Preview-Table/PreviewTable";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import { fetchCarouselData } from "../../../slices/homeSlice";

import style from "../Admin-Home/style.module.css";
import AdminNavbarContainer from "../Admin-Navbar/AdminNavbarContainer";

function HomeSection() {
  const dispatch = useAppDispatch();
  const allImages = useAppSelector((state) => state.home.allImages);
  useEffect(() => {
    dispatch(fetchCarouselData());
  }, []);
  return (
    <>
      <AdminNavbarContainer />
      <div className={style.Container}>
        <div className={style.homeContainer}>
          <FormModal />
          <PreviewTable />
        </div>
      </div>
    </>
  );
}

export default HomeSection;
