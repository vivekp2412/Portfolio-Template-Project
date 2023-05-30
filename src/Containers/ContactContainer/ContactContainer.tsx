import ContactHeader from "../../components/Contact-Section/ContactHeader/ContactHeader";
import ContactForm from "../../components/Contact-Section/Form/ContactForm";
import ContactTitle from "../../components/Contact-Section/Section-Title/ContactTitle";
import style from "../ContactContainer/style.module.css";
function ContactContainer() {
  return (
    <div className={style.contactContainer}>
      <ContactHeader />
      <ContactTitle />
      <ContactForm />
    </div>
  );
}

export default ContactContainer;
