import { useState } from "react";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import style from "../Preview-Table/style.module.css";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";
import EditFormModal from "../EditFormModal/EditFormModal";
import uuid from "react-uuid";
import { deleteProduct } from "../../../../slices/productSlice";
import Loader from "../../../Comman/Loader/Loader";

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
//Preview Component
function PreviewTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [productId, setProductId] = useState<string>();
  const productList = useAppSelector((state) => state.product.productList);
  const pending = useAppSelector((state) => state.product.pending);
  const dispatch = useAppDispatch();

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
        <img src={record[0].dataURL} style={{ width: 120, height: 120 }} />
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setProductId(record.productId);
              setIsModalOpen(true);
            }}
          >
            Update
          </a>
          <a onClick={() => dispatch(deleteProduct(record.productId))}>
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ fontWeight: "bolder" }}>Preview Images</div>

      <EditFormModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        productId={productId}
        key={uuid()}
      />

      <Table
        className={style.table}
        columns={columns}
        loading={pending}
        dataSource={productList}
        pagination={false}
      />
    </>
  );
}

export default PreviewTable;
