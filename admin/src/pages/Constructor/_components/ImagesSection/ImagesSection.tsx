import React, { ChangeEvent, useRef, useState } from "react";
import { Button, IconButton, Theme } from "@material-ui/core";
import { fabric } from "fabric";
import { Tabs, Tab } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Axios from "../../../../helpers/Axios";
import { FabImage, FileC, Image } from "../../../../redux/redux.types";

//Images
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import PermMedia from "@material-ui/icons/PermMedia";
import CropSquareIcon from "@material-ui/icons/CropSquare";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import FilterFramesIcon from "@material-ui/icons/FilterFrames";
import LabelIcon from "@material-ui/icons/Label";
import ImagesList from "./ImagesList";

import { RootState } from "../../../../redux/rootReducer";
import { changeHistory, getImages } from "../../../../redux/actions";

import style from "./ImagesSection.module.scss";

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
})(Tabs);

interface StyledTabProps {
  label: string;
  icon:
    | string
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
}

const AntTab = withStyles((theme: Theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#40a9ff",
    },
  },
  selected: {},
}))((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface Props {
  attachListeners: (obj: fabric.Object) => void;
  setItemIndex: (i: number) => void;
}

const ImagesSection: React.FC<Props> = ({ attachListeners, setItemIndex }) => {
  const dispatch = useDispatch();
  const {
    editor: { instance, images, canvasConfig },
    user: { canEdit },
  } = useSelector((state: RootState) => state);

  const canvas = instance;
  if (!canvas) return <></>;

  const fileInput = useRef<HTMLInputElement>(null);
  const imgInput = useRef<HTMLInputElement>(null);

  const [tabIndex, setTabIndex] = useState(0);

  const addImageMask = async (
    event: ChangeEvent<HTMLInputElement> | string,
    setItemIndex: (val: number) => void
  ) => {
    let input_img: string;
    let img_up: File;

    const inp = event as ChangeEvent<HTMLInputElement>;

    if (inp.target) {
      if (!inp.target.files) return;
      input_img = URL.createObjectURL(inp.target.files[0]);
      img_up = inp.target.files[0];
    } else input_img = event as string;

    fabric.Image.fromURL(
      input_img,
      (img) => {
        const oImg = img as FabImage;
        oImg.on("selected", () => {
          setItemIndex(canvas.getObjects().indexOf(oImg));
        });
        oImg.on("deselected", () => {
          setItemIndex(-1);
        });

        oImg.on("modified", () => {
          dispatch(changeHistory());
        });

        const wightDis = canvasConfig.width / oImg.getScaledWidth();
        const heightDis = canvasConfig.height / oImg.getScaledHeight();
        const minDis = wightDis < heightDis ? wightDis : heightDis;
        if (minDis < 1) oImg.scale(minDis);

        oImg.img_up = img_up;

        canvas.add(oImg);
        canvas.setActiveObject(oImg);
      }
      // { crossOrigin: 'anonymous' }
    );
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const image_name = uuidv4() + "_img_sprite.png";
    if (!event.target.files) return;
    const file = event.target.files[0] as FileC;
    file.custom_name = image_name;

    console.log("FILE", file);
    let type = "image";
    switch (tabIndex) {
      case 0:
        type = "image";
        break;
      case 1:
        type = "frame";
        break;
      case 2:
        type = "stiker";
        break;
      default:
        type = "image";
        break;
    }

    const req = {
      name: image_name,
      type: type,
    };

    // await Axios.post("prefabs/save_image", createFormData([file], req))
    //   .then((res) => {
    //     console.log("RES", res);
    //     alert("Сохранено!");
    //     dispatch(getImages());
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const addTriangle = () => {
    const triangle = new fabric.Triangle({
      width: 100,
      height: 100,
      left: 50,
      top: 50,
      fill: "grey",
      stroke: "blue",
      strokeWidth: 10,
    });
    console.log(triangle.type);
    attachListeners(triangle);
    canvas.add(triangle);
    canvas.setActiveObject(triangle);
  };

  const addRectangle = () => {
    const react = new fabric.Rect({
      width: 100,
      height: 100,
      left: 50,
      top: 50,
      fill: "grey",
      stroke: "orange",
      strokeWidth: 10,
    });
    console.log(react.type);
    attachListeners(react);
    canvas.add(react);
    canvas.setActiveObject(react);
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      radius: 50,
      left: 50,
      top: 50,
      fill: "grey",
      stroke: "black",
      strokeWidth: 10,
    });
    console.log(circle.type);
    attachListeners(circle);
    canvas.add(circle);
    canvas.setActiveObject(circle);
  };

  const handleChangeTab = (e: ChangeEvent<unknown>, i: number) => {
    setTabIndex(i);
  };

  const selectElement = async (image: Image) => {
    // console.log('worked!', image);
    // const res = await fetch(`${HTTP_ADDRESS}prefabs/${image.name}`);
    // if(res){
    //     console.log('input', `${HTTP_ADDRESS}prefabs/${image.name}`);
    //     console.log('RES', res);
    //     addImageMask(res.url, props, setItemIndex);
    // }
    addImageMask(`prefabs/${image.name}`, setItemIndex);
  };

  const deleteImage = async (name: string) => {
    // console.log("DELETED IMAMGE: ", name);

    const res = await Axios.post("prefabs/delete_image", {
      name: name,
    });
    if (res) {
      if (res.data.suc) {
        getImages();
        alert("Удалено!");
      }
    }
  };

  return (
    <div className={style.imagesComponent}>
      <input
        style={{ display: "none" }}
        type="file"
        onChange={(event) => addImageMask(event, setItemIndex)}
        ref={fileInput}
      />

      <input
        style={{ display: "none" }}
        type="file"
        onChange={(event) => uploadImage(event)}
        ref={imgInput}
      />

      <div className={style.btnsSection}>
        <div>
          <IconButton
            onClick={() => addTriangle()}
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <ChangeHistoryIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() => addRectangle()}
            color="secondary"
            aria-label="upload picture"
            component="span"
          >
            <CropSquareIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() => addCircle()}
            color="inherit"
            aria-label="upload picture"
            component="span"
          >
            <RadioButtonUncheckedIcon fontSize="large" />
          </IconButton>
        </div>

        <Button
          variant="contained"
          color="secondary"
          // className={classes.button}
          onClick={() => fileInput.current?.click()}
          endIcon={<PermMedia />}
        >
          Загрузить изображение
        </Button>

        {canEdit && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => imgInput.current?.click()}
            endIcon={<PermMedia />}
          >
            Добавить на сервер
          </Button>
        )}
      </div>

      <AntTabs
        variant="fullWidth"
        orientation={"horizontal"}
        value={tabIndex}
        onChange={handleChangeTab}
      >
        <AntTab
          label="Картинки"
          icon={<PermMediaIcon style={{ color: "white" }} />}
        />
        <AntTab
          label="Рамки"
          icon={<FilterFramesIcon style={{ color: "white" }} />}
        />
        <AntTab
          label="Стикеры"
          icon={<LabelIcon style={{ color: "white" }} />}
        />
      </AntTabs>

      <SwipeableViews
        // axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
        axis={"x-reverse"}
        index={tabIndex}
        onChangeIndex={setTabIndex}
      >
        <div>
          <ImagesList
            type={"image"}
            canEdit={canEdit}
            images={images}
            selectElement={selectElement}
            deleteImage={deleteImage}
          />
        </div>
        <div>
          <ImagesList
            type={"frame"}
            canEdit={canEdit}
            images={images}
            selectElement={selectElement}
            deleteImage={deleteImage}
          />
        </div>
        <div>
          <ImagesList
            type={"stiker"}
            canEdit={canEdit}
            images={images}
            selectElement={selectElement}
            deleteImage={deleteImage}
          />
        </div>
      </SwipeableViews>
    </div>
  );
};

export default ImagesSection;

interface Body {
  name: string;
  type: string;
}

const createFormData = (files: FileC[], body: Body): FormData => {
  const data = new FormData();

  for (const file of files) {
    console.log("file", file);
    if (file.custom_name) data.append("file", file, file.custom_name);
    else data.append("file", file);
  }

  (Object.keys(body) as Array<keyof typeof body>).forEach((key) => {
    data.append(key, body[key] as string);
    // console.log(key + " : " + body[key]);
  });

  return data;
};
