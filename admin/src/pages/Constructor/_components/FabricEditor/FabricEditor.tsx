import React, { useRef, useEffect } from "react";
import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import {
  CanConfig,
  Canvas,
  FabImage,
  StateUserLayout,
} from "../../../../redux/redux.types";
import { RootState } from "../../../../redux/rootReducer";
import { useParams } from "react-router";

//Images
import background_image from "../../../../images/background_1.png";

//Helpers
import { IPHONE_X_MASK, mm_px } from "../../../../helpers/constants";

import Axios from "../../../../helpers/Axios";
import {
  setEditor,
  setCoverEditor,
  setConfig,
  changeHistory,
} from "../../../../redux/actions";
import { errorHandler } from "../../../../helpers";
import { t_short_m, t_short_f } from "../../../../images/constructor";
import Loader from "../../../../components/Loader/Loader";

// import style from "./Farbric.module.scss";
import "./special.css";
import { changeScale } from "../../../../redux/editor/editorActions";

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
    editor: { loading, editorHeight },
  } = useSelector((state: RootState) => state);

  const fabricRoot = useRef<HTMLCanvasElement>(null);
  const neww = useRef<HTMLDivElement>(null);
  const fabricRootCover = useRef(null);

  useEffect(() => {
    dispatch(changeHistory(true));
    // console.log("Fabric editor did mount");
    if (id) fetchPrefab(id);
    else
      switch (type) {
        case "card":
          cardInitial();
          break;
        case "t_shirt":
          tShirtInitial();
          break;
        case "module":
          moduleInitial();
          break;
        default:
          cardInitial();
          break;
      }
  }, []);

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

    //1246_1385
    const canConf: CanConfig = {
      width: 1350,
      height: 1450,
      width_mm: 1350,
      height_mm: 1450,
      backgroundColor: "transparent",
      selectionLineWidth: 2,
      type: "t_shirt",
      mode: "fill",
      gender: "male",
      cover_height: 900,
      cover_width: 500,
    };

    const canvas = new fabric.Canvas(fabricRoot.current, {
      ...canConf,
      backgroundColor: "white",
    });
    canvas.enableRetinaScaling = true;
    canvas.controlsAboveOverlay = true;

    const clip = new fabric.Path(IPHONE_X_MASK, {
      fill: "white",
      fillRule: "evenodd",
      selectable: false,
      evented: false,
    });
    clip.scale(3);

    canvas.centerObject(clip);
    canvas.clipPath = clip;
    canvas.renderAll();

    fabric.Image.fromURL(
      t_short_m,
      (oImg) => {
        oImg.set({
          top: canConf.height / 2 - oImg.height! / 2,
          left: canConf.width / 2 - oImg.width! / 2,
        });
        // canvas.insertAt(oImg, 0, false);
        oImg.set({ opacity: 0.3 });
        canvas_cover.insertAt(oImg, 0, false);
      },
      { selectable: false, evented: false }
    );

    const canvas_cover = new fabric.Canvas(fabricRootCover.current, canConf);

    const rect = new fabric.Rect({
      width: canConf.cover_width,
      height: canConf.cover_height,
      top: canConf.height / 2 - canConf.cover_height! / 2,
      left: canConf.width / 2 - canConf.cover_width! / 2,
      stroke: "#000",
      strokeWidth: 2,
      fill: "rgba(0,0,200,0.0)",
      opacity: 0,
    });

    canvas_cover.add(rect);
    dispatch(setEditor(canvas));
    dispatch(setConfig(canConf));
    dispatch(setCoverEditor(canvas_cover));
    dispatch(changeScale(editorHeight));
  };

  const moduleInitial = () => {
    console.log("heheheheeh");
  };

  const loadPrefab = async (prefab: StateUserLayout) => {
    // console.log("prefab", prefab);
    console.log("PREFAB LOADING");

    const obj = JSON.parse(prefab.instance);

    const canConf = JSON.parse(prefab.config) as CanConfig;
    const canvas = new fabric.Canvas(fabricRoot.current, canConf);
    canvas.enableRetinaScaling = true;
    canvas.controlsAboveOverlay = true;
    const canvas_cover = new fabric.Canvas(fabricRootCover.current, canConf);

    if (canConf.type == "t_shirt") {
      fabric.Image.fromURL(
        canConf.gender == "male" ? t_short_m : t_short_f,
        (img) => {
          const oImg = img as FabImage;
          oImg.set({
            top: canConf.height / 2 - oImg.height! / 2,
            left: canConf.width / 2 - oImg.width! / 2,
          });
          canvas_cover.insertAt(oImg, 0, false);
        },
        { selectable: false, evented: false, opacity: 0.2 }
      );

      const rect = new fabric.Rect({
        width: canConf.cover_width,
        height: canConf.cover_height,
        top: canConf.height / 2 - canConf.cover_height! / 2,
        left: canConf.width / 2 - canConf.cover_width! / 2,
        stroke: "#000",
        strokeWidth: 2,
        fill: "rgba(0,0,200,0.0)",
      });
      canvas_cover.add(rect);
    } else {
      const converted_width = mm_px * canConf.width_mm;
      const converted_heigh = mm_px * canConf.height_mm;
      const rect = new fabric.Rect({
        width: converted_width,
        height: converted_heigh,
        top: canConf.height / 2 - converted_heigh / 2,
        left: canConf.width / 2 - converted_width / 2,
        stroke: "#000",
        strokeWidth: 2,
        fill: "rgba(0,0,200,0.0)",
      });
      canvas_cover.add(rect);
    }

    const canvasLoaded = () => {
      for (const object of canvas.getObjects()) {
        // console.log("object", object);
        attachListeners(object);
      }
    };

    canvas.loadFromJSON(obj, canvasLoaded);
    dispatch(setEditor(canvas));
    dispatch(setConfig(canConf));
    dispatch(setCoverEditor(canvas_cover));
    dispatch(changeScale(editorHeight));
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
      <div
        ref={neww}
        style={{ position: "relative", display: "flex", margin: "auto" }}
      >
        <div
          style={{
            position: "absolute",
            // backgroundImage: `url(${background_image})`,
            backgroundImage:
              type === "t_shirt" ? `` : `url(${background_image})`,
          }}
        >
          <canvas id="my-node" ref={fabricRoot} />
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
