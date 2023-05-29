import style from "../Contact-Section/ContactHeader/style.module.css";
function ContactHeader() {
  return (
    <div className={style.headerConatiner}>
      <div className={style.card}>
        <div className={style.icon}></div>
        <div className={style.details}>
          <div className={style.title}>OUR LOCATION</div>
          <div className={style.information}>4,Binori Square-Ahmedabad</div>
        </div>
        <div className={style.card}>
          <div className={style.icon}></div>
          <div className={style.details}>
            <div className={style.title}>SEND E-MAIL</div>
            <div className={style.information}>abc@gmail.com</div>
          </div>
        </div>
        <div className={style.card}>
          <div className={style.icon}></div>
          <div className={style.details}>
            <div className={style.title}>CONTACT US</div>
            <div className={style.information}>+919723733655</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactHeader;
