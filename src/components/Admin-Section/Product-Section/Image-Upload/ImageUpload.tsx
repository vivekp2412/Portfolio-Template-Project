import React from "react";
import { useEffect, useState } from "react";

import ImageUploading, { ImageListType } from "react-images-uploading";
import style from "../Image-Upload/style.module.css";
export const ImageUpload = (props) => {
  const { images, setImages, handleImageError } = props;

  const [error, setError] = useState<string | null>(null);
  const maxNumber = 4;

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
          <div className="upload__image-wrapper">
            <button onClick={onImageUpload} {...dragProps}>
              Click or Drop here
            </button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};
