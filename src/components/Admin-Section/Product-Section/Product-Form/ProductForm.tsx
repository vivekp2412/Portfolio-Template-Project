import React, { useRef, useState } from "react";
import style from "../Product-Form/style.module.css";
import { Modal, Form, Input, Select, Button, Divider, Space } from "antd";
import { useEffect } from "react";
import { dataref } from "../../../../firebase";
import { PlusOutlined } from "@ant-design/icons";
import { ImageUpload } from "../Image-Upload/ImageUpload";
import {
  addCategory,
  addProduct,
  fetchCategories,
} from "../../../../slices/productSlice";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";
interface Datatype {
  productImage: File;
  productId: string;
  productDescription: string;
  productCategory: string;
  productName: string;
  ImageUrl: string;
}

//Modal Component
const ProductForm = (props) => {
  let categories = useAppSelector((state) => state.product.categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productArray, setProductArray] = useState<Datatype[]>();
  const [items, setItems] = useState<string[]>(categories);
  const [name, setName] = useState("");
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uniqueId, setUniqueId] = useState("");
  const formRef = useRef(null);
  const [imageUrls, setImageurl] = useState<{}[]>([]);
  const [imageErr, setImageErr] = useState<boolean>(false);
  const [images, setImages] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setItems(categories);
  }, [categories]);

  const productList = useAppSelector((state) => state.product.productList);
  function geturls(array) {
    setImageurl(array);
  }
  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name]);
    dispatch(addCategory([...items, name]));

    setName("");
  };

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
    dispatch(fetchCategories());
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

  const onFinish = (values: any) => {
    if (images.length != 0) {
      setImageErr(false);
      let data = {
        ...values,
        productId: uniqueId,
        Image: imageUrls,
      };
      if (productArray) {
        dispatch(addProduct(data));
        setProductArray([...productArray, data]);
      }
      form.resetFields();
      setImages([]);
      handleOk();
      setFileList([]);
    } else {
      setImageErr(true);
    }
  };

  const onReset = () => {
    setImages([]);
    setFileList([]);
    form.resetFields();
  };

  const handleSelect = (e: string) => {
    const id = e.slice(0, 3);
    let uniqueNumber = Date.now().toString();
    setUniqueId(id.toUpperCase() + uniqueNumber.slice(-4));
  };

  const handleImageError = () => {
    setImageErr(false);
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
        maskClosable={false}
        onCancel={handleCancel}
      >
        <>
          <ImageUpload
            geturl={geturls}
            images={images}
            setImages={setImages}
            handleImageError={handleImageError}
          />
          {imageErr && <div className={style.error}>Required</div>}
          <Form
            ref={formRef}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            initialValues={props.values}
          >
            <Form.Item
              name="productName"
              label="Product Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="productDescription"
              label="Product Description"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="productCategory"
              label="Category"
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: 350 }}
                onChange={handleSelect}
                placeholder="Select category"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
                      <input
                        name="productCategory"
                        id="productCategory"
                        placeholder="enter category"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={addItem}
                      >
                        Add New
                      </Button>
                    </Space>
                  </>
                )}
                options={items.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Form.Item>
            <Form.Item>
              <div className={style.button_container}>
                <Button
                  htmlType="submit"
                  className={style.button_modal}
                  onClick={onFinish}
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
        </>
      </Modal>
    </>
  );
};
export default ProductForm;
