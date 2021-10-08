import React, { useRef, useEffect } from "react";
import { fabric } from "fabric";
import { useDispatch } from "react-redux";

//Images
import background_image from "../../../../images/background_1.png";

//Helpers
import { mm_px } from "../../../../helpers/constants";
import {
  setEditor,
  setCoverEditor,
  setConfig,
} from "../../../../redux/editor/editorActions";
import { Canvas } from "../../../../redux/redux.types";

const defCardPropMM = {
  width: 160,
  height: 100,
};

const FabricEditor: React.FC = () => {
  const dispatch = useDispatch();
  const fabricRoot = useRef(null);
  const fabricRootCover = useRef(null);

  useEffect(() => {
    console.log("Fabric editor did mount", fabricRoot.current);

    const converted_width = mm_px * defCardPropMM.width;
    const converted_heigh = mm_px * defCardPropMM.height;

    const canConf = {
      width: converted_width + 40,
      height: converted_heigh + 40,
      backgroundColor: "transparent",
      selectionLineWidth: 2,
    };

    const canvas = new fabric.Canvas(fabricRoot.current, canConf) as Canvas;
    canvas.width_mm = defCardPropMM.width;
    canvas.enableRetinaScaling = true;
    canvas.height_mm = defCardPropMM.height;
    dispatch(setEditor(canvas));
    dispatch(setConfig(canConf));

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

    dispatch(setCoverEditor(canvas_cover));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      {/* <div style={{ width: 23 }}>
          <label style={{ padding: 0, margin: 0, height: 20, }}>cm</label>
          <RulerV stops={ruler_v} onSelectItem={console.log} />
          </div> */}

      {/* <div className='canvas'> */}
      {/* <div style={{ width: 100, height: 100, backgroundColor: 'green', position:'absolute' }}></div> */}
      {/* <RulerH stops={ruler_h} onSelectItem={console.log} /> */}

      <div style={{ position: "relative", display: "flex", margin: "auto" }}>
        <div
          style={{
            position: "absolute",
            backgroundImage: `url(${background_image})`,
          }}
        >
          <canvas style={{}} ref={fabricRoot} />
        </div>

        <div style={{ pointerEvents: "none" }}>
          <canvas ref={fabricRootCover} />
        </div>
      </div>

      {/* </div> */}
    </div>
  );
};

export default FabricEditor;
