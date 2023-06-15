import React, { useRef, useState } from "react";
import style from "../Modal/style.module.css";
import * as yup from "yup";
import { Modal } from "antd";
import { Formik, Form, ErrorMessage } from "formik";
import { useEffect } from "react";
import { dataref } from "../../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";
import {
  addImage,
  addImageData,
  fetchCarouselData,
} from "../../../../slices/homeSlice";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageErr, setImageErr] = useState<boolean>(false);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageurl] = useState<{}[]>([]);

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

  function geturls(array) {
    setImageurl(array);
  }
  async function handleSubmit() {
    if (images.length != 0) {
      setImageErr(false);
      let data = {
        image: imageUrls[0].dataURL,
        imageId: idGenerator(),
        active: true,
      };
      // dispatch(addImage(data));
      dispatch(addImage(data));
      // await dispatch(fetchCarouselData());
      setImages([]);
      handleOk();
    } else {
      setImageErr(true);
    }
  }
  const onReset = () => {
    setImageErr(false);
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
        maskClosable={false}
        onCancel={handleCancel}
      >
        <ImageUpload
          geturl={geturls}
          images={images}
          setImages={setImages}
          handleImageError={handleImageError}
          imageError={imageErr}
        />

        <div className={style.button_container}>
          <button
            type="submit"
            onClick={handleSubmit}
            className={style.button_modal}
          >
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
