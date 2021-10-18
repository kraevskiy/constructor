import { TypesAllUsers } from '../types';
import { Dispatch } from 'redux';
import Axios from '../../helpers/Axios';
import { ActionType } from './userAllReducer';
import { toast } from 'react-toastify';
import { User } from '../redux.types';

export const getAllUsers = () => {
	return async (dispatch: Dispatch<ActionType>): Promise<ActionType | null> => {
		try {
			const user = await Axios.post<User[]>(process.env.REACT_APP_AUTH_USERS as string, {});
			return dispatch({
				type: TypesAllUsers.usersGetAll,
				payload: user.data
			});
		} catch (e) {
			console.log(e);
			// toast.error(`😒 Что-то пошло не так : ${e.response.data.message}`);
			return null;
		}
	};
};
