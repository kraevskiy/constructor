import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { CirclePicker, ColorResult } from "react-color";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/rootReducer";
import { setConfig } from "../../../../redux/actions";

//Helpers
import { mm_px } from "../../../../helpers/constants";

import style from "./SettingsSection.module.scss";
import { CanConfig } from "../../../../redux/redux.types";

const SettingsSection: React.FC = () => {
  const dispatch = useDispatch();
  const {
    editor: { instance, cover_instance, canvasConfig },
  } = useSelector((state: RootState) => state);

  if (!instance) return <></>;
  const canvas = instance;

  const [backColor, setBackColor] = useState("transparent");
  const [canvasWidth, setCanvasWidth] = useState<number>(canvasConfig.width_mm);
  const [canvasHeight, setCanvasHeight] = useState<number>(
    canvasConfig.height_mm
  );

  const onChangeBackColorChange = (color: ColorResult) => {
    setBackColor(color.hex);
    canvas.setBackgroundColor(color.hex, () => null);
    canvas.requestRenderAll();
  };

  const setBackColorTransparent = () => {
    setBackColor("transparent");
    canvas.setBackgroundColor("transparent", () => null);
    canvas.requestRenderAll();
  };

  const textFilter = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    return parseInt(e.target.value.replace(/[^0-9]/g, ""));
  };

  useEffect(() => {
    setCanvasWidth(canvasConfig.width_mm);
    setCanvasHeight(canvasConfig.height_mm);
  }, [canvasConfig.width_mm, canvasConfig.height_mm]);

  const setUpCanvasRes = () => {
    const converted_width = mm_px * canvasWidth;
    const converted_heigh = mm_px * canvasHeight;

    const canConf: CanConfig = {
      width: converted_width + 40,
      height: converted_heigh + 40,
      width_mm: canvasWidth,
      height_mm: canvasHeight,
      backgroundColor: "transparent",
      selectionLineWidth: 2,
      type: "card",
    };

    canvas.setWidth(converted_width + 40);
    canvas.setHeight(converted_heigh + 40);
    cover_instance?.setWidth(converted_width + 40);
    cover_instance?.setHeight(converted_heigh + 40);

    (cover_instance?.item(0) as unknown as fabric.Object).set({
      width: converted_width,
      height: converted_heigh,
      left: canConf.width / 2 - converted_width / 2,
      top: canConf.height / 2 - converted_heigh / 2,
      stroke: "#000",
      strokeWidth: 2,
      fill: "rgba(0,0,200,0.0)",
    });

    // dispatch(setEditor(canvas));
    dispatch(setConfig(canConf));

    cover_instance?.requestRenderAll();
    instance?.requestRenderAll();
  };

  return (
    <div
      className={style.settingsSection}
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        onClick={() => setBackColorTransparent()}
        variant="contained"
        disabled={backColor === "transparent"}
      >
        Прозрачный
      </Button>

      <div style={{ minHeight: 10 }} />

      <CirclePicker
        onChange={onChangeBackColorChange}
        circleSpacing={14}
        color={backColor}
      />

      <div style={{ minHeight: 10 }} />

      <Typography style={{ color: "white" }} variant="h5">
        настройки поля
      </Typography>

      <div style={{ minHeight: 10 }} />

      <TextField
        id="outlined-basic"
        label="Ширина mm."
        variant="outlined"
        type="number"
        value={canvasWidth}
        onChange={(e) => setCanvasWidth(textFilter(e))}
      />

      <div style={{ minHeight: 10 }} />

      <TextField
        id="outlined-basic"
        label="Высота mm."
        variant="outlined"
        value={canvasHeight}
        type="number"
        onChange={(e) => setCanvasHeight(textFilter(e))}
      />

      <div style={{ minHeight: 10 }} />

      <Button onClick={() => setUpCanvasRes()} variant="contained">
        Применить
      </Button>
    </div>
  );
};

export default SettingsSection;
