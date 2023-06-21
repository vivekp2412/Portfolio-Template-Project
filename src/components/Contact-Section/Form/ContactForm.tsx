import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import style from "../Form/style.module.css";
import { useAppSelector } from "../../../Hooks/Hooks";
import { NavLink } from "react-router-dom";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  number: Yup.string().required("Number is required"),
  message: Yup.string().required("Message is required"),
});

const initialValues = {
  name: "",
  email: "",
  number: "",
  message: "",
};
const ContactForm = () => {
  const data = useAppSelector((state) => state.contact.contactDetails);

  const handleSubmit = (values, { resetForm }) => {
    console.log(data);

    if (data["Recieve Mail"]) {
      const mailtoURL = `mailto:${
        data.Email
      }?subject=Contact Form Submission&body=Name: ${encodeURIComponent(
        values.name
      )}%0D%0AEmail: ${encodeURIComponent(
        values.email
      )}%0D%0ANumber: ${encodeURIComponent(
        values.number
      )}%0D%0AMessage: ${encodeURIComponent(values.message)}`;
      window.open(
        "mailto:email@example.com?subject=Hello%20from%20Abstract!&body=Just%20popped%20in%20to%20say%20hello"
      );

      window.location.href = mailtoLink;
    }
    if (data["Recieve Whatsapp"]) {
      const whatsappNumber = `+91${data["Whatsapp Number"]}`; // Replace with your WhatsApp number
      const messageText = `Name: ${values.name}%0A Email: ${values.email} Number: ${values.number}  Message: ${values.message}`;
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        messageText
      )}`;

      window.open(whatsappURL);
    }
    //email
    //whatsapp

    resetForm();
  };

  return (
    <div className={style.form}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={style.name_email_number}>
            <div className={style.field}>
              <Field
                className={style.input}
                type="text"
                name="name"
                placeholder="Name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className={style.error}
              />
            </div>
            <div className={style.field}>
              <Field
                className={style.input}
                type="text"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={style.error}
              />
            </div>
            <div className={style.field}>
              <Field
                className={style.input}
                type="text"
                name="number"
                placeholder="Number"
              />
              <ErrorMessage
                name="number"
                component="div"
                className={style.error}
              />
            </div>
          </div>
          <div className={style.area}>
            <Field
              className={style.input}
              component="textarea"
              name="message"
              placeholder="Message"
              rows={5}
            />
            <ErrorMessage
              name="message"
              component="div"
              className={style.error}
            />
          </div>
          <div>
            <button className={style.button} type="submit">
              Send Message
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
