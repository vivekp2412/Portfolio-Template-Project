import React, { useRef, useState } from "react";
import style from "../Product-Form/style.module.css";
import {
  InputRef,
  Modal,
  Form,
  Input,
  Select,
  Button,
  Divider,
  Space,
  Upload,
} from "antd";
import { message } from "antd";
import { useEffect } from "react";
import { dataref } from "../../../../firebase";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

interface Datatype {
  productImage: File;
  productId: string;
  productCategory: string;
  productName: string;
  productImageUrl: string;
}
let imgurls: string[] = [];

//Modal Component
const ProductForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imgref: React.MutableRefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement>(null);
  const [productArray, setProductArray] = useState<Datatype[]>();
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uniqueId, setUniqueId] = useState("");
  const formRef = useRef(null);
  useEffect(() => {
    const fetchCategories = async () => {
      const category = await dataref.ref("Products Categories").once("value");
      if (category.val() == undefined) {
        setItems([]);
      } else {
        setItems(category.val().Categories);
      }
    };
    fetchCategories();
  }, []);

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    dataref.ref("Products Categories").set({
      Categories: [...items, name],
    });
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
  }, []);
  //showmodal
  const showModal = () => {
    setIsModalOpen(true);
  };
  //handleOk function of modal
  const handleOk = () => {
    console.log("hi");
    setIsModalOpen(false);
  };
  // handle cancel button of modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log(fileList);
    if (fileList.length > 0) {
      let data = {
        ...values,
        productId: uniqueId,
      };

      dataref.ref("Products").set({
        productList: [...productArray, data],
      });

      // console.log(imageArray);
      setProductArray([...productArray, data]);
      form.resetFields();
      handleOk();
      setFileList([]);
    }
  };

  const onReset = () => {
    setFileList([]);
    form.resetFields();
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }

    return isJpgOrPng && isLt2M;
  };
  const handleSelect = (e) => {
    const id = e.slice(0, 3);
    let uniqueNumber = Date.now().toString();

    setUniqueId(id.toUpperCase() + uniqueNumber.slice(-4));
  };

  const handleChange = (info) => {
    info.file.status = "done";
    if (info.fileList.length == 0) {
      setFileList([]);
    } else {
      setFileList(info.fileList);
    }
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
        <Form
          initialValues={{ productId: uniqueId }}
          ref={formRef}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
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
                      ref={inputRef}
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
              options={items.map((item) => ({ label: item, value: item }))}
            />
          </Form.Item>
          <Form.Item
            name="productImage"
            label="Images"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            rules={[{ required: true }]}
          >
            <Upload
              fileList={fileList}
              maxCount={4}
              name="productImage"
              beforeUpload={beforeUpload}
              onChange={handleChange}
              accept=".png,.jpg,.jpeg"
              customRequest={() => {
                return;
              }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <div className={style.button_container}>
              <Button htmlType="submit" className={style.button_modal}>
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
export default ProductForm;
