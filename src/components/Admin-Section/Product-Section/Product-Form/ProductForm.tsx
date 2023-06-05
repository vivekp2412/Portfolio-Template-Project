import React, { useRef, useState } from "react";
import style from "../Product-Form/style.module.css";
import * as yup from "yup";
import { Modal } from "antd";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useEffect } from "react";
import { dataref } from "../../../../firebase";
interface Datatype {
  productImage: File;
  productId: string;
  productCategory: string;
  productName: string;
  productImageUrl: string;
}
// Random Id generator
function idGenerator() {
  return Math.floor(Math.random() * 10000).toString();
}
//Modal Component
const ProductForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgurl] = useState("");
  const imgref: React.MutableRefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement>(null);
  const [productArray, setProductArray] = useState<Datatype[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await dataref.ref("Products").once("value");
        if (products.val() == undefined) {
          setProductArray([]);
        } else {
          setProductArray(products.val().productList);
        }
      } catch (error) {
        console.log("Error fetching data from Firebase:", error);
      }
    };
    fetchData();
  }, []);
  //showmodal
  const showModal = () => {
    setIsModalOpen(true);
  };
  //handleOk function of modal
  const handleOk = () => {
    setIsModalOpen(false);
  };
  // handle cancel button of modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //file format validation
  function checkIfFilesAreCorrectType(files: File): boolean {
    let valid = true;
    if (files) {
      if (!["image/jpg", "image/jpeg", "image/png"].includes(files.type)) {
        valid = false;
      }
    }
    return valid;
  }

  //Validation Schema for signup form
  const validationSchema = yup.object().shape({
    productImage: yup
      .mixed()
      .required(" Image Required !")
      .test(
        "FILE_TYPE",
        "Invalid File Format! (Only Png,jpeg,jpg allowed)",
        (value) => {
          if (value instanceof File && checkIfFilesAreCorrectType(value)) {
            return true;
          }
          return false;
        }
      ),
    productCategory: yup.string().required("Category required"),
    productName: yup.string().required("Product Name Required"),
    productId: yup.string().required("Id Required"),
  });
  //initialValue of Form
  const initialvalue = {
    productImageUrl: "",
    productId: "",
    productCategory: "",
    productName: "",
    productImage: null,
  };

  return (
    <>
      <div className={style.modal_button_container}>
        <button
          onClick={showModal}
          className={`${style.button_modal} ${style.top_button}`}
        >
          Add Product
        </button>
      </div>
      <Modal
        title="Add Details"
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        closable={false}
        maskClosable={false}
        onCancel={handleCancel}
      >
        <Formik
          initialValues={initialvalue}
          onSubmit={(values, actions) => {
            values.productImageUrl = imgUrl;
            console.log(values);

            setProductArray([...productArray, imageData]);

            imgref.current!.value = "";
            setImgurl("");
            // values.productImage = "";
            // actions.resetForm();
            handleOk();
          }}
          onReset={(values) => {
            imgref.current!.value = "";
            setImgurl("");
            handleCancel();
          }}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form>
                {/* <div className={style.field}>
                  <input
                    type="text"
                    id="imgId"
                    value={idGenerator()}
                    disabled
                    hidden
                  ></input>
                </div> */}
                <div className={style.field}>
                  <label htmlFor="productImage">Add your Image</label>
                  <input
                    type="file"
                    ref={imgref}
                    id="productImage"
                    name="productImage"
                    onChange={(e) => {
                      let image = e.target.files![0];
                      formik.setFieldValue("productImage", image);
                      let reader = new FileReader();
                      reader.readAsDataURL(e.target.files![0]);
                      reader.addEventListener("load", () => {
                        if (typeof reader.result === "string") {
                          setImgurl(reader.result);
                        }
                      });
                    }}
                  ></input>
                  <ErrorMessage name="productImage">
                    {(msg) => {
                      return <div className={style.errorMessage}>{msg}</div>;
                    }}
                  </ErrorMessage>
                </div>
                <div className={style.field}>
                  <label htmlFor="productId">Product id</label>
                  <Field type="text" id="productId" name="productId"></Field>
                  <ErrorMessage name="productId">
                    {(msg) => {
                      return <div className={style.errorMessage}>{msg}</div>;
                    }}
                  </ErrorMessage>
                </div>
                <div className={style.field}>
                  <label htmlFor="productName">Product name</label>
                  <Field
                    type="text"
                    id="productName"
                    name="productName"
                  ></Field>
                  <ErrorMessage name="productName">
                    {(msg) => {
                      return <div className={style.errorMessage}>{msg}</div>;
                    }}
                  </ErrorMessage>
                </div>
                <div className={style.field}>
                  <label htmlFor="productCategory">Product Category</label>
                  <Field
                    type="text"
                    id="productCategory"
                    name="productCategory"
                  ></Field>
                  <ErrorMessage name="productCategory">
                    {(msg) => {
                      return <div className={style.errorMessage}>{msg}</div>;
                    }}
                  </ErrorMessage>
                </div>
                <div className={style.button_container}>
                  <button type="submit" className={style.button_modal}>
                    Ok
                  </button>
                  <button type="reset" className={style.button_modal}>
                    Close
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};
export default ProductForm;
