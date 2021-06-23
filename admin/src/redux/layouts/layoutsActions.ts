import { Dispatch } from 'redux';
import axios from 'axios';
import { TypesLayout } from '../types';
import { ActionType } from './layoutsReducer';
import { toast } from 'react-toastify';
import { decode } from 'jsonwebtoken';
import { DecodeTokenTypes } from '../redux.types';

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

		} catch (e) {
			console.log(e.response);
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
				layouts = await axios.get(
					`${process.env.REACT_APP_LAYOUT_USER}/${id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`
						}
					}
				);
			} else {
				let decodeToken = {_id: ''};
				if (typeof token === 'string') {
					decodeToken = decode(token) as DecodeTokenTypes;
				}
				layouts = await axios.get(
					`${process.env.REACT_APP_LAYOUT_USER}/${decodeToken._id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`
						}
					}
				);
			}

			return dispatch({
				type: TypesLayout.getLayouts,
				payload: layouts.data
			});

		} catch (e) {
			console.log(e.response);
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
		const token = localStorage.getItem('auth-token');
		try {
			const layout = await axios.post(
				`${process.env.REACT_APP_LAYOUT_CREATE}`, data,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);

			console.log(layout);

			return dispatch({
				type: TypesLayout.createLayout,
				payload: layout.data
			});

		} catch (e) {
			console.log(e.response);
			e.response.data.message.map((m: string) => {
				toast.error(m);
			});
			return null;
		}
	};
};
