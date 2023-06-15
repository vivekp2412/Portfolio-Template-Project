import React, { useRef, useState } from "react";
// import style from "../Modal/style.module.css";
import style from "../Work-Form/style.module.css";
import * as yup from "yup";
import { Button, Divider, Form, Input, Modal, Select, Space } from "antd";
const TextArea = Input.TextArea;

import { useEffect } from "react";
import { dataref } from "../../../../firebase";

import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";
import { addImage, fetchCarouselData } from "../../../../slices/homeSlice";
import { ImageUpload } from "../../Product-Section/Image-Upload/ImageUpload";
import { addWork } from "../../../../slices/workSlice";
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
const WorkFormModal = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const formRef = useRef(null);

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
  function handleSubmit(values) {
    console.log(values);

    if (images.length != 0) {
      setImageErr(false);
      let data = {
        image: imageUrls[0].dataURL,
        workId: idGenerator(),
        workTitle: values.WorkTitle,
        workDesc: values.WorkDescription,
      };
      // dispatch(addImage(data));
      console.log(data);

      dispatch(addWork(data));
      // await dispatch(fetchCarouselData());
      form.resetFields();
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
          Add New Work
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
        <Form
          ref={formRef}
          layout="vertical"
          name="Work Form"
          onFinish={handleSubmit}
          style={{ maxWidth: 600 }}
          form={form}
          //   initialValues={props.values}
        >
          <Form.Item
            name="WorkTitle"
            label="Work Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="WorkDescription"
            label="Work Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} cols={4} />
          </Form.Item>
          <Form.Item>
            <div className={style.button_container}>
              <Button
                htmlType="submit"
                className={style.button_modal}
                //   onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                htmlType="button"
                onClick={onReset}
                className={style.button_modal}
              >
                Reset
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default WorkFormModal;
