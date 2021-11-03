import { Dispatch } from "redux";
import { TypesEditor } from "../types";
import { CanConfig, FileC, Prefab } from "../redux.types";
import { ActionType } from "./editorReducer";
import Axios from "../../helpers/Axios";
import { RootState } from "../rootReducer";

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

export const setPrefab = (payload: Prefab[]): ActionType => ({
  type: TypesEditor.set_prefab,
  payload,
});

export const getImages = () => {
  return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
    try {
      const res = await Axios.get("prefabs/get_images", {});
      if (res) {
        console.log("IMAGES WERE LOADED", res.data);
        return dispatch({
          type: TypesEditor.get_images,
          payload: res.data,
        });
      }
      return null;
    } catch (e) {
      console.log("GET IMAGES ERROR", e);
      return null;
    }
  };
};

export const changeScale = (payload: number): ActionType => ({
  type: TypesEditor.set_scale,
  payload,
});

export const preparePrefabs = () => {
  return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
    try {
      const res = await Axios.post("prefabs/get_prefabs", {});
      console.log("prefabs", JSON.stringify(res.data, null, 2));
      return dispatch(setPrefab(res.data));
    } catch (e) {
      console.log("GET PREFAB ERROR", e);
      return null;
    }
  };
};

export const deletePrefab = (uuid: string) => {
  return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
    const res = await Axios.delete(`prefabs/delete_pref/${uuid}`);
    if (res && res.data.su) {
      alert("Удалено!");
      return dispatch({
        type: TypesEditor.delete_prefab,
        payload: uuid,
      });
    }

    return null;
  };
};

export const createFormData = (
  files: FileC[],
  body: Prefab,
  canvas_url: string,
  preview_uuid: string
): FormData => {
  const data = new FormData();

  for (const file of files) {
    console.log("file", file);
    if (file.custom_name) data.append("file", file, file.custom_name);
    else data.append("file", file);
  }

  if (canvas_url) {
    const blobObject = blobCreationFromURL(canvas_url);
    data.append("file", blobObject, preview_uuid);
  }

  (Object.keys(body) as Array<keyof typeof body>).forEach((key) => {
    data.append(key, body[key] as string);
    // console.log(key + " : " + body[key]);
  });

  return data;
};

const blobCreationFromURL = (dataURI: string): Blob => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  //New Code
  return new Blob([ab], { type: mimeString });
};

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
