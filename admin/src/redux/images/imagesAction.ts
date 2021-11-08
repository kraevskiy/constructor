import { Dispatch } from "redux";
import { TypesImages } from "../types";
import { ActionType } from "./imagesReducer";
import Axios from "../../helpers/Axios";
import { Image, StateAllImages } from "../redux.types";
import { TypeResponseUpload } from "../../components/InputFile/InputFile";
import { toast } from "react-toastify";
import { errorHandler } from "../../helpers/errorHandler";

export const getAllImages = (filter?: {
  limit?: number;
  page?: number;
  user?: string;
}) => {
  return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
    try {
      const res = await Axios.post<StateAllImages[]>(
        `${process.env.REACT_APP_IMAGE}`,
        filter
      );

      if (res) {
        console.log("IMAGES WERE LOADED", res.data);
        return dispatch({
          type: TypesImages.getImages,
          payload: res.data[0].images,
        });
      }
    } catch (e) {
      console.log("GET IMAGES ERROR", e);
    }
    return null;
  };
};

export const createImage = (type: string, img: File) => {
  return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
    try {
      const formData = new FormData();
      formData.append("files", img);
      const file = await Axios.post<TypeResponseUpload[]>(
        `${process.env.REACT_APP_FILES_UPLOAD}`,
        formData
      );

      if (!file) return null;

      const data = {
        type,
        url: file.data[0].url,
      };

      const res = await Axios.post<Image>(
        `${process.env.REACT_APP_IMAGE_CREATE}`,
        data
      );

      toast.success(`Successful uploaded image`);
      return dispatch({
        type: TypesImages.uploadImage,
        payload: [res.data],
      });
    } catch (e) {
      errorHandler(e);
    }

    return null;
  };
};

export const deleteImage = (id: string) => {
  return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
    try {
      const deletedImage = await Axios.delete<Image>(
        `${process.env.REACT_APP_IMAGE}/${id}`
      );

      toast(`Successful deleted image`);
      return dispatch({
        type: TypesImages.deleteImage,
        payload: [deletedImage.data],
      });
    } catch (e) {
      errorHandler(e);
      return null;
    }
  };
};
