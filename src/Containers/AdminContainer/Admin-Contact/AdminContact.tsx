import ContactForm from "../../../components/Admin-Section/Contact-Section/Contact-Form/ContactForm";

import style from "../Admin-Contact/style.module.css";
import ContactTitle from "../../../components/Admin-Section/Contact-Section/Contact-Title/Contact Title";
import AdminNavbarContainer from "../Admin-Navbar/AdminNavbarContainer";
import { useAppSelector } from "../../../Hooks/Hooks";
import Loader from "../../../components/Comman/Loader/Loader";

export default function AdminContact() {
  const pending = useAppSelector((state) => state.contact.pending);
  console.log(pending);

  if (pending) {
    console.log("pending");

    return (
      <>
        <Loader />
        <h1>Hu</h1>
      </>
    );
  } else {
    return (
      <>
        <AdminNavbarContainer />
        <div className={style.Container}>
          <div className={style.formContainer}>
            <ContactTitle />
            <ContactForm />
          </div>
        </div>
      </>
    );
  }
}
