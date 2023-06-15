import { useState } from "react";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import style from "../Preview-Table/style.module.css";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";

import uuid from "react-uuid";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteProduct } from "../../../../slices/productSlice";
import Loader from "../../../Comman/Loader/Loader";
import { deleteWork } from "../../../../slices/workSlice";
import EditFormModal from "../../Product-Section/EditFormModal/EditFormModal";

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
  const workList = useAppSelector((state) => state.work.allWorks);
  const pending = useAppSelector((state) => state.work.pending);
  const dispatch = useAppDispatch();

  const columns: ColumnsType<DataType> = [
    {
      title: "Work Id",
      dataIndex: "workId",
    },
    {
      title: "Work Title",
      dataIndex: "workTitle",
    },
    {
      title: "Work Description",
      dataIndex: "WorkDesc",
    },
    {
      title: "Image",
      dataIndex: "Image",
      render: (record) => (
        <img src={record[0].dataURL} style={{ width: 120, height: 120 }} />
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <p
            className={style.action_update}
            onClick={() => {
              setProductId(record.workId);
              setIsModalOpen(true);
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
                    onClick: () => dispatch(deleteWork(record.workId)),
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
          dataSource={workList}
          pagination={false}
        />
      </div>
    </>
  );
}

export default PreviewTable;
