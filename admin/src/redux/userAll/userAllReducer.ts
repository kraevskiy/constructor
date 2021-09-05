import { StateAllUsers } from '../redux.types';
import { TypesAllUsers } from '../types';

const initialState: StateAllUsers[] | [] = [];

export interface ActionType {
	type: TypesAllUsers;
	payload: StateAllUsers[];
}

export const userAllReducer = (state = initialState, action: ActionType): StateAllUsers[] => {
	switch (action.type) {
		case TypesAllUsers.usersGetAll:
			return action.payload;
		default:
			return state;
	}
};
