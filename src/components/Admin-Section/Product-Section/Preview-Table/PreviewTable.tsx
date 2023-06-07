import { useEffect, useRef, useState } from "react";
import { dataref } from "../../../../firebase";
import { Divider, Form, Input, Select, Space, Table, Tag } from "antd";
import { Button, Modal } from "antd";
import style from "../Preview-Table/style.module.css";
import type { ColumnsType } from "antd/es/table";

import ProductForm from "../Product-Form/ProductForm";
import { ImageUpload } from "../Image-Upload/ImageUpload";
import { PlusOutlined } from "@ant-design/icons";
//Type Declaration
interface DataType {
  productImage: File[];
  productId: string;
  productCategory: string;
  productName: string;
  productDescription: string;
  ImageUrl: string;
}
//Delete function for data
const deleteAndRearrangeArray = async (id: string) => {
  try {
    const snapshot = await dataref.ref("Products").once("value");
    let dataArray = snapshot.val().productList;
    const indexToDelete = dataArray.findIndex((object: DataType) => {
      return object.productId == id;
    });
    dataArray.splice(indexToDelete, 1);

    await dataref.ref("Products").set({ productList: dataArray });
    console.log("Array rearranged successfully.");
  } catch (error) {
    console.error("Error rearranging the array:", error);
  }
};
//Fetch data
async function getData() {
  const snapshot = await dataref.ref("Products").once("value");
  let originalArray: DataType[];

  if (snapshot.val()) {
    originalArray = snapshot.val().productList;
  } else {
    originalArray = [];
  }
  return originalArray;
}

//Preview Component
function PreviewTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataType[]>();
  const [modalValues, setModalValues] = useState<{}>();
  const [productArray, setProductArray] = useState<Datatype[]>();
  const [items, setItems] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uniqueId, setUniqueId] = useState("");
  const formRef = useRef(null);
  const [imageUrls, setImageurl] = useState<{}[]>([]);
  const [imageErr, setImageErr] = useState<boolean>(false);
  const [images, setImages] = useState([]);
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
  function geturls(array) {
    setImageurl(array);
  }
  // function getModalValue(id) {
  //   data?.filter((x) => {
  //     if (x.productId == id) {
  //       return x;
  //     }
  //   });
  // }
  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name]);
    setName("");
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

  //handleOk function of modal

  // handle cancel button of modal

  const onFinish = (values: any) => {
    if (images.length != 0) {
      setImageErr(false);
      let data = {
        ...values,
        productId: uniqueId,
        Image: imageUrls,
      };
      if (productArray) {
        dataref.ref("Products").set({
          productList: [...productArray, data],
        });

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
    setModalValues(() => {});
    setImages([]);
    setFileList([]);
    // handleCancel();
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
  const handleCancel = () => {
    onReset();
    setIsModalOpen(false);
  };
  //Switch Change handler

  useEffect(() => {
    async function fetchdata() {
      const fetchedData = await getData();
      const urlArray = fetchedData.map(async (x) => {});

      setData(fetchedData);
      setIsLoading(false);
    }
    fetchdata();
  }, []);
  const columns: ColumnsType<DataType> = [
    {
      title: "Product Id",
      dataIndex: "productId",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
    },
    {
      title: "Product description",
      dataIndex: "productDescription",
    },
    {
      title: "Product Category",
      dataIndex: "productCategory",
    },
    {
      title: "Product Image",
      dataIndex: "Image",
      render: (record) => (
        <img src={record[0].dataURL} width={100} height={100} />
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <a
            className={style.action_link}
            onClick={
              () => showModal(record.productId)
              // setIsModalOpen(true);
            }
          >
            Update
          </a>
          <a
            className={style.action_link}
            onClick={() => deleteAndRearrangeArray(record.productId)}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];
  //Show Modal Function
  // const showModal = (id: string) => {
  //   const filteredArr = data?.filter((x) => {
  //     return x.productId == id;
  //   });
  //   if (filteredArr) {
  //     setModalValues(filteredArr[0]);
  //   }

  //   setIsModalOpen(true);
  // };
  const showModal = (id: string) => {
    const filteredArr = data?.filter((x) => x.productId === id);
    if (filteredArr && filteredArr.length > 0) {
      setModalValues((prevValues) => {
        setIsModalOpen(true);
        return {
          ...prevValues,
          ...filteredArr[0],
        };
      });
    }
  };
  //HandleOk funtion for Modal
  const handleOk = () => {
    setIsModalOpen(false);
  };
  //Close Modal Function

  return (
    <>
      <div className={style.title}>Preview Images</div>
      <Modal
        title="Image"
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
          {imageErr && <div className={style.error}>Required</div>}

          <Form
            ref={formRef}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            initialValues={modalValues}
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
                options={items.map((item) => ({ label: item, value: item }))}
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
                  Close
                </Button>
              </div>
            </Form.Item>
          </Form>
        </>
      </Modal>
      <Table
        className={style.table}
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={false}
      />
    </>
  );
}

export default PreviewTable;
