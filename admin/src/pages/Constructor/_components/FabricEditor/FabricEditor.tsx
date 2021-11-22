import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import {
  CanConfig,
  Canvas,
  StateUserLayout,
} from "../../../../redux/redux.types";
import { RootState } from "../../../../redux/rootReducer";
import { useParams } from "react-router";

//Images
import background_image from "../../../../images/background_1.png";

//Helpers
import { mm_px } from "../../../../helpers/constants";

import Axios from "../../../../helpers/Axios";
import {
  setEditor,
  setCoverEditor,
  setConfig,
  changeHistory,
} from "../../../../redux/actions";
import { errorHandler } from "../../../../helpers";
import { t_short_m } from "../../../../images/constructor";

import style from "./Farbric.module.scss";
import Loader from "../../../../components/Loader/Loader";

export interface MatchParams {
  id: string;
  type: string;
}

interface Props {
  attachListeners: (obj: fabric.Object) => void;
}

const FabricEditor: React.FC<Props> = ({ attachListeners }) => {
  const { id, type } = useParams<MatchParams>();
  const dispatch = useDispatch();

  const {
    editor: { instance, cover_instance, canvasConfig, loading },
  } = useSelector((state: RootState) => state);

  const fabricRoot = useRef<HTMLCanvasElement>(null);
  const fabricRootCover = useRef(null);

  useEffect(() => {
    // console.log("Fabric editor did mount");
    switch (type) {
      case "card":
        cardInitial();
        break;
      case "t_shirt":
        tShirtInitial();
        break;
      default:
        cardInitial();
        break;
    }
  }, []);

  useEffect(() => {
    if (instance && cover_instance && id) fetchPrefab(id);
  }, [instance, cover_instance]);

  const fetchPrefab = async (id: string) => {
    try {
      const layout = await Axios.get<StateUserLayout>(
        `${process.env.REACT_APP_LAYOUT}/${id}`
      );
      if (layout) loadPrefab(layout.data);
    } catch (e) {
      errorHandler(e);
    }
  };

  const cardInitial = () => {
    // console.log("cardInitial");
    const defCardPropMM = {
      width: 160,
      height: 100,
    };

    const converted_width = mm_px * defCardPropMM.width;
    const converted_heigh = mm_px * defCardPropMM.height;

    const canConf: CanConfig = {
      width: converted_width + 40,
      height: converted_heigh + 40,
      width_mm: defCardPropMM.width,
      height_mm: defCardPropMM.height,
      backgroundColor: "transparent",
      selectionLineWidth: 2,
      type: "card",
    };

    const canvas = new fabric.Canvas(fabricRoot.current, canConf) as Canvas;
    canvas.enableRetinaScaling = true;

    const canvas_cover = new fabric.Canvas(fabricRootCover.current, canConf);

    const rect = new fabric.Rect({
      width: converted_width,
      height: converted_heigh,
      left: canConf.width / 2 - converted_width / 2,
      top: canConf.height / 2 - converted_heigh / 2,
      stroke: "#000",
      strokeWidth: 2,
      fill: "rgba(0,0,200,0.0)",
    });

    canvas_cover.add(rect);

    dispatch(setEditor(canvas));
    dispatch(setConfig(canConf));
    dispatch(setCoverEditor(canvas_cover));
  };

  const tShirtInitial = () => {
    // console.log("tShirtInitial");
    const defCardPropMM = {
      width: 100,
      height: 130,
    };

    const converted_width = mm_px * defCardPropMM.width;
    const converted_heigh = mm_px * defCardPropMM.height;

    const canConf: CanConfig = {
      width: converted_width + 40,
      height: converted_heigh + 40,
      width_mm: defCardPropMM.width,
      height_mm: defCardPropMM.height,
      backgroundColor: "transparent",
      selectionLineWidth: 2,
      type: "t_shirt",
    };

    const canvas = new fabric.Canvas(fabricRoot.current, canConf) as Canvas;
    canvas.enableRetinaScaling = true;

    fabric.Image.fromURL(t_short_m, (img) => {
      const oImg = img;
      const wightDis = canConf.width / oImg.getScaledWidth();
      const heightDis = canConf.height / oImg.getScaledHeight();
      const minDis = wightDis < heightDis ? wightDis : heightDis;
      if (minDis < 1) oImg.scale(minDis);
      oImg.getScaledHeight;
      oImg.set({
        selectable: false,
        evented: false,
      });
      canvas.add(oImg);
    });

    const canvas_cover = new fabric.Canvas(fabricRootCover.current, canConf);

    const rect = new fabric.Rect({
      width: converted_width,
      height: converted_heigh,
      left: canConf.width / 2 - converted_width / 2,
      top: canConf.height / 2 - converted_heigh / 2,
      stroke: "#000",
      strokeWidth: 2,
      fill: "rgba(0,0,200,0.0)",
    });

    canvas_cover.add(rect);

    dispatch(setEditor(canvas));
    dispatch(setConfig(canConf));
    dispatch(setCoverEditor(canvas_cover));
  };

  const loadPrefab = async (prefab: StateUserLayout) => {
    if (!instance || !cover_instance) return null;

    // console.log("prefab", prefab);
    console.log("PREFAB LOADING");

    const obj = JSON.parse(prefab.instance);

    dispatch(changeHistory(true));

    const canConf = JSON.parse(prefab.config) as CanConfig;

    const converted_width = mm_px * canConf.width_mm;
    const converted_heigh = mm_px * canConf.height_mm;

    instance.setWidth(converted_width + 40);
    instance.setHeight(converted_heigh + 40);
    cover_instance.setWidth(converted_width + 40);
    cover_instance.setHeight(converted_heigh + 40);

    (cover_instance?.item(0) as unknown as fabric.Object).set({
      width: converted_width,
      height: converted_heigh,
      left: canConf.width / 2 - converted_width / 2,
      top: canConf.height / 2 - converted_heigh / 2,
      stroke: "#000",
      strokeWidth: 2,
      fill: "rgba(0,0,200,0.0)",
    });

    const canvasLoaded = () => {
      for (const object of instance.getObjects()) {
        // delete object.crossOrigin;
        // console.log("object", object);
        attachListeners(object);
      }
    };

    instance.loadFromJSON(obj, canvasLoaded);
    dispatch(setConfig(canConf));
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", display: "flex", margin: "auto" }}>
        <div
          style={{
            position: "absolute",
            backgroundImage: `url(${background_image})`,
            // backgroundImage:
            //   type === "t_shirt" ? `` : `url(${background_image})`,
          }}
        >
          <canvas
            className={type === "t_shirt" ? style.mask : ""}
            ref={fabricRoot}
          />
        </div>

        <div style={{ pointerEvents: "none" }}>
          <canvas ref={fabricRootCover} />
        </div>
        {loading && (
          <div
            style={{
              position: "absolute",
              backgroundColor: "rgba(128, 128, 128, 0.9)",
              width: "100%",
              height: "100%",
            }}
          >
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default FabricEditor;

// const path = new fabric.Path(
//   "m 4 0 l 6 1 l 40 -1 l 7 15 l -11 13 c -30 -10 -32 -19 -33 -13 c -5 -8 -5 -3 -4 0 a 1.42 1.42 0 0 1 -3 -2 a 5 5 0 0 0 -2 -3 q 1 5 -0.5 0.5 t -1.5 5.5 t -3 -1 t -2 5 t -6 -8 a 5 5 90 0 0 5 -4 a 1.42 1.42 0 0 1 -2 -6 c 3 4 4 1 6 0 c 1 4 4 4 2 -2 m 12 5 l 1 1 l 4 5 l 12 5 l 10 -11 l -20 1"
// );
// path.set({ left: 120, top: 120 });
// canvas.add(path);

{
  /* <div style={{ width: 23 }}>
          <label style={{ padding: 0, margin: 0, height: 20, }}>cm</label>
          <RulerV stops={ruler_v} onSelectItem={console.log} />
          </div> */
}

{
  /* <div className='canvas'> */
}
{
  /* <div style={{ width: 100, height: 100, backgroundColor: 'green', position:'absolute' }}></div> */
}
{
  /* <RulerH stops={ruler_h} onSelectItem={console.log} /> */
}
