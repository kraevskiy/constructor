import { TypesAllUsers } from '../types';
import { Dispatch } from 'redux';
import Axios from '../../helpers/Axios';
import { ActionType } from './userAllReducer';
import { User } from '../redux.types';
import { errorHandler } from '../../helpers';

export const getAllUsers = () => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const user = await Axios.post<User[]>(process.env.REACT_APP_AUTH_USERS as string, {});
			return dispatch({
				type: TypesAllUsers.usersGetAll,
				payload: user.data
			});
		} catch (e) {
			errorHandler(e);
			return null;
		}
	};
};
