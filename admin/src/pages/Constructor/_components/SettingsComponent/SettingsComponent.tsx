import React, { useState, useEffect } from "react";
import { Typography, Button, TextField, IconButton } from "@material-ui/core";
import { ChromePicker } from "react-color";

//Helpers
import { fonts } from "../../../../helpers/constants";

//Components
import DropdownFonts from "../DropdownFonts/DropdownFonts";

//Images
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatStrikethroughIcon from "@material-ui/icons/FormatStrikethrough";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/rootReducer";

import style from "./SettingsComponent.module.scss";

interface Props {
  index: number;
  deleteLayer: (index: number) => void;
  copyLayer: (index: number, clean?: boolean) => void;
  switchLayers: (index: number, value: number, absolute?: boolean) => void;
}

const SettingsComponent: React.FC<Props> = ({
  index,
  deleteLayer,
  copyLayer,
  switchLayers,
}) => {
  const [colorModalType, setColorModalType] = useState("");
  // const dispatch = useDispatch();
  const {
    editor: { instance },
  } = useSelector((state: RootState) => state);
  if (!instance) return <></>;
  const canvas = instance;

  const [txtType, setTxtType] = useState(false);
  const [circleType, setCircleType] = useState(false);
  const [figureType, setFigureType] = useState(false);

  //PROPS
  const [color, setColor] = useState("#000000");
  const [borderColor, setBorderColor] = useState("#000000");
  const [curFont, setCurFont] = useState("");
  const [angle, setAngle] = useState(0);
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [underline, setUnderline] = useState(false);
  const [linethrough, setLinethrough] = useState(false);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [fontSize, setFontSize] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [borderWidth, setBorderWidth] = useState(0);
  const [radius, setRadius] = useState(0);

  const item = canvas.item(index) as unknown as fabric.Object;
  if (!item) return <></>;

  useEffect(() => {
    // console.log("ITEM", canvas.item(index));
    // setItem(item);

    if (canvas.item(index)) {
      setColor(item.fill as string);
      setAngle(item.angle as number);
      setXPos(item.left as number);
      setYPos(item.top as number);
      setOpacity((item.opacity as number) * 100);
      setScaleX(item.scaleX as number);
      setScaleY(item.scaleY as number);
      setTxtType(item.type === "text" || item.type === "textbox");
      setFigureType(
        item.type === "triangle" ||
          item.type === "rect" ||
          item.type === "circle"
      );
      setCircleType(item.type === "circle");

      if (item.type === "text" || item.type === "textbox") {
        const tItem = item as fabric.Textbox;
        setFontSize(tItem.getCurrentCharFontSize());
        setCurFont(tItem.fontFamily as string);
        setUnderline(tItem.underline as boolean);
        setLinethrough(tItem.linethrough as boolean);
        setBold((tItem.fontWeight as string) === "bold");
        setItalic((tItem.fontStyle as string) === "italic");
      }

      if (
        item.type === "triangle" ||
        item.type === "rect" ||
        item.type === "circle"
      ) {
        setWidth(item.width as number);
        setHeight(item.height as number);
        setBorderWidth(item.strokeWidth as number);
        setBorderColor(item.stroke as string);
        setRadius((item as fabric.Circle).radius as number);
      }
    }
  }, [index]);

  useEffect(() => {
    if (canvas.item(index)) {
      const item = canvas.item(index) as unknown as fabric.Object;

      setAngle(item.angle as number);
      setXPos(item.left as number);
      setYPos(item.top as number);
      setScaleX(item.scaleX as number);
      setScaleY(item.scaleY as number);
    }
  }, [item.angle, item.top, item.left, item.scaleX, item.scaleY]);

  const changeTextFont = (font: string) => {
    (item as fabric.Textbox).fontFamily = font;
    canvas.requestRenderAll();
    setCurFont(font);
  };

  const handleColorChangeComplete = (color: any) => {
    if (colorModalType === "main") {
      item.set({ fill: color.hex });

      setColor(color.hex);
    } else {
      item.set({ stroke: color.hex });
      setBorderColor(color.hex);
    }

    canvas.requestRenderAll();
  };

  const changeAngle = (value: string) => {
    item
      .set({
        angle: parseFloat(value),
      })
      .setCoords();
    canvas.requestRenderAll();
    setAngle(item.angle as number);
  };

  const changePos = (value: string, type: string) => {
    // const number = value === '' ? 0 : value.replace(/[^0-9]/g, '')
    item
      .set({
        [type]: parseFloat(value),
      })
      .setCoords();
    canvas.requestRenderAll();
    setXPos(item.left as number);
    setYPos(item.top as number);
  };

  const changeOpacity = (value: string) => {
    const noNan = value === "" ? "0" : value;
    const val = parseInt(noNan) > 100 ? 100 : parseInt(noNan);
    item
      .set({
        opacity: parseInt(val + "") / 100,
      })
      .setCoords();
    canvas.requestRenderAll();
    setOpacity(val);
  };

  const changeUnderline = () => {
    (item as fabric.Textbox)
      .set({
        underline: !underline,
      })
      .setCoords();
    canvas.requestRenderAll();
    setUnderline(!underline);
  };

  const changeLineThrough = () => {
    (item as fabric.Textbox)
      .set({
        linethrough: !linethrough,
      })
      .setCoords();
    canvas.requestRenderAll();
    setLinethrough(!linethrough);
  };

  const changeBold = () => {
    (item as fabric.Textbox)
      .set({
        fontWeight:
          (item as fabric.Textbox).fontWeight === "normal" ? "bold" : "normal",
      })
      .setCoords();
    canvas.requestRenderAll();

    setBold((item as fabric.Textbox).fontWeight === "bold");
  };

  const changeItalic = () => {
    (item as fabric.Textbox)
      .set({
        fontStyle:
          (item as fabric.Textbox).fontStyle === "normal" ? "italic" : "normal",
      })
      .setCoords();
    canvas.requestRenderAll();
    setItalic((item as fabric.Textbox).fontStyle === "italic");
  };

  const changeFont = (value: string) => {
    (item as fabric.Textbox)
      .set({
        fontSize: parseFloat(value),
      })
      .setCoords();
    canvas.requestRenderAll();
    setFontSize((item as fabric.Textbox).fontSize as number);
  };

  const changeScale = (value: string, type: string) => {
    if (txtType)
      item
        .set({
          scaleX: parseFloat(value),
          scaleY: parseFloat(value),
        })
        .setCoords();
    else
      item
        .set({
          [type]: parseFloat(value),
        })
        .setCoords();

    canvas.requestRenderAll();
    setScaleX(item.scaleX as number);
    setScaleY(item.scaleY as number);
  };

  const changeFigureProps = (value: string, type: string) => {
    item
      .set({
        [type]: parseFloat(value),
      })
      .setCoords();
    canvas.requestRenderAll();
    setWidth(item.width as number);
    setHeight(item.height as number);
    setBorderWidth(item.strokeWidth as number);
    setRadius((item as fabric.Circle).radius as number);
  };

  if (!item) return <></>;

  return (
    <div className={style.settingsWrapper}>
      <div className={style.settingsContainer}>
        <Typography style={{ zIndex: 4 }} variant="h5">
          настройки компонента
        </Typography>

        <div className={style.divider} />

        {txtType && (
          <>
            {/* FONT PICKER */}
            <div className={style.centeredRow}>
              <TextField
                type="number"
                variant="outlined"
                margin="dense"
                style={{ width: 90, marginRight: 10 }}
                onChange={(e) => changeFont(e.target.value)}
                label="ШРИФТ"
                value={fontSize.toFixed(1)}
              />
              <DropdownFonts
                fonts={fonts}
                layer_index={index}
                selected={curFont}
                changeTextFont={changeTextFont}
              />
            </div>

            <div
              className={style.centeredRow}
              style={{
                marginTop: 10,
              }}
            >
              <IconButton
                color={bold ? "secondary" : "primary"}
                size="small"
                onClick={() => changeBold()}
              >
                <FormatBoldIcon />
              </IconButton>
              <IconButton
                color={underline ? "secondary" : "primary"}
                size="small"
                onClick={() => changeUnderline()}
              >
                <FormatUnderlinedIcon />
              </IconButton>
              <IconButton
                color={linethrough ? "secondary" : "primary"}
                size="small"
                onClick={() => changeLineThrough()}
              >
                <FormatStrikethroughIcon />
              </IconButton>
              <IconButton
                color={italic ? "secondary" : "primary"}
                size="small"
                onClick={() => changeItalic()}
              >
                <FormatItalicIcon />
              </IconButton>
              <div style={{ flex: 1 }} />
            </div>
          </>
        )}

        {figureType && (
          <>
            <div
              className={style.centeredRow}
              style={{
                marginTop: 10,
              }}
            >
              {circleType ? (
                <TextField
                  type="number"
                  variant="outlined"
                  margin="dense"
                  style={{ width: 90 }}
                  onChange={(e) => changeFigureProps(e.target.value, "radius")}
                  label="Радиус"
                  value={radius}
                />
              ) : (
                <>
                  <TextField
                    type="number"
                    variant="outlined"
                    margin="dense"
                    style={{ width: 90 }}
                    onChange={(e) => changeFigureProps(e.target.value, "width")}
                    label="Ширина"
                    value={width}
                  />

                  <div style={{ minWidth: 3 }} />

                  <TextField
                    type="number"
                    variant="outlined"
                    margin="dense"
                    style={{ width: 90 }}
                    onChange={(e) =>
                      changeFigureProps(e.target.value, "height")
                    }
                    label="Высота"
                    value={height}
                  />
                </>
              )}

              <div style={{ minWidth: 3 }} />

              <TextField
                type="number"
                variant="outlined"
                margin="dense"
                style={{ width: 90 }}
                onChange={(e) =>
                  changeFigureProps(e.target.value, "strokeWidth")
                }
                label="Толщина"
                value={borderWidth}
              />
            </div>
          </>
        )}

        <div
          className={style.centeredRow}
          style={{
            marginTop: 10,
          }}
        >
          <TextField
            type="number"
            variant="outlined"
            margin="dense"
            style={{ width: 90 }}
            onChange={(e) => changePos(e.target.value, "left")}
            label="X"
            value={xPos.toFixed(1)}
          />

          <div style={{ minWidth: 3 }} />

          <TextField
            type="number"
            variant="outlined"
            margin="dense"
            style={{ width: 90 }}
            onChange={(e) => changePos(e.target.value, "top")}
            label="Y"
            value={yPos.toFixed(1)}
          />

          <div style={{ minWidth: 3 }} />

          <TextField
            type="number"
            variant="outlined"
            margin="dense"
            style={{ width: 90 }}
            onChange={(e) => changeAngle(e.target.value)}
            label="угол"
            value={angle.toFixed(1)}
          />
        </div>

        <div
          className={style.centeredRow}
          style={{
            marginTop: 10,
          }}
        >
          <TextField
            type="number"
            variant="outlined"
            margin="dense"
            style={{ width: 90 }}
            onChange={(e) => changeScale(e.target.value, "scaleX")}
            label="масштаб X"
            value={scaleX}
          />
          <div style={{ minWidth: 3 }} />

          <TextField
            type="number"
            variant="outlined"
            margin="dense"
            style={{ width: 90 }}
            onChange={(e) => changeScale(e.target.value, "scaleY")}
            label="масштаб Y"
            value={scaleY}
          />
          <div style={{ minWidth: 3 }} />

          <TextField
            type="number"
            variant="outlined"
            margin="dense"
            style={{ width: 90 }}
            onChange={(e) => changeOpacity(e.target.value)}
            label="прозрачность"
            value={opacity}
          />
        </div>

        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Typography style={{ zIndex: 4, width: "100%" }} variant="h6">
            порядок слойов
          </Typography>

          <IconButton
            color={"secondary"}
            size="small"
            className={"rotate_90"}
            onClick={() => switchLayers(index, 1, true)}
          >
            <DoubleArrowIcon />
          </IconButton>
          <IconButton
            color={"primary"}
            size="small"
            className={"rotate_90"}
            onClick={() => switchLayers(index, 1)}
          >
            <ArrowForwardIosIcon />
          </IconButton>
          <IconButton
            color={"primary"}
            size="small"
            className={"rotate_minus_90"}
            onClick={() => switchLayers(index, -1)}
          >
            <ArrowForwardIosIcon />
          </IconButton>
          <IconButton
            color={"secondary"}
            size="small"
            className={"rotate_minus_90"}
            onClick={() => switchLayers(index, -1, true)}
          >
            <DoubleArrowIcon />
          </IconButton>
        </div>

        <div
          className={style.centeredRow}
          style={{
            marginTop: 10,
          }}
        >
          <Button
            color="primary"
            style={{ flex: 1 }}
            variant="contained"
            onClick={() => copyLayer(index)}
          >
            Копировать
          </Button>

          <div style={{ minWidth: 5 }} />

          <Button
            color="secondary"
            style={{ flex: 1 }}
            variant="contained"
            onClick={() => deleteLayer(index)}
          >
            Удалить
          </Button>
        </div>

        {/* COLOR PICKER */}
        {(txtType || figureType) && (
          <>
            <Button
              color="default"
              style={{
                backgroundColor: color,
                marginTop: 10,
                color: "white",
              }}
              onClick={() =>
                setColorModalType(colorModalType === "main" ? "" : "main")
              }
            >
              Цвет{figureType ? " заливки" : ""}
            </Button>

            {figureType && (
              <Button
                color="default"
                style={{ backgroundColor: borderColor, marginTop: 10 }}
                onClick={() =>
                  setColorModalType(colorModalType === "border" ? "" : "border")
                }
              >
                Цвет обводки
              </Button>
            )}
          </>
        )}
      </div>

      {colorModalType && (
        <>
          <ChromePicker
            color={colorModalType === "main" ? color : borderColor}
            disableAlpha={true}
            onChangeComplete={handleColorChangeComplete}
          />
        </>
      )}
    </div>
  );

  return null;
};

export default SettingsComponent;

// const handleLayerTextChange = (value) => {
//     // console.log(e.target.value);
//     item.text = value;
//     layer.text = value;
//     setLayer(layer);
//     canvas.requestRenderAll();

//     // selectElement(index);
// }
