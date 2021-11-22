import { Dispatch } from "redux";
import { TypesEditor } from "../types";
import { CanConfig } from "../redux.types";
import { ActionType } from "./editorReducer";
import { RootState } from "../rootReducer";

export const setMainRed = (payload: fabric.Canvas): ActionType => ({
  type: TypesEditor.set_editor,
  payload,
});

export const setCoverRef = (payload: fabric.Canvas): ActionType => ({
  type: TypesEditor.set_editor,
  payload,
});

export const setEditor = (payload: fabric.Canvas): ActionType => ({
  type: TypesEditor.set_editor,
  payload,
});

export const setConfig = (payload: CanConfig): ActionType => ({
  type: TypesEditor.set_config,
  payload,
});

export const setCoverEditor = (payload: fabric.Canvas): ActionType => ({
  type: TypesEditor.set_cover_editor,
  payload,
});

export const changeScale = (payload: number): ActionType => ({
  type: TypesEditor.set_scale,
  payload,
});

export const changeHistory = (drop = false) => {
  return async (
    dispatch: Dispatch<ActionType>,
    getState: () => RootState
  ): Promise<ActionType | null> => {
    const {
      editor: { history, history_n, instance },
    } = getState();
    let history_l = history.slice(0, history_n + 1);

    history_l.push(JSON.stringify(instance));

    if (drop) history_l = [];

    console.log("HISTORY CHANGED!", history_l.length);
    return dispatch({ type: TypesEditor.change_history, payload: history_l });
  };
};

export const setHistoryMoment = (payload: number): ActionType => ({
  type: TypesEditor.set_history_moment,
  payload,
});
