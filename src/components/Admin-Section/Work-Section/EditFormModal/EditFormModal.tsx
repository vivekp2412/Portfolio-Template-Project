import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Modal, Select, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { dataref } from "../../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";
import {
  addCategory,
  fetchCategories,
  updateProduct,
} from "../../../../slices/productSlice";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
const storage = getStorage();
import style from "../Work-Form/style.module.css";
import { ImageUpload } from "../../Product-Section/Image-Upload/ImageUpload";
import { updateWork } from "../../../../slices/workSlice";

const TextArea = Input.TextArea;
let initialImg: string | null = null;
function EditFormModal(props) {
  const categories = useAppSelector((state) => state.product.categories);
  const { setIsModalOpen, isModalOpen, workId } = props;
  const [items, setItems] = useState<string[]>(categories);
  const [name, setName] = useState("");
  const [form] = Form.useForm();
  const [uniqueId, setUniqueId] = useState("");
  const [imageUrls, setImageurl] = useState("");
  const [imageErr, setImageErr] = useState<boolean>(false);
  const [images, setImages] = useState([]);
  const formRef = useRef(null);
  const dispatch = useAppDispatch();
  
  const workList = useAppSelector((state) => state.work.allWorks);
  let filteredArray;
  if(workList.length>0){

    filteredArray = workList.filter((data) => data.workId == workId);
    if (filteredArray.length>0) {
      initialImg = filteredArray[0].Image;
    }
  } 
  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    let categoryExists = items.filter(
      (category) => category.toUpperCase() == name.toUpperCase()
    );

    if (categoryExists.length > 0) {
      alert("Category already present");
      return;
    }
    setItems([...items, name]);
    dispatch(addCategory([...items, name]));

    setName("");
  };
  function geturls(array) {
    setImageurl(array[0].dataURL);
    initialImg = null;
  }

  const onFinish = (values: any) => {
    let data;
    console.log(filteredArray[0]);
    console.log(values);
    
    if (imageUrls == "") {
      data = {
        ...filteredArray[0],
        ...values,
        Image:initialImg,
      };
      console.log(data);
      dispatch(updateWork(data));
    } else {
      const storageRef = ref(storage, `Work/Edited ${uniqueId}`);
      uploadString(storageRef, imageUrls, "data_url").then(() => {
        console.log("Uploaded a base64 string!");
        getDownloadURL(storageRef).then((downloadURL) => {
          data = {
            ...filteredArray[0],
            ...values,
            Image: downloadURL,
          };
          console.log(data);
          dispatch(updateWork(data));
        });
      });
    }

    form.resetFields();
    handleOk();
  };
  const handleImageError = () => {
    setImageErr(false);
  };
  const onReset = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleSelect = (e: string) => {
    const id = e.slice(0, 3);
    let uniqueNumber = Date.now().toString();
    setUniqueId(id.toUpperCase() + uniqueNumber.slice(-4));
  };

  const handleCancel = () => {
    onReset();
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        title="Edit Form"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className={style.modal}
        footer={null}
      >
        <>
          <ImageUpload
            geturl={geturls}
            images={images}
            setImages={setImages}
            handleImageError={handleImageError}
          />
          {!imageUrls && (
            <img
              src={initialImg ?? imageUrls}
              className={style.prevImage}
              // style={{ margin: "10px auto" }}
              height={106}
            />
          )}
          <Form
            ref={formRef}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            initialValues={filteredArray[0]}
            layout="vertical"
          >
            <Form.Item
              name="workTitle"
              label="Work Title"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="workDesc"
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
                  // onClick={onFinish}
                >
                  Submit
                </Button>
                <Button
                  htmlType="button"
                  onClick={onReset}
                  className={style.button_modal}
                >
                  Close
                </Button>
              </div>
            </Form.Item>
          </Form>
        </>
      </Modal>
    </div>
  );
}

export default EditFormModal;
