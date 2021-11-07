import { Image, Images } from "../redux.types";
import { TypesImages } from "../types";

const initialState: Images = {
  loading: true,
  images: [],
};

export interface ActionType {
  type: TypesImages;
  payload: Image[] | boolean;
}

export const imagesReducer = (
  state = initialState,
  action: ActionType
): Images => {
  switch (action.type) {
    case TypesImages.getImages: {
      return {
        ...state,
        images: action.payload as Image[],
        loading: false,
      };
    }
    case TypesImages.setLoading: {
      return {
        ...state,
        loading: action.payload as boolean,
      };
    }
    case TypesImages.uploadImage: {
      return {
        ...state,
        images: [...(action.payload as Image[]), ...state.images],
      };
    }
    case TypesImages.deleteImage: {
      return {
        ...state,
        images: state.images.filter(
          (img) => img._id !== (action.payload as Image[])[0]._id
        ),
      };
    }
    default:
      return state;
  }
};
