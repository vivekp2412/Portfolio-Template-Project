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
import EditFormModal from "../EditFormModal/EditFormModal";

function PreviewTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [workId, setWorkId] = useState<string>();
  const workList = useAppSelector((state) => state.work.allWorks);
  const pending = useAppSelector((state) => state.work.pending);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);
  const [expandId, setExpandId] = useState();

  const columns = [
    {
      title: "Work Id",
      dataIndex: "workId",
    },
    {
      title: "Work Title",
      dataIndex: "workTitle",
    },
    {
      title: "Description",
      dataIndex: "workDesc",
      render: (text, record) => {
        return (
          <div>
            {expanded && record.workId == expandId ? (
              <div>{text}</div>
            ) : (
              <div className={style.ellipsisTwoLines}>{text}</div>
            )}
            {text.length > 50 && (
              <span
                className={style.readMoreLink}
                onClick={() => {
                  setExpandId(record.workId);
                  setExpanded(!expanded);
                }}
              >
                {expanded && record.workId == expandId ? (
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
      title: "Image",
      dataIndex: "image",
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
              setWorkId(record.workId);
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
        workId={workId}
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
