import { TypesUser } from '../types';
import { Dispatch } from 'redux';
import Axios from '../../helpers/Axios';
import { DecodeTokenTypes, StateUser } from '../redux.types';
import { ActionType } from '../redux.types';
import { decode } from 'jsonwebtoken';
import { ILoginFormInterface } from '../../components/LoginForm/LoginForm.interface';
import { IRegistrationFormInterface } from '../../components/RegistrationForm/RegistrationForm.interface';
import { errorHandler } from '../../helpers';
import { toast } from 'react-toastify';
import { IEditUserFormInterface } from '../../pages/Profile/EditUserForm.interface';

export const login = (data: ILoginFormInterface) => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | unknown> => {
		try {
			const user = await Axios.post<StateUser>(process.env.REACT_APP_AUTH_LOGIN as string, data);
			localStorage.setItem('auth-token', user.data.access_token);
			toast.success(`Welcome ${user.data.login}`);
			return dispatch({
				type: TypesUser.login,
				payload: user.data
			});
		} catch (e) {
			errorHandler(e);
			return e;
		}
	};
};

export const autoLogin = () => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const token = localStorage.getItem('auth-token');
			if (token) {
				const decodeToken = decode(token) as DecodeTokenTypes;
				const nowDate = Math.round(new Date().getTime() / 1000);
				const isExpired = decodeToken.iat < nowDate;
				if (isExpired) {
					try {
						const user = await Axios.post<StateUser>(
							process.env.REACT_APP_AUTH_AUTOLOGIN as string,
							{
								email: decodeToken.email,
								token
							});
						localStorage.setItem('auth-token', user.data.access_token);
						delete user.data.passwordHash;
						return dispatch({
							type: TypesUser.autologin,
							payload: user.data
						});
					} catch (e) {
						return dispatch({type: TypesUser.logout});
					}
				} else {
					return dispatch({type: TypesUser.logout});
				}
			} else {
				return dispatch({type: TypesUser.logout});
			}
		} catch (e) {
			errorHandler(e);
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

export const editUser = (data: IEditUserFormInterface | { avatar: string }) => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const user = await Axios.post<StateUser>(process.env.REACT_APP_AUTH_EDIT as string, data);
			return dispatch({
				type: TypesUser.login,
				payload: user.data
			});
		} catch (e) {
			errorHandler(e);
			return null;
		}
	};
};

export const registrationUser = (data: IRegistrationFormInterface) => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const user = await Axios.post<StateUser>(process.env.REACT_APP_AUTH_REGISTER as string, data);
			return dispatch({
				type: TypesUser.createUser,
				payload: user.data
			});
		} catch (e) {
			errorHandler(e);
			return null;
		}
	};
};

export const deleteUser = () => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const token = localStorage.getItem('auth-token');
			if (token) {
				const decodeToken = decode(token) as DecodeTokenTypes;
				await Axios.delete(`${process.env.REACT_APP_AUTH_DELETE}/${decodeToken._id}`);
				localStorage.clear();
				return dispatch({
					type: TypesUser.delete,
				});
			}
			return null;
		} catch (e) {
			errorHandler(e);
			return null;
		}
	};
};
