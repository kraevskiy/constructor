import { TypesUser } from '../types';
import { Dispatch } from 'redux';
import axios from 'axios';
import { DecodeTokenTypes, StateUser } from '../redux.types';
import { ActionType } from '../redux.types';
import { toast } from 'react-toastify';
import { decode } from 'jsonwebtoken';

export const login = ({
	email,
	password
}: { email: string, password: string }) => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const user = await axios.post<StateUser>(process.env.REACT_APP_AUTH_LOGIN as string, {
				email,
				password
			});
			localStorage.setItem('auth-token', user.data.access_token);
			return dispatch({
				type: TypesUser.login,
				payload: user.data
			});
		} catch (e) {
			console.log(e);
			toast.error(`😒 Что-то пошло не так : ${e.response.data.message}`);
			return null;
		}
	};
};

export const autoLogin = () => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const token = localStorage.getItem('auth-token');
			if (token) {
				const decodeToken = decode(token) as DecodeTokenTypes;
				const nowDate = Math.round(new Date().getTime()/1000);
				const isExpired = decodeToken.iat < nowDate;
				if(isExpired) {
					console.log(1111);
					const user = await axios.post<StateUser>(
						process.env.REACT_APP_AUTH_AUTOLOGIN as string,
						{
							email: decodeToken.email,
							token
						},
						{
							headers: {
								Authorization: `Bearer ${token}`
							}
						});
					localStorage.setItem('auth-token', user.data.access_token);
					return dispatch({
						type: TypesUser.autologin,
						payload: user.data
					});
				} else {
					return dispatch({type: TypesUser.logout});
				}
			} else {
				return dispatch({type: TypesUser.logout});
			}
		} catch (e) {
			console.log(e);
			toast.error(`😒 Что-то пошло не так : ${e.response.data.message}`);
			return null;
		}
	};
};

export const logout = () => {
	return (dispatch: Dispatch<ActionType>): ActionType => {
		localStorage.clear();
		return dispatch({type: TypesUser.logout});
	};
};
