import React, { useEffect, useMemo } from 'react'
import ContactForm from '../../../components/Admin-Section/Contact-Section/Contact-Form/ContactForm'
import { useAppDispatch, useAppSelector } from '../../../Hooks/Hooks'
import { fetchContactData } from '../../../slices/contactSlice';
import style from "../Admin-Contact/style.module.css"
import ContactTitle from '../../../components/Admin-Section/Contact-Section/Contact-Title/Contact Title';
export default function AdminContact() {
  // const dispatch = useAppDispatch();
  // useEffect(()=>{
  //   const fetch=async()=>{

  //     await dispatch(fetchContactData());
  //   }
  //   fetch();
  // })
  return (
    <div className={style.Container}>
<div className={style.formContainer}>
<ContactTitle/>
<ContactForm/>
</div>
    </div>
    )
}