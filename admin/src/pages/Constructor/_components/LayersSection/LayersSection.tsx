import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import {
  DeleteForever,
  LockOpen,
  Lock,
  ExpandLess,
  ExpandMore,
  FileCopy,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/rootReducer";

//Components
import TextLayerItem from "./TextLayerItem";

import style from "./LayersSection.module.scss";

interface Props {
  selectElement: (i: number) => void;
  copyLayer: (i: number) => void;
  deleteLayer: (i: number) => void;
  setItemIndex: (i: number) => void;
  switchLayers: (index: number, dir: number) => void;
}

const LayersSection: React.FC<Props> = ({
  selectElement,
  switchLayers,
  copyLayer,
  deleteLayer,
  setItemIndex,
}) => {
  const {
    editor: { instance, canvasConfig },
  } = useSelector((state: RootState) => state);

  const canvas = instance;

  const commonControl = (index: number, layer: fabric.Object) => (
    <div className={style.layerTitleBar}>
      <IconButton
        style={{ marginLeft: -13 }}
        onClick={() => switchLayers(index, -1)}
        aria-label={`star 1`}
      >
        <ExpandLess style={{ color: "white" }} />
      </IconButton>
      <IconButton
        style={{ marginLeft: -13 }}
        onClick={() => switchLayers(index, 1)}
        aria-label={`star 2`}
      >
        <ExpandMore style={{ color: "white" }} />
      </IconButton>
      <div className="flex1" />
      <IconButton
        style={{ marginLeft: -13 }}
        onClick={() => copyLayer(index)}
        aria-label={`star 3`}
      >
        <FileCopy style={{ color: "white" }} />
      </IconButton>
      <BlockLayerItem
        setItemIndex={setItemIndex}
        index={index}
        canvas={canvas}
        selected={layer.selectable}
      />
      <IconButton
        style={{ marginLeft: -13 }}
        onClick={() => deleteLayer(index)}
        aria-label={`star 5`}
      >
        <DeleteForever style={{ color: "orange" }} />
      </IconButton>
    </div>
  );

  const masterControl = (layer: fabric.Object) => (
    <div className={style.layerTitleBar}>
      <IconButton
        style={{ marginLeft: -13 }}
        onClick={() => switchLayers(0, -1)}
        aria-label={`star 1`}
      >
        {" "}
        <ExpandLess style={{ color: "white" }} />
      </IconButton>
    </div>
  );

  // console.log(canvas.getObjects());

  const hasMaster = canvasConfig.type === "t_shirt";

  return (
    <>
      {(canvas?.getObjects() as FabObj[]).map((layer, index) => (
        <div
          onMouseDown={() => selectElement(index)}
          key={index}
          className={style.layerWrapper}
          style={{
            height:
              layer.type === "text" || layer.type === "textbox" ? 100 : 150,
            backgroundImage: `url(${layer.src})`,
          }}
        >
          {(layer.type === "text" || layer.type === "textbox") && (
            <TextLayerItem layer={layer as fabric.Textbox} index={index} />
          )}

          {layer.type === "circle" && <div></div>}

          {hasMaster && index === 0
            ? masterControl(layer)
            : commonControl(index, layer)}
        </div>
      ))}
    </>
  );
};

export default LayersSection;

interface PropsSelect {
  setItemIndex: (i: number) => void;
  selected: boolean | undefined;
  canvas?: fabric.Canvas;
  index: number;
}

const BlockLayerItem: React.FC<PropsSelect> = ({
  selected,
  setItemIndex,
  canvas,
  index,
}) => {
  const [selectable, setSelectable] = useState<boolean | undefined>(selected);

  const set = (index: number) => {
    if (!canvas) return;
    const item = canvas.item(index) as unknown as fabric.Object;
    item.set({
      selectable: !item.selectable,
      evented: !item.evented,
    });
    canvas.requestRenderAll();
    setSelectable(!selectable);
    setItemIndex(-1);
  };

  return (
    <IconButton
      style={{ marginLeft: -13 }}
      onClick={() => set(index)}
      aria-label={`star 4`}
    >
      {selectable ? (
        <LockOpen style={{ color: "white" }} />
      ) : (
        <Lock style={{ color: "white" }} />
      )}
    </IconButton>
  );
};

export interface FabObj extends fabric.Object {
  src_custom?: string;
  src?: string;
  text?: string;
}
