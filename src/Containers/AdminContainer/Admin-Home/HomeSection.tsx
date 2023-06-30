import { useEffect } from "react";
import FormModal from "../../../components/Admin-Section/Home-Section/Modal/FormModal";
import PreviewTable from "../../../components/Admin-Section/Home-Section/Preview-Table/PreviewTable";
import Loader from "../../../components/Comman/Loader/Loader";
import ModalLoader from "../../../components/Comman/Modal-Loader/ModalLoader";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import { fetchCarouselData } from "../../../slices/homeSlice";

import style from "../Admin-Home/style.module.css";
import AdminNavbarContainer from "../Admin-Navbar/AdminNavbarContainer";

function HomeSection() {
  const dispatch = useAppDispatch();
  const pending = useAppSelector((state) => state.home.pending);

  if (pending) {
    console.log("hi");
    return (
      <div className="flex justify-center items-center h-screen z-[10000]">
        <Loader />
        {/* <h1>Hello</h1> */}
      </div>
    );
  }
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
