import { useEffect } from "react";
import CardContainer from "../../components/Work-Section/CardContainer/CardContainer";
import Carousell from "../../components/Work-Section/Carousel/Carousell";
import WorkTitle from "../../components/Work-Section/Section-Title/WorkTitle";
import { useAppDispatch } from "../../Hooks/Hooks";
import { fetchWorkData } from "../../slices/workSlice";
import style from "../WorkContainer/style.module.css";
function WorkContainer() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchWorkData());
  }, []);
  return (
    <div className={style.workContainer}>
      <WorkTitle />
      <CardContainer />
    </div>
  );
}

export default WorkContainer;
