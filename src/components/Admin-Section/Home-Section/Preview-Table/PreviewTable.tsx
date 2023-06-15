import { useEffect, useState } from "react";
import { dataref } from "../../../../firebase";
import { Space, Table, Tag } from "antd";
import { Button, Modal } from "antd";
import style from "../Preview-Table/style.module.css";
import type { ColumnsType } from "antd/es/table";
import { Switch } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";
import {
  deleteImage,
  deleteImageData,
  fetchCarouselData,
  updateImageData,
  updateState,
} from "../../../../slices/homeSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
//Type Declaration
// interface DataType {
//   imageId: string;
//   image: string;
//   active: boolean;
// }

//Fetch data

//Preview Component
function PreviewTable() {
  const pending = useAppSelector((state) => state.home.pending);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalimg, setModalimg] = useState<string>();
  const data = useAppSelector((state) => state.home.allImages);
  const dispatch = useAppDispatch();

  // Switch Change handler
  // useEffect(() => {
  //   let filteredArray = data.filter((data) => {
  //     return data.active == true;
  //   });
  //   if (filteredArray.length > 3) {
  //     console.log("jo");

  //     setIsDisable(true);
  //   }
  // }, [data]);
  const onChange = (checked: boolean, id: string) => {
    dispatch(updateState({ checked, id }));
    // dispatch(updateState(id, checked));
  };
  console.log(data);

  const columns: ColumnsType<DataType> = [
    {
      title: "Image Id",
      dataIndex: "imageId",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (_, record) => (
        <img className={style.table_img} src={record.image} />
      ),
    },
    {
      title: "Show/Hide",
      render: (_, record) => (
        <Space size="middle">
          <Switch
            // disabled={isDisable}
            checked={record.active}
            onChange={(checked) => onChange(checked, record.imageId)}
          />
        </Space>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <p
            className={style.action_link}
            onClick={() => showModal(record.image)}
          >
            View
          </p>
          <p
            className={style.action_link_delete}
            // onClick={() => {
            //   if (confirm("Are You sure want to delete") == true) {
            //     dispatch(deleteImage(record.imageId));
            //   }
            // }}
            onClick={() => {
              confirmAlert({
                title: "Deleting Image",
                message: "Are you sure to do this.",
                buttons: [
                  {
                    label: "Yes",
                    onClick: () => {
                      console.log(record);
                      dispatch(deleteImage(record.docId));
                    },
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
  //Show Modal Function
  const showModal = (url: string) => {
    setModalimg(url);
    setIsModalOpen(true);
  };
  //HandleOk funtion for Modal
  const handleOk = () => {
    setIsModalOpen(false);
  };
  //Close Modal Function
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        <img src={modalimg}></img>
      </Modal>
      <div className={style.tableContainer}>
        <Table
          className={style.table}
          columns={columns}
          dataSource={data}
          loading={pending}
          pagination={false}
        />
      </div>
    </>
  );
}

export default PreviewTable;
