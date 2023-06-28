import React, { useEffect, useMemo } from "react";
import ContactForm from "../../../components/Admin-Section/Contact-Section/Contact-Form/ContactForm";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import { fetchContactData } from "../../../slices/contactSlice";
import style from "../Admin-Contact/style.module.css";
import ContactTitle from "../../../components/Admin-Section/Contact-Section/Contact-Title/Contact Title";
import AdminNavbarContainer from "../Admin-Navbar/AdminNavbarContainer";
export default function AdminContact() {
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
