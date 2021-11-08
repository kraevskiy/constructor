import { StateUserLayout } from "../redux.types";
import { TypesLayout } from "../types";

interface Layouts {
  userLayouts: StateUserLayout[];
  allLayouts: StateUserLayout[];
  TotalCount: number;
  page: number;
}

const initialState: Layouts = {
  userLayouts: [],
  allLayouts: [],
  TotalCount: 0,
  page: 1,
};

export interface ActionType {
  type: TypesLayout;
  payload: StateUserLayout[];
}

export const layoutsReducer = (
  state = initialState,
  action: ActionType
): Layouts => {
  switch (action.type) {
    case TypesLayout.deleteLayout:
      return {
        ...state,
        allLayouts: state.allLayouts.filter(
          (l) => l._id !== action?.payload[0]._id
        ),
      };
    // return state.filter((l) => l._id !== action?.payload[0]._id);
    case TypesLayout.createLayout:
      return { ...state, allLayouts: [action.payload[0], ...state.allLayouts] };
    case TypesLayout.getLayouts:
      return { ...state, userLayouts: action.payload };
    case TypesLayout.getAllLayouts:
      return { ...state, allLayouts: action.payload };
    case TypesLayout.clearLayout:
      return { ...state, userLayouts: [] };
    case TypesLayout.clearAllLayout:
      return { ...state, allLayouts: [] };
    default:
      return state;
  }
};
