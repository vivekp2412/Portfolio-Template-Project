import CardContainer from "../../components/Work-Section/CardContainer/CardContainer";
import Carousell from "../../components/Work-Section/Carousel/Carousell";
import WorkTitle from "../../components/Work-Section/Section-Title/WorkTitle";
import style from "../WorkContainer/style.module.css";
function WorkContainer() {
  return (
    <div className={style.workContainer}>
      <WorkTitle />
      <CardContainer />
    </div>
  );
}

export default WorkContainer;
