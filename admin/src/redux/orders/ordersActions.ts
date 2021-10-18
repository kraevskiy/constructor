import { Dispatch } from 'redux';
import { DecodeTokenTypes } from '../redux.types';
import { TypesOrder } from '../types';
import Axios from '../../helpers/Axios';
import { decode } from 'jsonwebtoken';
import { ActionType } from './ordersReducer';

export const getOrders = (id?: string) => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const token = localStorage.getItem('auth-token');
			let orders;
			if(id){
				orders = await Axios.get(`${process.env.REACT_APP_ORDER_USER}/${id}`);
			} else {
				let decodeToken = {_id: ''};
				if (typeof token === 'string') {
					decodeToken = decode(token) as DecodeTokenTypes;
				}
				orders = await Axios.get(`${process.env.REACT_APP_ORDER_USER}/${decodeToken._id}`);
			}

			return dispatch({
				type: TypesOrder.getOrders,
				payload: orders.data
			});

		}	catch (e) {
			// console.log(e.response);
			return null;
		}
	};
};

export const createOrders = (data: {
	status?: 'accepted' | 'new' | 'progress' | 'completed';
	layouts: {title: string; _id: string}[]
	user?: string
}) => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const normalData = {...data, status: 'new', user: '60d2e9f16861125fa26c8315'};
			const orders = await Axios.post(`${process.env.REACT_APP_ORDER_CREATE}`,normalData);

			return dispatch({
				type: TypesOrder.createOrder,
				payload: [orders.data]
			});

		}	catch (e) {
			// console.log(e.response);
			return null;
		}
	};
};

export const deleteOrders = (id: string) => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const order = await Axios.delete(`${process.env.REACT_APP_ORDER}/${id}`);

			return dispatch({
				type: TypesOrder.deleteOrder,
				payload: [order.data]
			});

		}	catch (e) {
			// console.log(e.response);
			return null;
		}
	};
};

