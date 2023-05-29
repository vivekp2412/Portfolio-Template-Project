import style from "../Title-Name/style.module.css";
export default function TitleName() {
  return (
    <div className={style.title_and_button}>
      <div className={style.title}>
        PORTF<span className={style.O}>O</span>LIO
      </div>
      <div>
        <button className={style.button}>Start Here</button>
      </div>
    </div>
  );
}
