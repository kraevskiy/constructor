import { ActionType, StateApp } from '../redux.types';
import { TypesApp } from '../types';
import { Dispatch } from 'redux';

export const showLoader = () => {
	return (dispatch: Dispatch<ActionType<TypesApp, StateApp>>): ActionType<TypesApp, StateApp> => {
		return dispatch({type: TypesApp.showLoader});
	};
};

export const hideLoader = () => {
	return (dispatch: Dispatch<ActionType<TypesApp, StateApp>>): ActionType<TypesApp, StateApp> => {
		return dispatch({type: TypesApp.hideLoader});
	};
};

export const toggleCatalog = () => {
	return (dispatch: Dispatch<ActionType<TypesApp, StateApp>>): ActionType<TypesApp, StateApp> => {
		return dispatch({type: TypesApp.toggleCatalog});
	};
};

export const toggleMenu = () => {
	return (dispatch: Dispatch<ActionType<TypesApp, StateApp>>): ActionType<TypesApp, StateApp> => {
		return dispatch({type: TypesApp.toggleMenu});
	};
};
