import { Dispatch } from 'redux';
import { ActionType, StateUserOrder } from '../redux.types';
import { TypesOrder } from '../types';
import axios from 'axios';

export const getOrders = (id: string) => {
	return async (dispatch: Dispatch<ActionType<TypesOrder, StateUserOrder>>): Promise<ActionType<TypesOrder, StateUserOrder> | null> => {
		const token = localStorage.getItem('auth-token');
		try {
			const orders = await axios.get(
				`${process.env.REACT_APP_ORDER_USER}/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);

			return dispatch({
				type: TypesOrder.getOrders,
				payload: orders.data
			});

		}	catch (e) {
			console.log(e.response);
			return null;
		}
	};
};
