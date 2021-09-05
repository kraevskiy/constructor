import { combineReducers } from 'redux';
import { userReducer } from './user/userReducer';
import { appReducer } from './app/appReducer';
import { layoutsReducer } from './layouts/layoutsReducer';
import { orderReducer } from './orders/ordersReducer';
import { layoutsAllReducer } from './layoutsAll/layoutsAllReducer';
import { orderAllReducer } from './ordersAll/ordersAllReducer';
import { userAllReducer } from './userAll/userAllReducer';

export const rootReducer = combineReducers({
	user: userReducer,
	app: appReducer,
	layouts: layoutsReducer,
	orders: orderReducer,
	layoutsAll: layoutsAllReducer,
	ordersAll: orderAllReducer,
	userAll: userAllReducer
});

export type RootState = ReturnType<typeof rootReducer>;
