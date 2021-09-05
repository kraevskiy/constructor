import { Dispatch } from 'redux';
import { TypesOrderAll } from '../types';
import axios from 'axios';
import { ActionType } from './ordersAllReducer';
import { StateAllOrders } from '../redux.types';

export const getAllOrders = (filter: {
	limit?: number,
	page?: number,
	user?: string,
	status?:  'new' | 'progress' | 'completed'
}) => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const token = localStorage.getItem('auth-token');
			const orders = await axios.post<StateAllOrders[]>(
				`${process.env.REACT_APP_ORDER}`,
				filter,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);
			return dispatch({
				type: TypesOrderAll.getOrdersAll,
				payload: orders.data
			});

		} catch (e) {
			console.log(e.response);
			return null;
		}
	};
};
