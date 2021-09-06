import { User } from '../redux.types';
import { TypesAllUsers } from '../types';

const initialState: User[] | [] = [];

export interface ActionType {
	type: TypesAllUsers;
	payload: User[];
}

export const userAllReducer = (state = initialState, action: ActionType): User[] => {
	switch (action.type) {
		case TypesAllUsers.usersGetAll:
			return action.payload;
		default:
			return state;
	}
};
