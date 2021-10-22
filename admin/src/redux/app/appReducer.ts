import { ActionType, StateApp } from '../redux.types';
import { TypesApp } from '../types';

const initialState: StateApp = {
	loading: false,
	isOpenCatalog: false,
	isOpenMenu: false,
	showFooter: true,
	showDownloadBtn: false
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
		case TypesApp.toggleCatalog:
			return {
				...state, isOpenCatalog: !state.isOpenCatalog
			};
		case TypesApp.toggleMenu:
			return {
				...state, isOpenMenu: !state.isOpenMenu
			};
		case TypesApp.showFooter:
			return {
				...state, showFooter: true
			};
		case TypesApp.hideFooter:
			return {
				...state, showFooter: false
			};
		case TypesApp.showDownloadBtn:
			return {
				...state, showDownloadBtn: true
			};
		case TypesApp.hideDownloadBtn:
			return {
				...state, showDownloadBtn: false
			};
		default:
			return state;
	}
};
