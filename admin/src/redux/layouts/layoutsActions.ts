import { Dispatch } from "redux";
import { v4 as uuidv4 } from "uuid";
import Axios from "../../helpers/Axios";
import { TypesEditor, TypesLayout } from "../types";
import { ActionType } from "./layoutsReducer";
import { toast } from "react-toastify";
import { decode } from "jsonwebtoken";
import {
  DecodeTokenTypes,
  FabImage,
  StateAllLayouts,
  StateUserLayout,
} from "../redux.types";
import { errorHandler } from "../../helpers";
import { RootState } from "../rootReducer";
import { History } from "history";
import { paths } from "../../routes/paths";

interface TypeResponseUpload {
  name: string;
  url: string;
}

export const deleteLayout = (id: string) => {
  return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
    try {
      const deletedLayout = await Axios.delete<StateUserLayout>(
        `${process.env.REACT_APP_LAYOUT}/${id}`
      );
      // dispatch(getAllLayouts({limit: 100}));
      toast(`Successful delete ${deletedLayout.data.title}`);
      return dispatch({
        type: TypesLayout.deleteLayout,
        payload: [deletedLayout.data],
      });
    } catch (e) {
      errorHandler(e);
      return null;
    }
  };
};

export const activateLayout = (id: string, active: boolean) => {
  return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
    try {
      const editedLayout = await Axios.patch<StateUserLayout>(
        `${process.env.REACT_APP_LAYOUT}/${id}`,
        { public: !active }
      );
      toast.success(`Layout: ${id} New status: ${active}`);

      return dispatch({
        type: TypesLayout.editLayout,
        payload: [editedLayout.data],
      });
    } catch (e) {
      console.log("errr", e);

      errorHandler(e);
      return null;
    }
  };
};

export const getLayouts = (id?: string) => {
  return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
    try {
      const token = localStorage.getItem("auth-token");
      let layouts;
      if (id) {
        layouts = await Axios.get(`${process.env.REACT_APP_LAYOUT_USER}/${id}`);
      } else {
        let decodeToken = { _id: "" };
        if (typeof token === "string") {
          decodeToken = decode(token) as DecodeTokenTypes;
        }
        layouts = await Axios.get(
          `${process.env.REACT_APP_LAYOUT_USER}/${decodeToken._id}`
        );
      }

      return dispatch({
        type: TypesLayout.getLayouts,
        payload: layouts.data,
      });
    } catch (e) {
      errorHandler(e);
      return null;
    }
  };
};

export const getAllLayouts = (filter?: {
  limit?: number;
  page?: number;
  user?: string;
  public?: boolean;
}) => {
  return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
    try {
      const layoutsAll = await Axios.post<StateAllLayouts[]>(
        `${process.env.REACT_APP_LAYOUTS}`,
        filter
      );

      // console.log("layoutsAll");
      // console.log(layoutsAll.data[0].layouts);

      return dispatch({
        type: TypesLayout.getAllLayouts,
        payload: layoutsAll.data[0].layouts,
      });
    } catch (e) {
      errorHandler(e);
      return null;
    }
  };
};

export const clearAllLayouts = () => {
  return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
    return dispatch({
      type: TypesLayout.clearAllLayout,
      payload: [],
    });
  };
};

export interface EditorType {
  type: TypesEditor;
  payload: boolean;
}

export const createLayout = (buy?: boolean, history?: History) => {
  return async (
    dispatch: Dispatch<ActionType | EditorType>,
    getState: () => RootState
  ): Promise<ActionType | null> => {
    const {
      editor: { canvasConfig, instance },
    } = getState();
    const canvas = instance;

    dispatch({
      type: TypesEditor.set_loading,
      payload: true,
    });

    const files_n: string[] = [];

    if (!canvas) return null;

    const preview_uuid = uuidv4() + "_preview.png";
    const blobObject = blobCreationFromURL(canvas.toDataURL());

    //Uploading files first
    try {
      const formPreviewData = new FormData();
      formPreviewData.append("files", blobObject, preview_uuid);

      const preview = await Axios.post<TypeResponseUpload[]>(
        `${process.env.REACT_APP_FILES_UPLOAD}`,
        formPreviewData
      );

      for (const item of canvas.getObjects()) {
        if (item.type === "image") {
          const image = item as FabImage;
          if (image.img_up) {
            const formData = new FormData();
            formData.append("files", image.img_up);
            const file = await Axios.post<TypeResponseUpload[]>(
              `${process.env.REACT_APP_FILES_UPLOAD}`,
              formData
            );
            files_n.push(file.data[0].url);
          } else {
            files_n.push(image.getSrc());
          }
        }
      }

      const final_instance = JSON.parse(JSON.stringify(canvas));

      for (let i = 0; i < files_n.length; i++) {
        const src = files_n[i];
        if (
          final_instance.objects[i].src &&
          !final_instance.objects[i].src.includes("/uploads/")
        )
          final_instance.objects[i].src = "http://admin.arter.local" + src;
      }

      const data = {
        title: "test_title",
        instance: JSON.stringify(final_instance),
        files: files_n,
        type: canvasConfig.type,
        width: canvasConfig.width_mm,
        height: canvasConfig.height_mm,
        preview: preview.data[0].url,
        config: JSON.stringify(canvasConfig),
      };

      const layout = await Axios.post<StateUserLayout>(
        `${process.env.REACT_APP_LAYOUT_CREATE}`,
        data
      );

      console.log(layout);

      toast.success(`Successful create ${layout.data.title}`);
      // toast.success(layout);
      dispatch({
        type: TypesEditor.set_loading,
        payload: false,
      });
      if (buy) {
        history?.push(paths.orders.create, {
          layoutId: layout.data._id,
        });
      }
      return dispatch({
        type: TypesLayout.createLayout,
        payload: [layout.data],
      });
    } catch (e) {
      errorHandler(e);
    }

    return null;
  };
};

export const createLayouts = (data: StateUserLayout) => {
  return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
    try {
      const layout = await Axios.post<StateUserLayout>(
        `${process.env.REACT_APP_LAYOUT_CREATE}`,
        data
      );
      toast.success(`Successful create ${layout.data.title}`);
      return dispatch({
        type: TypesLayout.createLayout,
        payload: [layout.data],
      });
    } catch (e) {
      errorHandler(e);
      return null;
    }
  };
};

export const clearLayouts = () => {
  return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
    return dispatch({
      type: TypesLayout.clearLayout,
      payload: [],
    });
  };
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
