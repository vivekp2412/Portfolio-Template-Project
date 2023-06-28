import { Button,  Form, Input, Modal } from "antd";
import React, {  useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";
import {
  addCategory,
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
import ModalLoader from "../../../Comman/Modal-Loader/ModalLoader";

const TextArea = Input.TextArea;
interface WorkType{
  workTitle:string,
  workDesc:string,
  Image:string,
  workId:string
}
interface PropsType{
  setIsModalOpen:(x:boolean)=>void,
  isModalOpen:boolean,
  workId:string
}
let initialImg: string | null = null;
function EditFormModal(props:PropsType) {
  const categories = useAppSelector((state) => state.product.categories);
  const { setIsModalOpen, isModalOpen, workId } = props;
  const [items, setItems] = useState<string[]>(categories);
  const [name, setName] = useState("");
  const [form] = Form.useForm();
  const [uniqueId, setUniqueId] = useState("");
  const [imageUrls, setImageurl] = useState("");
  const [imageErr, setImageErr] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>();
  const [images, setImages] = useState([]);
  const formRef = useRef(null);
  const dispatch = useAppDispatch();

  const workList = useAppSelector((state) => state.work.allWorks);
  let filteredArray:WorkType[];
  if (workList.length > 0) {
    filteredArray = workList.filter((data) => data.workId == workId);
    if (filteredArray.length > 0) {
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
    setLoading(true);

    if (imageUrls == "") {
      data = {
        ...filteredArray[0],
        ...values,
        Image: initialImg,
      };
      dispatch(updateWork(data));
      form.resetFields();
      handleOk();
    } else {
      const storageRef = ref(storage, `Work/Edited ${uniqueId}`);
      uploadString(storageRef, imageUrls, "data_url").then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          setLoading(false);
          data = {
            ...filteredArray[0],
            ...values,
            Image: downloadURL,
          };
          dispatch(updateWork(data));
          form.resetFields();
          handleOk();
        });
      });
    }
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
        {loading ? (
          <>
            <ModalLoader />
          </>
        ) : (
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
                height={106}
              />
            )}
            <Form
              ref={formRef}
              form={form}
              name="control-hooks"
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
              initialValues={filteredArray?.length > 0 && filteredArray[0]}
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
                rules={[{ required: true, max: 140 }]}
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
                    Edit
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
        )}
      </Modal>
    </div>
  );
}

export default EditFormModal;
