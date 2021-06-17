import { combineReducers } from 'redux';
import { userReducer } from './user/userReducer';
import { appReducer } from './app/appReducer';

export const rootReducer = combineReducers({
	user: userReducer,
	app: appReducer
});

export type RootState = ReturnType<typeof rootReducer>;
