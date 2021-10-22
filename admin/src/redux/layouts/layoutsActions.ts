import { Dispatch } from 'redux';
import Axios from '../../helpers/Axios';
import { TypesLayout } from '../types';
import { ActionType } from './layoutsReducer';
// import { ActionType as ActionTypeLayoutsAll} from '../layoutsAll/layoutsAllReducer';
import { toast } from 'react-toastify';
import { decode } from 'jsonwebtoken';
import { DecodeTokenTypes } from '../redux.types';
// import { getAllLayouts } from '../layoutsAll/layoutsAllActions';

export const deleteLayout = (id: string) => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const deletedLayout = await Axios.delete(`${process.env.REACT_APP_LAYOUT}/${id}`);
			// dispatch(getAllLayouts({limit: 100}));
			return dispatch({
				type: TypesLayout.deleteLayout,
				payload: [deletedLayout.data]
			});

		} catch (e) {
			console.log(e);
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
			const layout = await Axios.post(`${process.env.REACT_APP_LAYOUT_CREATE}`, data);

			console.log(layout);

			return dispatch({
				type: TypesLayout.createLayout,
				payload: [layout.data]
			});

		} catch (e) {
			// e.response.data.message.map((m: string) => {
			// 	toast.error(m);
			// });
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
