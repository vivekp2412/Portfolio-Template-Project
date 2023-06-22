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
  const { images, setImages, handleImageError, imageError } = props;

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
        acceptType={["jpg", "jpeg", "png"]}
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
          <>
            <div className={style.UploadWrapper}>
              {!images.length && (
                <div
                  className={style.UploadButton}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <div className={style.uploadIcon}>
                    <p className={style.uploadText}>
                      Upload{" "}
                      <svg
                        style={{ display: "inline" }}
                        fill="#000000"
                        width="15px"
                        height="15px"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 3.793V9H7V3.864L5.914 4.95 4.5 3.536 8.036 0l.707.707.707.707 2.121 2.122-1.414 1.414L9 3.793zM16 11v5H0v-5h2v3h12v-3h2z"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </p>
                    <p className={style.instruction}>
                      (Allowed Format: JPG,JPEG,PNG)
                    </p>
                  </div>
                  {imageError && (
                    <div className={style.errorMessage}>Image is Required</div>
                  )}
                </div>
              )}
              &nbsp;
              {imageList.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.dataURL}
                    className={style.image}
                    alt=""
                    height="100"
                    width="300"
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
          </>
        )}
      </ImageUploading>
    </div>
  );
};
