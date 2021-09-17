import { Dispatch } from 'redux';
import axios from 'axios';
import { TypesLayoutAll } from '../types';
import { ActionType } from './layoutsAllReducer';
import { StateAllLayouts } from '../redux.types';

export const getAllLayouts = (filter?: {
	limit?: number,
	page?: number,
	user?: string
}) => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const token = localStorage.getItem('auth-token');
			const layoutsAll = await axios.post<StateAllLayouts[]>(
				`${process.env.REACT_APP_LAYOUTS}`,
				filter,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);

			return dispatch({
				type: TypesLayoutAll.getLayoutsAll,
				payload: layoutsAll.data
			});

		} catch (e) {
			// console.log(e.response);
			return null;
		}
	};
};
