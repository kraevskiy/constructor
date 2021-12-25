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

//Helpers
import {
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
    editor: { instance, cover_instance, canvasConfig },
  } = useSelector((state: RootState) => state);

  const [backColor, setBackColor] = useState("transparent");
  const [canvasWidth, setCanvasWidth] = useState<number>(canvasConfig.width_mm);
  const [canvasHeight, setCanvasHeight] = useState<number>(
    canvasConfig.height_mm
  );

  const onChangeBackColorChange = (color: ColorResult) => {
    setBackColor(color.hex);
    instance?.setBackgroundColor(color.hex, () => null);
    instance?.requestRenderAll();
  };

  const setBackColorTransparent = () => {
    setBackColor("transparent");
    instance?.setBackgroundColor("transparent", () => null);
    instance?.requestRenderAll();
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
    (cover_instance?.item(0) as unknown as fabric.Object).set({
      width: canvasConfig.cover_width,
      height: newValue as number,
      left: canvasConfig.width / 2 - canvasConfig.cover_width! / 2,
      top: canvasConfig.height / 2 - (newValue as number) / 2,
    });

    canvasConfig.cover_height = newValue as number;
    cover_instance?.requestRenderAll();
    dispatch(setConfig(canvasConfig));
  };

  const handleChangeWidthT = (
    event: React.ChangeEvent<unknown>,
    newValue: number | number[]
  ) => {
    (cover_instance?.item(0) as unknown as fabric.Object).set({
      width: newValue as number,
      height: canvasConfig.cover_height,
      left: canvasConfig.width / 2 - (newValue as number) / 2,
      top: canvasConfig.height / 2 - canvasConfig.cover_height! / 2,
    });

    canvasConfig.cover_width = newValue as number;
    cover_instance?.requestRenderAll();
    dispatch(setConfig(canvasConfig));
  };

  return (
    <div className={style.settingsSection}>
      <div className={style.mainSection}>
        <Button
          onClick={() => setBackColorTransparent()}
          variant="contained"
          disabled={backColor === "transparent"}
        >
          {t("constructor.transparent")}
        </Button>

        <div style={{ minHeight: 10 }} />

        <CirclePicker
          onChange={onChangeBackColorChange}
          circleSpacing={14}
          color={backColor}
        />
      </div>

      {canvasConfig.type != "t_shirt" && (
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

      {canvasConfig.gender && canvasConfig.type == "t_shirt" && (
        <>
          <Divider className={style.divider} variant="middle" />
          <div className={style.radioSection}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                {t("constructor.gender")}
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                value={canvasConfig.gender}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  canvasConfig.gender = (event.target as HTMLInputElement)
                    .value as any;
                  dispatch(setConfig(canvasConfig));
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
                value={canvasConfig.mode}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  canvasConfig.mode = (event.target as HTMLInputElement)
                    .value as any;
                  dispatch(setConfig(canvasConfig));
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

          {canvasConfig.mode == "area" && (
            <>
              <Typography id="input-slider" gutterBottom>
                {t("constructor.height")}
              </Typography>
              <Slider
                onChange={handleChangeHeightT}
                max={max_cover_height_t}
                min={min_cover_height_t}
                value={canvasConfig.cover_height}
              />
              <Typography id="input-slider" gutterBottom>
                {t("constructor.width")}
              </Typography>
              <Slider
                onChange={handleChangeWidthT}
                max={max_cover_width_t}
                min={min_cover_width_t}
                value={canvasConfig.cover_width}
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
