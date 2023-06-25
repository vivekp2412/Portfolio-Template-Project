import React, { useEffect } from "react";

import WorkFormModal from "../../../components/Admin-Section/Work-Section/Work-Form/WorkForm";
import style from "../Admin-OurWork/style.module.css";
import PreviewTable from "../../../components/Admin-Section/Work-Section/Preview-Table/PreviewTable";
import { useAppDispatch } from "../../../Hooks/Hooks";
import { fetchWorkData } from "../../../slices/workSlice";
function AdminOurWorkContainer() {
  const dispatch = useAppDispatch();
  useEffect(()=>{
  //  dispatch(fetchWorkData());
  },[])
  return (
    <div className={style.Container}>
      <div className={style.workContainer}>
        <WorkFormModal />
        <PreviewTable/>
      </div>
    </div>
  );
}

export default AdminOurWorkContainer;
