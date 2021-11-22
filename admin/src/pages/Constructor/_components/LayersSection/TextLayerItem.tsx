import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/rootReducer";

interface Props {
  index: number;
  layer: fabric.Textbox;
}

const TextLayerItem: React.FC<Props> = ({ index, layer }) => {
  const {
    editor: { instance },
  } = useSelector((state: RootState) => state);
  const [text, setText] = useState(layer.text);

  useEffect(() => {
    setText(layer.text);
  }, [layer.text]);

  const handleLayerTextChange = (value: string) => {
    (instance?.item(index) as unknown as fabric.Textbox).text = value;
    setText(value);
    instance?.requestRenderAll();
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 3 }}>
          <label style={{ height: 25, color: "black" }}>Текст:</label>
          <input
            style={{}}
            type="text"
            name="name"
            value={text}
            onChange={(e) => {
              handleLayerTextChange(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TextLayerItem;
