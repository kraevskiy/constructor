import React from "react";
import { IconButton } from "@material-ui/core";

//Images
import ClearIcon from "@material-ui/icons/Clear";
import { Image } from "../../../../redux/redux.types";

interface Props {
  type: string;
  deleteImage: (name: string) => void;
  canEdit: boolean;
  images: Image[];
  selectElement: (image: Image) => void;
}
const ImagesList: React.FC<Props> = ({
  images,
  type,
  selectElement,
  deleteImage,
  canEdit,
}) => {
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
              src={`prefabs/${image.name}`}
              onMouseDown={() => selectElement(image)}
              className="image_preview"
            />
            {canEdit && (
              <IconButton
                onClick={() => deleteImage(image.name)}
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
