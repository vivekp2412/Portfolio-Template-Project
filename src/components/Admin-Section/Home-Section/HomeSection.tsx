import Modal from "antd/es/modal/Modal";
import style from "../Home-Section/style.module.css";
import FormModal from "./Modal/FormModal";
import PreviewImage from "./Preview-Images/PreviewImage";
function HomeSection() {
  return (
    <div className={style.Container}>
      <div className={style.homeSection}>
        <FormModal />
        <PreviewImage />
      </div>
    </div>
  );
}

export default HomeSection;
