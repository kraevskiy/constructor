import { ActionType } from '../redux.types';
import { TypesApp } from '../types';
import { Dispatch } from 'redux';

export const showLoader = () => {
	return (dispatch: Dispatch<ActionType>): ActionType => {
		return dispatch({type: TypesApp.showLoader});
	};
};

export const hideLoader = () => {
	return (dispatch: Dispatch<ActionType>): ActionType => {
		return dispatch({type: TypesApp.hideLoader});
	};
};
