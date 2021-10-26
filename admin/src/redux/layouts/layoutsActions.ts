import { Dispatch } from 'redux';
import Axios from '../../helpers/Axios';
import { TypesLayout } from '../types';
import { ActionType } from './layoutsReducer';
// import { ActionType as ActionTypeLayoutsAll} from '../layoutsAll/layoutsAllReducer';
import { toast } from 'react-toastify';
import { decode } from 'jsonwebtoken';
import { DecodeTokenTypes, StateUserLayout } from '../redux.types';
import { errorHandler } from '../../helpers';
// import { getAllLayouts } from '../layoutsAll/layoutsAllActions';

export const deleteLayout = (id: string) => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const deletedLayout = await Axios.delete<StateUserLayout>(`${process.env.REACT_APP_LAYOUT}/${id}`);
			// dispatch(getAllLayouts({limit: 100}));
			toast(`Successful delete ${deletedLayout.data.title}`);
			return dispatch({
				type: TypesLayout.deleteLayout,
				payload: [deletedLayout.data]
			});

		} catch (e) {
			errorHandler(e);
			return null;
		}
	};
};

export const getLayouts = (id?: string) => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
      const token = localStorage.getItem('auth-token');
			let layouts;
			if (id) {
				layouts = await Axios.get(`${process.env.REACT_APP_LAYOUT_USER}/${id}`);
			} else {
				let decodeToken = {_id: ''};
				if (typeof token === 'string') {
					decodeToken = decode(token) as DecodeTokenTypes;
				}
				layouts = await Axios.get(`${process.env.REACT_APP_LAYOUT_USER}/${decodeToken._id}`);
			}

			return dispatch({
				type: TypesLayout.getLayouts,
				payload: layouts.data
			});

		} catch (e) {
			errorHandler(e);
			return null;
		}
	};
};

export const createLayouts = (data: {
	title: string;
	config: string;
	files: string[];
	instance: string;
}) => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const layout = await Axios.post<StateUserLayout>(`${process.env.REACT_APP_LAYOUT_CREATE}`, data);
			toast.success(`Successful create ${layout.data.title}`);
			return dispatch({
				type: TypesLayout.createLayout,
				payload: [layout.data]
			});
		} catch (e) {
			errorHandler(e);
			return null;
		}
	};
};

export const clearLayouts = () => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		return dispatch({
			type: TypesLayout.clearLayout,
			payload: []
		});
	};
};
