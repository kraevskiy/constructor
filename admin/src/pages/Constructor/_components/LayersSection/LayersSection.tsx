import React from "react";
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
  switchLayers: (index: number, dir: number) => void;
}

const LayersSection: React.FC<Props> = ({
  selectElement,
  switchLayers,
  copyLayer,
  deleteLayer,
}) => {
  const {
    editor: { instance },
  } = useSelector((state: RootState) => state);

  if (!instance) return <></>;
  const canvas = instance;

  // const [, updateState] = React.useState<unknown>(undefined);
  // const forceUpdate = React.useCallback(() => updateState({}), []);

  const setSelectable = (index: number) => {
    if (!canvas) return;
    const item = canvas.item(index) as unknown as fabric.Object;
    item.set({
      selectable: !item.selectable,
      evented: !item.evented,
    });
    canvas.requestRenderAll();
    selectElement(index);
    // forceUpdate();
  };

  // console.log(canvas.getObjects());

  return (
    <>
      {(canvas.getObjects() as FabObj[]).map((layer, index) => (
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

          <div className={style.layerTitleBar}>
            <IconButton
              style={{ marginLeft: -13 }}
              onClick={() => switchLayers(index, -1)}
              aria-label={`star 1`}
              // aria-label={`star ${layer.title}`}
            >
              <ExpandLess style={{ color: "white" }} />
            </IconButton>
            <IconButton
              style={{ marginLeft: -13 }}
              onClick={() => switchLayers(index, 1)}
              aria-label={`star 2`}
              // aria-label={`star ${layer.title}`}
            >
              <ExpandMore style={{ color: "white" }} />
            </IconButton>
            <div className="flex1" />
            <IconButton
              style={{ marginLeft: -13 }}
              onClick={() => copyLayer(index)}
              aria-label={`star 3`}
              // aria-label={`star ${layer.title}`}
            >
              <FileCopy style={{ color: "white" }} />
            </IconButton>
            <IconButton
              style={{ marginLeft: -13 }}
              onClick={() => setSelectable(index)}
              aria-label={`star 4`}
              // aria-label={`star ${layer.title}`}
            >
              {layer.selectable ? (
                <LockOpen style={{ color: "white" }} />
              ) : (
                <Lock style={{ color: "white" }} />
              )}
            </IconButton>
            {/* <IconButton style={{ marginLeft: -13 }} onClick={() => props.selectElement(index)} aria-label={`star ${layer.title}`}>
                    <StarBorder style={{ color: 'white' }}  />
                  </IconButton> */}
            <IconButton
              style={{ marginLeft: -13 }}
              onClick={() => deleteLayer(index)}
              aria-label={`star 5`}
              // aria-label={`star ${layer.title}`}
            >
              <DeleteForever style={{ color: "orange" }} />
            </IconButton>
          </div>
        </div>
      ))}
    </>
  );
};

export default LayersSection;

export interface FabObj extends fabric.Object {
  src_custom?: string;
  src?: string;
  text?: string;
}
