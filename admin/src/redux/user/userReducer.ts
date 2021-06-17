import { StateUser } from '../redux.types';
import { TypesUser } from '../types';
import { ActionType } from '../redux.types';

const initialState: StateUser = {
	access_token: '',
	isLoggedIn: false,
	initAutologin: false,
	user: {
		email: '',
		_id: '',
		role: 'visitor',
		login: ''
	},
	orders: [],
	layouts: []
};



export const userReducer = (state = initialState, action: ActionType): StateUser => {
	switch (action.type) {
		case TypesUser.login:
			return {
				...state, ...action.payload, isLoggedIn: true
			};
		case TypesUser.autologin:
			return {
				...state, ...action.payload, isLoggedIn: true, initAutologin: true
			};
		case TypesUser.logout:
			return {
				...initialState, initAutologin: true
			};

		default:
			return state;
	}
};
