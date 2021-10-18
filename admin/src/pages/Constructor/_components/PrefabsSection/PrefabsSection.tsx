import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/rootReducer";

import { IconButton } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import {
  changeHistory,
  preparePrefabs,
  deletePrefab,
} from "../../../../redux/editor/editorActions";
import { Prefab } from "../../../../redux/redux.types";
import { mm_px } from "../../../../helpers/constants";

const PrefabsSection: React.FC = () => {
  const dispatch = useDispatch();
  const {
    editor: { instance, cover_instance, prefabs },
  } = useSelector((state: RootState) => state);

  const canvas = instance;

  useEffect(() => {
    dispatch(preparePrefabs());
  }, []);

  const loadPrefab = async (prefab: Prefab) => {
    if (!canvas || !cover_instance) return null;
    const cover_canvas = cover_instance;

    const { width, height } = prefab;

    // console.log('prefab.instance)', prefab.instance);
    const obj = JSON.parse(prefab.instance);

    dispatch(changeHistory(true));

    const converted_width = mm_px * width;
    const converted_heigh = mm_px * height;

    const canConf = {
      width: converted_width + 40,
      height: converted_heigh + 40,
      backgroundColor: "transparent",
      selectionLineWidth: 2,
    };

    canvas.width_mm = width;
    canvas.height_mm = height;
    canvas.setWidth(converted_width + 40);
    canvas.setHeight(converted_heigh + 40);
    cover_canvas.setWidth(converted_width + 40);
    cover_canvas.setHeight(converted_heigh + 40);

    const item = cover_canvas.item(0) as unknown as fabric.Object;

    item.set({
      width: converted_width,
      height: converted_heigh,
      left: canConf.width / 2 - converted_width / 2,
      top: canConf.height / 2 - converted_heigh / 2,
      stroke: "#000",
      strokeWidth: 2,
      fill: "rgba(0,0,200,0.0)",
    });

    // console.log('obj', obj);

    const canvasLoaded = () => {
      for (const object of obj.objects) {
        // delete object.crossOrigin;
        console.log("object", object);
        console.log("object.src", object.src);
      }
    };

    canvas.loadFromJSON(obj, canvasLoaded);
  };

  return (
    <>
      {prefabs.map((prefab, i) => (
        <div
          onMouseDown={() => loadPrefab(prefab)}
          key={i}
          style={{
            height: 150,
            width: "100%",
            overflow: "hidden",
            backgroundImage: `url(${"public/" + prefab.preview_uuid})`,
            backgroundSize: "cover",
            position: "relative",
            backgroundColor: "white",
          }}
        >
          {/* <img src={HTTP_ADDRESS + 'public/' + prefab.preview_uuid} alt={'image'} /> */}

          <div className="layer_title_bar">
            <div className="opacity_caver" />
            <IconButton
              onClick={() => dispatch(deletePrefab(prefab.uuid))}
              // aria-label={`star ${prefab.title}`}
            >
              <DeleteForever style={{ color: "orange" }} />
            </IconButton>
          </div>
        </div>
      ))}
    </>
  );
};

export default PrefabsSection;
