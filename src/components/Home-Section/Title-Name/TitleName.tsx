import style from "../Title-Name/style.module.css"
export default function TitleName() {
  return (
    <div className={style.title_and_button}>
        <div className={style.title}>
         PORTFOLIO
        </div>
        <div>
        <button className={style.button}>Start Here</button>
        </div>
    </div>
  )
}
