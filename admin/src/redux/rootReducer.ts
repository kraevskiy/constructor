import { combineReducers } from 'redux';
import { userReducer } from './user/userReducer';
import { appReducer } from './app/appReducer';
import { layoutsReducer } from './layouts/layoutsReducer';
import { orderReducer } from './orders/ordersReducer';

export const rootReducer = combineReducers({
	user: userReducer,
	app: appReducer,
	layouts: layoutsReducer,
	orders: orderReducer
});

export type RootState = ReturnType<typeof rootReducer>;
