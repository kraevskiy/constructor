import { Dispatch } from 'redux';
import axios from 'axios';
import { TypesLayout } from '../types';
import { StateUserLayout } from '../redux.types';
import { ActionType } from './layoutsReducer';


export const deleteLayout = (id: string) => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		const token = localStorage.getItem('auth-token');
		try {
			const deletedLayout = await axios.delete(
				`${process.env.REACT_APP_LAYOUT}/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);
			return dispatch({
				type: TypesLayout.deleteLayout,
				payload: [deletedLayout.data]
			});

		}	catch (e) {
			console.log(e.response);
			return null;
		}
	};
};

export const getLayouts = (id: string) => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		const token = localStorage.getItem('auth-token');
		try {
			const layouts = await axios.get(
				`${process.env.REACT_APP_LAYOUT_USER}/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);

			return dispatch({
				type: TypesLayout.getLayouts,
				payload: layouts.data
			});

		}	catch (e) {
			console.log(e.response);
			return null;
		}
	};
};
