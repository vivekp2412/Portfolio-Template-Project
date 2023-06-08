import {
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  FileAddFilled,
} from "@ant-design/icons";
import React from "react";
import { useEffect, useState } from "react";

import ImageUploading, { ImageListType } from "react-images-uploading";
import style from "../Image-Upload/style.module.css";
export const ImageUpload = (props) => {
  const { images, setImages, handleImageError } = props;

  const [error, setError] = useState<string | null>(null);
  const maxNumber = 1;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    if (imageList.length != 0) {
      handleImageError();
    }
    setError("");
    setImages(imageList as never[]);
    props.geturl(imageList, error);
    setImages(imageList as never[]);
  };

  return (
    <div className="App">
      {error && <div className={style.error}>{error}</div>}

      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        acceptType={["jpg", "gif", "png"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className={style.UploadWrapper}>
            <button
              className={style.UploadButton}
              onClick={onImageUpload}
              {...dragProps}
            >
              <FileAddFilled style={{ fontSize: "30px" }} />
            </button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index}>
                <img
                  src={image.dataURL}
                  className={style.image}
                  alt=""
                  width="100"
                />
                <div className={style.buttonWrapper}>
                  <button
                    className={style.actionButton}
                    onClick={() => onImageUpdate(index)}
                  >
                    {/* <EditFilled /> */}
                    Edit
                  </button>
                  <button
                    className={style.actionButton}
                    onClick={() => onImageRemove(index)}
                  >
                    {/* <DeleteFilled /> */}
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};
