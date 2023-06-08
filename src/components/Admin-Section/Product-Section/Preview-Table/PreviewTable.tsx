import { useEffect, useState } from "react";
import { dataref } from "../../../../firebase";
import { Space, Table } from "antd";
import style from "../Preview-Table/style.module.css";
import type { ColumnsType } from "antd/es/table";

import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";
import EditFormModal from "../EditFormModal/EditFormModal";
import uuid from "react-uuid";
import {
  deleteProduct,
  fetchCategories,
} from "../../../../slices/productSlice";

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
  const [productId, setProductId] = useState<string>();
  const productList = useAppSelector((state) => state.product.productList);
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
        <img src={record[0].dataURL} width={100} height={100} />
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <a
            className={style.action_link}
            onClick={() => {
              setProductId(record.productId);
              setIsModalOpen(true);
            }}
          >
            Update
          </a>
          <a
            className={style.action_link}
            onClick={() => dispatch(deleteProduct(record.productId))}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className={style.title}>Preview Images</div>

      <EditFormModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        productId={productId}
        key={uuid()}
      />
      <Table
        className={style.table}
        columns={columns}
        dataSource={productList}
        // loading={isLoading}
        pagination={false}
      />
    </>
  );
}

export default PreviewTable;
