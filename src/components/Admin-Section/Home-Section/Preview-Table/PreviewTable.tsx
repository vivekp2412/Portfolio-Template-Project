import { useEffect, useState } from "react";
import { dataref } from "../../../../firebase";
import { Space, Table, Tag } from "antd";
import { Button, Modal } from "antd";
import style from "../Preview-Table/style.module.css";
import type { ColumnsType } from "antd/es/table";
import { Switch } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";
import { updateState } from "../../../../slices/homeSlice";
//Type Declaration
interface DataType {
  imageId: string;
  image: string;
  active: boolean;
}
//Delete function for data
const deleteAndRearrangeArray = async (id: string) => {
  try {
    const snapshot = await dataref.ref("Carousel").once("value");
    let dataArray = snapshot.val().image;
    const indexToDelete = dataArray.findIndex(
      (object: { imageId: string; image: string }) => {
        return object.imageId == id;
      }
    );
    dataArray.splice(indexToDelete, 1);

    await dataref.ref("Carousel").set({ image: dataArray });
  } catch (error) {
    console.error("Error rearranging the array:", error);
  }
};
//Fetch data

//Preview Component
function PreviewTable() {
  const data=useAppSelector((state)=>state.home.allImages);
  const pending = useAppSelector((state)=>state.home.pending);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalimg, setModalimg] = useState<string>();
  const dispatch=  useAppDispatch();
  // Switch Change handler
  const onChange = async (checked: boolean, id: string) => {
    dispatch(updateState({checked,id}))  
  };

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
            className={style.action_link}
            onClick={() => { 
              if(confirm("Are You sure want to delete")==true){
                deleteAndRearrangeArray(record.imageId)
              }
            }
            }
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
      <Table
        className={style.table}
        columns={columns}
        dataSource={data}
        loading={pending}
        pagination={false}
      />
    </>
  );
}

export default PreviewTable;
