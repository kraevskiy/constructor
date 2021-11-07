import React from "react";
import { IconButton } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/rootReducer";
import { deleteImage } from "../../../../redux/actions";
import { Image } from "../../../../redux/redux.types";

//Images
import ClearIcon from "@material-ui/icons/Clear";

import style from "./ImagesSection.module.scss";

interface Props {
  type: string;
  images: Image[];
  selectElement: (image: Image) => void;
}
const ImagesList: React.FC<Props> = ({ images, type, selectElement }) => {
  const dispatch = useDispatch();
  const {
    user: { canEdit },
  } = useSelector((state: RootState) => state);

  return (
    <>
      {images
        .filter((item) => item.type === type)
        .map((image, index) => (
          <div
            key={index}
            style={{
              height: 150,
              width: "100%",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "white",
              flexDirection: "row",
              display: "flex",
            }}
          >
            <img
              src={`http://admin.arter.local${image.url}`}
              onMouseDown={() => selectElement(image)}
              className={style.image_preview}
            />
            {canEdit && (
              <IconButton
                onClick={() => dispatch(deleteImage(image._id))}
                color="inherit"
                aria-label="upload picture"
                component="span"
                style={{ position: "absolute" }}
              >
                <ClearIcon />
              </IconButton>
            )}
          </div>
        ))}
    </>
  );
};

export default ImagesList;
