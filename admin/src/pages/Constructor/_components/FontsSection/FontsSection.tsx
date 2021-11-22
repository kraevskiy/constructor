import React, { useState } from "react";
import { Typography, Button, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../../../redux/rootReducer";
import { fabric } from "fabric";
import { fonts } from "../../../../helpers/constants";
import { changeHistory } from "../../../../redux/editor/editorActions";

import style from "./FontsSection.module.scss";

interface Props {
  setItemIndex: (i: number) => void;
}

const FontsSection: React.FC<Props> = ({ setItemIndex }) => {
  const dispatch = useDispatch();
  const {
    editor: { instance },
  } = useSelector((state: RootState) => state);
  const [filter, setFilter] = useState("");

  const addText = (fontFamily: string) => {
    const text = new fabric.Textbox("hello world", {
      left: 100,
      top: 100,
      fontSize: 20,
      fontFamily,
    });

    text.on("selected", () => {
      setItemIndex(instance?.getObjects().indexOf(text) ?? 0);
    });
    text.on("deselected", () => {
      setItemIndex(-1);
      (
        instance?.item(
          instance.getObjects().indexOf(text)
        ) as unknown as fabric.Textbox
      ).text = text.text + "";
      instance?.requestRenderAll();
    });

    text.on("modified", () => {
      dispatch(changeHistory());
    });

    instance?.add(text);

    instance?.setActiveObject(text);
  };

  return (
    <div className={style.fontsComponent}>
      {/* <Button
        variant="contained"
        color="secondary"
        // className={classes.button}
        onClick={() => addText(editor.instance, props, setItemIndex)}
        endIcon={<TextFields />}
      >
        Добавить текст
      </Button> */}

      <TextField
        variant="outlined"
        margin="dense"
        // style={{ width: 90, marginRight: 10 }}
        onChange={(e) => setFilter(e.target.value)}
        label="ПОИСК"
        value={filter}
      />

      {fonts
        .filter((item) => !filter || item.toLowerCase().startsWith(filter))
        .map((item) => (
          <Button key={item} fullWidth onClick={() => addText(item)}>
            {<Typography style={{ fontFamily: item }}> {item} </Typography>}
          </Button>
        ))}
    </div>
  );
};

export default FontsSection;
