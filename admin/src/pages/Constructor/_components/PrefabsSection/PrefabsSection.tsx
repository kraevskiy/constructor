import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/rootReducer";

import { IconButton } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import { changeHistory } from "../../../../redux/editor/editorActions";
import { CanConfig, StateUserLayout } from "../../../../redux/redux.types";
import { mm_px } from "../../../../helpers/constants";
import { deleteLayout, setConfig } from "../../../../redux/actions";

import style from "./PrefabsSection.module.scss";

interface Props {
  attachListeners: (obj: fabric.Object) => void;
}

const PrefabsSection: React.FC<Props> = ({ attachListeners }) => {
  const dispatch = useDispatch();
  const {
    editor: { instance, cover_instance },
    layoutsAll,
  } = useSelector((state: RootState) => state);

  const canvas = instance;

  useEffect(() => {
    // dispatch(preparePrefabs());
  }, []);

  const loadPrefab = async (prefab: StateUserLayout) => {
    if (!canvas || !cover_instance) return null;

    console.log("prefab", prefab);

    const obj = JSON.parse(prefab.instance);

    dispatch(changeHistory(true));

    const canConf = JSON.parse(prefab.config) as CanConfig;

    const converted_width = mm_px * canConf.width_mm;
    const converted_heigh = mm_px * canConf.height_mm;

    canvas.setWidth(converted_width + 40);
    canvas.setHeight(converted_heigh + 40);
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
      for (const object of canvas.getObjects()) {
        // delete object.crossOrigin;
        console.log("object", object);
        attachListeners(object);
      }
    };

    canvas.loadFromJSON(obj, canvasLoaded);
    dispatch(setConfig(canConf));
  };

  return (
    <>
      {layoutsAll &&
        layoutsAll[0].layouts.map((prefab, i) => (
          <div
            onMouseDown={() => loadPrefab(prefab)}
            key={i}
            style={{
              height: 150,
              width: "100%",
              overflow: "hidden",
              backgroundImage: `url(${
                "http://admin.arter.local" + prefab.preview
              })`,
              backgroundSize: "cover",
              position: "relative",
              backgroundColor: "gray",
            }}
          >
            <div className={style.layer_title_bar}>
              <div className={style.opacity_caver} />
              <IconButton
                onClick={() => dispatch(deleteLayout(prefab._id))}
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
