import React from "react";
import WorkFormModal from "../../../components/Admin-Section/Work-Section/Work-Form/WorkForm";
import style from "../Admin-OurWork/style.module.css";
import PreviewTable from "../../../components/Admin-Section/Work-Section/Preview-Table/PreviewTable";
function AdminOurWorkContainer() {
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
