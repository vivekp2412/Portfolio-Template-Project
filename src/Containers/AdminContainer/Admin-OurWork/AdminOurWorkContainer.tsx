import React from "react";
import WorkFormModal from "../../../components/Admin-Section/Work-Section/Work-Form/WorkForm";
import style from "../Admin-OurWork/style.module.css";
function AdminOurWorkContainer() {
  return (
    <div className={style.Container}>
      <div className={style.workContainer}>
        <WorkFormModal />
      </div>
    </div>
  );
}

export default AdminOurWorkContainer;
