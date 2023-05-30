import React from "react";
import style from "../Form/style.module.css";
function ContactForm() {
  return (
    <div className="formContainer">
      <div className={style.form}>
        <div className={style.name_email_number}>
          <div className={style.field}>
            <input
              className={style.input}
              type="text"
              placeholder="Name"
            ></input>
          </div>
          <div className={style.field}>
            <input
              className={style.input}
              type="text"
              placeholder="Email"
            ></input>
          </div>
          <div className={style.field}>
            <input
              className={style.input}
              type="text"
              placeholder="Number"
            ></input>
          </div>
        </div>
        <div className={style.area}>
          <textarea
            className={style.input}
            placeholder="Message"
            rows={5}
          ></textarea>
        </div>
        <div>
          <button className={style.button}>Send Message</button>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
