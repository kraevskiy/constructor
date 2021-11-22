import { TypesEditor } from "../types";
import { Editor, CanConfig, Canvas, Image } from "../redux.types";

const initialState: Editor = {
  mainRef: undefined,
  coverRef: undefined,
  instance: undefined,
  cover_instance: undefined,
  canvasConfig: {
    width: 0,
    height: 0,
    width_mm: 0,
    height_mm: 0,
    backgroundColor: "transparent",
    selectionLineWidth: 2,
    type: "card",
    // selectionColor: 'blue',
  },
  scaleRatio: 1,
  prefabsLoading: true,
  history: [],
  history_n: 0,
  loading: false,
};

export interface ActionType {
  type: TypesEditor;
  payload:
    | fabric.Canvas
    | CanConfig
    | number
    | string
    | Image[]
    | string[]
    | boolean;
}

export const editorReducer = (
  state = initialState,
  action: ActionType
): Editor => {
  switch (action.type) {
    case TypesEditor.set_editor: {
      return {
        ...state,
        instance: action.payload as Canvas,
      };
    }
    case TypesEditor.set_config: {
      return {
        ...state,
        canvasConfig: action.payload as CanConfig,
      };
    }
    case TypesEditor.set_cover_editor: {
      return {
        ...state,
        cover_instance: action.payload as Canvas,
      };
    }
    case TypesEditor.set_scale: {
      const { cover_instance, instance, canvasConfig } = state;
      console.log("HERERERERE");

      let scaleRatio = 1;
      const scale = action.payload as number;

      if (scale > 50)
        scaleRatio = parseFloat(
          ((scale - 50) / canvasConfig.height).toFixed(2)
        );
      else scaleRatio = scale ? state.scaleRatio + scale : 1;

      instance?.setDimensions({
        width: canvasConfig.width * scaleRatio,
        height: canvasConfig.height * scaleRatio,
      });
      cover_instance?.setDimensions({
        width: canvasConfig.width * scaleRatio,
        height: canvasConfig.height * scaleRatio,
      });

      instance?.setZoom(scaleRatio);
      cover_instance?.setZoom(scaleRatio);

      return {
        ...state,
        instance: instance,
        cover_instance: cover_instance,
        scaleRatio: scaleRatio,
      };
    }
    case TypesEditor.change_history: {
      const hs = action.payload as string[];
      return { ...state, history: hs, history_n: hs.length };
    }
    case TypesEditor.set_history_moment: {
      return { ...state, history_n: action.payload as number };
    }
    case TypesEditor.set_loading: {
      return { ...state, loading: action.payload as boolean };
    }

    default:
      return state;
  }
};
