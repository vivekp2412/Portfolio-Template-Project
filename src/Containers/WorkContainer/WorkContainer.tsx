import { useEffect } from "react";
import CardContainer from "../../components/Work-Section/CardContainer/CardContainer";
import Carousell from "../../components/Work-Section/Carousel/Carousell";
import WorkTitle from "../../components/Work-Section/Section-Title/WorkTitle";
import { useAppDispatch, useAppSelector } from "../../Hooks/Hooks";
import { fetchWorkData } from "../../slices/workSlice";
import style from "../WorkContainer/style.module.css";
function WorkContainer() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchWorkData());
    };
    fetch();
  }, []);
  const allWorks = useAppSelector((state) => state.work.allWorks);

  return (
    <div className={style.workContainer}>
      <WorkTitle />
      {/* <CardContainer /> */}
      <Carousell />
    </div>
  );
}

export default WorkContainer;
