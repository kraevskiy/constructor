import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Divider,
  Slider,
} from "@material-ui/core";
import { CirclePicker, ColorResult } from "react-color";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/rootReducer";
import { setConfig } from "../../../../redux/actions";
import { useTranslation } from "react-i18next";
import { fabric } from "fabric";
import { t_short_m, t_short_f } from "../../../../images/constructor";

//Helpers
import {
  IPHONE_X_MASK,
  max_cover_height_t,
  max_cover_width_t,
  min_cover_height_t,
  min_cover_width_t,
  mm_px,
} from "../../../../helpers/constants";

import style from "./SettingsSection.module.scss";
import { CanConfig } from "../../../../redux/redux.types";
import DropdownTypes from "../DropdownType/DropdownTypes";

const SettingsSection: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    editor: { instance, cover_instance, canvasConfig: config },
  } = useSelector((state: RootState) => state);

  const [backColor, setBackColor] = useState("transparent");
  const [canvasWidth, setCanvasWidth] = useState<number>(config.width_mm);
  const [canvasHeight, setCanvasHeight] = useState<number>(config.height_mm);

  const onChangeBackColorChange = (color: ColorResult) => {
    setBackColor(color.hex);
    instance?.setBackgroundColor(color.hex, () => null);
    instance?.requestRenderAll();
  };

  const setBackColorTransparent = () => {
    setBackColor("transparent");
    instance?.setBackgroundColor(
      config.type == "t_shirt" ? "white" : "transparent",
      () => null
    );
    instance?.requestRenderAll();
  };

  const textFilter = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    return parseInt(e.target.value.replace(/[^0-9]/g, ""));
  };

  useEffect(() => {
    setCanvasWidth(config.width_mm);
    setCanvasHeight(config.height_mm);
  }, [config.width_mm, config.height_mm]);

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

    instance?.setWidth(converted_width + 40);
    instance?.setHeight(converted_heigh + 40);
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

    // dispatch(setEditor(instance));
    dispatch(setConfig(canConf));

    cover_instance?.requestRenderAll();
    instance?.requestRenderAll();
  };

  const handleChangeHeightT = (
    event: React.ChangeEvent<unknown>,
    newValue: number | number[]
  ) => {
    (cover_instance?.item(1) as unknown as fabric.Object).set({
      width: config.cover_width,
      height: newValue as number,
      left: config.width / 2 - config.cover_width! / 2,
      top: config.height / 2 - (newValue as number) / 2,
    });

    const clipPath = new fabric.Rect({
      width: config.cover_width,
      height: newValue as number,
      left: config.width / 2 - config.cover_width! / 2,
      top: config.height / 2 - (newValue as number) / 2,
    });

    instance!.clipPath = clipPath;
    instance?.requestRenderAll();

    config.cover_height = newValue as number;
    cover_instance?.requestRenderAll();
    dispatch(setConfig(config));
  };

  const handleChangeWidthT = (
    event: React.ChangeEvent<unknown>,
    newValue: number | number[]
  ) => {
    (cover_instance?.item(1) as unknown as fabric.Object).set({
      width: newValue as number,
      height: config.cover_height,
      left: config.width / 2 - (newValue as number) / 2,
      top: config.height / 2 - config.cover_height! / 2,
    });

    const clipPath = new fabric.Rect({
      width: newValue as number,
      height: config.cover_height,
      left: config.width / 2 - (newValue as number) / 2,
      top: config.height / 2 - config.cover_height! / 2,
    });

    instance!.clipPath = clipPath;
    instance?.requestRenderAll();

    config.cover_width = newValue as number;
    cover_instance?.requestRenderAll();
    dispatch(setConfig(config));
  };

  return (
    <div className={style.settingsSection}>
      <div className={style.mainSection}>
        <Button
          onClick={() => setBackColorTransparent()}
          variant="contained"
          disabled={backColor === "transparent"}
        >
          {config.type == "t_shirt"
            ? t("constructor.white")
            : t("constructor.transparent")}
        </Button>

        <div style={{ minHeight: 10 }} />

        <CirclePicker
          onChange={onChangeBackColorChange}
          circleSpacing={14}
          color={backColor}
        />
      </div>

      {config.type != "t_shirt" && (
        <>
          <Divider className={style.divider} variant="middle" />
          <Typography style={{ color: "white" }} variant="h5">
            {t("constructor.filed_settings")}
          </Typography>

          <div style={{ minHeight: 10 }} />

          <TextField
            id="outlined-basic"
            label={t("constructor.width") + " " + t("constructor.mm")}
            variant="outlined"
            type="number"
            value={canvasWidth}
            onChange={(e) => setCanvasWidth(textFilter(e))}
          />
          <div style={{ minHeight: 10 }} />

          <TextField
            id="outlined-basic"
            label={t("constructor.height") + " " + t("constructor.mm")}
            variant="outlined"
            value={canvasHeight}
            type="number"
            onChange={(e) => setCanvasHeight(textFilter(e))}
          />

          <div style={{ minHeight: 10 }} />

          <Button onClick={() => setUpCanvasRes()} variant="contained">
            {t("constructor.accept")}
          </Button>
        </>
      )}

      {config.gender && config.type == "t_shirt" && (
        <>
          <Divider className={style.divider} variant="middle" />
          <div className={style.radioSection}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                {t("constructor.gender")}
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                value={config.gender}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const val = (event.target as HTMLInputElement).value;
                  config.gender = val as any;
                  dispatch(setConfig(config));
                  fabric.Image.fromURL(
                    val == "male" ? t_short_m : t_short_f,
                    (oImg) => {
                      oImg.set({
                        top: config.height / 2 - oImg.height! / 2,
                        left: config.width / 2 - oImg.width! / 2,
                      });
                      const item = cover_instance?.item(
                        0
                      ) as unknown as fabric.Object;
                      cover_instance?.remove(item);
                      cover_instance?.insertAt(oImg, 0, false);
                      // cover_instance?.requestRenderAll();
                    },
                    { selectable: false, evented: false, opacity: 0.3 }
                  );
                }}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label={t("constructor.female")}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label={t("constructor.male")}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <Divider className={style.divider} variant="middle" />
          <div className={style.radioSection}>
            <FormControl component="fieldset">
              <FormLabel component="legend">{t("constructor.mode")}</FormLabel>
              <RadioGroup
                aria-label="mode"
                value={config.mode}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const val = (event.target as HTMLInputElement).value;
                  config.mode = val as any;
                  dispatch(setConfig(config));
                  (cover_instance?.item(1) as unknown as fabric.Rect).set({
                    opacity: val == "fill" ? 0 : 1,
                  });
                  if (val == "fill") {
                    const clip = new fabric.Path(IPHONE_X_MASK, {
                      fill: "white",
                      fillRule: "evenodd",
                      selectable: false,
                      evented: false,
                    });
                    clip.set({
                      top: config.height / 2 - (clip.height! * 3) / 2,
                      left: config.width / 2 - (clip.width! * 3) / 2,
                    });
                    clip.scale(3);
                    instance!.clipPath = clip;
                    instance?.renderAll();
                  } else {
                    const clipPath = new fabric.Rect({
                      width: config.cover_width,
                      height: config.cover_height,
                      top: config.height / 2 - config.cover_height! / 2,
                      left: config.width / 2 - config.cover_width! / 2,
                    });
                    instance!.clipPath = clipPath;
                    instance?.renderAll();
                  }

                  cover_instance?.requestRenderAll();
                }}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="fill"
                  control={<Radio />}
                  label={t("constructor.fill")}
                />
                <FormControlLabel
                  value="area"
                  control={<Radio />}
                  label={t("constructor.area")}
                />
              </RadioGroup>
            </FormControl>
          </div>

          {config.mode == "area" && (
            <>
              <Typography id="input-slider" gutterBottom>
                {t("constructor.height")}
              </Typography>
              <Slider
                onChange={handleChangeHeightT}
                max={max_cover_height_t}
                min={min_cover_height_t}
                value={config.cover_height}
              />
              <Typography id="input-slider" gutterBottom>
                {t("constructor.width")}
              </Typography>
              <Slider
                onChange={handleChangeWidthT}
                max={max_cover_width_t}
                min={min_cover_width_t}
                value={config.cover_width}
              />
            </>
          )}
        </>
      )}
      <Divider className={style.divider} variant="middle" />

      <div className={style.typesSection}>
        <Typography component="legend" variant="h5">
          {t("constructor.type")}
        </Typography>
        <DropdownTypes />
      </div>
    </div>
  );
};

export default SettingsSection;
