import React, { useRef, useState } from "react";
import style from "../Modal/style.module.css";
import * as yup from "yup";
import { Modal } from "antd";
import { Formik, Form, ErrorMessage } from "formik";
import { useEffect } from "react";
import { dataref } from "../../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";
import { addImage } from "../../../../slices/homeSlice";
import { ImageUpload } from "../../Product-Section/Image-Upload/ImageUpload";

interface Datatype {
  image: string;
  imageId: string;
  active: true;
}
// Random Id generator
function idGenerator() {
  return Date.now().toString().slice(-4);
}
//Modal Component
const FormModal = () => {
  const dispatch = useAppDispatch();
  const initialImage = useAppSelector((state) => state.home.allImages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgurl] = useState("");
  const [imageErr, setImageErr] = useState<boolean>(false);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageurl] = useState<{}[]>([]);
  const imgref: React.MutableRefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement>(null);
  const [imageArray, setImageArray] = useState(initialImage);
  const handleImageError = () => {
    setImageErr(false);
  };
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
  function checkIfFilesAreTooBig(files: File): boolean {
    let valid = true;
    if (files) {
      const size = files.size / 1024 / 1024;
      if (size > 5) {
        valid = false;
      }
    }
    return valid;
  }

  //Validation Schema for signup form
  const validationSchema = yup.object().shape({
    image: yup
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
      )
      .test("FILE_SIZE", "Too Big! Image only upto 2mb allowed", (value) => {
        if (value instanceof File && checkIfFilesAreTooBig(value)) {
          return true;
        }
        return false;
      }),
  });
  //initialValue of Form
  function geturls(array) {
    setImageurl(array);
  }
function handleSubmit(){
     if (images.length != 0) {
      setImageErr(false);
      let data ={
        image:imageUrls[0].dataURL,
        imageId:idGenerator(),
        active:true
      }
      dispatch(addImage(data))
      setImages([]);
      handleOk();
    }else{
      setImageErr(true)
    }
}  
const onReset = () => {
  setImageErr(false)
  setImages([]);
};

  return (
    <>
      <div className={style.modal_button_container}>
        <button
          onClick={showModal}
          className={`${style.button_modal} ${style.top_button}`}
        >
          Add Image
        </button>
      </div>
      <Modal
        title="Upload Image"
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        // closable={false}
        maskClosable={false}
        onCancel={handleCancel}
      >
        {/* <Formik
          initialValues={initialvalue}
          onSubmit={(values) => {
            let imageData = {
              image: imgUrl,
              imageId: idGenerator(),
              active: false,
            };
            if (imageArray?.length == 0) {
              imageData.active = true;
            }
            setImageArray([...imageArray, imageData]);
            if (imageArray != undefined) {
              dispatch(addImage(imageData));
            }
            imgref.current!.value = "";
            setImgurl("");
            values.image = "";
            handleOk();
          }}
          onReset={(values) => {
            imgref.current!.value = "";
            setImgurl("");
            values.image = "";
            handleCancel();
          }}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form>
                <div className={style.field}>
                  <input
                    type="text"
                    id="imgId"
                    value={idGenerator()}
                    disabled
                    hidden
                  ></input>
                </div>
                <div className={style.field}>
                  <label htmlFor="image">Add your Image</label>
                  <input
                    type="file"
                    ref={imgref}
                    id="image"
                    name="image"
                    onChange={(e) => {
                      let image = e.target.files![0];
                      formik.setFieldValue("image", image);
                      let reader = new FileReader();
                      reader.readAsDataURL(e.target.files![0]);
                      reader.addEventListener("load", () => {
                        if (typeof reader.result === "string") {
                          setImgurl(reader.result);
                        }
                      });
                    }}
                  ></input>
                  <ErrorMessage name="image">
                    {(msg) => {
                      return <div className={style.errorMessage}>{msg}</div>;
                    }}
                  </ErrorMessage>
                </div>
               
              </Form>
            );
          }}
        </Formik> */}
         <ImageUpload
            geturl={geturls}
            images={images}
            setImages={setImages}
            handleImageError={handleImageError}
          />
          {imageErr && <div className={style.errorMessage}>Required</div>}

           <div className={style.button_container}>
                  <button type="submit" onClick={handleSubmit} className={style.button_modal}>
                    Ok
                  </button>
                  <button type="reset" className={style.button_modal} onClick={onReset}>
                    Reset
                  </button>
                </div>
      </Modal>
    </>
  );
};
export default FormModal;
