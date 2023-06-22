import { useState } from "react";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import style from "../Preview-Table/style.module.css";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";
import EditFormModal from "../EditFormModal/EditFormModal";
import uuid from "react-uuid";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
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
  const [expanded, setExpanded] = useState(false);
  const [expandId, setExpandId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [productId, setProductId] = useState<string>();
  const productList = useAppSelector((state) => state.product.productList);

  const pending = useAppSelector((state) => state.product.pending);
  const dispatch = useAppDispatch();
  const MAX_DESCRIPTION_LENGTH = 50;
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
      title: "Product Description",
      dataIndex: "productDescription",
      render: (text, record) => {
        return (
          <div>
            {expanded && record.productId == expandId ? (
              <div>{text}</div>
            ) : (
              <div className={style.ellipsisTwoLines}>{text}</div>
            )}
            {text.length > 50 && (
              <span
                className={style.readMoreLink}
                onClick={() => {
                  setExpandId(record.productId);
                  setExpanded(!expanded);
                }}
              >
                {expanded && record.productId == expandId ? (
                  <a style={{ color: "blue" }}>Read Less</a>
                ) : (
                  <a style={{ color: "blue" }}>Read More</a>
                )}
              </span>
            )}
          </div>
        );
      },
    },

    {
      title: "Product Category",
      dataIndex: "productCategory",
    },
    {
      title: "Product Image",
      dataIndex: "Image",
      render: (_, record) => (
        <img src={record.Image} style={{ width: 120, height: 120 }} />
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <p
            className={style.action_update}
            onClick={() => {
              setIsModalOpen(true);
              setProductId(record.productId);
            }}
          >
            Update
          </p>
          <p
            className={style.action_delete}
            onClick={() => {
              confirmAlert({
                title: "Deleting Image",
                message: "Are you sure to do this.",
                buttons: [
                  {
                    label: "Yes",
                    onClick: () => dispatch(deleteProduct(record.productId)),
                  },
                  {
                    label: "No",
                    onClick: () => {},
                  },
                ],
              });
            }}
          >
            Delete
          </p>
        </Space>
      ),
    },
  ];
  const expandable = {
    expandedRowRender: (record) => <div>{record.productDescription}</div>,
  };
  return (
    <>
      <div className={style.title}>Preview Images</div>

      <EditFormModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        productId={productId}
        key={uuid()}
      />
      <div className={style.tableContainer}>
        <Table
          className={style.table}
          columns={columns}
          loading={pending}
          dataSource={productList}
          pagination={false}
          // expandable={expandable}
          // expandRowByClick={true}
        />
      </div>
    </>
  );
}

export default PreviewTable;
