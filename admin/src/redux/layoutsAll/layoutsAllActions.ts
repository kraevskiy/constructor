import { Dispatch } from 'redux';
import Axios from '../../helpers/Axios';
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
			const layoutsAll = await Axios.post<StateAllLayouts[]>(`${process.env.REACT_APP_LAYOUTS}`,filter);

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
