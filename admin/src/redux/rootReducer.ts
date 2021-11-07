import { combineReducers } from "redux";
import { userReducer } from "./user/userReducer";
import { appReducer } from "./app/appReducer";
import { layoutsReducer } from "./layouts/layoutsReducer";
import { orderReducer } from "./orders/ordersReducer";
import { orderAllReducer } from "./ordersAll/ordersAllReducer";
import { userAllReducer } from "./userAll/userAllReducer";
import { editorReducer } from "./editor/editorReducer";
import { pageReducer } from "./page/pageReducer";
import { imagesReducer } from "./images/imagesReducer";

export const rootReducer = combineReducers({
  page: pageReducer,
  user: userReducer,
  app: appReducer,
  layouts: layoutsReducer,
  orders: orderReducer,
  ordersAll: orderAllReducer,
  userAll: userAllReducer,
  editor: editorReducer,
  images: imagesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
