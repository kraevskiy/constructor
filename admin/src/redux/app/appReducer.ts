import { ActionType, StateApp } from '../redux.types';
import { TypesApp } from '../types';

const initialState: StateApp = {
	loading: false
};

export const appReducer = (state = initialState, action: ActionType<TypesApp, StateApp>): StateApp => {
	switch (action.type) {
		case TypesApp.hideLoader:
			return {
				...state, loading: false
			};
		case TypesApp.showLoader:
			return {
				...state, loading: true
			};
		default:
			return state;
	}
};
