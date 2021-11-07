import { StateUser } from "../redux.types";
import { TypesUser } from "../types";
import { ActionType } from "../redux.types";

const initialState: StateUser = {
  access_token: "",
  isLoggedIn: false,
  initAutologin: false,
  email: "",
  _id: "",
  role: "visitor",
  login: "",
  canEdit: true,
  address: "",
  firstName: "",
  lastName: "",
  phone: "",
  avatar: "",
};

export const userReducer = (
  state = initialState,
  action: ActionType
): StateUser => {
  switch (action.type) {
    case TypesUser.login: {
      const user = action.payload as StateUser;
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
        canEdit: user.role == "admin",
      };
    }
    case TypesUser.autologin: {
      const user = action.payload as StateUser;
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
        initAutologin: true,
        canEdit: user.role == "admin",
      };
    }
    case TypesUser.createUser:
      return {
        ...state,
        ...action.payload,
      };
    case TypesUser.editUser:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
        initAutologin: true,
      };
    case TypesUser.logout:
      return {
        ...initialState,
        initAutologin: true,
      };
    case TypesUser.delete:
      return initialState;
    default:
      return state;
  }
};
