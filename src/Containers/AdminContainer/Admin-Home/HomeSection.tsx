import Modal from "antd/es/modal/Modal";
import FormModal from "../../../components/Admin-Section/Home-Section/Modal/FormModal";
import PreviewTable from "../../../components/Admin-Section/Home-Section/Preview-Table/PreviewTable";

import style from "../Admin-Home/style.module.css";
function HomeSection() {
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
